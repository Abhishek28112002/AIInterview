import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SignIn = ({ onSignIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ name, email }));
    onSignIn();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
