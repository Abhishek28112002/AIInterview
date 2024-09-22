import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import TestFinished from "./TestFinished";
import { useSelector, useDispatch } from "react-redux";
import { setUserAnswers } from "../store";
import useGetQuestions from "../hooks/useFetchQuestionHooks";

// import { authenticate, uploadFile } from "../services/GoogleDrive";

const InterviewBody = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.interview);
  const { data } = useGetQuestions();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(150);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopRecording = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      const blob = new Blob(recordedChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(blob);
      saveUserAnswer(audioUrl);
      //uploadFile(blob);
    }
  };

  const saveUserAnswer = (audioUrl) => {
    const currentQuestion = questions?.questions[currentQuestionIndex];
    if (currentQuestion) {
      const answer = {
        questionId: currentQuestion.id,
        response: audioUrl,
      };
      dispatch(setUserAnswers((prev) => [...prev, answer]));
    }
  };

  const goToNextQuestion = () => {
    stopRecording();
    if (currentQuestionIndex + 1 < (questions?.questions?.length || 0)) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetTimer();
    }
  };

  const resetTimer = () => {
    setProgress(0);
    setTimeLeft(150);
  };

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            goToNextQuestion();
            return 150;
          }
          return prevTime - 1;
        });

        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            goToNextQuestion();
            return 0;
          }
          return prevProgress + 100 / 150;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [progress]);

  useEffect(() => {
    //authenticate();
    startRecording();

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
  }, []);

  return (
    <>
      {currentQuestionIndex < (questions?.questions?.length || 0) ? (
        <>
          <Typography variant="h5">
            Question {currentQuestionIndex + 1} / {questions?.questions?.length}
          </Typography>
          <Typography>
            {questions?.questions[currentQuestionIndex].question}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ width: "100%" }}
          />
          <Typography>Time Left: {timeLeft} seconds</Typography>
          <Button variant="contained" onClick={goToNextQuestion}>
            Submit Answer and Go to Next Question
          </Button>
        </>
      ) : (
        <TestFinished />
      )}
    </>
  );
};

export default InterviewBody;
