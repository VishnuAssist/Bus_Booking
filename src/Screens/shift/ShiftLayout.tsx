import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  TextField,
  Avatar,
  InputAdornment,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useGetAllUserGroupsQuery } from "../../Api/userGroupApi";

interface Employee {
  id: string;
  name: string;
  userName: string;
  employeeCode: string;
  email: string;
}

interface ShiftLayoutProps {
  employees: Employee[];
  selectedEmployee: string | null;
  onEmployeeSelect: (employeeId: string | null) => void;
  isLoading?: boolean;
}

const ShiftLayout: React.FC<ShiftLayoutProps> = ({
  employees,
  selectedEmployee,
  onEmployeeSelect,
  isLoading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const filteredEmployees = searchTerm
    ? employees.filter(
        (e) =>
          e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : employees;

  const { data: groupData } = useGetAllUserGroupsQuery({});

  const handleSelect = (employeeId: string | null) => {
    onEmployeeSelect(employeeId);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const groups = groupData?.items ?? [];

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 200px)",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ mb: 1, display: "flex", justifyContent: "flex-start" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Employees" />
            <Tab label="Groups" />
          </Tabs>
        </Box>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {tabValue == 0 && (
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%", p: 4 }}
            >
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Loading employees...
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <ListItemButton
                    key={employee.id}
                    selected={selectedEmployee === employee.id}
                    onClick={() => handleSelect(employee.id)}
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 2,
                        bgcolor:
                          selectedEmployee === employee.id
                            ? "primary.main"
                            : "grey.400",
                      }}
                    >
                      {employee.name?.[0]?.toUpperCase() ||
                        employee.userName?.[0]?.toUpperCase() ||
                        "?"}
                    </Avatar>
                    <ListItemText
                      primary={employee.name || employee.userName}
                      secondary={employee.employeeCode}
                      primaryTypographyProps={{
                        fontWeight:
                          selectedEmployee === employee.id ? 600 : 400,
                        fontSize: "0.9rem",
                      }}
                      secondaryTypographyProps={{ fontSize: "0.75rem" }}
                    />
                  </ListItemButton>
                ))
              ) : (
                <Box
                  sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
                >
                  <Typography variant="body2">No employees found.</Typography>
                </Box>
              )}
            </List>
          )}
        </Box>
      )}
      {tabValue == 1 && (
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%", p: 4 }}
            >
              <CircularProgress size={24} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Loading employees...
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {groups.length > 0 ? (
                groups.map((group) => (
                  <ListItemButton
                    key={group.id}
                    selected={selectedGroup === String(group.id)}
                    onClick={() => setSelectedGroup(String(group.id))}
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        mr: 2,
                        bgcolor:
                          selectedGroup === String(group.id ?? "")
                            ? "primary.main"
                            : "grey.400",
                      }}
                    >
                      {group.groupName?.[0]?.toUpperCase() ||
                        group.groupName?.[0]?.toUpperCase() ||
                        "?"}
                    </Avatar>
                    <ListItemText
                      primary={group.groupName || group.groupName}
                      primaryTypographyProps={{
                        fontWeight:
                          selectedGroup === String(group.id ?? "") ? 600 : 400,
                        fontSize: "0.9rem",
                      }}
                      secondaryTypographyProps={{ fontSize: "0.75rem" }}
                    />
                  </ListItemButton>
                ))
              ) : (
                <Box
                  sx={{ p: 3, textAlign: "center", color: "text.secondary" }}
                >
                  <Typography variant="body2">No groups found.</Typography>
                </Box>
              )}
            </List>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ShiftLayout;
