import { useRouter } from "next/router";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  IconButton,
  ButtonBase,
} from "@mui/material";
import { PlayCircleOutline, CalendarToday } from "@mui/icons-material";

const InterviewList = ({ interviews }) => {
  const router = useRouter();

  const handleInterviewClick = (interviewId) => {
    router.push(`/interview/result/${interviewId}`);
  };

  return (
    <Card
      sx={{
        boxShadow: 4,
        borderRadius: 3,
        maxWidth: 500,
        mx: "auto",
        mt: 5,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Your Interviews
        </Typography>

        {interviews.length > 0 ? (
          <List>
            {interviews.map((interview, index) => (
              <Box key={index}>
                <ButtonBase
                  sx={{ width: "100%", textAlign: "left" }}
                  onClick={() => handleInterviewClick(interview.id)} // Use index or unique ID
                >
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end">
                        <PlayCircleOutline color="primary" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`Interview ${index + 1}`}
                      secondary={
                        <>
                          <CalendarToday
                            fontSize="small"
                            sx={{ verticalAlign: "middle", mr: 1 }}
                          />
                          {new Date(interview.timestamp).toLocaleString()}
                        </>
                      }
                    />
                  </ListItem>
                </ButtonBase>
                {index !== interviews.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        ) : (
          <Typography textAlign="center" color="textSecondary">
            No interviews taken yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default InterviewList;
