import { useState } from "react";
import { Link } from "react-router-dom";
import { useLessonsList } from "../hooks/useLessonsList";
import * as lessonsService from "../services/lessonsService";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/shared/components/Table";
import { Button } from "@/shared/components/Button";
import { LoadingState } from "@/shared/components/LoadingState";
import { EmptyState } from "@/shared/components/EmptyState";
import { Pagination } from "@/shared/components/Pagination";
import { Modal } from "@/shared/components/Modal";
import { Alert } from "@/shared/components/Alert";
import { ROUTES } from "@/app/config/constants";

export function AdminLessonListPage() {
  const { lessons, total, page, limit, loading, error, setPage, refetch } = useLessonsList(1, 5);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await lessonsService.deleteLesson(id);
      setDeleteId(null);
      refetch();
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="container-content max-w-6xl space-y-4 min-w-0">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 sm:justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Lessons</h1>
        <Link to={ROUTES.admin.lessonNew} className="shrink-0">
          <Button>New lesson</Button>
        </Link>
      </div>
      {error && <Alert variant="error" message={error} />}
      {lessons.length === 0 ? (
        <EmptyState
          message="No lessons yet."
          action={
            <Link to={ROUTES.admin.lessonNew}>
              <Button>Create first lesson</Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Card layout: mobile/tablet — no horizontal scroll */}
          <div className="space-y-3 lg:hidden">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white border border-gray-200 rounded-md shadow-card p-4 space-y-2"
              >
                <div>
                  <p className="text-xs font-medium text-gray-500">Title</p>
                  <p className="text-gray-900 font-medium">{lesson.title}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Description</p>
                  <p className="text-gray-900 text-sm line-clamp-2">{lesson.description}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Sort order</p>
                  <p className="text-gray-900">{lesson.sortOrder}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <Link to={ROUTES.admin.lessonEdit.replace(":id", String(lesson.id))}>
                    <Button variant="secondary" type="button" className="!py-1.5 text-sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    type="button"
                    className="!py-1.5 text-sm"
                    onClick={() => setDeleteId(lesson.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* Table: desktop only */}
          <div className="hidden lg:block">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Description</TableHeaderCell>
                  <TableHeaderCell>Sort order</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{lesson.description}</TableCell>
                    <TableCell>{lesson.sortOrder}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Link to={ROUTES.admin.lessonEdit.replace(":id", String(lesson.id))}>
                          <Button variant="secondary" type="button" className="!py-1.5 text-sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          type="button"
                          className="!py-1.5 text-sm"
                          onClick={() => setDeleteId(lesson.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination page={page} total={total} limit={limit} onPageChange={setPage} />
        </>
      )}
      <Modal
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        title="Delete lesson"
        footer={
          <>
            <Button variant="secondary" type="button" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              loading={deleting}
              onClick={() => deleteId != null && handleDelete(deleteId)}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this lesson?</p>
      </Modal>
    </div>
  );
}
