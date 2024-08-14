// Component for user input to submit queries

import React, { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ReactTyped } from "react-typed";

function QueryForm({ onSubmit, showForm }) { // imports onSubmit as parameter
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // check if mobile device

  useEffect(() => {
    if (query !== '') {
      setIsPlaceholderVisible(false);
    } else {
      setIsPlaceholderVisible(true);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} 
      style={{ 
        display: showForm ? 'block' : 'none',
        position: 'fixed', 
        bottom: theme.spacing(2), 
        left: '52%', 
        transform: 'translateX(-50%)', 
        bottom: isMobile ? theme.spacing(-1) : theme.spacing(2),
        width: '80%', 
        height: 'auto', // Ensure it keeps its height if dynamic
        backgroundColor: theme.palette.background.default, 
        padding: isMobile ? theme.spacing(1) : theme.spacing(2),
      }}>
      <Box display="flex" justifyContent="center" alignItems="center">   
        <Box 
          sx={{ 
            position: 'relative',
             // Adjust width for mobile
            width: isMobile ? 'auto' : '100%',
            //  height: isMobile ? '50%' : 'auto',
            maxWidth: isMobile ? '100%' : '80%',
            flexGrow: 1,
             '& .MuiOutlinedInput-root': {
               '& .MuiOutlinedInput-input': {
                 // Smaller font size on mobile
                 fontSize: isMobile ? '.85rem' : '1.20rem',
               },
               '& .MuiInputLabel-root': {
                 // Smaller font size on mobile
                 fontSize: isMobile ? '.85rem' : '1.20rem',
               },
             },
            marginTop: isMobile ? '0rem':'-1rem', 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderWidth: '1.25px', // Increase border width
              },
              '&:hover fieldset': {
                borderWidth: '1.85px', // Ensure hover state also has  bold border
              },
              '&.Mui-focused fieldset': {
                borderWidth: '1.85px', // Ensure focused state also has  bold border
              },
              '& fieldset': {
                borderWidth: '1.85px', // Make outline more bold
                borderRadius: '12px', // Make edges curved
              },
              '&:hover fieldset': {
                borderWidth: '1.85px', // Ensure hover state also has  bold border
                borderRadius: '12px', // Ensure hover state also has curved edges
              },
              '&.Mui-focused fieldset': {
                borderWidth: '1.85px', // Ensure focused state also has  bold border
                borderRadius: '12px', // Ensure focused state also has curved edges
            },
          },
          }}
        >   
          <TextField
            fullWidth
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            margin="normal"
            sx={{  
              fontSize: isMobile ? '.85rem' : '1.20rem',
              marginRight: isMobile ? 0 : '1rem',
              height: isMobile ? '50px' : '56px',
              color: theme.palette.text.primary,
              fontFamily: 'Quicksand, sans-serif',
              '&:hover': {
                backgroundColor: theme.palette.gray,
              },
              '& .MuiOutlinedInput-input': {
                fontSize: isMobile ? '.85rem' : '1.20rem',
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                fontFamily: 'Quicksand, sans-serif',
              },
              '& .MuiInputLabel-root': {
                fontSize: isMobile ? '.85rem' : '1.20rem',
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                fontFamily: 'Quicksand, sans-serif',
              },
              '&:hover .MuiOutlinedInput-input': {
                backgroundColor: theme.palette.gray,
              },
            }}
          />
          {isPlaceholderVisible && (
            <Box
              sx={{ // for the suggested text
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-30%)',
                pointerEvents: 'none',
                fontFamily: 'Quicksand, sans-serif',
                color: theme.palette.text.primary,
                fontSize: isMobile ? '.85rem' : '1.20rem',
                fontWeight: 'bold',
              }}
            >
              <ReactTyped
                strings={['What will my taxes look like?', 'What about my house?', 'TikTok?']}
                typeSpeed={35}
                backSpeed={45}
                backDelay={1000}
                loop
              />
            </Box>
          )}
        </Box>
        <Box sx={{ width: isMobile ? '15%' : 'auto' }}> 
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          style={{ 
            marginLeft: isMobile ? '.3rem' : '1rem',
            marginTop: isMobile ? '1rem' : 0,
            height: isMobile ? '40px' : '62px',
            width: isMobile ? '30%' : 'auto',
          }}
          sx={{ 
            backgroundColor: theme.palette.primary.main,
            fontFamily: 'Quicksand, sans-serif',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            fontSize: isMobile ? '.85rem' : '1.20rem',
          }}
        >
          Send
        </Button>
        </Box>
      </Box>
    </form>
  );
}

export default QueryForm;