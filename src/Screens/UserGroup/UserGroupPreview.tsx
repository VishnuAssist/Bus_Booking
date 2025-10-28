import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import {
  Close,
  People,
  Email,
  Badge,
  VisibilityOff,
} from "@mui/icons-material";
import type { UserGroup } from "../../model/userGroup";

interface Props {
  open: boolean;
  onClose: () => void;
  group: UserGroup | null;
}

const UserGroupPreview: React.FC<Props> = ({ open, onClose, group }) => {
  if (!group) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, minHeight: "60vh" },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Group Preview
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: "background.default",
            borderLeft: 4,
            borderLeftColor: group.isActive ? "success.main" : "error.main",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {group.groupName}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {group.description || "No description provided"}
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center">
                <Chip
                  icon={group.isActive ? <People /> : <VisibilityOff />}
                  label={group.isActive ? "Active" : "Inactive"}
                  color={group.isActive ? "success" : "error"}
                  variant="outlined"
                />
                <Typography variant="body2" color="text.secondary">
                  👤 {group.members?.length || 0} members
                </Typography>
                {group.creatorName && (
                  <Typography variant="body2" color="text.secondary">
                    Created by: {group.creatorName}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 12 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <People sx={{ mr: 1 }} />
              Group Members
            </Typography>

            {group.members && group.members.length > 0 ? (
              <Paper
                variant="outlined"
                sx={{ maxHeight: 300, overflow: "auto" }}
              >
                <List dense>
                  {group.members.map((member, index) => (
                    <React.Fragment key={member.id}>
                      <ListItem>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 2,
                            bgcolor: "primary.main",
                          }}
                        >
                          {member.userName?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2">
                              {member.userName}
                              <Chip
                                label={member.isActive ? "Active" : "Inactive"}
                                color={member.isActive ? "success" : "default"}
                                size="small"
                                sx={{ ml: 1, height: 20 }}
                              />
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <Email fontSize="small" />
                                {member.userEmail}
                              </Typography>
                              {member.employeeCode && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                  }}
                                >
                                  <Badge fontSize="small" />
                                  Employee Code: {member.employeeCode}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < group.members!.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No members in this group
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default UserGroupPreview;
