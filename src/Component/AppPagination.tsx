import {
  Box,
  Typography,
  Pagination,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import type { MetaData } from "../model/paginationType";

interface Props {
  readonly metaData?: MetaData;
  readonly onPageChange: (page: number) => void;
}

export default function AppPagination({
  metaData = { totalCount: 0, currentPage: 0, pageSize: 0, totalPages: 0 },
  onPageChange,
}: Props) {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      display="flex"
      justifyContent={isMobile ? "center" : "space-between"}
      alignItems="center"
      p={isMobile ? "0.5rem 0 2rem" : 1.5}
    >
      {!isMobile && (
        <Typography variant="body1" sx={{ fontSize: "small", fontWeight: 300 }}>
          Displaying {(currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
        </Typography>
      )}
      <Pagination
        color="secondary"
        size="small"
        count={totalPages}
        page={currentPage}
        onChange={(_e, page) => onPageChange(page)}
      />
    </Box>
  );
}
