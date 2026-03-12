import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSchoolsList } from "../hooks/useSchoolsList";
import * as schoolsService from "../services/schoolsService";
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

const DISPLAY_LIMIT = 5;

export function AdminSchoolListPage() {
  const { schools, loading, error, refetch } = useSchoolsList();
  const [page, setPage] = useState(1);
  const displaySchools = schools.slice(
    (page - 1) * DISPLAY_LIMIT,
    page * DISPLAY_LIMIT
  );
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const totalPages = Math.max(1, Math.ceil(schools.length / DISPLAY_LIMIT));
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [schools.length, page, totalPages]);

  const handleDelete = async (id: number) => {
    setDeleting(true);
    try {
      await schoolsService.deleteSchool(id);
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
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Schools</h1>
        <Link to={ROUTES.admin.schoolNew} className="shrink-0">
          <Button>New school</Button>
        </Link>
      </div>
      {error && <Alert variant="error" message={error} />}
      {displaySchools.length === 0 ? (
        <EmptyState
          message="No schools yet."
          action={
            <Link to={ROUTES.admin.schoolNew}>
              <Button>Create first school</Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Card layout: mobile/tablet — no horizontal scroll */}
          <div className="space-y-3 lg:hidden">
            {displaySchools.map((school) => (
              <div
                key={school.id}
                className="bg-white border border-gray-200 rounded-md shadow-card p-4 space-y-2"
              >
                <div>
                  <p className="text-xs font-medium text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{school.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">{school.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  <Link to={ROUTES.admin.schoolEdit.replace(":id", String(school.id))}>
                    <Button variant="secondary" type="button" className="!py-1.5 text-sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    type="button"
                    className="!py-1.5 text-sm"
                    onClick={() => setDeleteId(school.id)}
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
                  <TableHeaderCell>Phone</TableHeaderCell>
                  <TableHeaderCell>Actions</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displaySchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>{school.phone}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Link to={ROUTES.admin.schoolEdit.replace(":id", String(school.id))}>
                          <Button variant="secondary" type="button" className="!py-1.5 text-sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          type="button"
                          className="!py-1.5 text-sm"
                          onClick={() => setDeleteId(school.id)}
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
          <Pagination
            page={page}
            total={schools.length}
            limit={DISPLAY_LIMIT}
            onPageChange={setPage}
          />
        </>
      )}
      <Modal
        open={deleteId != null}
        onClose={() => setDeleteId(null)}
        title="Delete school"
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
        <p>Are you sure you want to delete this school?</p>
      </Modal>
    </div>
  );
}
