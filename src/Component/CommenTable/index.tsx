import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Stack,
  ButtonGroup,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface Actions<T> {
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onConform?: (row: T) => void;
  onReject?: (row: T) => void;
  onAction?: (row: T) => void;
}

interface CommonTableProps<T> {
  columns: Column[];
  rows: T[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  actions?: Actions<T>;
  approval?: Actions<T>;
  custombutton?: Actions<T>;
}

function CommonTable<T>({
  columns,
  rows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  actions,
  approval,
  custombutton,
}: CommonTableProps<T>) {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(+event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {approval && <TableCell align="center">Approval</TableCell>}
              {actions && <TableCell align="center">Actions</TableCell>}
              {custombutton && <TableCell align="center">Generate</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = (row as any)[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  {approval && (
                    <TableCell align="center">
                      <ButtonGroup variant="contained">
                        <IconButton onClick={() => approval.onConform!(row)}>
                          <CheckIcon color="success" />
                        </IconButton>
                        <IconButton onClick={() => approval.onReject!(row)}>
                          <ClearIcon color="error" />
                        </IconButton>
                      </ButtonGroup>
                    </TableCell>
                  )}
                  {custombutton && (
                    <TableCell align="center">
                      <Button color="primary" size="small" onClick={() => custombutton.onAction!(row)}>
                        Generate
                      </Button>
                    </TableCell>
                  )}
                  {actions && (
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        {actions.onView && (
                          <IconButton onClick={() => actions.onView!(row)}>
                            <VisibilityIcon color="primary" />
                          </IconButton>
                        )}
                        {actions.onEdit && (
                          <IconButton onClick={() => actions.onEdit!(row)}>
                            <EditIcon color="secondary" />
                          </IconButton>
                        )}
                        {actions.onDelete && (
                          <IconButton onClick={() => actions.onDelete!(row)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        )}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default CommonTable;
