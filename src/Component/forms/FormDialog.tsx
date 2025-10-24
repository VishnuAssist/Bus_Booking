import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import CommonForm from "./Form";
import * as React from "react";
import * as yup from "yup";

interface CommonDialogProps<T> {
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
}

export function CommonDialog<T>({
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
}: CommonDialogProps<T>) {
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        {open && (
          <CommonForm
            fields={fields}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            validationSchema={validationSchema}
            watchFields={watchFields}
          />
        )}
      </DialogContent>
      <Divider />

      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          size="small"
          variant="outlined"
        >
          Cancel
        </Button>
        {renderSubmitButton ? (
          renderSubmitButton
        ) : (
          <Button
            loading={isLoading}
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
