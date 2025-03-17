// pages/index.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SignIn from "../src/component/auth/SignIn";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleSignIn = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    router.push("/interview");
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      router.push("/interview");
    }
  }, []);
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 3,
          textAlign: "center",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            AI Interview
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={2}>
            Your personal AI interview assistant
          </Typography>

          {!user ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <SignIn onSignIn={handleSignIn} />
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" mb={2}>
                Welcome back, {user.name}!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => router.push("/interview")}
              >
                Start Interview
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
