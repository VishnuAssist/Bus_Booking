import { useState } from "react";
import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";
import CommonFormDialog from "../../../Component/forms/AssignForm";
import type {
  Policy,
  PolicyData,
  PolicyQueryParamsType,
} from "../../../model/policyType";
import {
  PolicyFormFields,
  policyFormValidationSchema,
} from "../../../feilds_validation/policyFields";
import { useGetallAccountQuery } from "../../../Api/authApi";
import { useGetAllUserGroupsQuery } from "../../../Api/userGroupApi";
import CommonTable from "../../../Component/CommenTable";
import { policyTableDataService } from "./services/policyTableDataService";
import {
  useAddEditLeavePolicyMutation,
  useDeleteLeaveMutation,
  useGetallLeavesPolicyQuery,
} from "../../../Api/LeavePolicyApi";
import AppPagination from "../../../Component/AppPagination";
import { DEFAULT_PAGINATION_OPTIONS } from "../../../Constant/defaultValues";
import PolicyFilter from "./component/policyFilter";

const PolicyView = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);

  const [queryParams, setQueryParams] = useState<PolicyQueryParamsType>({
    ...DEFAULT_PAGINATION_OPTIONS,
    StartDate: undefined,
    EndDate: undefined,
  });

  const handleQueryParamsChange = (newQueryParams: PolicyQueryParamsType) => {
    setQueryParams(newQueryParams);
  };

  const { data: userData } = useGetallAccountQuery({});
  const { data: groupData } = useGetAllUserGroupsQuery({});
  const { data: policyData } = useGetallLeavesPolicyQuery({});
  const [addEditPolicy] = useAddEditLeavePolicyMutation();
  const [deletePolicy] = useDeleteLeaveMutation();

  const policyFields = () => {
    const fields = [...PolicyFormFields];

    const userField = fields.find((f) => f.name === "userIds");
    if (userField && userData) {
      userField.options = userData?.items?.map((user: any) => ({
        id: user.id,
        name: user?.userName,
      }));
    }
    const groupField = fields.find((f) => f.name === "groupIds");
    if (groupField && groupData) {
      groupField.options ==
        groupData?.items?.map((group: any) => ({
          id: group.id,
          name: group?.groupName,
        }));
    }
    return fields;
  };

  const onSubmit = async (formData: PolicyData) => {
    try {
      const finalData = {
        ...formData,
        description: formData.description,
        startDate: formData.startDate,
        maxDays: formData.maxDays,
        endDate: formData.endDate,
      };
      if (Array.isArray(formData.userIds) && formData.userIds.length > 0) {
        delete finalData.groupIds;
      } else if (
        Array.isArray(formData.groupIds) &&
        formData.groupIds.length > 0
      ) {
        delete finalData.userIds;
      }

      await addEditPolicy(finalData).unwrap();

      setModalOpen(false);
      setSelectedPolicy(null);
    } catch (error) {
      console.error("Error creating/updating shift:", error);
    }
  };

  const { columns, rows } = policyTableDataService(policyData?.items || []);

  const handleEdit = (row: PolicyData) => {
    setSelectedPolicy(row);
    setModalOpen(true);
  };
  const handleDelete = async (row: PolicyData) => {
    await deletePolicy(row?.id || 0);
    console.log("row", row);
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Leave Policy"
          btntitle="Add Policy"
          onActionClick={() => setModalOpen(true)}
        />

        <PolicyFilter
          queryParams={queryParams}
          onQueryParamsChange={handleQueryParamsChange}
        />

        <CommonTable<Policy>
          columns={columns}
          rows={rows}
          actions={{
            onView: () => {},
            // onEdit: handleEdit,
            onDelete: handleDelete,
          }}
        />

        {policyData?.metaData && (
          <AppPagination
            metaData={policyData?.metaData}
            onPageChange={(page: number) =>
              setQueryParams({ ...queryParams, PageNumber: page })
            }
          />
        )}
      </CommisionContainer>

      <CommonFormDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPolicy(null);
        }}
        onSubmit={onSubmit}
        title={selectedPolicy ? "Edit Policy" : "Add Policy"}
        validationSchema={policyFormValidationSchema}
        fields={policyFields()}
        defaultValues={selectedPolicy || {}}
        showAssignmentType={true}
        mode={selectedPolicy ? "edit" : "create"}
      />
    </>
  );
};

export default PolicyView;
