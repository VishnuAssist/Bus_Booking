import { Box } from "@mui/material";
import CommisionContainer from "../../../Component/container";
import ShiftRequestView from "./shiftRequestView";

const index = () => {
  return (
    <>
      <CommisionContainer>
       <Box>
             <ShiftRequestView/>
           </Box>
      </CommisionContainer>
    </>
  );
};

export default index;
