import { useState } from "react";
import CommonTable from "../../Component/CommenTable";
import CommisionContainer from "../../Component/container";
import { CommonDialog } from "../../Component/forms/FormDialog";
import {
  salesFormValidationSchema,
  SalesFormFields,
} from "../../feilds_validation/salesFieldsValidation";
import PageHeader from "../../Component/commonPageHeader";
import {
  useAddEditSaleMutation,
  useBulkImportSalesMutation,
  useDeleteSaleMutation,
  useGetAllSalesQuery,
} from "../../Api/salesApi";

import type { SalesType } from "../../model/salesType";
import { toast } from "react-toastify";
import { useGetalldictionaryQuery } from "../../Api/dictionaryApi";
import BulkImportDialog from "./salesBulkImport";
import AppPagination from "../../Component/AppPagination";
import { setSalesParams } from "../../Store/slice/ParamsSlice";
import { useAppDispatch, useAppSelector } from "../../Store/StoreConfig";
import { getAxiosParamsA } from "../../Api/util";
import SalesSearch from "./salesSearch";
import { Paper } from "@mui/material";
import ResponseViewDrawer from "../../Component/ResponseViewDrawer";

const Sales = () => {
  const dispatch = useAppDispatch();

  const salesParams = useAppSelector((state) => state.auth.Params.SalesParams);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState<SalesType | null>(null);

  const [isViewDrawerOpen, setViewDrawerOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SalesType | null>(null);
  // API hooks
  //   const { data: salesData } = useGetAllSalesQuery({});

  const { data: salesData } = useGetAllSalesQuery(
    getAxiosParamsA({ ...salesParams, PageSize: 5 })
  );
  console.log("sales", salesData);
  const [addEditSale] = useAddEditSaleMutation();
  const [deleteSale] = useDeleteSaleMutation();

  const { data: salesIdData } = useGetalldictionaryQuery({ category: "2" });
  const { data: departmentsData } = useGetalldictionaryQuery({ category: "3" });
  const { data: brandsData } = useGetalldictionaryQuery({ category: "4" });
  const { data: categoriesData } = useGetalldictionaryQuery({ category: "7" });
  const { data: subcategoriesData } = useGetalldictionaryQuery({
    category: "8",
  });
  const { data: subsubcategoriesData } = useGetalldictionaryQuery({
    category: "9",
  });

  // Extract items from dictionary responses
  const sales = salesIdData?.items || [];
  const departments = departmentsData?.items || [];
  const brands = brandsData?.items || [];
  const categories = categoriesData?.items || [];
  const subcategories = subcategoriesData?.items || [];
  const subsubcategories = subsubcategoriesData?.items || [];

  console.log("category", categories);

  const [isBulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkImportSales] = useBulkImportSalesMutation();

  const handleBulkImport = async (file: File) => {
    await bulkImportSales(file).unwrap();
  };

  const SalesColumns = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "brandCode", label: "Brand ", minWidth: 50 },
    { id: "category", label: "Category ", minWidth: 50 },
    { id: "storeCode", label: "Store Code ", minWidth: 50 },
    { id: "employeeCode", label: "Employee Code ", minWidth: 50 },
    { id: "invoiceNumber", label: "Invoice Number", minWidth: 120 },
    { id: "itemNumber", label: "Item Number", minWidth: 120 },
    { id: "quantity", label: "Quantity", minWidth: 80 },
    { id: "productPrice", label: "Product Price", minWidth: 100 },
    { id: "saleAmount", label: "Sale Amount", minWidth: 100 },
    { id: "tax", label: "Tax", minWidth: 80 },
    { id: "discount", label: "Discount", minWidth: 80 },
  ];

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSales(null);
  };

  const onSubmit = async (formData: any) => {
    try {
      const finalData = {
        ...formData,
        id: selectedSales?.id || null,
      };
      await addEditSale(finalData).unwrap();
      toast.success(
        selectedSales
          ? "Sale updated successfully"
          : "Sale created successfully"
      );
      handleModalClose();
    } catch (error) {
      toast.error("Error saving sale");
      console.error("Sales form error:", error);
    }
  };

  const handleEdit = (row: SalesType) => {
    setSelectedSales(row);
    setModalOpen(true);
  };

  const handleDelete = async (row: SalesType) => {
    await deleteSale(row?.id || 0);
    console.log("row", row);
  };

  const SalesFields = () => {
    const fields = [...SalesFormFields];
    return fields;
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Sales"
          subtitle="Manage your sales"
          btntitle="Add Sales"
          btntitle2="Bulk import"
          onActionClick2={() => setBulkDialogOpen(true)}
          onActionClick={() => setModalOpen(true)}
        />

        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <SalesSearch
            params={salesParams}
            setParams={(p) => dispatch(setSalesParams(p))}
          />
          <CommonTable
            columns={SalesColumns}
            rows={salesData?.items || []}
            actions={{
              onView: (row) => {
                setSelectedSale(row);
                setViewDrawerOpen(true);
              },
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
          {salesData?.metaData && (
            <AppPagination
              metaData={salesData?.metaData}
              onPageChange={(page: number) =>
                dispatch(setSalesParams({ PageNumber: page }))
              }
            />
          )}
        </Paper>
      </CommisionContainer>

      <CommonDialog
        open={isModalOpen}
        onClose={handleModalClose}
        onSubmit={onSubmit}
        title={selectedSales ? "Edit Sales" : "Add Sales"}
        validationSchema={salesFormValidationSchema}
        fields={SalesFields()}
        defaultValues={
          selectedSales || {
            saleTypeId: 0,
            productPrice: 0,
            tax: 0,
            discount: 0,
            quantity: 0,
            saleAmount: 0,
          }
        }
      />

      <BulkImportDialog
        open={isBulkDialogOpen}
        onClose={() => setBulkDialogOpen(false)}
        onUpload={handleBulkImport}
        sales={sales}
        departments={departments}
        brands={brands}
        categories={categories}
        subcategories={subcategories}
        subsubcategories={subsubcategories}
      />

      {selectedSale && (
        <ResponseViewDrawer<SalesType>
          isOpen={isViewDrawerOpen}
          onClose={() => setViewDrawerOpen(false)}
          data={selectedSale}
          title="Sales Details"
          formFields={SalesFormFields}
        />
      )}
    </>
  );
};

export default Sales;

//test
