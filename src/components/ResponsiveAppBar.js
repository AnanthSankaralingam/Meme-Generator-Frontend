// app bar at the top of the screen to display instructions, logo and about us
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import { useTheme, useMediaQuery } from '@mui/material';

const pages = ['How To', 'About Us'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openInstruction, setOpenInstruction] = useState(true); //TODO: add effect for modal appearing in
  const [openAbout, setOpenAbout] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // disappearing app bar
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // use MUI breakpoint api to check if screen is small, or a mobile device

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenInstruction = () => setOpenInstruction(true);
  const handleCloseInstruction = () => setOpenInstruction(false);

  const handleOpenAbout = () => setOpenAbout(true);
  const handleCloseAbout = () => setOpenAbout(false);

  const handleOnClick = (page) => {
    if (page === 'How To') {
      handleOpenInstruction();
    } else if (page === 'About Us') {
      handleOpenAbout();
    }
    handleCloseNavMenu();
  };

  // disappearing app bar
  useEffect(() => {
    let timeoutId;
    if (!isHovering) {
      timeoutId = setTimeout(() => {
        setAnchorElNav(null);
      }, 500);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovering]);

  return (
    <Box 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isHovering ? 1 : 0,
        }}
    >
      <AppBar position="static" sx={{ backgroundColor: theme.palette.background.paper }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              onClick={() => handleOnClick('How To')}
              sx={{
                mr: 2,
                flexGrow: { xs: 1, md: 0 },
                fontFamily: 'Quicksand, sans-serif', 
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                fontWeight: 'bold',
                letterSpacing: '.3rem',
                color: theme.palette.primary.main,
                textDecoration: 'none',
              }}
            >
              PolitiMeme
            </Typography>

            {/* Navigation buttons */}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleOnClick(page)}
                  sx={{ 
                    fontFamily: 'Quicksand, sans-serif', 
                    fontSize: { xs: '0.9rem', md: '1.25rem' },
                    fontWeight: 400,
                    my: 2, 
                    color: theme.palette.primary.main, 
                    display: 'block' 
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Menu button for mobile */}
            {isMobile && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Menu for mobile */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleOnClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={openInstruction}
        onClose={handleCloseInstruction}
        aria-labelledby="instruction-modal-title"
        aria-describedby="instruction-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 550 },
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 20,
          p: 4,
        }}>
          <Typography id="instruction-modal-title" align="center" variant="h5">
            How To Use Political Meme Gen 
          </Typography>
          <Typography id="instruction-modal-description" variant = "h6" sx={{ mt: 2 }}>
            <ol>
              <li>Ask how the 2024 election will affect <em>your</em> life</li>
              <li>Get a bulleted answer, backed by sources. Click learn more!</li>
              <li>Scroll down and get a meme.</li>
              <li>Share!</li>
            </ol>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'flex-start' }, mt: 2 }}>
            <Button onClick={handleCloseInstruction}>Close</Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openAbout}
        onClose={handleCloseAbout}
        aria-labelledby="about-modal-title"
        aria-describedby="about-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="about-modal-title"  align="center" variant="h5">
            About Us
          </Typography>
          <Typography id="about-modal-description" variant="h6" sx={{ mt: 2 }}>
            Built by <a href="https://www.linkedin.com/in/ananth-s/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
            Ananth</a> and <a href="https://www.linkedin.com/in/tianqiye1900/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}> Tianqi</a>, for fun.
            Built with <a href='https://glif.app/glifs' target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}> Glif</a>, OctoAI and ChromaDB.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-end', sm: 'flex-start' }, mt: 2 }}>
            <Button onClick={handleCloseAbout}>Close</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ResponsiveAppBar;