import React, { useState, useCallback, useMemo } from "react";

import { autocompletion } from "@codemirror/autocomplete";
import { EditorView } from "@codemirror/view";
import { Box, Typography, CircularProgress } from "@mui/material";
import {
  useGetRuleSchemaQuery,
  useGetCountriesQuery,
} from "../../../Api/rulesApi";
import { ruleExpressionCompletions } from "../utils/completionEngine";
import { useTheme } from "@mui/material/styles";
import CodeMirror from "@uiw/react-codemirror";

interface RuleExpressionEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  height?: string;
  required?: boolean;
  hasError?: boolean;
}

const RuleExpressionEditor: React.FC<RuleExpressionEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = "Enter expression...",
  height = "120px",
  required = false,
  hasError = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const theme = useTheme();

  const defaultBorderColor =
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.divider;

  const errorBorderColor = theme.palette.error.main;

  const finalBorderStyle =
    hasError || (required && !localValue.trim())
      ? `1px solid ${errorBorderColor}`
      : `1px solid ${defaultBorderColor}`;

  const { data: schemaData, isLoading: schemaLoading } =
    useGetRuleSchemaQuery();
  const { data: countriesData = [], isLoading: countriesLoading } =
    useGetCountriesQuery({});

  // Transform API schema to the format we need
  const transformedSchema = useMemo(() => {
    if (!schemaData) {
      return {}; // Return empty object if no API data
    }

    // Check if schemaData is already in the correct format (object with table keys)
    if (typeof schemaData === "object" && !Array.isArray(schemaData)) {
      // Check if it has table-like structure
      const firstKey = Object.keys(schemaData)[0];

      if (
        firstKey &&
        Array.isArray((schemaData as any)[firstKey]) &&
        (schemaData as any)[firstKey][0]?.name
      ) {
        // Already in correct format - use API schema
        return schemaData;
      }
    }

    // Return empty object if schema format is not recognized
    return {};
  }, [schemaData]);

  // Memoize the completion function with API data
  const completionExtension = useMemo(() => {
    return autocompletion({
      activateOnTyping: true,
      override: [
        (context: any) =>
          ruleExpressionCompletions(context, transformedSchema, countriesData),
      ],
    });
  }, [transformedSchema, countriesData]);

  const handleChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  // Show loading state
  if (schemaLoading || countriesLoading) {
    return (
      <Box>
        {label && (
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ mb: 1, fontSize: "0.75rem", color: "#666" }}
          >
            {label}
          </Typography>
        )}
        <Box
          sx={{
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <CircularProgress size={24} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {label && (
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ mb: 1, fontSize: "0.75rem", color: "#666" }}
        >
          {label}
          {required && (
            <span style={{ color: "#d32f2f", marginLeft: "4px" }}>*</span>
          )}
        </Typography>
      )}
      <CodeMirror
        value={localValue}
        height={height}
        theme={theme.palette.mode === "dark" ? "dark" : "light"}
        placeholder={placeholder}
        extensions={[completionExtension, EditorView.lineWrapping]}
        onChange={handleChange}
        style={{
          fontSize: "14px",
          border: finalBorderStyle,
          borderRadius: "16px",
          overflow: "hidden",
        }}
        basicSetup={{
          lineNumbers: false,
          foldGutter: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
        }}
      />
    </Box>
  );
};

export default RuleExpressionEditor;
