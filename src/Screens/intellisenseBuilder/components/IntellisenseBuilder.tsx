import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import {
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  Add as AddIcon,
  Description as GenerateIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useRuleBuilder } from "../hooks/useRuleBuilder";
import { useRuleEdit } from "../hooks/useRuleEdit";
import {
  useCreateRuleMutation,
  useTestRuleMutation,
} from "../../../Api/rulesApi";
import { prepareApiData, stringifyWorkflow } from "../utils";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../constants";
import { useAppDispatch, useAppSelector } from "../../../Store/StoreConfig";
import { updateWorkflowJson } from "../../../Store/slice/TestSlice";
import type { GeneratedWorkflow } from "../types";
import RuleGroupComponent from "./RuleGroupComponent";
import TestData from "./TestData";
import type { RuleBuilderProps } from "../types";
import { GradientButton, ValidationAlert, EmptyState, DataDrawer } from "../ui";
import { toast } from "react-toastify";

const IntellisenseBuilder: React.FC<RuleBuilderProps> = ({
  onWorkflowSave,
  onWorkflowTest,
  initialWorkflow,
}) => {
  const { state, actions } = useRuleBuilder(initialWorkflow);
  const { ruleId } = useParams<{ ruleId?: string }>();
  const navigate = useNavigate();

  const [createRuleMutation] = useCreateRuleMutation();
  const [testRuleMutation, { isLoading: isTestLoading }] =
    useTestRuleMutation();
  const dispatch = useAppDispatch();
  const testData = useAppSelector((state) => state.testData);

  const saveWorkflow = async (workflow: GeneratedWorkflow[]) => {
    try {
      const apiData = prepareApiData(workflow);
      const result = await createRuleMutation({ data: apiData }).unwrap();

      console.log("Workflow saved successfully:", result);
      navigate("/Admin/rulesList");
      toast(SUCCESS_MESSAGES.WORKFLOW_SAVED);
    } catch (error) {
      console.error("Failed to save workflow to API:", error);
      alert(ERROR_MESSAGES.SAVE_API_FAILED);
      throw error;
    }
  };

  const testWorkflow = async (workflow: GeneratedWorkflow[]) => {
    try {
      const workflowJson = stringifyWorkflow(workflow);

      dispatch(updateWorkflowJson(workflowJson));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { workflowJson: _, ...testDataWithoutWorkflow } = testData;

      // Prepare the test data with the generated workflowJson
      const testPayload = {
        ...testDataWithoutWorkflow,
        workflowJson: workflowJson,
      };

      const result = await testRuleMutation({ data: testPayload }).unwrap();
      console.log("Test API result:", result);
      toast(SUCCESS_MESSAGES.TEST_API_SUCCESS);

      return result;
    } catch (error) {
      console.error("Test API error:", error);
      toast(ERROR_MESSAGES.TEST_API_FAILED);
      throw error;
    }
  };

  // Direct generateJSON function
  const generateJSON = (workflow: GeneratedWorkflow[]) => {
    return stringifyWorkflow(workflow);
  };

  const {
    editMode,
    getTransformedRuleData,
    saveEditedRule,
    cancelEdit,
    isUpdating,
  } = useRuleEdit(ruleId);

  const [isJsonDrawerOpen, setIsJsonDrawerOpen] = useState(false);
  const [generatedJson, setGeneratedJson] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [apiResponse, setApiResponse] = useState<unknown>(null);
  const [showApiResponse, setShowApiResponse] = useState(false);
  const hasLoadedRuleData = useRef(false);

  useEffect(() => {
    if (
      editMode.isEditMode &&
      !editMode.isLoading &&
      !editMode.error &&
      !hasLoadedRuleData.current
    ) {
      const transformedData = getTransformedRuleData();
      if (transformedData) {
        actions.initializeWithData(transformedData);
        hasLoadedRuleData.current = true;
      }
    } else if (!editMode.isEditMode) {
      hasLoadedRuleData.current = false;
    }
  }, [
    editMode.isEditMode,
    editMode.isLoading,
    editMode.error,
    getTransformedRuleData,
    actions,
  ]);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleSave = async () => {
    const workflow = actions.generateWorkflow();

    if (editMode.isEditMode && editMode.ruleId) {
      try {
        await saveEditedRule(workflow);
        onWorkflowSave?.(workflow);
      } catch (error) {
        console.error("Failed to save edited rule:", error);
      }
    } else {
      // Create mode - use workflow service to save to API
      try {
        await saveWorkflow(workflow);
        onWorkflowSave?.(workflow);
      } catch (error) {
        console.error("Failed to save workflow:", error);
      }
    }
  };

  const handleTest = async () => {
    try {
      const workflow = actions.generateWorkflow();
      const result = await testWorkflow(workflow);

      // Store the API response and show it in drawer
      setApiResponse(result);
      setShowApiResponse(true);

      onWorkflowTest?.(workflow);
    } catch (error) {
      console.error("Test API error:", error);
      // Store error response and show it in drawer
      setApiResponse({
        error:
          error instanceof Error ? error.message : "Failed to call test API",
      });
      setShowApiResponse(true);
    }
  };

  const handleGenerateJson = () => {
    const workflow = actions.generateWorkflow();
    const jsonString = generateJSON(workflow);
    setGeneratedJson(jsonString);
    setIsJsonDrawerOpen(true);
  };

  const handleCloseJsonDrawer = () => {
    setIsJsonDrawerOpen(false);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Check if validation passes for enabling/disabling buttons
  const isValidationPassing = () => {
    const validationErrors = actions.validateWorkflow();
    return validationErrors.length === 0;
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = state.ruleGroups.findIndex(
        (rule) => rule.id === active.id
      );
      const newIndex = state.ruleGroups.findIndex(
        (rule) => rule.id === over?.id
      );

      actions.reorderRuleGroups(oldIndex, newIndex);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            {editMode.isEditMode ? (
              <Box display="flex" alignItems="center" gap={1}>
                <Typography sx={{ fontSize: "18px" }}>Edit Rule </Typography>
              </Box>
            ) : (
              <Typography sx={{ fontSize: "18px" }}>
                Intellisense Rule Builder
              </Typography>
            )}

            <Typography color="text.secondary" fontWeight={400}>
              {editMode.isEditMode
                ? "Modify existing rule workflow and actions"
                : "Build complex workflows with rules and actions"}
            </Typography>
          </Box>

          <Button
            startIcon={<ArrowBackIcon />}
            onClick={cancelEdit}
            variant="outlined"
            size="small"
          >
            Back to Rules List
          </Button>
        </Box>
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Rule Builder" />
            <Tab label="Test Data" />
          </Tabs>
        </Box>
      </Card>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Workflow Details - Top Section */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Workflow Details
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    label="Workflow Name"
                    value={state.workflowData.workflowName}
                    onChange={(e) =>
                      actions.updateWorkflowData("workflowName", e.target.value)
                    }
                    fullWidth
                    size="small"
                    required
                  />
                </Box>
                <Box sx={{ flex: "1 1 300px", minWidth: "300px" }}>
                  <TextField
                    label="Description"
                    value={state.workflowData.description}
                    onChange={(e) =>
                      actions.updateWorkflowData("description", e.target.value)
                    }
                    fullWidth
                    size="small"
                  />
                </Box>
              </Box>

              {/* Validation Errors */}
              <ValidationAlert errors={state.validationErrors} />
            </CardContent>
          </Card>

          {/* Main Content - Rule Groups */}
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {state.ruleGroups.length === 0 ? (
              <EmptyState
                title="No rules added yet"
                message='Click "Add Rule" to start building your workflow'
              />
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={state.ruleGroups.map((rule) => rule.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {state.ruleGroups.map((ruleGroup) => (
                    <RuleGroupComponent
                      key={ruleGroup.id}
                      ruleGroup={ruleGroup}
                      onUpdate={actions.updateRuleGroup}
                      onDelete={actions.deleteRuleGroup}
                      onAddActionGroup={actions.addActionGroup}
                      onUpdateActionGroup={actions.updateActionGroup}
                      onDeleteActionGroup={actions.deleteActionGroup}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </Box>

          {/* Action Buttons - Bottom Section */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Stack direction="row" spacing={2} justifyContent="center">
                <GradientButton
                  gradientVariant="green"
                  startIcon={<AddIcon />}
                  onClick={actions.addRuleGroup}
                  disabled={!isValidationPassing()}
                >
                  Add Rule
                </GradientButton>

                <GradientButton
                  gradientVariant="orange"
                  startIcon={<GenerateIcon />}
                  onClick={handleGenerateJson}
                  disabled={!isValidationPassing()}
                >
                  Generate JSON
                </GradientButton>

                <GradientButton
                  gradientVariant="red"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={!isValidationPassing() || isUpdating}
                >
                  {editMode.isEditMode ? "Update Rule" : "Save to API"}
                </GradientButton>

                <GradientButton
                  gradientVariant="green"
                  startIcon={<PlayIcon />}
                  onClick={handleTest}
                  disabled={!isValidationPassing() || isTestLoading}
                  // sx={OUTLINED_BUTTON_STYLES.green}
                >
                  {isTestLoading ? "Testing..." : "Test API"}
                </GradientButton>
              </Stack>
            </CardContent>
          </Card>

          {/* JSON Drawer */}
          <DataDrawer
            isOpen={isJsonDrawerOpen}
            onClose={handleCloseJsonDrawer}
            data={generatedJson}
            type="json"
            title="Generated JSON"
          />

          {/* API Response Drawer */}
          <DataDrawer
            isOpen={showApiResponse}
            onClose={() => setShowApiResponse(false)}
            data={apiResponse}
            type="api"
            showActions={true}
          />
        </Box>
      )}

      {/* Test Data Tab */}
      {activeTab === 1 && (
        <TestData workflowJson={actions.generateWorkflow()} />
      )}
    </Box>
  );
};

export default IntellisenseBuilder;
