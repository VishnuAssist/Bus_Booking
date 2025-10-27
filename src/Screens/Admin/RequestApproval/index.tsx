import { Box } from "@mui/material";
import React from "react";
import RequestView from "./RequestView";
import CommisionContainer from "../../../Component/container";
import PageHeader from "../../../Component/commonPageHeader";

const index = () => {
  return (
    <>
      <CommisionContainer>
        <PageHeader title="Request Approval" />

        <Box sx={{ mt: 2 }}>
          <RequestView />
        </Box>
      </CommisionContainer>
    </>
  );
};

export default index;
