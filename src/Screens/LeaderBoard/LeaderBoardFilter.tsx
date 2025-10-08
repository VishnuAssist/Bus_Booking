import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  //IconButton,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DownloadIcon from "@mui/icons-material/Download";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {
  //FilterList as FilterIcon,
  Search as SearchIcon,
  //Clear as ClearIcon,
} from "@mui/icons-material";

interface FilterState {
  employee: string;
  status: string;
  minAmount: string;
  maxAmount: string;
}

interface LeaderBoardFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

const LeaderBoardFilter: React.FC<LeaderBoardFilterProps> = ({
  onFilterChange,
}) => {
  const [filters, setFilters] = React.useState<FilterState>({
    employee: "",
    status: "all",
    minAmount: "",
    maxAmount: "",
  });

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // const handleClearFilters = () => {
  //   const clearedFilters = {
  //     employee: "",
  //     status: "all",
  //     minAmount: "",
  //     maxAmount: "",
  //   };
  //   setFilters(clearedFilters);
  //   onFilterChange(clearedFilters);
  // };
  const [FilterOpen, setFilterOpen] = useState(false);
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FilterAltIcon style={{ fontSize: 25 }} />
            <Typography fontSize={16} fontWeight={500}>
              {" "}
              Leaderboard Filters
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={FilterOpen ? <FilterAltOffIcon /> : <FilterAltIcon />}
              onClick={() => setFilterOpen((prev) => !prev)}
            >
              {FilterOpen ? "Hide Filter" : "Show Filter"}
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<DownloadIcon />}
            >
              Export
            </Button>
          </Box>
        </Box>
        {FilterOpen && (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                fullWidth
                label="Search Employee"
                value={filters.employee}
                onChange={(e) => handleFilterChange("employee", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
                placeholder="Enter employee name..."
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                fullWidth
                select
                label="Tier"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <MenuItem value="all">All Tiers</MenuItem>
                <MenuItem value="elite">Elite</MenuItem>
                <MenuItem value="senior">Senior</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Min Points"
                value={filters.minAmount}
                onChange={(e) =>
                  handleFilterChange("minAmount", e.target.value)
                }
                placeholder="0"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                fullWidth
                type="number"
                label="Max Points"
                value={filters.maxAmount}
                onChange={(e) =>
                  handleFilterChange("maxAmount", e.target.value)
                }
                placeholder="100000"
              />
            </Grid>

        
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default LeaderBoardFilter;
