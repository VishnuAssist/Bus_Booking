import { useState } from "react";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/pageHeader";
import CommonTable from "../../Component/CommenTable";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import { StoreTargetFormFields, storeTargetFormValidationSchema } from "../../feilds_validation/storeTargetFieldsValidation";
import { Grid } from "@mui/material";
import CurrentYearTarget from "./CurrentYearTarget";

const StoreTarget = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStoreTarget, setSelectedStoreTarget] = useState<any>(null);

    const StoreTargetColumns = [
        { id: "id", label: "ID" },
        { id: "year", label: "Year" },
        { id: "month", label: "Month" },
        { id: "targetAmount", label: "Target Amount" },
        { id: "role", label: "Role" },
        { id: "roleTarget", label: "Role Target" },
    ];

    const StoreTargetSampleData = [
        {
            id: 1,
            year: "2024",
            month: "January",
            targetAmount: "₹1,50,000",
            role: "Store Manager",
            roleTarget: "₹50,000",
        },
        {
            id: 2,
            year: "2024",
            month: "February",
            targetAmount: "₹1,70,000",
            role: "Sales Executive",
            roleTarget: "₹30,000",
        },
        {
            id: 3,
            year: "2024",
            month: "March",
            targetAmount: "₹1,80,000",
            role: "Assistant Manager",
            roleTarget: "₹40,000",
        },
        {
            id: 4,
            year: "2024",
            month: "April",
            targetAmount: "₹2,00,000",
            role: "Cashier",
            roleTarget: "₹25,000",
        },
        {
            id: 5,
            year: "2024",
            month: "May",
            targetAmount: "₹2,20,000",
            role: "Sales Executive",
            roleTarget: "₹35,000",
        },
        {
            id: 6,
            year: "2025",
            month: "June",
            targetAmount: "₹2,10,000",
            role: "Store Manager",
            roleTarget: "₹55,000",
        },
        {
            id: 7,
            year: "2024",
            month: "July",
            targetAmount: "₹2,30,000",
            role: "Assistant Manager",
            roleTarget: "₹45,000",
        },
        {
            id: 8,
            year: "2024",
            month: "August",
            targetAmount: "₹2,50,000",
            role: "Sales Executive",
            roleTarget: "₹38,000",
        },
        {
            id: 9,
            year: "2024",
            month: "September",
            targetAmount: "₹2,40,000",
            role: "Cashier",
            roleTarget: "₹28,000",
        },
        {
            id: 10,
            year: "2024",
            month: "October",
            targetAmount: "₹2,60,000",
            role: "Store Manager",
            roleTarget: "₹60,000",
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

    return (
        <>
            <PageHeader title="Store Target" onActionClick={() => setModalOpen(true)} />
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
                            actions={{
                                onEdit: (row) => {
                                    setSelectedStoreTarget(row);
                                    setModalOpen(true);
                                },
                                onDelete: (row) => console.log("delete", row),
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
                title={selectedStoreTarget ? "Edit Store" : "Add Store"}
                validationSchema={storeTargetFormValidationSchema}
                fields={storeTargetFields()}
                defaultValues={
                    selectedStoreTarget || {
                        storeName: "",
                        storeCode: "",
                        countryCode: "",
                    }
                }
            />
        </>
    )
}
export default StoreTarget;