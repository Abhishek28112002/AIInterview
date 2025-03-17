import { useRouter } from "next/router";
import InterviewList from "../../src/component/Interview/InterviewList";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { AddCircleOutline, History } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function InterviewPage() {
  const router = useRouter();
  const { interviews } = useSelector((state) => state.interview);

  const handleStartNew = () => {
    router.push("/start-interview");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3, p: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <History color="primary" fontSize="large" />
            <Typography variant="h5" fontWeight="bold">
              Your Interviews
            </Typography>
          </Box>

          <Typography variant="body1" color="textSecondary" mb={3}>
            Review your past interviews or start a new one.
          </Typography>

          <InterviewList interviews={interviews} onStartNew={handleStartNew} />

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutline />}
            onClick={handleStartNew}
            sx={{ mt: 3, width: "100%" }}
          >
            Start New Interview
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
