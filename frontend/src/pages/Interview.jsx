import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import InterviewBody from "../components/InterviewBody";
import Permission from "../components/Permission";

const Interview = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const checkPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setIsPermissionGranted(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
      setIsPermissionGranted(false);
    }
  };

  const handleGrantPermission = () => {
    checkPermissions();
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      {isPermissionGranted ? (
        <InterviewBody />
      ) : (
        <Permission onGrantPermission={handleGrantPermission} />
      )}
    </Box>
  );
};

export default Interview;
