import React from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import type { Policy } from "../../../model/policyType";
import dayjs from "dayjs";

interface PolicyPreviewProps {
  policy: Policy;
}

const PolicyPreview: React.FC<PolicyPreviewProps> = ({ policy }) => {
  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        {policy?.name || "Policy Details"}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            General Information
          </Typography>

          <Stack spacing={1}>
            <Typography>
              <strong>ID:</strong> {policy?.id}
            </Typography>
            <Typography>
              <strong>Description:</strong> {policy?.description || "-"}
            </Typography>
            <Typography>
              <strong>Max Days:</strong> {policy?.maxDays ?? "-"}
            </Typography>
            <Typography>
              <strong>Start Date:</strong>{" "}
              {policy?.startDate
                ? dayjs(policy.startDate).format("DD MMM YYYY")
                : "-"}
            </Typography>
            <Typography>
              <strong>End Date:</strong>{" "}
              {policy?.endDate
                ? dayjs(policy.endDate).format("DD MMM YYYY")
                : "-"}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {policy?.users && policy.users.length > 0 && (
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Assigned Employees
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {policy.users.map((user) => (
                <Chip
                  key={user.id}
                  label={user.userName}
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {policy?.groups && policy.groups.length > 0 && (
        <Card variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Assigned Groups
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {policy.groups.map((group) => (
                <Chip
                  key={group.id}
                  label={group.groupName}
                  variant="outlined"
                  color="secondary"
                  size="small"
                />
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {!policy?.users?.length && !policy?.groups?.length && (
        <Typography variant="body2" color="text.secondary">
          No users or groups assigned to this policy.
        </Typography>
      )}
    </Box>
  );
};

export default PolicyPreview;
