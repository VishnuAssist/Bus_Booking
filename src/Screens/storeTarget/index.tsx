import { useState } from "react";
import CommisionContainer from "../../Component/container";
import PageHeader from "../../Component/pageHeader";
import CommonTable from "../../Component/CommenTable";

const StoreTarget = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [_isModalOpen, setModalOpen] = useState(false);
    const [_selectedStoreTarget, setSelectedStoreTarget] = useState<any>(null);

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


    return (
        <>
            <PageHeader title="Store Target" onActionClick={() => setModalOpen(true)} />
            <CommisionContainer>
                <CommonTable
                    columns={StoreColumns}
                    rows={StoreSampleData}
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
            </CommisionContainer>
        </>
    )
}
export default StoreTarget;