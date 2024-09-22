import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, Typography } from "@mui/material";

const Answers = () => {
  const { questions, userAnswers } = useSelector((state) => state.interview);

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h3" component="h1" className="font-bold mb-4">
        Answers
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((question, index) => (
          <Card
            key={index}
            variant="outlined"
            className="flex flex-col p-2 m-4"
          >
            <CardContent className="flex flex-col gap-2">
              <Typography variant="h5" component="h2">
                Q{index + 1}: {question.question}
              </Typography>
              <Typography variant="body2" component="p">
                Answer: {userAnswers[index] || "No answer provided"}
              </Typography>
            </CardContent>
            <audio
              controls
              className="bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-blue-500"
              style={{ width: "100%", height: "50px" }}
            >
              <source
                src={localStorage.getItem(`audio_${index}`)}
                type="audio/webm"
              />
              Your browser does not support the audio element.
            </audio>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Answers;
