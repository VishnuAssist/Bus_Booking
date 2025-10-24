// Data transformation utilities for rule editing

import type { RuleType } from "../../../Api/rulesApi";
import type {
  RuleBuilderState,
  WorkflowData,
  RuleGroup,
  ActionGroup,
  GeneratedWorkflow,
} from "../types";

/**
 * Transform API rule data to internal RuleBuilderState format
 */
export const transformApiRuleToBuilderState = (
  apiRule: RuleType
): RuleBuilderState => {
  try {
    // Parse the ruleJson string
    const workflowData: GeneratedWorkflow[] = apiRule.ruleJson
      ? JSON.parse(apiRule.ruleJson)
      : [];

    if (workflowData.length === 0) {
      // Return empty state if no workflow data
      return {
        workflowData: {
          workflowName: apiRule.name || "",
          description: apiRule.description || "",
        },
        ruleGroups: [],
        validationErrors: [],
      };
    }

    const firstWorkflow = workflowData[0];

    // Transform workflow data
    const workflowDataTransformed: WorkflowData = {
      workflowName: firstWorkflow.WorkflowName || apiRule.name || "",
      description: firstWorkflow.Description || apiRule.description || "",
    };

    // Transform rules
    const ruleGroups: RuleGroup[] =
      firstWorkflow.Rules?.map((rule, index) => {
        const ruleGroup: RuleGroup = {
          id: `rule_${Date.now()}_${index}`, // Generate new ID for editing
          ruleName: rule.RuleName || "",
          expression: rule.Expression || "",
          actionGroups: [],
        };

        // Transform actions if they exist
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

    return {
      workflowData: workflowDataTransformed,
      ruleGroups,
      validationErrors: [],
    };
  } catch (error) {
    // Return fallback state
    return {
      workflowData: {
        workflowName: apiRule.name || "",
        description: apiRule.description || "",
      },
      ruleGroups: [],
      validationErrors: [
        "Failed to parse rule data. Please check the rule format.",
      ],
    };
  }
};

/**
 * Transform internal RuleBuilderState back to API format
 */
export const transformBuilderStateToApiRule = (
  builderState: RuleBuilderState,
  originalRuleId?: string | number
): Partial<RuleType> => {
  try {
    // Generate workflow data
    const workflow: GeneratedWorkflow[] = [
      {
        WorkflowName: builderState.workflowData.workflowName,
        Description: builderState.workflowData.description,
        Rules: builderState.ruleGroups.map((ruleGroup) => {
          const baseRule = {
            RuleName: ruleGroup.ruleName,
            Expression: ruleGroup.expression,
          };

          // Add actions if they exist
          if (ruleGroup.actionGroups.length > 0) {
            const actions: {
              OnSuccess?: {
                Name: string;
                Context: { Expression: string };
              };
              OnFailure?: {
                Name: string;
                Context: { Expression: string };
              };
              OnError?: {
                Name: string;
                Context: { Expression: string };
              };
            } = {};

            // Process all action groups and group them by action type
            ruleGroup.actionGroups.forEach((actionGroup) => {
              if (actionGroup.actionType && actionGroup.expression) {
                const actionType = actionGroup.actionType;
                const actionName = actionGroup.actionName || actionType;

                // Map action types to the correct structure
                switch (actionType) {
                  case "onSuccess":
                    actions.OnSuccess = {
                      Name: actionName,
                      Context: {
                        Expression: actionGroup.expression,
                      },
                    };
                    break;
                  case "onFailure":
                    actions.OnFailure = {
                      Name: actionName,
                      Context: {
                        Expression: actionGroup.expression,
                      },
                    };
                    break;
                  case "onError":
                    actions.OnError = {
                      Name: actionName,
                      Context: {
                        Expression: actionGroup.expression,
                      },
                    };
                    break;
                  default:
                    // For any other action type, default to OnSuccess
                    actions.OnSuccess = {
                      Name: actionName,
                      Context: {
                        Expression: actionGroup.expression,
                      },
                    };
                }
              }
            });

            return {
              ...baseRule,
              Actions: actions,
            };
          }

          return baseRule;
        }),
      },
    ];

    return {
      id: originalRuleId,
      name: builderState.workflowData.workflowName,
      description: builderState.workflowData.description,
      ruleJson: JSON.stringify(workflow),
      isActive: true, // Default to active when updating
    };
  } catch (error) {
    throw new Error("Failed to transform rule data for API");
  }
};

/**
 * Check if a rule has valid data for editing
 */
export const isValidRuleForEditing = (apiRule: RuleType): boolean => {
  try {
    if (!apiRule.ruleJson) return false;

    const workflowData: GeneratedWorkflow[] = JSON.parse(apiRule.ruleJson);
    return Array.isArray(workflowData) && workflowData.length > 0;
  } catch {
    return false;
  }
};
