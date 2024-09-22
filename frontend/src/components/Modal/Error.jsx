import React from "react";
import { Modal, Box, Typography, Backdrop } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"; // Error icon
import { useSelector } from "react-redux";

// Define modal style for loading and error modals
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

const ErrorModal = () => {
  const { modalInfo } = useSelector((state) => state.global);
  const isError = modalInfo.includes("error");

  return (
    <Modal
      open={isError}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={modalStyle}>
        {isError && (
          <>
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "red" }} />
            <Typography
              variant="h6"
              sx={{ mt: 2, fontWeight: "bold", color: "red" }}
            >
              Error
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
              Something went wrong. Please try again later.
            </Typography>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ErrorModal;
