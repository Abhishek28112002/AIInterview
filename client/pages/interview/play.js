import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InterviewPlayer from "../../src/component/Interview/InterviewPlayer";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function InterviewPlayPage() {
  const router = useRouter();
  const { interviews = [] } = useSelector((state) => state.interview);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const { interviewId } = router.query;
  const interviewInfo = interviews.find(
    (interview) => interview.id === interviewId
  );

  if (!interviewInfo) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Interview not found.
        </Typography>
      </Container>
    );
  }

  const questions = interviewInfo.questionsAndAnswer.map((qa) => qa.question);

  const handleComplete = () => {
    const storedInterviews =
      JSON.parse(localStorage.getItem("interviews")) || [];
    const newInterview = {
      timestamp: new Date().toISOString(),
      questions,
      duration: interviewInfo.duration,
    };
    localStorage.setItem(
      "interviews",
      JSON.stringify([...storedInterviews, newInterview])
    );
    setInterviewCompleted(true);
  };

  if (interviewCompleted) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Paper
          sx={{
            p: 4,
            maxWidth: 500,
            mx: "auto",
            textAlign: "center",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Interview Completed!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => router.push("/interview")}
          >
            Go to Interview List
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Interview in Progress
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", boxShadow: 3 }}>
        <InterviewPlayer
          questions={questions}
          duration={parseInt(interviewInfo.duration)}
          onComplete={handleComplete}
        />
      </Paper>
    </Container>
  );
}
