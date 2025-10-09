import { useState } from "react";
import CommonTable from "../../Component/CommenTable";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import { salesFormValidationSchema, SalesFormFields } from "../../feilds_validation/salesFieldsValidation";
import PageHeader from "../../Component/commonPageHeader";

const Sales = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedSales, setSelectedSales] = useState<any>(null);

    const SalesColumns = [
        { id: "category", label: "Commision Category" },
        { id: "name", label: "Employee Name" },
        { id: "role", label: "Employee Role" },
        { id: "code", label: "Employee Code" },
        { id: "date", label: "Sales Date" },
        { id: "store", label: "Store" },
        { id: "Brand", label: "Brand" },
        { id: "product", label: "Product Name" },
        { id: "productType", label: "Product Type" },
    ];

    const SalesSampleData = [
        {
            category: "Electronics",
            name: "John Doe",
            role: "Sales Executive",
            code: "EMP001",
            date: "2025-09-01",
            store: "Downtown SuperMart",
            Brand: "Samsung",
            product: "Galaxy S23",
            productType: "Smartphone",
        },
        {
            category: "Fashion",
            name: "Jane Smith",
            role: "Store Manager",
            code: "EMP002",
            date: "2025-09-02",
            store: "Sunrise Fashion Hub",
            Brand: "Zara",
            product: "Denim Jacket",
            productType: "Clothing",
        },
        {
            category: "Appliances",
            name: "Michael Lee",
            role: "Sales Associate",
            code: "EMP003",
            date: "2025-09-03",
            store: "Galaxy Appliances",
            Brand: "LG",
            product: "Refrigerator 300L",
            productType: "Home Appliance",
        },
        {
            category: "Books",
            name: "Emily Davis",
            role: "Cashier",
            code: "EMP004",
            date: "2025-09-04",
            store: "Oceanic Bookstore",
            Brand: "Penguin",
            product: "The Alchemist",
            productType: "Novel",
        },
        {
            category: "Furniture",
            name: "Chris Johnson",
            role: "Floor Supervisor",
            code: "EMP005",
            date: "2025-09-05",
            store: "Prime Furniture",
            Brand: "Ikea",
            product: "Office Chair",
            productType: "Furniture",
        },
        {
            category: "Toys",
            name: "Sophia Martinez",
            role: "Sales Executive",
            code: "EMP006",
            date: "2025-09-06",
            store: "Happy Kids Toys",
            Brand: "Lego",
            product: "Lego City Set",
            productType: "Toy",
        },
        {
            category: "Sports",
            name: "Daniel Wilson",
            role: "Sales Associate",
            code: "EMP007",
            date: "2025-09-07",
            store: "City Sports Arena",
            Brand: "Nike",
            product: "Running Shoes",
            productType: "Sportswear",
        },
        {
            category: "Grocery",
            name: "Olivia Brown",
            role: "Cashier",
            code: "EMP008",
            date: "2025-09-08",
            store: "Metro Grocery",
            Brand: "Nestle",
            product: "Cornflakes",
            productType: "Food",
        },
    ];

    const onSubmit = async (formData: any) => {
        console.log("Sales Form Data", formData);
        setModalOpen(false);
        setSelectedSales(null);
    };

    const SalesFields = () => {
        const fields = [...SalesFormFields];
        const categoryFields = fields.find((f) => f.name === "category");
        if (categoryFields) {
            categoryFields.options = [
                { id: "1", name: "Base Commission" },
                { id: "2", name: "Performance Bonus" },
                { id: "3", name: "Tier Multiplier" },
                { id: "4", name: "Cap Limit" },
            ];
        }

        const role = fields.find((f) => f.name === "role");
        if (role) {
            role.options = [
                { id: "1", name: "Staff" },
                { id: "2", name: "Manager" },
                { id: "3", name: "Admin" },
            ];
        }

        const store = fields.find((f) => f.name === "store");
        if (store) {
            store.options = [
                { id: "1", name: "India" },
                { id: "1", name: "Japan" },
                { id: "1", name: "Canada" },
            ]
        }

        const brand = fields.find((f) => f.name === "brand");
        if (brand) {
            brand.options = [
                { id: "1", name: "Samsung" },
                { id: "1", name: "Apple" },
                { id: "1", name: "Nestle" },
            ]
        }

        const product = fields.find((f) => f.name === "product");
        if (product) {
            product.options = [
                { id: "1", name: "Galaxy S23" },
                { id: "1", name: "Rolex Watch" },
                { id: "1", name: "MacBook Pro" },
            ]
        }
        return fields;
    };

    return (
        <>
            <CommisionContainer>
                <PageHeader title="Sales" btntitle="Add Sales" onActionClick={() => setModalOpen(true)} />
                    
                <CommonTable
                    columns={SalesColumns}
                    rows={SalesSampleData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                    actions={{
                        onEdit: (row) => {
                            setSelectedSales(row);
                            setModalOpen(true);
                        },
                        onDelete: (row) => console.log("delete", row),
                    }}
                />
            </CommisionContainer>

            <Footer />

            <CommonDialog
                open={isModalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedSales(null);
                }}
                onSubmit={onSubmit}
                title={selectedSales ? "Edit Sales" : "Add Sales"}
                validationSchema={salesFormValidationSchema}
                fields={SalesFields()}
                defaultValues={
                    selectedSales || {
                        storeName: "",
                        storeCode: "",
                        countryCode: "",
                    }
                }
            />
        </>
    )
};
export default Sales;