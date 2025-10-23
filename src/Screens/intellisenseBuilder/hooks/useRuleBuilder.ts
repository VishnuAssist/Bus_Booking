import { useState, useCallback } from "react";
import type {
  WorkflowData,
  RuleGroup,
  ActionGroup,
  RuleBuilderState,
  UseRuleBuilderActions,
  GeneratedWorkflow,
} from "../types";
import { generateRuleId, generateActionId } from "../utils/idGenerator";
import { generateWorkflowJSON } from "../utils/workflowTransformer";
import { validateWorkflow } from "../utils/validator";

const initialWorkflowData: WorkflowData = {
  workflowName: "",
  description: "",
};

export const useRuleBuilder = (initialState?: Partial<RuleBuilderState>) => {
  const [state, setState] = useState<RuleBuilderState>({
    ...initialState,
    workflowData: initialState?.workflowData || initialWorkflowData,
    ruleGroups: initialState?.ruleGroups || [],
    validationErrors: initialState?.validationErrors || [],
  });

  // Handle workflow data changes
  const updateWorkflowData = (field: keyof WorkflowData, value: string) => {
    setState((prev) => ({
      ...prev,
      workflowData: {
        ...prev.workflowData,
        [field]: value,
      },
    }));
  };

  // Validate all rules using the validator utility
  const validateRules = useCallback((): string[] => {
    const result = validateWorkflow(state.workflowData, state.ruleGroups);
    return result.errors;
  }, [state.workflowData, state.ruleGroups]);

  // Add new rule group
  const addRuleGroup = useCallback(() => {
    const validationErrors = validateRules();

    if (validationErrors.length > 0) {
      setState((prev) => ({
        ...prev,
        validationErrors,
      }));
      return;
    }

    const newRuleGroup: RuleGroup = {
      id: generateRuleId(),
      ruleName: "",
      expression: "",
      actionGroups: [],
    };

    setState((prev) => ({
      ...prev,
      ruleGroups: [...prev.ruleGroups, newRuleGroup],
      validationErrors: [],
    }));
  }, [validateRules]);

  // Update rule group
  const updateRuleGroup = useCallback(
    (ruleId: string, updates: Partial<RuleGroup>) => {
      setState((prev) => ({
        ...prev,
        ruleGroups: prev.ruleGroups.map((rule) =>
          rule.id === ruleId ? { ...rule, ...updates } : rule
        ),
      }));
    },
    []
  );

  // Delete rule group
  const deleteRuleGroup = useCallback((ruleId: string) => {
    setState((prev) => ({
      ...prev,
      ruleGroups: prev.ruleGroups.filter((rule) => rule.id !== ruleId),
    }));
  }, []);

  // Reorder rule groups
  const reorderRuleGroups = (startIndex: number, endIndex: number) => {
    setState((prev) => {
      const newRuleGroups = Array.from(prev.ruleGroups);
      const [removed] = newRuleGroups.splice(startIndex, 1);
      newRuleGroups.splice(endIndex, 0, removed);

      return {
        ...prev,
        ruleGroups: newRuleGroups,
      };
    });
  };

  // Add action group to rule
  const addActionGroup = useCallback((ruleId: string) => {
    setState((prev) => {
      const rule = prev.ruleGroups.find((r) => r.id === ruleId);

      // Check if maximum limit reached (3 action groups)
      if (rule && rule.actionGroups.length >= 3) {
        return prev; // Don't add if limit reached
      }

      const newActionGroup: ActionGroup = {
        id: generateActionId(),
        actionType: "",
        actionName: "",
        expression: "",
      };

      return {
        ...prev,
        ruleGroups: prev.ruleGroups.map((rule) =>
          rule.id === ruleId
            ? {
                ...rule,
                actionGroups: [...rule.actionGroups, newActionGroup],
              }
            : rule
        ),
      };
    });
  }, []);

  // Update action group
  const updateActionGroup = useCallback(
    (ruleId: string, actionId: string, updates: Partial<ActionGroup>) => {
      setState((prev) => ({
        ...prev,
        ruleGroups: prev.ruleGroups.map((rule) => {
          if (rule.id !== ruleId) return rule;

          // Check for duplicate action types when updating actionType
          if (updates.actionType) {
            const existingActionTypes = rule.actionGroups
              .filter((action) => action.id !== actionId)
              .map((action) => action.actionType);

            if (existingActionTypes.includes(updates.actionType)) {
              // Don't update if duplicate action type exists
              return rule;
            }
          }

          return {
            ...rule,
            actionGroups: rule.actionGroups.map((action) =>
              action.id === actionId ? { ...action, ...updates } : action
            ),
          };
        }),
      }));
    },
    []
  );

  // Delete action group
  const deleteActionGroup = useCallback((ruleId: string, actionId: string) => {
    setState((prev) => ({
      ...prev,
      ruleGroups: prev.ruleGroups.map((rule) =>
        rule.id === ruleId
          ? {
              ...rule,
              actionGroups: rule.actionGroups.filter(
                (action) => action.id !== actionId
              ),
            }
          : rule
      ),
    }));
  }, []);

  // Generate workflow JSON using the transformer utility
  const generateWorkflow = (): GeneratedWorkflow[] => {
    return generateWorkflowJSON(state.workflowData, state.ruleGroups);
  };

  // Validate workflow before saving
  const validateWorkflowFn = (): string[] => {
    return validateRules();
  };

  // Initialize with loaded data (for edit mode)
  const initializeWithData = (data: RuleBuilderState) => {
    setState(data);
  };

  const actions: UseRuleBuilderActions = {
    updateWorkflowData,
    addRuleGroup,
    updateRuleGroup,
    deleteRuleGroup,
    reorderRuleGroups,
    addActionGroup,
    updateActionGroup,
    deleteActionGroup,
    generateWorkflow,
    validateWorkflow: validateWorkflowFn,
    initializeWithData,
  };

  return {
    state,
    actions,
  };
};
