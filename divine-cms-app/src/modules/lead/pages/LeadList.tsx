import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import Button from "../../../components/ui/button/Button";
import ConfirmationModal from "../../../components/ui/modal/ConfirmationModal";
import {
  PaginationControl,
  SearchControl,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import { AppDispatch } from "../../../store/store";
import { useModal } from "../../../hooks/useModal";
import { Lead } from "../features/leadTypes";
import { selectAllLead, selectLeadStatus } from "../features/leadSelectors";
import { deleteLead, fetchAllLead } from "../features/leadThunks";

export default function LeadList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const leads = useSelector(selectAllLead);
  const status = useSelector(selectLeadStatus);

  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    dispatch(fetchAllLead());
  }, [dispatch]);

  const filteredLeads = useMemo(() => {
    if (status !== "succeeded") {
      return [];
    }

    const searchText = filterText.toLowerCase();

    return leads.filter((lead) =>
      [lead.date, lead.websiteName, lead.clientName, lead.phoneNumber, lead.serviceNeeded]
        .some((value) => (value ?? "").toLowerCase().includes(searchText))
    );
  }, [filterText, leads, status]);

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      const dateCompare = (b.date ?? "").localeCompare(a.date ?? "");
      if (dateCompare !== 0) {
        return dateCompare;
      }

      return (b.id ?? 0) - (a.id ?? 0);
    });
  }, [filteredLeads]);

  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage) || 1;

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedLeads.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, sortedLeads]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const closeAndResetModal = () => {
    setSelectedLead(null);
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedLead?.id) {
      return;
    }

    try {
      await dispatch(deleteLead(selectedLead.id)).unwrap();
      toast.success("Lead deleted successfully!");
      closeAndResetModal();
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to delete lead.");
    }
  };

  return (
    <>
      <PageMeta title="Lead List Table" description="Lead table with search and pagination" />
      <PageBreadcrumb pageTitle="Lead List" />

      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => navigate("/lead/create")} variant="success">
            Add Lead
          </Button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full">
            <SearchControl value={filterText} onChange={setFilterText} />

            <Table>
              <TableHeader className="border-b border-t border-gray-100 bg-gray-200 text-sm text-black dark:border-white/[0.05] dark:bg-gray-800 dark:text-gray-400">
                <TableRow>
                  <TableCell isHeader className="px-4 py-2 text-center">Sl</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-center">Date</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-center">Website Name</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-center">Client Name</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-center">Phone Number</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-center">Service Needed</TableCell>
                  <TableCell isHeader className="px-4 py-2 text-center">Action</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {status === "loading" ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-4 text-center text-gray-500 dark:text-gray-300">
                      Loading leads...
                    </TableCell>
                  </TableRow>
                ) : paginatedLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-4 text-center text-gray-500 dark:text-gray-300">
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedLeads.map((lead, index) => (
                    <TableRow key={lead.id} className="border-b border-gray-100 dark:border-white/[0.05]">
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {lead.date}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {lead.websiteName}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {lead.clientName}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {lead.phoneNumber}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        {lead.serviceNeeded}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/lead/${lead.id}/edit`)}
                            className="rounded-full bg-sky-500 px-3 py-1 text-white hover:bg-sky-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedLead(lead);
                              openModal();
                            }}
                            className="rounded-full bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isOpen}
        title="Are you sure you want to delete this lead?"
        message={selectedLead ? `${selectedLead.clientName} - ${selectedLead.websiteName}` : undefined}
        onCancel={closeAndResetModal}
        onConfirm={handleDelete}
        confirmText="Delete"
      />
    </>
  );
}
