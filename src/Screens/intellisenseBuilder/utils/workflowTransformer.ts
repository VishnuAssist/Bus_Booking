// Utility functions for transforming workflow data

import type { WorkflowData, RuleGroup, GeneratedWorkflow } from "../types";

export const generateWorkflowJSON = (
  workflowData: WorkflowData,
  ruleGroups: RuleGroup[]
): GeneratedWorkflow[] => {
  const workflow: GeneratedWorkflow[] = [
    {
      WorkflowName: workflowData.workflowName,
      Description: workflowData.description,
      Rules: ruleGroups.map((rule) => {
        const baseRule = {
          RuleName: rule.ruleName,
          Expression: rule.expression,
          RuleExpressionType: "LambdaExpression",
        };

        // Only include Actions if there are action groups
        if (rule.actionGroups.length > 0) {
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
          rule.actionGroups.forEach((actionGroup) => {
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

  return workflow;
};

export const stringifyWorkflow = (workflow: GeneratedWorkflow[]): string => {
  return JSON.stringify(workflow, null, 2);
};

export const prepareApiData = (workflow: GeneratedWorkflow[]) => {
  return {
    name: workflow[0].WorkflowName,
    description: workflow[0].Description,
    ruleJson: stringifyWorkflow(workflow),
    isActive: true,
  };
};
