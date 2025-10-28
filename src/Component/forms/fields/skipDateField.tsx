import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { Box, Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  name: string;
  disabled?: boolean;
}

const SkipDates: React.FC<Props> = ({ name, disabled }) => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Box>
      {fields.map((field, index) => (
        <Box
          key={field.id}
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            mb: 1,
            mt: 1,
          }}
        >
          <Controller
            name={`${name}.${index}.startDate`}
            control={control}
            defaultValue={(field as any).startDate ?? ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                type="date"
                size="small"
                disabled={disabled}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <Controller
            name={`${name}.${index}.endDate`}
            control={control}
            defaultValue={(field as any).endDate ?? ""}
            render={({ field }) => (
              <TextField
                {...field}
                label="End Date"
                type="date"
                size="small"
                disabled={disabled}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
          <IconButton color="error" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="contained"
        onClick={() => append({ startDate: "", endDate: "" })}
      >
        Add Skip Date
      </Button>
    </Box>
  );
};

export default SkipDates;
