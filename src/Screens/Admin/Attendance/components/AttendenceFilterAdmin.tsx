import { Autocomplete, Box, TextField } from "@mui/material";
import { useState } from "react";
import type { AttendanceQueryParamsType } from "../../../../model/attendanceType";
import { useGetallAccountQuery } from "../../../../Api/authApi";
import { useGetstatusQuery } from "../../../../Api/dictionaryApi";

interface Props {
  queryParams: AttendanceQueryParamsType;
  onQueryParamsChange: (queryParams: AttendanceQueryParamsType) => void;
}

const AttendenceFilterAdmin = ({ queryParams, onQueryParamsChange }: Props) => {
  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  
  const { data: userData } = useGetallAccountQuery({})
  const { data: statues } = useGetstatusQuery({});

  console.log("statues", statues);

  // const searchDebounce = debounce(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     console.log("value", event.target.value);

  //     onQueryParamsChange({
  //       ...queryParams,
  //       SearchTerm: searchTerm,
  //       PageNumber: 1,
  //     });
  //   },
  //   500
  // );

  return (
    <Box margin={2} sx={{ float: "right", display: "flex", gap: 2 }}>
      {/* <Box>
        <TextField
          size="small"
          placeholder="Search..."
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
            searchDebounce(event);
          }}
        />
      </Box> */}
      <Box>
        <Autocomplete
          size="small"
          sx={{ width: 170 }}
          fullWidth
          options={userData?.items || []}
          getOptionLabel={(option: any) => option?.userName}
          value={selectedUser}
          onChange={(_, newValue) => {
            setSelectedUser(newValue);
            onQueryParamsChange({
              ...queryParams,
              UserId: newValue?.id || "",
              PageNumber: 1,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select User" variant="outlined" />
          )}
        />
      </Box>

      <Box>
        <TextField
          size="small"
          type="date"
          fullWidth
          variant="outlined"
          placeholder="Start Date"
          value={queryParams?.StartDate || ""}
          onChange={(e) => {
            onQueryParamsChange({
              ...queryParams,
              StartDate: e.target.value,
              PageNumber: 1,
            });
          }}
        />
      </Box>
      <Box>
        <TextField
          size="small"
          type="date"
          fullWidth
          variant="outlined"
          placeholder="End Date"
          value={queryParams?.EndDate || ""}
          inputProps={{
            min: queryParams?.StartDate,
          }}
          onChange={(e) => {
            onQueryParamsChange({
              ...queryParams,
              EndDate: e.target.value,
              PageNumber: 1,
            });
          }}
        />
      </Box>
      <Box>
        <Autocomplete
          size="small"
          sx={{ width: 170 }}
          fullWidth
          options={statues?.statuses || []}
          getOptionLabel={(option: any) => option?.name}
          value={selectedStatus}
          onChange={(_, newValue) => {
            setSelectedStatus(newValue);
            onQueryParamsChange({
              ...queryParams,
              Status: newValue?.id || "",
              PageNumber: 1,
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Status" variant="outlined" />
          )}
        />
      </Box>
    </Box>
  );
};

export default AttendenceFilterAdmin;
