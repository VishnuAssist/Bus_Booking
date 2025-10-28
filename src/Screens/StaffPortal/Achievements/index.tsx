import { useState } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import PageHeader from "../../../Component/commonPageHeader";
import CommisionContainer from "../../../Component/container";
import AddIcon from "@mui/icons-material/Add";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { CommonDialog } from "../../../Component/forms/FormDialog";
import {
  StaffAchivement,
  staffAchivementFormValidationSchema,
} from "../../../feilds_validation/staffAchivementFieldsValidation";

const Achievements = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAchivement, setSelectedAchivement] = useState<any>(null);

  const onSubmit = async (formData: any) => {
    console.log("Achivement Form Data", formData);
    setModalOpen(false);
    setSelectedAchivement(null);
  };

  const achivementFields = () => {
    const fields = [...StaffAchivement];
    const achivementTypeField = fields.find((f) => f.name === "achivementType");
    if (achivementTypeField) {
      achivementTypeField.options = [
        { id: "1", name: "First Sales" },
        { id: "2", name: "Sales Champion" },
        { id: "3", name: "Top Performer" },
        { id: "4", name: "Team Player" },
        { id: "5", name: "Top 5 Performer" },
        { id: "6", name: "Super Helper" },
      ];
    }
    const activityTypeField = fields.find((f) => f.name === "activityType");
    if (activityTypeField) {
      activityTypeField.options = [
        { id: "1", name: "Helped Customer" },
        { id: "2", name: "Made Sale" },
        { id: "3", name: "Completed Call" },
        { id: "4", name: "Completed Traning" },
        { id: "5", name: "Completed FeedBack" },
      ];
    }
    return fields;
  };

  return (
    <>
      <CommisionContainer>
        <PageHeader
          title="Achievement Progress"
          subtitle="Log your daily activities toward achieving goals"
          btntitle="Log Activity"
          icon={<AddIcon />}
        />

        <Grid container spacing={2}>
          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid size={4}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography color="primary" fontSize={16} fontWeight={700}>
                      0
                    </Typography>
                    <Typography variant="subtitle1">
                      Total Activities
                    </Typography>
                  </Box>
                  <EmojiEventsOutlinedIcon
                    color="primary"
                    style={{ fontSize: 35 }}
                  />
                </Card>
              </Grid>
              <Grid size={4}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography color="warning" fontSize={16} fontWeight={700}>
                      0
                    </Typography>
                    <Typography variant="subtitle1">
                      Pending Verification
                    </Typography>
                  </Box>
                  <AccessTimeOutlinedIcon
                    color="warning"
                    style={{ fontSize: 35 }}
                  />
                </Card>
              </Grid>
              <Grid size={4}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    height: "100%",
                  }}
                >
                  <Box>
                    <Typography color="success" fontSize={16} fontWeight={700}>
                      0
                    </Typography>
                    <Typography variant="subtitle1">Verified</Typography>
                  </Box>
                  <CheckCircleOutlinedIcon
                    color="success"
                    style={{ fontSize: 35 }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeOutlinedIcon />
                  <Typography fontSize={18}>Recent Activities (0)</Typography>
                </Box>
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <EmojiEventsOutlinedIcon style={{ fontSize: 50 }} />
                  <Typography variant="subtitle1">
                    No activities logged yet.
                  </Typography>
                  <Typography variant="subtitle1">
                    Start tracking your progress by logging your first activity!
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CommisionContainer>

      <CommonDialog
        open={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedAchivement(null);
        }}
        onSubmit={onSubmit}
        title={selectedAchivement ? "Edit Achivement" : "Add Achivement"}
        validationSchema={staffAchivementFormValidationSchema}
        fields={achivementFields()}
        defaultValues={
          selectedAchivement || {
            achivementType: "",
            activityType: "",
            activityDescription: "",
          }
        }
      />
    </>
  );
};
export default Achievements;
