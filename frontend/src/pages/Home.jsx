import React from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { setSkills } from "../store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.interview);

  const skillSuggestions = [
    "React",
    "Node.js",
    "JavaScript",
    "HTML/CSS",
    "Python",
    "C++",
    "Data Structures",
    "Algorithms",
    "Database Management",
  ];

  const addSkillInput = () => {
    if (skills.length < 5) {
      dispatch(setSkills([...skills, { title: "", type: "" }]));
    }
  };

  const checkDisabled = () => {
    return (
      skills.some((skill) => !skill.title || !skill.type) || skills.length === 0
    );
  };

  const handleSkillChange = (index, key, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][key] = value;
    dispatch(setSkills(updatedSkills));
  };

  const deleteSkillRow = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    dispatch(setSkills(updatedSkills));
  };

  const startInterview = async () => {
    navigate("/interview");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Add Your Top Skills
      </Typography>
      <Typography variant="body2">
        Add your top skills and accurately rate yourself on each skill.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <Typography>Enter Main Skills</Typography>
          <Typography>Rate Yourself</Typography>
        </div>

        {skills.map((skill, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Autocomplete
              options={skillSuggestions}
              value={skill.title}
              onChange={(event, newValue) =>
                handleSkillChange(index, "title", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Skill ${index + 1}`}
                  variant="outlined"
                />
              )}
              sx={{ width: 300 }}
              fullWidth
            />
            <Select
              value={skill.type}
              onChange={(e) => handleSkillChange(index, "type", e.target.value)}
              variant="outlined"
              sx={{ width: 150 }}
            >
              <MenuItem value="Junior">Junior</MenuItem>
              <MenuItem value="Mid-level">Mid-level</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
            <IconButton
              onClick={() => deleteSkillRow(index)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={addSkillInput}
        sx={{ mt: 2 }}
        disabled={skills.length >= 5}
      >
        Add Skill
      </Button>

      <Button
        variant="contained"
        onClick={startInterview}
        sx={{ mt: 2 }}
        disabled={checkDisabled()}
      >
        Start Interview
      </Button>

      {skills.length === 5 && (
        <Typography variant="body2" color="error">
          You can add a maximum of 5 top skills.
        </Typography>
      )}

      <Typography variant="body2">
        Note: Please do not refresh the page or you'll lose the data.
      </Typography>
    </Box>
  );
};

export default Home;
