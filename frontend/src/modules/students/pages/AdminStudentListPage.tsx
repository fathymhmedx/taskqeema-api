import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudentsList } from "../hooks/useStudentsList";
import * as studentsService from "../services/studentsService";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/shared/components/Table";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { LoadingState } from "@/shared/components/LoadingState";
import { EmptyState } from "@/shared/components/EmptyState";
import { Pagination } from "@/shared/components/Pagination";
import { Modal } from "@/shared/components/Modal";
import { Alert } from "@/shared/components/Alert";
import { ROUTES } from "@/app/config/constants";

export function AdminStudentListPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { students, total, page, limit, loading, error, setPage, refetch } = useStudentsList(1, 5, search);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await studentsService.deleteStudent(id);
      setDeleteId(null);
      refetch();
    } finally {
      setDeleting(false);
    }
  };

  if (loading && students.length === 0) return <LoadingState />;

  return (
    <div className="container-content max-w-6xl space-y-4 min-w-0">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 sm:justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Students</h1>
        <Link to={ROUTES.admin.studentNew} className="shrink-0">
          <Button>New student</Button>
        </Link>
      </div>
      <form onSubmit={handleSearch} className="flex flex-wrap gap-2 max-w-full sm:max-w-xs">
        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="min-w-0 flex-1 sm:flex-initial"
        />
        <Button type="submit" variant="secondary" className="shrink-0">
          Search
        </Button>
      </form>
      {error && <Alert variant="error" message={error} />}
      {students.length === 0 ? (
        <EmptyState
          message="No students found."
          action={
            <Link to={ROUTES.admin.studentNew}>
              <Button>Create first student</Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Card layout: mobile/tablet — no horizontal scroll */}
          <div className="space-y-3 lg:hidden">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-white border border-gray-200 rounded-md shadow-card p-4 space-y-2"
              >
                <div>
                  <p className="text-xs font-medium text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{student.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Email</p>
                  <p className="text-gray-900 break-all">{student.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Grade</p>
                  <p className="text-gray-900">{student.grade ?? "—"}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <Link to={ROUTES.admin.studentDetail.replace(":id", String(student.id))}>
                    <Button variant="ghost" type="button" className="!py-1.5 text-sm">
                      View
                    </Button>
                  </Link>
                  <Link to={ROUTES.admin.studentEdit.replace(":id", String(student.id))}>
                    <Button variant="secondary" type="button" className="!py-1.5 text-sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    type="button"
                    className="!py-1.5 text-sm"
                    onClick={() => setDeleteId(student.id)}
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
                  <TableHeaderCell>Name</TableHeaderCell>
                  <TableHeaderCell>Email</TableHeaderCell>
                  <TableHeaderCell>Grade</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.grade ?? "—"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Link to={ROUTES.admin.studentDetail.replace(":id", String(student.id))}>
                          <Button variant="ghost" type="button" className="!py-1.5 text-sm">
                            View
                          </Button>
                        </Link>
                        <Link to={ROUTES.admin.studentEdit.replace(":id", String(student.id))}>
                          <Button variant="secondary" type="button" className="!py-1.5 text-sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          type="button"
                          className="!py-1.5 text-sm"
                          onClick={() => setDeleteId(student.id)}
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
        title="Delete student"
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
        <p>Are you sure you want to delete this student?</p>
      </Modal>
    </div>
  );
}
