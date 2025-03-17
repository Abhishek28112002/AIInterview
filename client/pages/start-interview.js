import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import InterviewForm from "../src/component/Interview/InterviewForm";
import { useInterviewQuestions } from "../hooks/useInterview";
import { addInterview } from "../store/slices/interviewSlice";

function generateUniqueId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
  ).toUpperCase();
}
export default function StartInterviewPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const interviewMutation = useInterviewQuestions();

  const handleSubmit = ({ skills, role, experience, duration }) => {
    interviewMutation.mutate(
      { skills, role, experience },
      {
        onSuccess: (data) => {
          let interviewId = generateUniqueId();
          dispatch(
            addInterview({
              id: interviewId,
              questionsAndAnswer: [...data],
              skills,
              role,
              experience,
              duration,
            })
          );
          router.push({
            pathname: "/interview/play",
            query: {
              interviewId,
            },
          });
        },
        onError: (error) => {
          console.error("Error fetching questions:", error);
        },
      }
    );
  };

  return (
    <div>
      <h1>Start a New Interview</h1>
      <InterviewForm onSubmit={handleSubmit} />
      {interviewMutation.isLoading && <p>Loading questions...</p>}
      {interviewMutation.isError && <p>Error fetching questions!</p>}
    </div>
  );
}
