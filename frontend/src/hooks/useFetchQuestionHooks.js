import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import questionData from "../data/Questions";
import { setQuestions, setCorrectAnswers } from "../store";

const getQuestionsFromSkills = (skills) => {
  if (skills && skills.length > 0) {
    let questionList = [];
    let secondaryList = [];
    let answerList = [];

    skills.forEach((skill) => {
      let skillQuestions = questionData[skill.title]?.questions; // Use skill.title to match the data structure
      if (skillQuestions) {
        questionList.push(...skillQuestions);
      }
    });

    for (let i = 0; i < questionList.length; i++) {
      let randomNo = Math.round(Math.random() * 4);
      secondaryList.push(questionList[i].question);
      answerList.push(questionList[i].answer);
      i += randomNo; // Skip random questions
    }

    return { questionList: secondaryList, answerList };
  }
  return { questionList: [], answerList: [] };
};

// Custom hook
const useGetQuestions = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.interview);

  return useQuery({
    queryKey: ["questions", skills],
    queryFn: () => {
      const data = getQuestionsFromSkills(skills);
      dispatch(setQuestions(data.questionList));
      dispatch(setCorrectAnswers(data.answerList)); // Set correct answers correctly
      return data; // Return the data for use in the component
    },
    enabled: skills && skills.length > 0, // Only run the query if skills exist
  });
};

export default useGetQuestions;
