import { useEffect, useRef, useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  LinearProgress,
} from "@mui/material";
import { Videocam, Timer } from "@mui/icons-material";

const InterviewPlayer = ({ questions, duration, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => console.error("Error accessing camera:", error));
    }
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Videocam color="primary" />
        <Typography variant="h5" fontWeight="bold">
          Interview in Progress
        </Typography>
      </Box>

      <Typography variant="h6" textAlign="center" mb={2}>
        {questions[currentQuestionIndex]}
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={1}
        mb={2}
      >
        <Timer color="error" />
        <Typography variant="body1" color="error">
          Time Left: {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={(timeLeft / (duration * 60)) * 100}
        sx={{ mb: 2 }}
      />

      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
      />

      <Button
        onClick={handleNext}
        variant="contained"
        color="primary"
        fullWidth
      >
        {currentQuestionIndex < questions.length - 1
          ? "Next Question"
          : "Finish Interview"}
      </Button>
    </>
  );
};

export default InterviewPlayer;
