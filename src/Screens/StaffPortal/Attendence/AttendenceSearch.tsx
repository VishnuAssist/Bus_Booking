import {
  Box,
  TextField,
  InputLabel,

} from "@mui/material";



import type { QueryParamsType } from "../../../model/common";



interface Props {
  params: QueryParamsType;
  setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const AttendanceSearch = ({ params, setParams }: Props) => {
 

  return (
    <Box margin={2} sx={{ float: "right", display: "flex", gap: 2 }}>
     
      <Box>
        <InputLabel htmlFor="StartDate" className="label-bold">
          Start Date
        </InputLabel>
        <TextField
          size="small"
          type="date"
          fullWidth
          variant="outlined"
          value={params?.StartDate || ""}
          onChange={(e) => {
            setParams({ ...params, StartDate: e.target.value, PageNumber: 1 });
          }}
        />
      </Box>
      <Box>
        <InputLabel htmlFor="EndDate" className="label-bold">
          End Date
        </InputLabel>
        <TextField
          size="small"
          type="date"
          fullWidth
          variant="outlined"
          value={params?.EndDate || ""}
          inputProps={{
            min: params?.StartDate,
          }}
          onChange={(e) => {
            setParams({ ...params, EndDate: e.target.value, PageNumber: 1 });
          }}
        />
      </Box>
  
    </Box>
  );
};

export default AttendanceSearch;