import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormHelperText,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  DragIndicator as DragIndicatorIcon,
} from "@mui/icons-material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ActionGroupComponent from "./ActionGroupComponent";
import RuleExpressionEditor from "./RuleExpressionEditor";
import type { RuleGroup, ActionGroup } from "../types";
import { IconActionButton } from "../ui";
import {
  PLACEHOLDER_TEXT,
  HELPER_TEXT,
  VALIDATION_MESSAGES,
} from "../constants";

interface RuleGroupComponentProps {
  ruleGroup: RuleGroup;
  onUpdate: (ruleId: string, updates: Partial<RuleGroup>) => void;
  onDelete: (ruleId: string) => void;
  onAddActionGroup: (ruleId: string) => void;
  onUpdateActionGroup: (
    ruleId: string,
    actionId: string,
    updates: Partial<ActionGroup>
  ) => void;
  onDeleteActionGroup: (ruleId: string, actionId: string) => void;
}

const RuleGroupComponent: React.FC<RuleGroupComponentProps> = ({
  ruleGroup,
  onUpdate,
  onDelete,
  onAddActionGroup,
  onUpdateActionGroup,
  onDeleteActionGroup,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ruleGroup.id });

  // Error detection logic
  const hasRuleErrors =
    !ruleGroup.ruleName.trim() || !ruleGroup.expression.trim();

  const hasActionErrors = ruleGroup.actionGroups.some((action) => {
    const isDuplicate = ruleGroup.actionGroups
      .filter((ag) => ag.id !== action.id)
      .some((ag) => ag.actionType === action.actionType);

    return (
      !action.actionType?.trim() || !action.expression?.trim() || isDuplicate
    );
  });

  const hasLimitError = ruleGroup.actionGroups.length > 3;
  const hasAnyErrors = hasRuleErrors || hasActionErrors || hasLimitError;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: hasAnyErrors ? "2px solid #f44336" : "1px solid grey",
    boxShadow: hasAnyErrors
      ? "0px 9px 16px rgba(244, 67, 54, 0.2), 0px 2px 2px rgba(244, 67, 54, 0.3)"
      : "0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
  };

  return (
    <Accordion defaultExpanded ref={setNodeRef} style={style}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}
        >
          <IconActionButton
            tooltip="Drag to reorder"
            icon={<DragIndicatorIcon fontSize="small" />}
            variant="drag"
            {...attributes}
            {...listeners}
          />
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              placeholder={PLACEHOLDER_TEXT.RULE_NAME}
              value={ruleGroup.ruleName}
              onChange={(e) =>
                onUpdate(ruleGroup.id, {
                  ruleName: e.target.value,
                })
              }
              size="small"
              fullWidth
              required
              error={!ruleGroup.ruleName.trim()}
              helperText={
                !ruleGroup.ruleName.trim()
                  ? VALIDATION_MESSAGES.RULE_NAME_REQUIRED
                  : ""
              }
              onClick={(e) => e.stopPropagation()}
            />
          </Box>
          <IconActionButton
            tooltip="Delete Rule"
            icon={<DeleteIcon fontSize="small" />}
            variant="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ruleGroup.id);
            }}
          />
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        {/* Rule Expression */}
        <Box sx={{ mb: 3 }}>
          <RuleExpressionEditor
            value={ruleGroup.expression}
            onChange={(value) => onUpdate(ruleGroup.id, { expression: value })}
            label="Rule Expression (Condition)"
            placeholder={PLACEHOLDER_TEXT.RULE_EXPRESSION}
            height="100px"
            required={true}
            hasError={!ruleGroup.expression.trim()}
          />
          {!ruleGroup.expression.trim() && (
            <FormHelperText error sx={{ mt: 0.5 }}>
              {VALIDATION_MESSAGES.RULE_EXPRESSION_REQUIRED}
            </FormHelperText>
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block" }}
          >
            {HELPER_TEXT.RULE_EXPRESSION_TIP}
          </Typography>
        </Box>

        {/* Action Groups */}
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle2">Action Groups:</Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => onAddActionGroup(ruleGroup.id)}
              size="small"
              disabled={ruleGroup.actionGroups.length >= 3}
              title={
                ruleGroup.actionGroups.length >= 3
                  ? "Maximum 3 action groups allowed (OnSuccess, OnFailure, OnError)"
                  : "Add Action Group"
              }
            >
              Add Action Group
              {ruleGroup.actionGroups.length >= 3 && " (Max Reached)"}
            </Button>
          </Box>

          {ruleGroup.actionGroups.length > 0 && (
            <Stack spacing={2}>
              {ruleGroup.actionGroups.map((actionGroup) => (
                <ActionGroupComponent
                  key={actionGroup.id}
                  actionGroup={actionGroup}
                  ruleId={ruleGroup.id}
                  allActionGroups={ruleGroup.actionGroups}
                  onUpdate={onUpdateActionGroup}
                  onDelete={onDeleteActionGroup}
                />
              ))}
            </Stack>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default RuleGroupComponent;
