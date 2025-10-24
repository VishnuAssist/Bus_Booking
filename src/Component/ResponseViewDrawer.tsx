import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import type { FormFieldProps } from "../model/formFeilds";

interface ResponseViewDrawerProps<T> {
  isOpen: boolean;
  onClose: () => void;
  data: T;
  title?: string;
  formFields?: FormFieldProps<T>[];
}

const ResponseViewDrawer = <T,>({
  isOpen,
  onClose,
  data,
  title,
  formFields,
}: ResponseViewDrawerProps<T>) => {
  const displayTitle = title || "Response";

  const formatFieldName = (fieldName: string): string => {
    return fieldName
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

  const formatValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return "N/A";
    }

    if (Array.isArray(value)) {
      return (
        <Box>
          {value.map((item, index) => (
            <Box key={index}>
              {typeof item === "object" && item !== null ? (
                <Box sx={{ mb: 1 }}>
                  {Object.entries(item).map(([key, val]) => (
                    <Typography key={key} variant="body2" sx={{ ml: 1 }}>
                      {key}: {String(val)}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">{JSON.stringify(item)}</Typography>
              )}
              {index < value.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </Box>
      );
    }

    return String(value);
  };

  const getFieldsToRender = () => {
    if (!data || typeof data !== "object") return [];
    return Object.keys(data);
  };

  const fieldsToRender = getFieldsToRender();

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            maxWidth: "500px",
          },
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {displayTitle}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {data ? (
          <Card sx={{ overflowY: "auto", borderRadius: 0, boxShadow: "none" }}>
            <CardContent sx={{ p: 3 }}>
              {fieldsToRender.length > 0 ? (
                <Grid container spacing={3}>
                  {fieldsToRender.map((field) => {
                    const formField = formFields?.find((f) => f.name === field);
                    const label = formField?.label || formatFieldName(field);
                    const value = data[field as keyof typeof data];

                    return (
                      <Grid size={{ xs: 6, sm: 6 }} key={field}>
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: "text.secondary",
                              mb: 0.5,
                              fontWeight: 400,
                              fontSize: "0.875rem",
                            }}
                          >
                            {label}
                          </Typography>
                          {typeof formatValue(value) === "string" ? (
                            <Typography variant="body1">
                              {formatValue(value)}
                            </Typography>
                          ) : (
                            formatValue(value)
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 4 }}
                >
                  No fields to display
                </Typography>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No Data Available
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Please select an item to view its details.
              </Typography>
            </CardContent>
          </Card>
        )}
      </Drawer>
    </>
  );
};

export default ResponseViewDrawer;
