import React, { useRef, useState } from "react";
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
import { setSkills } from "../store/SkillsSlice";
import { useNavigate } from "react-router-dom";

function SkillInput() {
  const navigate = useNavigate();
  let skillState = useSelector((state) => state.skills);
  let skill = skillState.skills;
  if (skill.length == 0) skill = [{ skill: "", type: "" }];
  const dispatch = useDispatch();
  const [skills, setSkillsU] = useState([...skill]);
  const isDisabled = useRef(true);
  const skillSuggestions = [
    "React",
    "Node.js",
    "JavaScript",
    "HTML/CSS",
    "Python",
    "C++",
    "Data Structures",
    "Algorithms",
  ];

  const addSkillInput = () => {
    if (skills.length < 5) {
      setSkillsU((prevSkills) => [...prevSkills, { skill: "", type: "" }]);
    }
    checkDisabled();
  };

  const checkDisabled = () => {
    const isDisable =
      skills.some((skill) => skill.skill === "" || skill.type === "") ||
      skills.length === 0;
    isDisabled.current = isDisable;
  };

  const handleSkillChange = (index, key, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][key] = value;
    setSkillsU(updatedSkills);
    console.log(updatedSkills);
    checkDisabled();
  };

  const deleteSkillRow = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkillsU(updatedSkills);
  };

  const startInterview = () => {
    dispatch(setSkills(skills));
    navigate("/interview");
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        padding: "24px",
      }}
    >
      <Typography
        variant="subtitle1"
        style={{ fontSize: "32px", fontWeight: "bold" }}
      >
        Add your top skills
      </Typography>
      <Typography variant="body2">
        Add your top skills and make sure to accurately rate yourself on each
        skill. Choose specific skills (ex: React, Node.js, Javascript, Python,
        etc).
      </Typography>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <Typography>Enter main skills</Typography>
          <Typography>Rate yourself</Typography>
        </div>
        {skills.map((skill, index) => (
          <div
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Autocomplete
              options={skillSuggestions}
              value={skill.skill}
              style={{ width: "300px" }}
              onChange={(event, newValue) =>
                handleSkillChange(index, "skill", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Skill ${index + 1}`}
                  variant="outlined"
                />
              )}
              fullWidth
            />
            <Select
              value={skill.type}
              onChange={(e) => handleSkillChange(index, "type", e.target.value)}
              variant="outlined"
              style={{ width: "150px" }}
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
        style={{ marginTop: "20px" }}
      >
        Add Skill
      </Button>
      <Button
        variant="contained"
        onClick={startInterview}
        style={{ marginTop: "20px" }}
        disabled={isDisabled.current}
      >
        Start Interview
      </Button>
      {skills.length === 5 && (
        <Typography variant="body2" color="error">
          You can add a maximum of 5 top skills.
        </Typography>
      )}
      <Typography variant="body2">
        Note: please do not refresh the page or you'll lose the data.
      </Typography>
    </Box>
  );
}

export default SkillInput;
