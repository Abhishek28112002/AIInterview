import React from "react";
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";

import { useSelector } from "react-redux";
// Define modal style
const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const LoadingModal = () => {
  const { modalInfo } = useSelector((state) => state.global);
  return (
    <Modal
      open={modalInfo.includes("loading")}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={modalStyle}>
        <CircularProgress size={60} thickness={5} color="primary" />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
          "Loading..."
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoadingModal;
