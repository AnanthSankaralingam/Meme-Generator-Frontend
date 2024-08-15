// home page 
import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Divider, CssBaseline, Modal } from '@mui/material';
import QueryForm from '../components/QueryForm';
import { ResponseDisplay } from '../components/ResponseDisplay';
import { processQuery, generateImage } from '../services/api';
import { useTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import Image from 'next/image';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import DropdownShareButton from '../components/DropdownShareButton';

export default function Home() {
  const [textResponse, setTextResponse] = useState(null);
  const [imageResponse, setImageResponse] = useState(null);

  const [textLoading, setTextLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);  
  
  const [showQueryForm, setShowQueryForm] = useState(true); // show app bar and query only when needed
  const [showAppBar, setShowAppBar] = useState(true);

  // display responses one by one
  const [showSecondResponse, setShowSecondResponse] = useState(false); 
  const [firstResponseComplete, setFirstResponseComplete] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false); // image pop up
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // check if mobile device

  const [showMemeAlert, setShowMemeAlert] = useState(false);

  const handleMemeAlert = () => {
    setShowMemeAlert(true);
    setTimeout(() => {
      setShowMemeAlert(false);
    }, 3000);
  };

  useEffect(() => {
    if (textResponse?.blue_response) {
      setFirstResponseComplete(false);
      setShowSecondResponse(false); // Reset showSecondResponse to false when a new response is received
    }
  }, [textResponse]);

  const handleSubmit = async (query) => {
    handleMemeAlert(); 
    setShowQueryForm(false);  
    setTextLoading(true);
    setImageLoading(true);
    setError(null);
    setTextResponse(null);
    setImageResponse(null);
  
    try {
      const textPromise = processQuery(query);
  
      // update UI with text as soon as possible
      textPromise.then(textResult => {
        setTextResponse({blue_response: textResult.blue_response, blue_link: textResult.blue_link});
        setTextLoading(false);
        if (!isMobile)
          setShowAppBar(false);

        // Set red response after a delay
        if(!isMobile)
          setTimeout(() => {
            setTextResponse(textResult);
          }, 4000);
        else
          setTextResponse(textResult);

        // start image gen after the text available
        generateImage(query, textResult).then(imageResult => {
          handleMemeAlert(); // Trigger meme alert
          setImageResponse(imageResult);
          setImageLoading(false);
          setShowQueryForm(true); // Show query form again
          setShowAppBar(true); // show app bar again
        }).catch(err => {
          console.error('Image generation error:', err);
          setError('Image generation failed, but text is available.');
          setImageLoading(false);
          setShowQueryForm(true);
          setShowAppBar(true);
        });
      }).catch(err => {
        setError(err.message);
        setTextLoading(false);
        setImageLoading(false);
        setShowQueryForm(true);
        setShowAppBar(true);
      });
  
    } catch (err) {
      setError(err.message);
      setTextLoading(false);
      setImageLoading(false);
      setShowAppBar(true);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container maxWidth="lg" sx={{ px: isMobile ? 1 : 2 }}>
        <Box 
          my={4} 
          sx={{ 
            overflowY: 'auto', 
            height: isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 100px)',
            paddingBottom: isMobile ? theme.spacing(8) : theme.spacing(12),
            
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              outline: '1px solid slategrey'
            }
          }}
        >
      
      <Box>
        {textResponse?.blue_response && (
          <>
            <ResponseDisplay 
              response={textResponse?.blue_response}
              link={textResponse?.blue_link}
              error={error}
              isBlue={true}
            />
            <Divider sx={{ my: 4 }} />
          </>
        )}
        {textResponse?.red_response && (
          <ResponseDisplay 
            response={textResponse?.red_response}
            link={textResponse?.red_link}
            error={error}
            isBlue={false}
          />
        )}
      </Box>

          {imageLoading && (
            <Box mt={2} mb={4} display="flex" justifyContent="center">
              <LoadingSpinner />
            </Box>
          )}
          {imageResponse && !imageLoading && (
            <Box mt={2} mb={4} display="flex" justifyContent="center">
              <Image
                src={imageResponse.meme}
                alt="Generated Meme"
                width={600}
                height={600}
                layout="intrinsic"
                onClick={handleOpenModal}
                style={{ cursor: 'pointer' }}
              />
            </Box>
          )}
        </Box>
        <Box
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: isMobile ? '80px' : '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            transition: 'opacity 0.3s ease-in-out',
            opacity: showQueryForm || isHovering ? 1 : 0,
          }}
        >
          <QueryForm onSubmit={handleSubmit} showForm={showQueryForm} />
        </Box>
      </Container>
      <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="image-modal"
          aria-describedby="generated-meme-image"
        >
          <Box sx={{
            width: isMobile ? '90%' : 'auto',
            '& img': {
              width: '100%',
              height: '100%',
            },
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Image
              src={imageResponse?.meme}
              alt="Generated Meme"
              width={600}
              height={600}
              layout="intrinsic"
            />
            <Box mt={2}>
              <DropdownShareButton imageUrl={imageResponse?.meme} />
            </Box>
          </Box>
        </Modal>
        {/* <Slide direction="down" in={showMemeAlert} mountOnEnter unmountOnExit>
          <Box
            sx={{
              position: 'fixed',
              top: theme.spacing(2),
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Alert 
              severity="info" 
              icon={false}
              sx={{ 
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontWeight: 'bold',
                '& .MuiAlert-message': {
                  padding: '6px 6px',
                },
                maxWidth: '50%',  // Limit width on smaller screens
                width: 'auto',    // Allow content to determine width
              }}
            >
              Scroll!
            </Alert> //TODO: Fix the scroll for meme popup
          </Box>
        </Slide> */}
    </ThemeProvider>
  );
}
