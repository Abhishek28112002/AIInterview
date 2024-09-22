import React from "react";
// import NavigationBar from "../../pages/NavigationBar";
import { Box } from "@mui/material";
function ProtectedRoute({ child }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      {/* <NavigationBar /> */}
      {child}
    </Box>
  );
}

export default ProtectedRoute;
