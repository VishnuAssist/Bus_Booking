import React, { useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  TextField,
  Stack,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import RuleExpressionEditor from "./RuleExpressionEditor";
import { type ActionGroup, actionTypes } from "../types";
import { IconActionButton } from "../ui";
import {
  PLACEHOLDER_TEXT,
  HELPER_TEXT,
  VALIDATION_MESSAGES,
} from "../constants";

interface ActionGroupComponentProps {
  actionGroup: ActionGroup;
  ruleId: string;
  allActionGroups: ActionGroup[]; // All action groups in the same rule
  onUpdate: (
    ruleId: string,
    actionId: string,
    updates: Partial<ActionGroup>
  ) => void;
  onDelete: (ruleId: string, actionId: string) => void;
}

const ActionGroupComponent: React.FC<ActionGroupComponentProps> = ({
  actionGroup,
  ruleId,
  allActionGroups,
  onUpdate,
  onDelete,
}) => {
  const handleExpressionChange = useCallback(
    (value: string) => {
      onUpdate(ruleId, actionGroup.id, { expression: value });
    },
    [ruleId, actionGroup.id, onUpdate]
  );

  // Get available action types (filter out already used ones)
  const getAvailableActionTypes = useCallback(() => {
    const usedActionTypes = allActionGroups
      .filter((ag) => ag.id !== actionGroup.id && ag.actionType)
      .map((ag) => ag.actionType);

    return actionTypes.filter((type) => !usedActionTypes.includes(type.value));
  }, [allActionGroups, actionGroup.id]);

  // Check if current action type is duplicate
  const isDuplicateActionType = useCallback(() => {
    const otherActionTypes = allActionGroups
      .filter((ag) => ag.id !== actionGroup.id)
      .map((ag) => ag.actionType);

    return Boolean(
      actionGroup.actionType &&
        otherActionTypes.includes(actionGroup.actionType)
    );
  }, [allActionGroups, actionGroup.id, actionGroup.actionType]);

  // Error detection logic
  const hasActionErrors =
    !actionGroup.actionType?.trim() ||
    !actionGroup.expression?.trim() ||
    isDuplicateActionType();

  const style = {
    border: hasActionErrors ? "2px solid #f44336" : "1px solid grey",
    boxShadow: hasActionErrors
      ? "0px 9px 16px rgba(244, 67, 54, 0.2), 0px 2px 2px rgba(244, 67, 54, 0.3)"
      : "0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)",
  };

  return (
    <Accordion sx={{ mb: 1 }} defaultExpanded style={style}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}
        >
          <Typography variant="subtitle2" sx={{ minWidth: 120 }}>
            Action Group:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            {actionGroup.actionType || "OnSuccess Action"}
          </Typography>

          <IconActionButton
            tooltip="Delete Action Group"
            icon={<DeleteIcon fontSize="small" />}
            variant="delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(ruleId, actionGroup.id);
            }}
          />
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              size="small"
              options={getAvailableActionTypes()}
              getOptionLabel={(option) => option.label || ""}
              value={
                actionTypes.find(
                  (type) => type.value === actionGroup.actionType
                ) || null
              }
              onChange={(_, newValue) =>
                onUpdate(ruleId, actionGroup.id, {
                  actionType: newValue ? newValue.value : "",
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Action Type *"
                  variant="outlined"
                  placeholder={PLACEHOLDER_TEXT.ACTION_NAME}
                  required
                  error={
                    !actionGroup.actionType?.trim() || isDuplicateActionType()
                  }
                  helperText={
                    !actionGroup.actionType?.trim()
                      ? VALIDATION_MESSAGES.ACTION_TYPE_REQUIRED
                      : isDuplicateActionType()
                      ? `Action type "${actionGroup.actionType}" is already used in this rule`
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.75rem",
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "0.75rem",
                      color: "#666",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "#666",
                    },
                  }}
                />
              )}
            />
          </Box>

          <TextField
            label="Action Name"
            value={actionGroup.actionName || ""}
            onChange={(e) =>
              onUpdate(ruleId, actionGroup.id, {
                actionName: e.target.value,
              })
            }
            size="small"
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                fontSize: "0.75rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
                color: "#666",
              },
            }}
            placeholder={PLACEHOLDER_TEXT.ACTION_EXPRESSION}
          />
        </Stack>

        {/* Action Expression with Intellisense */}
        <Box sx={{ mt: 2 }}>
          <RuleExpressionEditor
            value={actionGroup.expression || ""}
            onChange={handleExpressionChange}
            label="Action Expression (Formula)"
            placeholder={PLACEHOLDER_TEXT.ACTION_EXPRESSION}
            height="80px"
            required={true}
            hasError={!actionGroup.expression?.trim()}
          />
          {!actionGroup.expression?.trim() && (
            <FormHelperText error sx={{ mt: 0.5 }}>
              {VALIDATION_MESSAGES.ACTION_EXPRESSION_REQUIRED}
            </FormHelperText>
          )}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0.5, display: "block", fontSize: "0.7rem" }}
          >
            {HELPER_TEXT.ACTION_EXPRESSION_TIP}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ActionGroupComponent;
