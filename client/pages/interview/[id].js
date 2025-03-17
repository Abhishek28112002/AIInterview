import { useRouter } from "next/router";
import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { Event, Timer, QuestionAnswer } from "@mui/icons-material";
import { useSelector } from "react-redux";

export default function InterviewDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { interviews } = useSelector((state) => state.interview);
  const interview = interviews.find((interview) => interview.id === id);

  if (!interview) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Interview not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Interview Details
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Event color="primary" />
            <Typography variant="body1">
              Date: {new Date(interview.timestamp).toLocaleString()}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <Timer color="primary" />
            <Typography variant="body1">
              Duration: {interview.duration} minutes
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight="bold" mb={1}>
            Questions:
          </Typography>
          <Divider />

          <List>
            {interview.questions.map((question, index) => (
              <ListItem key={index}>
                <QuestionAnswer color="primary" sx={{ mr: 1 }} />
                <ListItemText primary={question} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}
