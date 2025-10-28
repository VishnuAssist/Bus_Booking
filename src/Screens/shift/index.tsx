import { Box } from "@mui/material";
import ListView from "./ListView";
import CommisionContainer from "../../Component/container";

const Index = () => {
  return (
    <>
      <CommisionContainer>
        <Box sx={{ mb: 2 }}>
        <ListView/>
        </Box>
      </CommisionContainer>
    </>
  );
};

export default Index;
