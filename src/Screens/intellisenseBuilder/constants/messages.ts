// Validation and notification messages

export const VALIDATION_MESSAGES = {
  getRuleError: (ruleIndex: number, field: string) =>
    `Rule ${ruleIndex + 1}: ${field} is required`,

  getActionError: (ruleIndex: number, actionIndex: number, field: string) =>
    `Rule ${ruleIndex + 1}, Action ${actionIndex + 1}: ${field} is required`,
} as const;

export const SUCCESS_MESSAGES = {
  WORKFLOW_SAVED: "Workflow saved successfully to API!",
  TEST_API_SUCCESS: "Test API called successfully! Check console for results.",
} as const;

export const ERROR_MESSAGES = {
  TEST_API_FAILED: "Failed to call test API. Check console for details.",
  SAVE_API_FAILED: "Failed to save workflow to API. Please try again.",

  getValidationErrors: (errors: string[]) =>
    `Please fix the following errors before saving:\n\n${errors.join("\n")}`,
} as const;

export const PLACEHOLDER_TEXT = {
  RULE_EXPRESSION:
    "e.g., metrics.TargetAchievement >= 120 AND metrics.AttendancePercentage >= 95",
  ACTION_EXPRESSION: "e.g., sales.Amount * 0.05 or user.Name + ' - Commission'",
} as const;

export const HELPER_TEXT = {
  RULE_EXPRESSION_TIP:
    "Tip: Type table names (metrics, user, sales) and use '.' to see available fields. Press Ctrl+Space for suggestions.",
  ACTION_EXPRESSION_TIP:
    "Define the action formula using tables, fields, operators, and functions",
} as const;
