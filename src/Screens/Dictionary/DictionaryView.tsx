import React from "react";
import CommonHeader from "../../Component/commonPageHeader";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const DictionaryView = () => {
  return (
    <>
      <CommonHeader heading="Dictionary">
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Add
        </Button>
      </CommonHeader>
    </>
  );
};

export default DictionaryView;
