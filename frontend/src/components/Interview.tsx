import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import QuestionData from "../Data/Questions";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import TestFinished from "./TestFinished.tsx";
import { useSelector, useDispatch } from "react-redux";
import { getSkills } from "../store/SkillsSlice";
interface Question {
  questions: string[];
}

function Interview() {
  const [questions, setQuestions] = useState<Question>();
  const [response, setResponse] = useState({});
  const [url, seturl] = useState("");
  let skills = useSelector((state: RootState) => state.skills);
  skills = skills.skills;
  const dispatch = useDispatch();

  useEffect(() => {
    if (skills) {
      let questionList: string[] = [];
      skills.forEach((skill) => {
        const skillQuestions = QuestionData[skill.skill]?.questions;
        if (skillQuestions) {
          questionList.push(...skillQuestions);
        }
      });
      setQuestions({ questions: questionList });
    }
  }, [skills]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isPermissionGranted, setIsPermissionGranted] =
    useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(150);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [recordedChunks, setRecordedChunks] = useState<any>([]);

  const handleStartClick = async () => {
    try {
      const userMediaStream: MediaStream =
        await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userMediaStream);
      const recorder = new MediaRecorder(userMediaStream, {
        mimeType: "video/webm",
      });

      recorder.start();
      setMediaRecorder(recorder);
      setIsPermissionGranted(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };
  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };
      console.log(mediaRecorder.state);
    }
  }, [mediaRecorder]);

  const handleStopClick = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);
        response[currentQuestionIndex] = {
          question: questions?.questions[currentQuestionIndex],
          response: videoUrl,
        };
        seturl(videoUrl);
      }
      handleStartClick();
    }
  };

  const goToNextQuestion = () => {
    handleStopClick();
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setProgress(0);
    setTimeLeft(150);
  };

  useEffect(() => {
    if (!isPermissionGranted) {
      handleStartClick();
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPermissionGranted && progress < 100) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
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
    }
    if (progress >= 100) {
      goToNextQuestion();
    }
    return () => {
      clearInterval(timer);
    };
  }, [isPermissionGranted, progress]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const submitAnswer = () => {
    // Handle answer submission
    goToNextQuestion();
  };

  const handleAudioToggle = (value: boolean) => {
    setIsAudioOn(value);
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = value;
      });
      if (!videoRef.current) return;
      videoRef.current.muted = !value; // Mute the video element when audio is turned off
    }
  };

  const handleVideoToggle = (value: boolean) => {
    setIsVideoOn(value);
    if (stream) {
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = value;
      }
    }
  };

  return (
    <>
      {currentQuestionIndex < (questions?.questions?.length || 0) ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            padding: "24px",
          }}
        >
          {isPermissionGranted ? (
            <>
              <Typography variant="h5">
                Question {currentQuestionIndex + 1}
              </Typography>
              <Typography>
                {questions?.questions[currentQuestionIndex]}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                style={{ width: "100%" }}
              />
              <Typography>Time Left: {timeLeft} seconds</Typography>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <video
                  autoPlay
                  playsInline
                  ref={videoRef}
                  style={{
                    transform: "scaleX(-1)",
                    borderRadius: "20px",
                    border: "2px solid #1976d2",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    background: "white",
                    padding: "12px",
                    borderRadius: "10px",
                  }}
                >
                  {isVideoOn ? (
                    <VideocamIcon onClick={() => handleVideoToggle(false)} />
                  ) : (
                    <VideocamOffIcon onClick={() => handleVideoToggle(true)} />
                  )}
                  {isAudioOn ? (
                    <MicNoneIcon onClick={() => handleAudioToggle(false)} />
                  ) : (
                    <MicOffIcon onClick={() => handleAudioToggle(true)} />
                  )}
                </div>
              </div>
              <Button
                variant="contained"
                onClick={submitAnswer}
                disabled={!isVideoOn || !isAudioOn}
              >
                Submit Answer and Go to Next Question
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h5">Permission Request</Typography>
              <Typography>
                Grant permission to access your microphone and camera:
              </Typography>
              <Button variant="contained" onClick={handleStartClick}>
                Grant Permission
              </Button>
            </>
          )}
        </Box>
      ) : (
        <TestFinished />
      )}
    </>
  );
}

export default Interview;
