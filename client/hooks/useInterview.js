import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const fetchQuestions = async ({ skills, role, experience, duration }) => {
  let skillsString = skills.join(",");
  const { data } = await axios.get(
    "http://localhost:8080/interview/questions",
    {
      params: { skills: skillsString, role, experience, duration },
    }
  );
  return data;
};

export const useInterviewQuestions = () => {
  return useMutation({
    mutationFn: fetchQuestions,
  });
};
