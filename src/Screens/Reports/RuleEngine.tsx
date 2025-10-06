import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Switch,
  FormControlLabel,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Divider,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ContentCopy,
  CheckCircle,
  WarningAmber,
  AccessTime,
} from "@mui/icons-material";


interface Rule {
  id: string;
  name: string;
  country: string;
  type: "commission" | "bonus" | "penalty";
  status: "active" | "inactive" | "pending";
  description: string;
  conditions: string;
  lastModified: string;
}

const mockRules: Rule[] = [
  {
    id: "1",
    name: "Singapore Base Commission",
    country: "SG",
    type: "commission",
    status: "active",
    description: "Base commission rate for Singapore sales staff",
    conditions:
      "Sales >= $5000: 8% | Sales >= $10000: 10% | Sales >= $20000: 12%",
    lastModified: "2024-01-15",
  },
  {
    id: "2",
    name: "Thailand Performance Bonus",
    country: "TH",
    type: "bonus",
    status: "active",
    description: "Monthly performance bonus for exceeding targets",
    conditions:
      "Target achievement >= 110%: $500 | >= 120%: $1000 | >= 130%: $1500",
    lastModified: "2024-01-12",
  },
  {
    id: "3",
    name: "Malaysia Team Incentive",
    country: "MY",
    type: "bonus",
    status: "pending",
    description: "Team-based incentive for collaborative sales",
    conditions:
      "Team target >= 105%: 2% bonus split | >= 115%: 3% bonus split",
    lastModified: "2024-01-10",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <CheckCircle color="success" fontSize="small" />;
    case "inactive":
      return <WarningAmber color="warning" fontSize="small" />;
    case "pending":
      return <AccessTime color="action" fontSize="small" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "success";
    case "inactive":
      return "warning";
    case "pending":
      return "default";
    default:
      return "default";
  }
};

const countries = [
  { code: "SG", name: "Singapore" },
  { code: "TH", name: "Thailand" },
  { code: "MY", name: "Malaysia" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
];

export const RuleEngine: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<Partial<Rule>>({
    name: "",
    country: "",
    type: "commission",
    status: "inactive",
    description: "",
    conditions: "",
  });

  const handleCreate = () => setIsCreating(true);
  const handleCancel = () => setIsCreating(false);

  const handleChange = (field: keyof Rule, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.country) return;

    const newRule: Rule = {
      ...(form as Rule),
      id: any,
      lastModified: new Date().toISOString().split("T")[0],
    };
    setRules([...rules, newRule]);
    setIsCreating(false);
    setForm({
      name: "",
      country: "",
      type: "commission",
      status: "inactive",
      description: "",
      conditions: "",
    });
  };

  const handleDelete = (id: string) =>
    setRules((prev) => prev.filter((r) => r.id !== id));

  const handleDuplicate = (id: string) => {
    const rule = rules.find((r) => r.id === id);
    if (rule) {
      const copy = {
        ...rule,
        id: uuidv4(),
        name: `${rule.name} (Copy)`,
        status: "inactive",
      };
      setRules([...rules, copy]);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Commission Rules
          </Typography>
          <Typography color="text.secondary">
            Manage commission calculation rules and policies
          </Typography>
        </Box>
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={handleCreate}
        >
          Create Rule
        </Button>
      </Box>

      {isCreating && (
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Create New Commission Rule" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={{xs:12,sm:6}}>
                <TextField
                  label="Rule Name"
                  fullWidth
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Grid>
              <Grid size={{xs:12,sm:6}}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={form.country || ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                    label="Country"
                  >
                    {countries.map((c) => (
                      <MenuItem key={c.code} value={c.code}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{xs:12,sm:6}}>
                <FormControl fullWidth>
                  <InputLabel>Rule Type</InputLabel>
                  <Select
                    value={form.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    label="Rule Type"
                  >
                    <MenuItem value="commission">Commission</MenuItem>
                    <MenuItem value="bonus">Bonus</MenuItem>
                    <MenuItem value="penalty">Penalty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{xs:12,sm:6}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.status === "active"}
                      onChange={(e) =>
                        handleChange("status", e.target.checked ? "active" : "inactive")
                      }
                    />
                  }
                  label="Active"
                />
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  label="Description"
                  multiline
                  rows={2}
                  fullWidth
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Grid>
              <Grid size={{xs:12}}>
                <TextField
                  label="Conditions"
                  multiline
                  rows={3}
                  fullWidth
                  value={form.conditions}
                  onChange={(e) => handleChange("conditions", e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save Rule
            </Button>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      )}

      <Grid container spacing={2}>
        {rules.map((rule) => (
          <Grid size={{xs:12,md:12,lg:12}} key={rule.id}>
            <Card
              variant="outlined"
              sx={{
                transition: "all 0.2s",
                "&:hover": { transform: "scale(1.02)", boxShadow: 3 },
              }}
            >
              <CardHeader
                title={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {rule.name}
                    </Typography>
                    <Chip size="small" label={rule.country} variant="outlined" />
                  </Stack>
                }
                action={
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Duplicate">
                      <IconButton onClick={() => handleDuplicate(rule.id)}>
                        <ContentCopy fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(rule.id)}>
                        <Delete fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                }
              />
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip
                      size="small"
                      label={rule.type}
                      color="primary"
                      variant="outlined"
                    />     <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: "auto",}}
                    >
                      Last modified: {rule.lastModified}
                    </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                    <Chip
                      size="small"
                      label={rule.status}
                      color={getStatusColor(rule.status)}
                      icon={getStatusIcon(rule.status)}
                    />
               
                  </Stack>
                  <Typography color="text.secondary" fontSize={13}>
                    {rule.description}
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      backgroundColor: "action.hover",
                      borderRadius: 1,
                      p: 1.5,
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontFamily="monospace"
                      whiteSpace="pre-wrap"
                    >
                      {rule.conditions}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
