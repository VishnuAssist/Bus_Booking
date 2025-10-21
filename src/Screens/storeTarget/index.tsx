import { useState } from "react";
import CommisionContainer from "../../Component/container";
import CommonTable from "../../Component/CommenTable";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent } from "@mui/material";

import PageHeader from "../../Component/commonPageHeader";
import { StoreTargetFormFields, storeTargetFormValidationSchema } from "../../feilds_validation/storeTargetFieldsValidation";

const StoreTarget = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStoreTarget, setSelectedStoreTarget] = useState<any>(null);
    const [Generate, setGenerate] = useState(false);
    const [selectedRule, setSelectedRule] = useState("");

    const StoreTargetColumns = [
        { id: "id", label: "ID" },
        { id: "year", label: "Year" },
        { id: "month", label: "Month" },
        { id: "targetAmount", label: "Target Amount" },
        { id: "storeKPITraget", label: "StoreKPITarget" },
        { id: "storeKPIAchievement", label: "StoreKPIAchievement" },
        { id: "targetAchievement", label: "StoreTargetAchievement" },
        { id: "status", label: "Status" },
    ];

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

    const onSubmit = async (formData: any) => {
        console.log("Store Form Data", formData);
        setModalOpen(false);
        setSelectedStoreTarget(null);
    };

    const storeTargetFields = () => {
        const fields = [...StoreTargetFormFields];
        const roleField = fields.find((f) => f.name === "role");
        if (roleField) {
            roleField.options = [
                { id: "1", name: "Store Manger" },
                { id: "2", name: "Sales Executive" },
                { id: "3", name: "Assistant Manager" },
                { id: "4", name: "Cashier" },
            ];
        }
        return fields;
    };

    const handelGenrateView = () => {
        setGenerate(true);
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectedRule(event.target.value);
    };

    return (
        <>
            <CommisionContainer>
                <PageHeader title="Store Target" btntitle="Add Store Target" onActionClick={() => setModalOpen(true)} />
                <Grid container spacing={2}>
                
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
                            custombutton={{
                                onAction: handelGenrateView
                            }}
                        />
                    </Grid>
                </Grid>
            </CommisionContainer>

            <Footer />

            <CommonDialog
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
            />

            <Dialog open={Generate} fullWidth maxWidth="sm">
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" fontWeight={600}>Select Rule</Typography>
                    <Button color="error" onClick={() => setGenerate(false)} >close</Button>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ my: 1 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="rule-select-label">Select Rules</InputLabel>
                            <Select
                                labelId="rule-select-label"
                                value={selectedRule}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="rule1">Rule 1 - Basic Rule</MenuItem>
                                <MenuItem value="rule2">Rule 2 - Advanced Rule</MenuItem>
                                <MenuItem value="rule3">Rule 3 - Custom Rule</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ textAlign: "end" }}>
                        <Button variant="contained" color="success" size="small">Select</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default StoreTarget;