// LoadingSpinner.js

import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography, keyframes } from '@mui/material';

const fadeIn = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

function LoadingSpinner() {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = 100 / 30; // 100% over 28 seconds
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 50 && progress < 75) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [progress]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={8}>
      {showText && (
        <Typography
          variant="h6"
          sx={{
            animation: `${fadeIn} 2s ease-in-out infinite`,
            mb: 2,
          }}
        >
          Almost there!
        </Typography>
      )}
      <Box sx={{ width: '80%', maxWidth: 400 }}>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            height: 10,
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
            },
            ...(progress === 100 && {
              animation: `${pulse} 0.5s ease-in-out infinite`,
            }),
          }}
        />
      </Box>
    </Box>
  );
}

export default LoadingSpinner;