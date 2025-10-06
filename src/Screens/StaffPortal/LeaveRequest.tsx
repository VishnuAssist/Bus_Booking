import { useState } from "react";
import PageHeader from "../../Component/pageHeader";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import type { leaverequesttype } from "../../model/LeaveRequest";
import {
  LeaveRequestFormFields,
  leaveRequestFormValidationSchema,
} from "../../feilds_validation/leaveRequestFields";
import CommonTable from "../../Component/CommenTable";

const LeaveRequestPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<leaverequesttype | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const [leaveRequests, setLeaveRequests] = useState<leaverequesttype[]>([
    {
      id: 1,
      requestType: "Sick Leave",
      reason: "Fever and cold",
      date: "2024-01-15",
      upload: "medical_certificate.pdf",
      status: "Pending",
    },
    {
      id: 2,
      requestType: "Vacation",
      reason: "Family vacation",
      date: "2024-02-01",
      upload: "",
      status: "Approved",
    },
    {
      id: 3,
      requestType: "Emergency",
      reason: "Personal emergency",
      date: "2024-01-20",
      upload: "emergency_docs.pdf",
      status: "Rejected",
    },
    {
      id: 4,
      requestType: "Medical",
      reason: "Dental appointment",
      date: "2024-01-25",
      upload: "appointment_letter.pdf",
      status: "Pending",
    },
  ]);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedLeaveRequest(null);
  };

  const getLeaveRequestFields = () => {
    const fields = [...LeaveRequestFormFields];
    
    const requestTypeField = fields.find((f) => f.name === "requestType");
    if (requestTypeField) {
      requestTypeField.options = [
        { id: "Sick Leave", name: "Sick Leave" },
        { id: "Vacation", name: "Vacation" },
        { id: "Emergency", name: "Emergency" },
        { id: "Medical", name: "Medical" },
        { id: "Personal", name: "Personal" },
      ];
    }

    const statusField = fields.find((f) => f.name === "status");
    if (statusField) {
      statusField.options = [
        { id: "Pending", name: "Pending" },
        { id: "Approved", name: "Approved" },
        { id: "Rejected", name: "Rejected" },
      ];
    }
    
    return fields;
  };

  const onSubmit = async (formData: leaverequesttype) => {
    console.log("formData", formData);

    if (selectedLeaveRequest?.id) {
      setLeaveRequests((prev) =>
        prev.map((lr) =>
          lr.id === selectedLeaveRequest.id ? { ...formData, id: lr.id } : lr
        )
      );
    } else {
      const newId = leaveRequests.length + 1;
      setLeaveRequests((prev) => [...prev, { ...formData, id: newId, status: "Pending" }]);
    }

    handleModalClose();
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "requestType", label: "Request Type", minWidth: 120 },
    { id: "date", label: "Date", minWidth: 100 },
    { id: "reason", label: "Reason", minWidth: 200 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      format: (value: string) => (
        <span
          style={{
            color:
              value === "Approved"
                ? "green"
                : value === "Rejected"
                ? "red"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {value}
        </span>
      ),
    },
  ];

  const handleView = (row: leaverequesttype) => console.log("View", row);
  const handleEdit = (row: leaverequesttype) => {
    setSelectedLeaveRequest(row);
    setModalOpen(true);
  };
  const handleDelete = (row: leaverequesttype) => {
    setLeaveRequests((prev) => prev.filter((lr) => lr.id !== row.id));
  };

  return (
    <>
      <PageHeader title="Leave Requests" onActionClick={() => setModalOpen(true)} />

      <CommisionContainer>
        <CommonTable
          columns={columns}
          rows={leaveRequests}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          actions={{
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
        />
      </CommisionContainer>

      {/* <Footer /> */}

      <CommonDialog
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={onSubmit}
        title={selectedLeaveRequest ? "Edit Leave Request" : "Add Leave Request"}
        validationSchema={leaveRequestFormValidationSchema}
        fields={getLeaveRequestFields()}
        defaultValues={
          selectedLeaveRequest ?? {
            requestType: "",
            reason: "",
            date: "",
            upload: "",
            status: "Pending",
          }
        }
      />
    </>
  );
};

export default LeaveRequestPage;