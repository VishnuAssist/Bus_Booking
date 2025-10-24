import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import * as yup from "yup";
import { useForm, FormProvider, type FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./fields";
import { useEffect, useState } from "react";
import type { FormFieldProps } from "../../Dto/formDto";

interface CommonFormDialogProps<T> {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: any[];
  defaultValues?: T | undefined;
  onSubmit: (data: any) => Promise<void>;
  renderSubmitButton?: React.ReactNode;
  buttonName?: string;
  validationSchema?: yup.ObjectSchema<any>;
  isLoading?: boolean;
  watchFields?: { name: string; callback: (value: any) => void }[];
  showAssignmentType?: boolean;
}

interface CommonFormProps<T> {
  fields?: FormFieldProps<T>[];
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: import("react-hook-form").DefaultValues<T>;
  validationSchema?: yup.ObjectSchema<any>;
  children?: React.ReactNode;
  shouldReset?: boolean;
  watchFields?: { name: string; callback: (val: any) => void }[];
  selectedMode?: "group" | "employee" | null;
}

function CommonForm<T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues,
  validationSchema,
  shouldReset = false,
  children,
  watchFields = [],
  selectedMode,
  mode = "create", // Add mode prop
}: CommonFormProps<T> & { mode?: "create" | "edit" }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm<T>({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });

  const { handleSubmit, reset, watch } = methods;

  useEffect(() => {
    if (
      shouldReset ||
      (defaultValues && Object.keys(defaultValues)?.length > 0)
    ) {
      reset(defaultValues as T);
    }
  }, [defaultValues, shouldReset, reset]);

  useEffect(() => {
    if (watchFields.length > 0) {
      watchFields.forEach((field) => {
        const subscription = watch((value, { name }) => {
          if (name === field.name) {
            field.callback(value[field.name]);
          }
        });
        return () => subscription.unsubscribe();
      });
    }
  }, [watch, watchFields]);

  const handleFormSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFields = React.useMemo(() => {
    if (!fields) return [];

    // In edit mode, show only the assignment field that has data
    if (mode === "edit") {
      return fields.filter((field) => {
        // Always show non-assignment fields
        if (field.name !== "groupIds" && field.name !== "userIds") {
          return true;
        }

        // Show groupIds field only if it has data
        if (field.name === "groupIds") {
          const hasGroupData =
            Array.isArray((defaultValues as any)?.groupIds) &&
            (defaultValues as any)?.groupIds?.length > 0;
          return hasGroupData;
        }

        // Show userIds field only if it has data
        if (field.name === "userIds") {
          const hasUserData =
            Array.isArray((defaultValues as any)?.userIds) &&
            (defaultValues as any)?.userIds?.length > 0;
          return hasUserData;
        }

        return false;
      });
    }

    // In create mode, filter based on selected mode
    return fields.filter((field) => {
      if (field.name !== "groupIds" && field.name !== "userIds") {
        return true;
      }

      if (field.name === "groupIds" && selectedMode === "group") {
        return true;
      }

      if (field.name === "userIds" && selectedMode === "employee") {
        return true;
      }

      return false;
    });
  }, [fields, selectedMode, mode, defaultValues]);

  return (
    <FormProvider {...methods}>
      <form id="common-form" onSubmit={handleSubmit(handleFormSubmit)}>
        {children || (
          <Grid container spacing={2}>
            {filteredFields?.map(
              (field) =>
                !field.hide && (
                  <Grid
                    size={{
                      xs: field?.size?.sm || 12,
                      sm: field?.size?.md || 6,
                      md: field?.size?.lg || 4,
                    }}
                    key={field.name}
                  >
                    <FormField
                      {...field}
                      disabled={field.disabled ?? isSubmitting}
                    />
                  </Grid>
                )
            )}
          </Grid>
        )}
      </form>
    </FormProvider>
  );
}

export function CommonFormDialog<T>({
  open,
  onClose,
  title,
  fields,
  onSubmit,
  defaultValues,
  renderSubmitButton,
  buttonName = "Submit",
  validationSchema,
  isLoading,
  watchFields = [],
  showAssignmentType = false,
  mode = "create",
}: CommonFormDialogProps<T> & { mode?: "create" | "edit" }) {
  const [selectedMode, setSelectedMode] = React.useState<
    "group" | "employee" | null
  >(null);

  // Check which assignment type has data
  const hasGroupData = React.useMemo(
    () =>
      Array.isArray((defaultValues as any)?.groupIds) &&
      (defaultValues as any)?.groupIds?.length > 0,
    [defaultValues]
  );

  const hasUserData = React.useMemo(
    () =>
      Array.isArray((defaultValues as any)?.userIds) &&
      (defaultValues as any)?.userIds?.length > 0,
    [defaultValues]
  );

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      if (hasGroupData) setSelectedMode("group");
      else if (hasUserData) setSelectedMode("employee");
    }
  }, [mode, defaultValues, hasGroupData, hasUserData]);

  useEffect(() => {
    if (!open) {
      setSelectedMode(null);
    }
  }, [open]);

  const handleSelectMode = (selected: "group" | "employee") => {
    setSelectedMode(selected);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle fontSize={14} fontWeight={600}>
        {title}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        {showAssignmentType && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 2 }}>
              {mode === "edit" ? "Assigned to:" : "Assign to:"}
            </Typography>
            <Grid container spacing={2}>
              {/* Show Group card in create mode OR in edit mode if it has data */}
              {(mode === "create" || (mode === "edit" && hasGroupData)) && (
                <Grid size={{ xs: hasUserData && mode === "edit" ? 12 : 6 }}>
                  <Card
                    variant={
                      selectedMode === "group" ? "elevation" : "outlined"
                    }
                    elevation={selectedMode === "group" ? 2 : 0}
                    onClick={() =>
                      mode === "create" && handleSelectMode("group")
                    }
                    sx={{
                      cursor: mode === "edit" ? "not-allowed" : "pointer",
                      opacity: mode === "edit" ? 0.6 : 1,
                      transition: "all 0.2s ease",
                      border:
                        mode === "edit" && hasGroupData
                          ? "2px solid"
                          : "1px solid",
                      borderColor:
                        mode === "edit" && hasGroupData
                          ? "primary.main"
                          : "divider",
                    }}
                  >
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <GroupsIcon
                          color={
                            selectedMode === "group" ? "primary" : "action"
                          }
                          sx={{ fontSize: 20 }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color={
                            selectedMode === "group"
                              ? "primary.main"
                              : "text.primary"
                          }
                        >
                          Group
                        </Typography>
                        {mode === "edit" && hasGroupData && (
                          <Chip label="Current" size="small" color="primary" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {(mode === "create" || (mode === "edit" && hasUserData)) && (
                <Grid size={{ xs: hasGroupData && mode === "edit" ? 12 : 6 }}>
                  <Card
                    variant={
                      selectedMode === "employee" ? "elevation" : "outlined"
                    }
                    elevation={selectedMode === "employee" ? 2 : 0}
                    onClick={() =>
                      mode === "create" && handleSelectMode("employee")
                    }
                    sx={{
                      cursor: mode === "edit" ? "not-allowed" : "pointer",
                      opacity: mode === "edit" ? 0.6 : 1,
                      transition: "all 0.2s ease",
                      border:
                        mode === "edit" && hasUserData
                          ? "2px solid"
                          : "1px solid",
                      borderColor:
                        mode === "edit" && hasUserData
                          ? "primary.main"
                          : "divider",
                    }}
                  >
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PersonIcon
                          color={
                            selectedMode === "employee" ? "primary" : "action"
                          }
                          sx={{ fontSize: 20 }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          color={
                            selectedMode === "employee"
                              ? "primary.main"
                              : "text.primary"
                          }
                        >
                          Employee
                        </Typography>
                        {mode === "edit" && hasUserData && (
                          <Chip label="Current" size="small" color="primary" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        <CommonForm
          fields={fields}
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          validationSchema={validationSchema}
          watchFields={watchFields}
          selectedMode={selectedMode}
          mode={mode}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          size="small"
          variant="outlined"
        >
          Cancel
        </Button>
        {renderSubmitButton || (
          <Button
            disabled={
              isLoading ||
              (showAssignmentType && mode === "create" && !selectedMode)
            }
            size="small"
            onClick={() =>
              (
                document?.getElementById("common-form") as HTMLFormElement
              )?.requestSubmit()
            }
            color="primary"
            variant="contained"
          >
            {buttonName}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CommonFormDialog;
