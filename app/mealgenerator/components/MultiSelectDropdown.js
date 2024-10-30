import React, { useState } from 'react';
import { TextField, MenuItem, Chip, Box } from '@mui/material';

const MultiSelectDropdown = ({ label, options, selected, setSelected, required }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setSelected(event.target.value);
    setOpen(false);
  };

  const handleDelete = (chipToDelete, event) => {
    event.stopPropagation();
    setSelected((prevSelected) => {
      const updatedSelection = prevSelected.filter((chip) => chip !== chipToDelete);
      console.log("Updated selection:", updatedSelection); // Debug log
      return updatedSelection;
    });
  };

  return (
    <Box>
      <TextField
        select
        label={label}
        value={selected}
        onChange={handleChange}
        SelectProps={{
          multiple: true,
          open: open,
          onOpen: () => setOpen(true),
          onClose: () => setOpen(false),
          renderValue: (selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={(event) => handleDelete(value, event)}
                  sx={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: '0.5px solid white',
                    '& .MuiChip-deleteIcon': {
                      color: 'white',
                    },
                  }}
                />
              ))}
            </Box>
          ),
        }}
        required={required}
        fullWidth
        sx={{
          marginBottom: 2,
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
          .filter((option) => !selected.includes(option))
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
