import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Paper,
  TextField,
  Avatar,
} from "@mui/material";
import { People, Search } from "@mui/icons-material";

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
}

const ShiftLayout: React.FC<ShiftLayoutProps> = ({ 
  employees, 
  selectedEmployee, 
  onEmployeeSelect 
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = searchTerm
    ? employees.filter(
        (e) =>
          e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.employeeCode?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : employees;

  const handleSelect = (employeeId: string | null) => {
    onEmployeeSelect(employeeId);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        height: "calc(100vh - 200px)",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Employees
      </Typography>
      
      <TextField
        fullWidth
        size="small"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
        }}
        sx={{ mb: 2 }}
      />
      
      <Divider sx={{ mb: 2 }} />

      <List>
        <ListItemButton
          selected={selectedEmployee === null}
          onClick={() => handleSelect(null)}
          sx={{
            borderRadius: 2,
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.light,
              },
              '& .MuiListItemIcon-root': {
                color: (theme) => theme.palette.primary.main,
              },
            },
          }}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText 
            primary="All Employees" 
            primaryTypographyProps={{ 
              fontWeight: selectedEmployee === null ? 600 : 400 
            }}
          />
        </ListItemButton>

        {filteredEmployees.map((employee) => (
          <ListItemButton
            key={employee.id}
            selected={selectedEmployee === employee.id}
            onClick={() => handleSelect(employee.id)}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                backgroundColor: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.light,
                },
              },
            }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                mr: 2,
                bgcolor: selectedEmployee === employee.id ? 'primary.main' : 'grey.400'
              }}
            >
              {employee.name?.charAt(0) || employee.userName?.charAt(0)}
            </Avatar>
            <ListItemText 
              primary={employee.name || employee.userName}
              secondary={employee.employeeCode}
              primaryTypographyProps={{ 
                fontWeight: selectedEmployee === employee.id ? 600 : 400,
                fontSize: '0.9rem'
              }}
              secondaryTypographyProps={{ fontSize: '0.75rem' }}
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default ShiftLayout;