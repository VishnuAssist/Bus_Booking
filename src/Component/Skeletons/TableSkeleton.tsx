import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const TableSkeleton = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width={50} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={150} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={150} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={150} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width={100} />
            </TableCell>

            <TableCell align="right">
              <Skeleton variant="text" width={50} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map((index) => (
            <TableRow hover key={index}>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={100} />
              </TableCell>

              <TableCell align="right">
                <Skeleton variant="text" width={50} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
