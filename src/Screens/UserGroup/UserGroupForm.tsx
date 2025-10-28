import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useAddEditUserGroupMutation } from "../../Api/userGroupApi";
import { useGetallAccountQuery } from "../../Api/authApi";
import type { UserType } from "../../model/userType";
import type { UserGroupFormType, userGroupType } from "../../model/userGroup";

const UserGroupDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  group?: userGroupType | null;
}> = ({ open, onClose, group }) => {
  const { handleSubmit, control, reset } = useForm<UserGroupFormType>({
    defaultValues: {
      groupName: "",
      description: "",
      isActive: true,
      memberUserIds: [],
    },
  });

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data: accountsData, isLoading } = useGetallAccountQuery({});

  const [addEditUserGroup, { isLoading: isSubmitting }] =
    useAddEditUserGroupMutation();

  useEffect(() => {
    if (group) {
      const memberIds = group.members?.map((m: any) => m.userId) || [];

      reset({
        id: group.id,
        groupName: group.groupName,
        description: group.description || "",
        isActive: group.isActive,
        memberUserIds: memberIds,
      });

      setSelectedUsers(memberIds);
    } else {
      reset({
        groupName: "",
        description: "",
        isActive: true,
        memberUserIds: [],
      });
      setSelectedUsers([]);
    }
  }, [group, reset]);

  const onSubmit = async (data: UserGroupFormType) => {
    try {
      const payload = {
        ...data,
        memberUserIds: selectedUsers,
      };
      await addEditUserGroup(payload).unwrap();
      console.log("User group created successfully:", payload);
      onClose();
      reset();
    } catch (error) {
      console.error("Error creating user group:", error);
    }
  };

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // const users = accountsData?.items || [];
  const users: UserType[] = accountsData?.items ?? [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {group ? "Edit User Group" : "Create User Group"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Controller
            name="groupName"
            control={control}
            rules={{ required: "Group name is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Group Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label="Active"
              />
            )}
          />

          <Divider sx={{ my: 2 }} />

          {/* Members Section */}
          <Typography variant="h6" gutterBottom>
            Select Members
          </Typography>

          {isLoading ? (
            <Box display="flex" justifyContent="center" my={3}>
              <CircularProgress />
            </Box>
          ) : (
            <List
              dense
              sx={{
                maxHeight: 300,
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            >
              {users &&
                users?.map((user: UserType) => {
                  const checked = selectedUsers.includes(user?.id ?? "");
                  return (
                    <ListItem
                      key={user.id}
                      secondaryAction={
                        <Checkbox
                          edge="end"
                          checked={checked}
                          onChange={() => handleUserToggle(user?.id ?? "")}
                        />
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>{user.firstName?.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={user.email}
                      />
                    </ListItem>
                  );
                })}
            </List>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : group
              ? "Update Group"
              : "Create Group"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserGroupDialog;
