import { useState } from "react";
import PageHeader from "../../Component/commonPageHeader";
import CommisionContainer from "../../Component/container";
import UserGroupCard from "./UserGroupCard";
import { useGetAllUserGroupsQuery } from "../../Api/userGroupApi";
import UserGroupDialog from "./UserGroupForm";
import AppPagination from "../../Component/AppPagination";
import { useAppDispatch, useAppSelector } from "../../Store/StoreConfig";
import { setUserGroupParams } from "../../Store/slice/ParamsSlice";
import { getAxiosParamsA } from "../../Api/util";
import UserGroupSearch from "./UserGroupSearch";
import { Paper } from "@mui/material";

const Index = () => {
  const dispatch = useAppDispatch();

  const UserGroupParams = useAppSelector(
    (state) => state.auth.Params.UserGroupParams
  );

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  const {
    data: UserGroupData,
    isLoading,
    isError,
  } = useGetAllUserGroupsQuery(
    getAxiosParamsA({ ...UserGroupParams, PageSize: 6 })
  );
  console.table(UserGroupData?.items);
  return (
    <CommisionContainer>
      <PageHeader
        title="User Group"
        btntitle="Create Group"
        onActionClick={handleOpen}
      />
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <UserGroupSearch
          params={UserGroupParams}
          setParams={(p) => dispatch(setUserGroupParams(p))}
        />
        <UserGroupCard
          groups={UserGroupData?.items || []}
          loading={isLoading}
          error={isError}
        />
        {UserGroupData?.metaData && (
          <AppPagination
            metaData={UserGroupData?.metaData}
            onPageChange={(page: number) =>
              dispatch(setUserGroupParams({ PageNumber: page }))
            }
          />
        )}
      </Paper>
      <UserGroupDialog open={openDialog} onClose={handleClose} />
    </CommisionContainer>
  );
};

export default Index;
