import React, { useState } from 'react';
import { TextField, MenuItem, Chip, Box } from '@mui/material';

const MultiSelectDropdown = ({ label, options, selected, setSelected, required }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value; // Get selected values from event
    setSelected(value); // Set selected to the new array of values
    setOpen(false);
  };

  return (
    <Box>
      <TextField
        select
        label={label}
        value={selected} // Ensure this is an array
        onChange={handleChange}
        SelectProps={{
          multiple: true,
          open: open,
          onOpen: () => setOpen(true),
          onClose: () => setOpen(false),
          renderValue: (selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  // Removed the onDelete prop to prevent deletion
                  sx={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: '0.5px solid white',
                  }}
                />
              ))}
            </Box>
          ),
        }}
        required={required}
        fullWidth
        sx={{
          marginBottom: 4,
          input: { color: 'white' },
          label: { color: 'white' },
          '& label.Mui-focused': { color: 'white' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white' },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
          },
        }}
      >
        {options
          .filter((option) => !selected.includes(option)) // Only show options that are not selected
          .map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
};

export default MultiSelectDropdown;
