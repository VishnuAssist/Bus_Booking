import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import CommonTable from "../../../Component/CommenTable";
import type { leaverequesttype } from "../../../model/LeaveRequest";
import Footer from "../../../Component/Footer";


const LeaveRequest = () => {

    const [LeaveRequest, setLeaveRequests] = useState(false);
    const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<leaverequesttype | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


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

    const sampleData: leaverequesttype[] = [
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
    ];

    const onSubmit = async (formData: any) => {
        console.log("Store Form Data", formData);
        setLeaveRequests(false);
        setSelectedLeaveRequest(null);
    };

    const handleView = (row: leaverequesttype) => console.log("View", row);

    return (
        <>
            <CommisionContainer>
                <PageHeader
                    title="Staff Services"
                    subtitle="Manage your work schedule and requests"
                    btntitle="My Request"
                    btntitle2="Apply"
                    icon={<DescriptionOutlinedIcon />}
                    icon2={<AccessTimeIcon />}
                    onActionClick2={() => setLeaveRequests(true)}
                />

                <Grid container>
                    {LeaveRequest && (
                        <Grid size={12}>
                            <Card>
                                <CardHeader title={selectedLeaveRequest ? "Edit Request" : "Add New Request"} />
                                <CardContent>
                                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                                        <Grid container spacing={3}>
                                            <Grid size={12}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="leave-type-label">Request Type</InputLabel>
                                                    <Select labelId="leave-type-label" label="Leave Type" defaultValue="">
                                                        <MenuItem value="sick">Sick Leave</MenuItem>
                                                        <MenuItem value="anual">Anual Leave</MenuItem>
                                                        <MenuItem value="reschedule">Shift Reschedule</MenuItem>
                                                        <MenuItem value="swap">Shift Swap</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField
                                                    fullWidth
                                                    type="date"
                                                    label="Start Date"
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField
                                                    fullWidth
                                                    type="date"
                                                    label="End Date"
                                                    InputLabelProps={{ shrink: true }}
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    minRows={3}
                                                    label="Reason"
                                                    placeholder="Enter your reason for leave..."
                                                />
                                            </Grid>
                                            <Grid size={12}>
                                                <Button
                                                    variant="outlined"
                                                    component="label"
                                                    fullWidth
                                                    sx={{ height: "56px" }}
                                                >
                                                    Upload File
                                                    <input type="file" hidden />
                                                </Button>
                                            </Grid>
                                            <Grid size={12}>
                                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
                                                    <Button variant="contained" color="error" onClick={() => setLeaveRequests(false)}>Close</Button>
                                                    <Button variant="contained" color="primary" onClick={onSubmit}>Submit Request</Button>
                                                </Box>

                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                    <Grid size={12}>
                        <Card sx={{ mt: 2 }}>
                            <CardHeader title="Recent Requests" />
                            <CardContent>
                                <CommonTable
                                    columns={columns as any}
                                    rows={sampleData}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={setPage}
                                    onRowsPerPageChange={setRowsPerPage}
                                    actions={{
                                        onView: handleView,
                                        onEdit: (row) => {
                                            setSelectedLeaveRequest(row);
                                            setLeaveRequests(true);
                                        },
                                        onDelete: (row) => console.log("delete", row),
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CommisionContainer>

            <Footer />
        </>
    )
};
export default LeaveRequest;