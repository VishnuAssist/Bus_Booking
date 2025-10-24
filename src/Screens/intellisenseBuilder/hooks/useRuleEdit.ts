import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetRuleByIdQuery,
  useUpdateRuleMutation,
} from "../../../Api/rulesApi";
import {
  transformApiRuleToBuilderState,
  transformBuilderStateToApiRule,
  isValidRuleForEditing,
} from "../utils/ruleTransformer";
import type {
  RuleBuilderState,
  GeneratedWorkflow,
  RuleGroup,
  ActionGroup,
} from "../types";

export interface EditModeState {
  isEditMode: boolean;
  ruleId: string | number | null;
  originalRuleName: string;
  isLoading: boolean;
  error: string | null;
}

export const useRuleEdit = (ruleId?: string | number) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<EditModeState>({
    isEditMode: false,
    ruleId: null,
    originalRuleName: "",
    isLoading: false,
    error: null,
  });

  const [updateRule, { isLoading: isUpdating }] = useUpdateRuleMutation();

  // Initialize edit mode when ruleId is provided
  useEffect(() => {
    if (ruleId) {
      setEditMode({
        isEditMode: true,
        ruleId,
        originalRuleName: "",
        isLoading: true,
        error: null,
      });
    }
  }, [ruleId]);

  // Get rule data when in edit mode
  const {
    data: ruleData,
    isLoading: isLoadingRule,
    error: ruleError,
  } = useGetRuleByIdQuery(
    { id: editMode.ruleId! },
    { skip: !editMode.isEditMode || !editMode.ruleId }
  );

  // Update loading state when fetching rule data
  useEffect(() => {
    setEditMode((prev) => ({
      ...prev,
      isLoading: isLoadingRule,
      error: ruleError ? "Failed to load rule data" : null,
    }));
  }, [isLoadingRule, ruleError]);

  /**
   * Transform loaded rule data to builder state
   */
  const getTransformedRuleData = (): RuleBuilderState | null => {
    if (!ruleData || !isValidRuleForEditing(ruleData)) {
      setEditMode((prev) => ({
        ...prev,
        error: "Invalid rule data format",
        isLoading: false,
      }));
      return null;
    }

    try {
      const transformedData = transformApiRuleToBuilderState(ruleData);

      setEditMode((prev) => ({
        ...prev,
        originalRuleName: ruleData.name || "",
        isLoading: false,
        error: null,
      }));

      return transformedData;
    } catch (error) {
      setEditMode((prev) => ({
        ...prev,
        error: `Failed to transform rule data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        isLoading: false,
      }));
      return null;
    }
  };

  /**
   * Save edited rule
   */
  const saveEditedRule = useCallback(
    async (workflow: GeneratedWorkflow[]) => {
      if (!editMode.isEditMode || !editMode.ruleId) {
        throw new Error("Not in edit mode or missing rule ID");
      }

      try {
        // Convert GeneratedWorkflow Rules back to RuleGroups
        const ruleGroups: RuleGroup[] =
          workflow[0]?.Rules?.map((rule, index) => {
            const ruleGroup: RuleGroup = {
              id: `rule_${Date.now()}_${index}`,
              ruleName: rule.RuleName || "",
              expression: rule.Expression || "",
              actionGroups: [],
            };

            // Transform all actions if they exist
            if (rule.Actions) {
              // Handle OnSuccess action
              if (rule.Actions.OnSuccess) {
                const actionGroup: ActionGroup = {
                  id: `action_${Date.now()}_${index}_success`,
                  actionType: "onSuccess",
                  actionName: rule.Actions.OnSuccess.Name || "OnSuccess Action",
                  expression: rule.Actions.OnSuccess.Context?.Expression || "",
                };
                ruleGroup.actionGroups.push(actionGroup);
              }

              // Handle OnFailure action
              if (rule.Actions.OnFailure) {
                const actionGroup: ActionGroup = {
                  id: `action_${Date.now()}_${index}_failure`,
                  actionType: "onFailure",
                  actionName: rule.Actions.OnFailure.Name || "OnFailure Action",
                  expression: rule.Actions.OnFailure.Context?.Expression || "",
                };
                ruleGroup.actionGroups.push(actionGroup);
              }

              // Handle OnError action
              if (rule.Actions.OnError) {
                const actionGroup: ActionGroup = {
                  id: `action_${Date.now()}_${index}_error`,
                  actionType: "onError",
                  actionName: rule.Actions.OnError.Name || "OnError Action",
                  expression: rule.Actions.OnError.Context?.Expression || "",
                };
                ruleGroup.actionGroups.push(actionGroup);
              }
            }

            return ruleGroup;
          }) || [];

        // Transform workflow back to API format
        const apiRuleData = transformBuilderStateToApiRule(
          {
            workflowData: {
              workflowName: workflow[0]?.WorkflowName || "",
              description: workflow[0]?.Description || "",
            },
            ruleGroups: ruleGroups,
            validationErrors: [],
          },
          editMode.ruleId
        );

        // Update the rule
        await updateRule({
          id: editMode.ruleId,
          data: apiRuleData,
        }).unwrap();

        // Navigate back to rules list
        navigate("/Admin/rulesList");

        return true;
      } catch (error) {
        console.error("Failed to update rule:", error);
        throw error;
      }
    },
    [editMode.isEditMode, editMode.ruleId, updateRule, navigate]
  );

  /**
   * Cancel edit mode
   */
  const cancelEdit = useCallback(() => {
    setEditMode({
      isEditMode: false,
      ruleId: null,
      originalRuleName: "",
      isLoading: false,
      error: null,
    });
    navigate("/Admin/rulesList");
  }, [navigate]);

  return {
    editMode,
    getTransformedRuleData,
    saveEditedRule,
    cancelEdit,
    isUpdating,
  };
};
