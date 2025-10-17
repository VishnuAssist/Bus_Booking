import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import * as React from "react";
import * as yup from "yup";
import CommonForm from "./Form";

interface AssignFormDialogProps<T> {
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

export function AssignFormDialog<T>({
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
}: AssignFormDialogProps<T>) {
  const [mode, setMode] = React.useState<"group" | "employee" | null>(null);

  const handleSelectMode = (selected: "group" | "employee") => setMode(selected);
  const handleBack = () => setMode(null);

  // Filter fields dynamically based on selected mode
  const filteredFields = React.useMemo(() => {
    if (!mode) return [];
    return fields.filter((field) => {
      if (mode === "group") return field.name !== "userIds"; // hide user field
      if (mode === "employee") return field.name !== "groupIds"; // hide group field
      return true;
    });
  }, [mode, fields]);

  return (
    <Dialog open={open} fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle fontSize={14} fontWeight={600}>
        {title}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        {!mode && (
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 12, md: 6 }} >
              <Card
                variant="outlined"
                onClick={() => handleSelectMode("group")}
                sx={{
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" fontWeight="medium" textAlign="center">
                    Assign to Group
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mt={1}
                  >
                    Assign this to an entire group of employees
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} >
              <Card
                variant="outlined"
                onClick={() => handleSelectMode("employee")}
                sx={{
                  height: 180,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 3,
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" fontWeight="medium" textAlign="center">
                    Assign to Employee
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mt={1}
                  >
                    Assign this to specific individual employees
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {mode && (
          <Box sx={{ mt: 2 }}>
            <CommonForm
              fields={filteredFields}
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              validationSchema={validationSchema}
              watchFields={watchFields}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        {mode ? (
          <>
            <Button onClick={handleBack} color="secondary" size="small" variant="outlined">
              Back
            </Button>
            <Button
              disabled={isLoading}
              size="small"
              onClick={() =>
                (document?.getElementById("common-form") as HTMLFormElement)?.requestSubmit()
              }
              color="primary"
              variant="contained"
            >
              {buttonName}
            </Button>
          </>
        ) : (
          <Button onClick={onClose} color="secondary" size="small" variant="outlined">
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
