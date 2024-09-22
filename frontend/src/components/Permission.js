import React from "react";
import { Button, Typography } from "@mui/material";

function Permission({GrantPermission}) {
  return (
    <>
              <Typography variant="h5">Permission Request</Typography>
              <Typography>
                Grant permission to access your microphone and camera:
              </Typography>
              <Button variant="contained" onClick={GrantPermission}>
                Grant Permission
              </Button>
            </>
  )
}

export default Permission