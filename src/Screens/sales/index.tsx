import { useState } from "react";
import CommonTable from "../../Component/CommenTable";
import CommisionContainer from "../../Component/container";
import Footer from "../../Component/Footer";
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

const Sales = () => {
  const dispatch = useAppDispatch();

  const salesParams = useAppSelector((state) => state.auth.Params.SalesParams);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState<SalesType | null>(null);

  // API hooks
  //   const { data: salesData } = useGetAllSalesQuery({});

  const { data: salesData } = useGetAllSalesQuery(
    getAxiosParamsA({ ...salesParams, PageSize: 5 })
  );
  console.log("sales", salesData);
  const [addEditSale] = useAddEditSaleMutation();
  const [deleteSale] = useDeleteSaleMutation();

  const { data: salesIdData } = useGetalldictionaryQuery({ Category: 2 });
  const { data: departmentsData } = useGetalldictionaryQuery({ Category: 3 });
  const { data: brandsData } = useGetalldictionaryQuery({ Category: 4 });
  const { data: categoriesData } = useGetalldictionaryQuery({ Category: 7 });
  const { data: subcategoriesData } = useGetalldictionaryQuery({ Category: 8 });
  const { data: subsubcategoriesData } = useGetalldictionaryQuery({
    Category: 9,
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
    console.log("sales", formData);
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

    // sales field
    const salesField = fields.find((f) => f.name === "saleTypeId");
    if (salesField) {
      salesField.options = sales.map((item) => ({
        id: item?.id?.toString(),
        name: item.name,
      }));
    }
    // Department field
    const departmentField = fields.find((f) => f.name === "departmentId");
    if (departmentField) {
      departmentField.options = departments.map((item) => ({
        id: item?.id?.toString(),
        name: item.name,
      }));
    }

    // Brand field
    const brandField = fields.find((f) => f.name === "brandId");
    if (brandField) {
      brandField.options = brands.map((item) => ({
        id: item?.id?.toString(),
        name: item.name,
      }));
    }

    // Category field
    const categoryField = fields.find((f) => f.name === "categoryId");
    if (categoryField) {
      categoryField.options = categories.map((item) => ({
        id: item?.id?.toString(),
        name: item.name,
      }));
    }

    // Subcategory field
    const subcategoryField = fields.find((f) => f.name === "subCategoryId");
    if (subcategoryField) {
      subcategoryField.options = subcategories.map((item) => ({
        id: item?.id?.toString(),
        name: item.name,
      }));
    }

    // Subsubcategory field
    const subsubcategoryField = fields.find(
      (f) => f.name === "subSubCategoryId"
    );
    if (subsubcategoryField) {
      subsubcategoryField.options = subsubcategories.map((item) => ({
        id: item?.id?.toString(),
        name: item.name,
      }));
    }

    return fields;
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Sales"
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
        defaultValues={selectedSales || {}}
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
    </>
  );
};

export default Sales;

//test
