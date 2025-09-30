import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TableSkeleton from "../Skeletons/TableSkeleton";

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  headers: { header: string; style?: any }[];
  data: any[];
}

const TableIndex = ({
  isLoading = false,
  isError = false,
  headers,
  data,
}: Props) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <Box>Error</Box>;
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers?.map((header, index) => (
              <TableCell key={index} sx={{ ...header?.style }}>
                {header?.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{data?.map((row) => row)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableIndex;
