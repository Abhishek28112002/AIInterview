import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";

const InterviewResult = () => {
  const router = useRouter();
  const { interviewId } = router.query;
  const { interviews = [] } = useSelector((state) => state.interview);
  const interview = interviews.find(
    (interview) => interview.id === interviewId
  );
  console.log(interviews);
  if (!interview) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" color="error">
          Interview not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card
        sx={{ boxShadow: 4, borderRadius: 3, maxWidth: 600, mx: "auto", p: 3 }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Interview Results
          </Typography>
          <Typography textAlign="center" color="textSecondary" mb={2}>
            Taken on {new Date(interview.timestamp).toLocaleString()}
          </Typography>
          <List>
            {interview.questions.map((question, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Q${index + 1}: ${question}`}
                    secondary={`Answer: [User's answer goes here]`}
                  />
                </ListItem>
                {index !== interview.questions.length - 1 && <Divider />}
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InterviewResult;
