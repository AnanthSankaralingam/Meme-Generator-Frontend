// component to display text and image responses - returned in index.js after prompt submit
import React, { useEffect, useRef } from 'react';
import { Box, Alert, Button, Typography } from '@mui/material';
import Typed from 'typed.js';
import {theme, styled} from '@/styles/theme';
import { useTheme, useMediaQuery } from '@mui/material';


// make text fade in instead of just print
const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export function ResponseDisplay({ response, link, error, isBlue, onTypingComplete }) {
  const theme = useTheme();
  const typedRef = useRef(null);
  const typedInstanceRef = useRef(null);
  const titleRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // check if mobile device

  useEffect(() => {
    if (response && typedRef.current && !typedInstanceRef.current) {
      // render title with effect first
      if (titleRef.current) {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => {
          titleRef.current.style.opacity = '1';
        }, 100);
      }
      
      const bulletPoints = response.split('•').filter(point => point.trim() !== '');
      
      // Join the bullet points with HTML line breaks
      const formattedResponse = bulletPoints.map(point => `• ${point.trim()}`).join('<br>');

      typedInstanceRef.current = new Typed(typedRef.current, {
        strings: [formattedResponse],
        typeSpeed: 10,
        cursorChar: '',
        contentType: 'html', // allows HTML in typed text
        onComplete: () => {
          if (onTypingComplete) {
            onTypingComplete();
          }
        }, // to see when first response done rendering
      });
      
      // Apply CSS styles for darker text
      const typedElement = typedRef.current;
      typedElement.style.fontFamily = 'Quicksand, sans-serif';
      typedElement.style.color = theme.palette.text.primary; // Whiter text
      typedElement.style.fontWeight = 'bold';
      typedElement.style.fontWeight = '1rem';

    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
        typedInstanceRef.current = null;
      }
    };
  }, [response, onTypingComplete, theme.palette.text.primary]);

  if (error) {
    return <Typography>{'Couldn\'t generate an image! Please try again later.'}</Typography>
    // return <Alert severity="error">{error}</Alert>;
  }

  const title = isBlue ? "Harris's Campaign" : "Trump's Campaign";

  return (
    <Box sx={{ 
      maxHeight: '400px', 
      overflowY: 'auto',
      // padding: isMobile ? theme.spacing(1) : theme.spacing(2),
      }}>
      {response && (
        <>
          <Typography ref={titleRef} variant="h4" sx={{ mb: 2, fontSize: isMobile ? '1.5rem' : '2rem', }}>{title}</Typography>
          <span ref={typedRef} style={{
            // Adjust font size for mobile
            fontSize: isMobile ? '0.9rem' : '1rem',
          }}></span>
          {link && (
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                width="15rem"
                sx={{
                  // Adjust button size for mobile
                  width: isMobile ? '100%' : 'auto',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                }}
              >
                Learn More
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default ResponseDisplay;