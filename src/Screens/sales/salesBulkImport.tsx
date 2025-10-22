import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { salesFormValidationSchema } from "../../feilds_validation/salesFieldsValidation";
import type { SalesType } from "../../model/salesType";
import { useBulkImportSalesMutation } from "../../Api/salesApi";
import Papa from "papaparse";

interface BulkImportDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
  sales: any;
  departments: any;
  brands: any;
  categories: any;
  subcategories: any;
  subsubcategories: any;
}

const BulkImportDialog: React.FC<BulkImportDialogProps> = ({
  open,
  onClose,
  onUpload,
  sales,
  departments,
  brands,
  categories,
  subcategories,
  subsubcategories,
}) => {
  const [bulkImportSales] = useBulkImportSalesMutation();
  const [uploadedData, setUploadedData] = useState<SalesType[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<Partial<any>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Debug fieldOptions data
  console.log("fieldOptions data:", {
    sales,
    departments,
    brands,
    categories,
    subcategories,
    subsubcategories,
  });

  // Handle file upload and parse CSV
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setUploadedFile(file);
        Papa.parse(file, {
          complete: (result) => {
            console.log("Parsed CSV data:", result.data);
            const parsedData: SalesType[] = result.data.map((row: any) => ({
              id: parseInt(row.id) || 0,
              departmentId: row.departmentId ? parseInt(row.departmentId) : undefined,
              brandId: row.brandId ? parseInt(row.brandId) : undefined,
              categoryId: row.categoryId ? parseInt(row.categoryId) : undefined,
              subCategoryId: row.subCategoryId ? parseInt(row.subCategoryId) : null,
              subSubCategoryId: row.subSubCategoryId ? parseInt(row.subSubCategoryId) : null,
              saleTypeId: row.saleTypeId ? parseInt(row.saleTypeId) : undefined,
              saleAmount: parseFloat(row.saleAmount) || 0,
              productPrice: parseFloat(row.productPrice) || 0,
              tax: parseFloat(row.tax) || 0,
              discount: parseFloat(row.discount) || 0,
              quantity: parseInt(row.quantity) || 0,
              invoiceNumber: row.invoiceNumber || "",
              itemNumber: row.itemNumber || "",
              notes: row.notes || "",
            }));
            console.log("Mapped parsed data:", parsedData);
            setUploadedData(parsedData);
            toast.success("File uploaded successfully");
          },
          header: true,
          skipEmptyLines: true,
        });
        await onUpload(file);
      } catch (error) {
        toast.error("Error parsing file");
        console.error("File upload error:", error);
      }
    }
  };

  // Handle edit button click
  const handleEdit = (index: number, row: SalesType) => {
    setEditIndex(index);
    setEditRow({
      ...row,
      departmentId: row.departmentId || undefined,
      brandId: row.brandId || undefined,
      categoryId: row.categoryId || undefined,
      subCategoryId: row.subCategoryId || null,
      subSubCategoryId: row.subSubCategoryId || null,
      saleTypeId: row.saleTypeId || undefined,
    });
  };

  // Handle save button for edited row
  const handleSave = async (index: number) => {
    try {
      const validatedData: SalesType = {
        ...editRow,
        departmentId: editRow.departmentId ? parseInt(editRow.departmentId as string) : undefined,
        brandId: editRow.brandId ? parseInt(editRow.brandId as string) : undefined,
        categoryId: editRow.categoryId ? parseInt(editRow.categoryId as string) : undefined,
        subCategoryId: editRow.subCategoryId ? parseInt(editRow.subCategoryId as string) : null,
        subSubCategoryId: editRow.subSubCategoryId ? parseInt(editRow.subSubCategoryId as string) : null,
        saleTypeId: editRow.saleTypeId ? parseInt(editRow.saleTypeId as string) : undefined,
        saleAmount: parseFloat(editRow.saleAmount as string) || 0,
        productPrice: parseFloat(editRow.productPrice as string) || 0,
        tax: parseFloat(editRow.tax as string) || 0,
        discount: parseFloat(editRow.discount as string) || 0,
        quantity: parseInt(editRow.quantity as string) || 0,
      } as SalesType;

      await salesFormValidationSchema.validate(validatedData, { abortEarly: false });
      const updatedData = [...uploadedData];
      updatedData[index] = validatedData;
      setUploadedData(updatedData);
      setEditIndex(null);
      setEditRow({});
      toast.success("Row saved successfully");
    } catch (error) {
      toast.error("Validation failed");
      console.error("Validation error:", error);
    }
  };

  // Handle delete button
  const handleDelete = (index: number) => {
    const updatedData = uploadedData.filter((_, i) => i !== index);
    setUploadedData(updatedData);
    toast.success("Row deleted successfully");
  };

  // Handle input change for editable row
  const handleInputChange = (field: keyof SalesType, value: any) => {
    setEditRow((prev) => ({ ...prev, [field]: value }));
  };

  // Handle submit all rows
  const handleSubmitAll = async () => {
    if (!uploadedFile) {
      toast.error("No file uploaded");
      return;
    }
    try {
      for (const row of uploadedData) {
        await salesFormValidationSchema.validate(
          {
            ...row,
            departmentId: row.departmentId ? parseInt(row.departmentId as any) : undefined,
            brandId: row.brandId ? parseInt(row.brandId as any) : undefined,
            categoryId: row.categoryId ? parseInt(row.categoryId as any) : undefined,
            subCategoryId: row.subCategoryId ? parseInt(row.subCategoryId as any) : null,
            subSubCategoryId: row.subSubCategoryId ? parseInt(row.subSubCategoryId as any) : null,
            saleTypeId: row.saleTypeId ? parseInt(row.saleTypeId as any) : undefined,
          },
          { abortEarly: false }
        );
      }

      await bulkImportSales(uploadedFile).unwrap();
      toast.success("All sales submitted successfully");
      setUploadedData([]);
      setUploadedFile(null);
      onClose();
    } catch (error) {
      toast.error("Error submitting sales");
      console.error("Submit error:", error);
    }
  };

  const columns = [
    { id: "invoiceNumber", label: "Invoice Number" },
    { id: "itemNumber", label: "Item Number" },
    { id: "quantity", label: "Quantity" },
    { id: "productPrice", label: "Product Price" },
    { id: "saleAmount", label: "Sale Amount" },
    { id: "tax", label: "Tax" },
    { id: "discount", label: "Discount" },
    { id: "departmentId", label: "Department" },
    { id: "brandId", label: "Brand" },
    { id: "categoryId", label: "Category" },
    { id: "subCategoryId", label: "Sub Category" },
    { id: "subSubCategoryId", label: "Sub Sub Category" },
    { id: "saleTypeId", label: "Sale Type" },
    { id: "notes", label: "Notes" },
    { id: "actions", label: "Actions" },
  ];

  const fieldOptions: { [key: string]: { id: string | number; name: string }[] } = {
    departmentId: departments,
    brandId: brands,
    categoryId: categories,
    subCategoryId: subcategories,
    subSubCategoryId: subsubcategories,
    saleTypeId: sales,
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>Bulk Import Sales</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileUpload}
            style={{ marginBottom: "16px" }}
          />
        </Box>
        {uploadedData.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadedData.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.id === "actions" ? (
                          editIndex === index ? (
                            <>
                              <IconButton onClick={() => handleSave(index)}>
                                <Save />
                              </IconButton>
                              <IconButton onClick={() => setEditIndex(null)}>
                                <CancelIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton onClick={() => handleEdit(index, row)}>
                                <Edit />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(index)}>
                                <Delete />
                              </IconButton>
                            </>
                          )
                        ) : editIndex === index ? (
                          fieldOptions[column.id] ? (
                            <Select
                              value={editRow[column.id as keyof SalesType] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  column.id as keyof SalesType,
                                  e.target.value
                                )
                              }
                              fullWidth
                            >
                              <MenuItem value="">Select</MenuItem>
                              {fieldOptions[column.id].map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                  {option.name}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <TextField
                              value={editRow[column.id as keyof SalesType] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  column.id as keyof SalesType,
                                  e.target.value
                                )
                              }
                              type={
                                ["quantity", "productPrice", "saleAmount", "tax", "discount"].includes(
                                  column.id
                                )
                                  ? "number"
                                  : "text"
                              }
                              fullWidth
                            />
                          )
                        ) : fieldOptions[column.id] ? (
                          fieldOptions[column.id].find(
                            (opt) => opt.id === row[column.id as keyof SalesType]
                          )?.name || (
                            console.log(`No match for ${column.id} with value ${row[column.id as keyof SalesType]}`),
                            "N/A"
                          )
                        ) : (
                          row[column.id as keyof SalesType] || ""
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmitAll}
          disabled={uploadedData.length === 0 || !uploadedFile}
          variant="contained"
          color="primary"
        >
          Submit All
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BulkImportDialog;