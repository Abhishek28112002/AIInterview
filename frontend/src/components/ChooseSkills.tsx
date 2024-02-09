import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, Typography, IconButton, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function SkillInput() {
  const [skills, setSkills] = useState([{ skill: '', type: '' }]); // State to store skills

  // Suggestions for skills
  const skillSuggestions = ['React', 'Node.js', 'JavaScript', 'HTML/CSS', 'Python', 'C++', 'Data Structures', 'Algorithms'];

  // Function to handle adding a new input box for skills
  const addSkillInput = () => {
    if (skills.length < 5) {
      setSkills([...skills, { skill: '', type: '' }]);
    }
  };

  // Function to handle updating skills
  const handleSkillChange = (index, key, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index][key] = value;
    setSkills(updatedSkills);
  };

  // Function to handle deleting a skill row
  const deleteSkillRow = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const isDisabled = skills.some((skill) => skill.skill === '' || skill.type === '') || skills.length === 0;

  const StartInterview = () => {
    localStorage.setItem('skills', JSON.stringify(skills));
    window.location.href = '/interview';
  };

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '24px' }}>
      <Typography variant="subtitle1" style={{ fontSize: '32px', fontWeight: 'bold' }}>Add your top skills</Typography>
      <Typography variant="body2">
        Add your top skills and make sure to accurately rate yourself on each skill. Choose specific skills (ex: React,
        Node.js, Quickbooks, Project management, etc).
      </Typography>

      <Box style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Typography>Enter main skills</Typography>
          <Typography>Rate yourself</Typography>
        </div>
        {skills.map((skill, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Autocomplete
              options={skillSuggestions}
              value={skill.skill}
              style={{width:'300px'}}
              onChange={(event, newValue) => handleSkillChange(index, 'skill', newValue)}
              renderInput={(params) => <TextField {...params} label={`Skill ${index + 1}`} variant="outlined" />}
              fullWidth
            />
            <Select
              value={skill.type}
              onChange={(e) => handleSkillChange(index, 'type', e.target.value)}
              variant="outlined"
              style={{ width: '150px' }}
            >
              <MenuItem value="Junior">Junior</MenuItem>
              <MenuItem value="Mid-level">Mid-level</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
            <IconButton onClick={() => deleteSkillRow(index)} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </Box>

      <Button variant="contained" onClick={addSkillInput} style={{ marginTop: '20px' }}>
        Add Skill
      </Button>
      <Button
        variant="contained"
        onClick={StartInterview}
        style={{ marginTop: '20px' }}
        disabled={isDisabled}
      >
        Start Interview
      </Button>
      {skills.length === 5 && <Typography variant="body2" color="error">You can add a maximum of 5 top skills.</Typography>}
      <Typography variant="body2">Note: please do not refresh the page or you'll lose the data.</Typography> 
    </Box>
  );
}

export default SkillInput;
