import { useState } from "react";
import CommonTable from "../../Component/CommenTable";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
import { CommonDialog } from "../../Component/forms/FormDialog";
import { StoreFormFields, storeFormValidationSchema } from "../../feilds_validation/storeFieldsValidation";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Component/commonPageHeader";

const Store = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStore, setSelectedStore] = useState<any>(null);

    const navi = useNavigate();

    const StoreColumns = [
        { id: "id", label: "Store ID" },
        { id: "name", label: "Store Name" },
        { id: "code", label: "Store Code" },
        { id: "countryCode", label: "CountryCode" },
    ];

    const StoreSampleData = [
        {
            id: 1,
            name: "Downtown SuperMart",
            code: "STM001",
            countryCode: "United States",
        },
        {
            id: 2,
            name: "Greenfield Electronics",
            code: "STM002",
            countryCode: "India",
        },
        {
            id: 3,
            name: "Sunrise Fashion Hub",
            code: "STM003",
            countryCode: "United Kingdom",
        },
        {
            id: 4,
            name: "Tech World",
            code: "STM004",
            countryCode: "Canada",
        },
        {
            id: 5,
            name: "Metro Grocery",
            code: "STM005",
            countryCode: "Australia",
        },
        {
            id: 6,
            name: "Oceanic Bookstore",
            code: "STM006",
            countryCode: "Singapore",
        },
        {
            id: 7,
            name: "Prime Furniture",
            code: "STM007",
            countryCode: "United Arab Emirates",
        },
        {
            id: 8,
            name: "Happy Kids Toys",
            code: "STM008",
            countryCode: "Germany",
        },
        {
            id: 9,
            name: "City Sports Arena",
            code: "STM009",
            countryCode: "France",
        },
        {
            id: 10,
            name: "Galaxy Appliances",
            code: "STM010",
            countryCode: "Japan",
        },
    ];


    const onSubmit = async (formData: any) => {
        console.log("Store Form Data", formData);
        setModalOpen(false);
        setSelectedStore(null);
    };

    const storeFields = () => {
        const fields = [...StoreFormFields];
        const countryField = fields.find((f) => f.name === "countryCode");
        if (countryField) {
            countryField.options = [
                { id: "1", name: "United States" },
                { id: "2", name: "India" },
                { id: "3", name: "Japan" },
                { id: "4", name: "France" },
                { id: "5", name: "Germany" },
                { id: "6", name: "United Arab Emirates" },
                { id: "7", name: "Singapore" },
                { id: "8", name: "Australia" },
                { id: "9", name: "Canada" },
                { id: "10", name: "United Kingdom" },
            ];
        }
        return fields;
    };

    const handelView = () => {
        navi(`/settings/storeTarget`)
    };

    return (
        <>
            <CommisionContainer>
                <PageHeader title="Store" btntitle="Add Store" onActionClick={() => setModalOpen(true)} />
                <CommonTable
                    columns={StoreColumns}
                    rows={StoreSampleData}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={setPage}
                    onRowsPerPageChange={setRowsPerPage}
                    actions={{
                        onView: handelView,
                        onEdit: (row) => {
                            setSelectedStore(row);
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
                    setSelectedStore(null);
                }}
                onSubmit={onSubmit}
                title={selectedStore ? "Edit Store" : "Add Store"}
                validationSchema={storeFormValidationSchema}
                fields={storeFields()}
                defaultValues={
                    selectedStore || {
                        storeName: "",
                        storeCode: "",
                        countryCode: "",
                    }
                }
            />
        </>
    )
};
export default Store;