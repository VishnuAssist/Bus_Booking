import { useState } from "react";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/pageHeader";
import CommonTable from "../../Component/CommenTable";
import Footer from "../../Component/Footer";
//import { CommonDialog } from "../../Component/forms/FormDialog";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { Add, Delete, Clear } from "@mui/icons-material";
import CurrentYearTarget from "./CurrentYearTarget";

const StoreTarget = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //const [isModalOpen, setModalOpen] = useState(false);
    //const [selectedStoreTarget, setSelectedStoreTarget] = useState<any>(null);
    const [roleModal, setRoleModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [roleTargets, setRoleTargets] = useState([{ role: "", targetAmount: "" }]);
    const [formData, setFormData] = useState({
        year: "",
        month: "",
        targetAmount: "",
        StoreKPITargetBraPenetration: "",
        StoreKPIAchievementBraPenetration: "",
        StoreTargetAchievement: "",
    });

    const StoreTargetColumns = [
        { id: "id", label: "ID" },
        { id: "year", label: "Year" },
        { id: "month", label: "Month" },
        { id: "targetAmount", label: "Target Amount" },
        { id: "storeKPITraget", label: "StoreKPITargetBraPenetration" },
        { id: "storeKPIAchievement", label: "StoreKPIAchievementBraPenetration" },
        { id: "targetAchievement", label: "StoreTargetAchievement" },
        { id: "status", label: "Status" },
    ];

    const StoreRoleTargetColumn = [
        { id: "id", label: "ID" },
        { id: "role", label: "Role" },
        { id: "targetAmount", label: "Target Amount" },
    ];

    const StoreRoleTargetSampleData = [
        { id: 1, role: "Store Manager", targetAmount: "1,00,000" },
        { id: 2, role: "Sales Executive", targetAmount: "1,80,000" },
        { id: 3, role: "Assistant Manager", targetAmount: "1,20,000" },
        { id: 4, role: "Cashier", targetAmount: "1,50,000" },
    ]

    const StoreTargetSampleData = [
        {
            id: 1,
            year: "2025",
            month: "January",
            targetAmount: "₹1,50,000",
            storeKPITraget: "80%",
            storeKPIAchievement: "78%",
            targetAchievement: "₹1,45,000",
            status: "Achieved",
        },
        {
            id: 2,
            year: "2025",
            month: "February",
            targetAmount: "₹1,70,000",
            storeKPITraget: "85%",
            storeKPIAchievement: "82%",
            targetAchievement: "₹1,60,000",
            status: "Achieved",
        },
        {
            id: 3,
            year: "2025",
            month: "March",
            targetAmount: "₹1,80,000",
            storeKPITraget: "88%",
            storeKPIAchievement: "79%",
            targetAchievement: "₹1,45,000",
            status: "Partially Achieved",
        },
        {
            id: 4,
            year: "2025",
            month: "April",
            targetAmount: "₹2,00,000",
            storeKPITraget: "90%",
            storeKPIAchievement: "70%",
            targetAchievement: "₹1,40,000",
            status: "Not Achieved",
        },
        {
            id: 5,
            year: "2025",
            month: "May",
            targetAmount: "₹2,20,000",
            storeKPITraget: "92%",
            storeKPIAchievement: "94%",
            targetAchievement: "₹2,25,000",
            status: "Achieved",
        },
        {
            id: 6,
            year: "2025",
            month: "June",
            targetAmount: "₹2,10,000",
            storeKPITraget: "85%",
            storeKPIAchievement: "80%",
            targetAchievement: "₹1,90,000",
            status: "Partially Achieved",
        },
        {
            id: 7,
            year: "2025",
            month: "July",
            targetAmount: "₹2,30,000",
            storeKPITraget: "88%",
            storeKPIAchievement: "91%",
            targetAchievement: "₹2,40,000",
            status: "Achieved",
        },
        {
            id: 8,
            year: "2025",
            month: "August",
            targetAmount: "₹2,50,000",
            storeKPITraget: "90%",
            storeKPIAchievement: "85%",
            targetAchievement: "₹2,10,000",
            status: "Partially Achieved",
        },
        {
            id: 9,
            year: "2025",
            month: "September",
            targetAmount: "₹2,40,000",
            storeKPITraget: "93%",
            storeKPIAchievement: "96%",
            targetAchievement: "₹2,55,000",
            status: "Achieved",
        },
        {
            id: 10,
            year: "2025",
            month: "October",
            targetAmount: "₹2,60,000",
            storeKPITraget: "95%",
            storeKPIAchievement: "88%",
            targetAchievement: "₹2,30,000",
            status: "Partially Achieved",
        },
    ];

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleChange = (index: number, field: keyof typeof roleTargets[number], value: string) => {
        const updatedRoles = [...roleTargets];
        updatedRoles[index][field] = value;
        setRoleTargets(updatedRoles);
    };


    const handleAddRole = () => {
        setRoleTargets([...roleTargets, { role: "", targetAmount: "" }]);
    };

    const handleRemoveRole = (index: number) => {
        const updated = [...roleTargets];
        updated.splice(index, 1);
        setRoleTargets(updated);
    };

    const handleSubmit = () => {
        const payload = { ...formData, roleTargets };
        console.log("Form Submitted Data:", payload);
        setOpenForm(false);
    };

    const roleOptions = [
        "Store Manager",
        "Sales Executive",
        "Assistant Manager",
        "Cashier",
    ];

    const monthOptions = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from(
        { length: 10 },
        (_, i) => (currentYear - 5 + i).toString()
    );

    const handelView = () => {
        setRoleModal(true);
    }

    // const onSubmit = async (formData: any) => {
    //     console.log("Store Form Data", formData);
    //     setModalOpen(false);
    //     setSelectedStoreTarget(null);
    // };

    // const storeTargetFields = () => {
    //     const fields = [...StoreTargetFormFields];
    //     const roleField = fields.find((f) => f.name === "role");
    //     if (roleField) {
    //         roleField.options = [
    //             { id: "1", name: "Store Manger" },
    //             { id: "2", name: "Sales Executive" },
    //             { id: "3", name: "Assistant Manager" },
    //             { id: "4", name: "Cashier" },
    //         ];
    //     }
    //     return fields;
    // };

    return (
        <>
            {/* <PageHeader title="Store Target" onActionClick={() => setModalOpen(true)} /> */}
            <PageHeader title="Store Target" onActionClick={() => setOpenForm(true)} />
            <CommisionContainer>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <CurrentYearTarget />
                    </Grid>
                    <Grid size={12}>
                        <CommonTable
                            columns={StoreTargetColumns}
                            rows={StoreTargetSampleData}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={setPage}
                            onRowsPerPageChange={setRowsPerPage}
                            approval={{
                                onConform: (row) => console.log("Approved", row),
                                onReject: (row) => console.log("Rejected", row)
                            }}
                            actions={{
                                onView: handelView,
                            }}
                        />
                    </Grid>
                </Grid>
            </CommisionContainer>

            <Footer />

            {/* <CommonDialog
                open={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedStoreTarget(null);
                }}
                onSubmit={onSubmit}
                title={selectedStoreTarget ? "Edit StoreTraget" : "Add StoreTraget"}
                validationSchema={storeTargetFormValidationSchema}
                fields={storeTargetFields()}
                defaultValues={
                    selectedStoreTarget || {
                        year: "",
                        month: "",
                        targetAmount: "",
                    }
                }
            /> */}

            <Dialog open={roleModal} onClose={() => setRoleModal(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography fontSize={20} fontWeight={500}>Target Assigned for Role</Typography>
                    <IconButton onClick={() => setRoleModal(false)}>
                        <Clear color="error" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <CommonTable
                            columns={StoreRoleTargetColumn}
                            rows={StoreRoleTargetSampleData}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            onPageChange={setPage}
                            onRowsPerPageChange={setRowsPerPage}
                        />
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog
                open={openForm}
                onClose={() => setOpenForm(false)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>Store Target Setup</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    select
                                    label="Year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    fullWidth
                                >
                                    {yearOptions.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    select
                                    label="Month"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleInputChange}
                                    fullWidth
                                >
                                    {monthOptions.map((month) => (
                                        <MenuItem key={month} value={month}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Target Amount"
                                    name="targetAmount"
                                    type="number"
                                    value={formData.targetAmount}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Store KPI Target Bra Penetration"
                                    name="StoreKPITargetBraPenetration"
                                    value={formData.StoreKPITargetBraPenetration}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Store KPI Achievement Bra Penetration"
                                    name="StoreKPIAchievementBraPenetration"
                                    value={formData.StoreKPIAchievementBraPenetration}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Store Target Achievement"
                                    name="StoreTargetAchievement"
                                    value={formData.StoreTargetAchievement}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Typography variant="h6">Role-wise Target Setup</Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleAddRole}
                            >
                                Add
                            </Button>
                        </Box>

                        {roleTargets.map((role, index) => (
                            <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 1 }}>
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <TextField
                                        select
                                        label="Role"
                                        value={role.role}
                                        onChange={(e) => handleRoleChange(index, "role", e.target.value)}
                                        fullWidth
                                    >
                                        {roleOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <TextField
                                        label="Target Amount"
                                        type="number"
                                        value={role.targetAmount}
                                        onChange={(e) =>
                                            handleRoleChange(index, "targetAmount", e.target.value)
                                        }
                                        fullWidth
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 2 }}>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveRole(index)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenForm(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}
export default StoreTarget;