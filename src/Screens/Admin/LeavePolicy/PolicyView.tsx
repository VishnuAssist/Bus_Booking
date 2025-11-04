import { useState } from "react";
import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";
import CommonFormDialog from "../../../Component/forms/AssignForm";
import type { Policy, PolicyData } from "../../../model/policyType";
import {
  PolicyFormFields,
  policyFormValidationSchema,
} from "../../../feilds_validation/policyFields";
import { useGetallAccountQuery } from "../../../Api/authApi";
import { useGetAllUserGroupsQuery } from "../../../Api/userGroupApi";
import CommonTable from "../../../Component/CommenTable";
import { policyTableDataService } from "./services/policyTableDataService";


export const dummyPolicies: Policy[] = [
  {
    id: 1,
    name: "Annual Leave Policy",
    description:
      "description.",
    maxDays: 20,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    users: [
      { id: "U1001", userName: "John Doe" },
      { id: "U1002", userName: "Jane Smith" },
    ],
    groups: [
      { id: 1, groupName: "Sales Department" },
      { id: 2, groupName: "Marketing Team" },
    ],
  },
  {
    id: 2,
    name: "Sick Leave Policy",
    description:
      "description.",
    maxDays: 10,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    users: [{ id: "U1003", userName: "Michael Johnson" }],
    groups: [{ id: 3, groupName: "HR Department" }],
  },
  {
    id: 3,
    name: "Maternity Leave Policy",
    description:
      "description.",
    maxDays: 26,
    startDate: "2025-03-01",
    endDate: "2026-02-28",
    users: [
      { id: "U1004", userName: "Sophia Patel" },
      { id: "U1005", userName: "Emily Davis" },
    ],
    groups: [{ id: 4, groupName: "Operations" }],
  },
];

const PolicyView = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any | null>(null);

  const { data: userData } = useGetallAccountQuery({});
  const { data: groupData } = useGetAllUserGroupsQuery({});

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
    console.log("formData", formData);
  };

   const { columns, rows } = policyTableDataService(
      dummyPolicies || []
    );

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Leave Policy"
          btntitle="Add Policy"
          onActionClick={() => setModalOpen(true)}
        />

        <CommonTable<Policy>
                  columns={columns}
                  rows={rows}
                   actions={{
              onView: () => {
               
              },
            }}
                />
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
        // defaultValues={getDefaultValues(selectedPolicy)}
        showAssignmentType={true}
        mode={selectedPolicy ? "edit" : "create"}
      />
    </>
  );
};

export default PolicyView;
