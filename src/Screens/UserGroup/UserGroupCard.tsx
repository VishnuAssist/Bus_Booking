import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { userGroupType } from "../../model/userGroup";
import { useDeleteUserGroupMutation } from "../../Api/userGroupApi";

interface Props {
  groups: userGroupType[];
  loading: boolean;
  error?: boolean;
}

const UserGroupCard: React.FC<Props> = ({ groups, loading, error }) => {
  const [deleteUserGroup, { isLoading: deleting }] = useDeleteUserGroupMutation();

  
  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    // const confirmDelete = window.confirm("Are you sure you want to delete this group?");
    // if (!confirmDelete) return;

    try {
      await deleteUserGroup(id).unwrap();
      console.log(`Deleted group with id ${id}`);
    } catch (err) {
      console.error("Failed to delete group:", err);
    }
  };

  if (loading) return <Typography>Loading user groups...</Typography>;
  if (error) return <Typography color="error">Failed to load groups.</Typography>;
  if (!groups.length) return <Typography>No user groups found.</Typography>;

  return (
    <Grid container spacing={2} sx={{px:1,}}>
      {groups.map((group) => (
        <Grid size={{xs:12,sm:6,md:4}} key={group.id}>
          <Card
            sx={{
              
              borderRadius: 3,
              boxShadow: "3px 3px solid black",
              position: "relative",
              
              transition: "all 0.2s ease-in-out",
            }}
          >
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" fontWeight="bold">
                  {group.groupName}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Chip
                    label={group.isActive ? "Active" : "Inactive"}
                    color={group.isActive ? "success" : "error"}
                    size="small"
                  />

                  <Tooltip title="Delete Group">
                    <span>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(group.id)}
                        disabled={deleting}
                      >
                        {/* {deleting ? (
                          <CircularProgress size={18} color="error" />
                        ) : ( */}
                          <DeleteIcon fontSize="small" />
                        {/* )} */}
                      </IconButton>
                    </span>
                  </Tooltip>
                </Stack>
              </Stack>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                {group.description || "No description"}
              </Typography>

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="body2">
                  👤 Members: <strong>{group.memberCount}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {group.creatorName ? `By ${group.creatorName}` : "System"}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserGroupCard;
