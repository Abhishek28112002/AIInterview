import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";

function TestFinished() {

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        height:'100vh',
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <CheckCircleIcon sx={{ fontSize: 100, color: "green" }} />
      <Typography variant="h5">Congratulations!</Typography>
      <Typography variant="body1">You have successfully completed the test.</Typography>
      <Button
        variant="contained"
        onClick={() => (window.location.href = "/")}
        startIcon={<HomeIcon />}
      >
        Go to Home
      </Button>
    </Box>
  );
}

export default TestFinished;
