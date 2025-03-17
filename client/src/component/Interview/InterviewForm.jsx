import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { Work, Build, Timer, Engineering } from "@mui/icons-material";

const InterviewForm = ({ onSubmit }) => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [duration, setDuration] = useState(15);

  const handleSkillAdd = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills((skills) => [...skills, skillInput.trim()]);
      }
      console.log(skills);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ skills, role, experience, duration });
  };

  return (
    <Card
      sx={{ boxShadow: 4, borderRadius: 3, maxWidth: 500, mx: "auto", mt: 5 }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
          Start a New Interview
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <FormControl fullWidth>
            <TextField
              label="Add Skills (Press Enter)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillAdd}
              InputProps={{
                startAdornment: <Build color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </FormControl>

          {/* Display added skills as chips */}
          {skills.length > 0 && (
            <Box display="flex" flexWrap="wrap" gap={1}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleSkillRemove(skill)}
                  color="primary"
                />
              ))}
            </Box>
          )}

          <FormControl fullWidth>
            <TextField
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              InputProps={{
                startAdornment: <Work color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Experience</InputLabel>
            <Select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5].map((exp) => (
                <MenuItem key={exp} value={`${exp} year`}>
                  {exp} year
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Duration</InputLabel>
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            >
              {[15, 30, 45].map((time) => (
                <MenuItem key={time} value={time}>
                  {time} minutes
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Start Interview
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InterviewForm;
