import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Share as ShareIcon, Save as SaveIcon } from '@mui/icons-material';
import { 
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import SmsIcon from '@mui/icons-material/Sms';
import { saveAs } from 'file-saver';
import { useTheme, useMediaQuery } from '@mui/material';

const DropdownShareButton = ({ imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shareUrl = imageUrl || window.location.href;
  const title = 'Check out this meme!';

  const handleShareClick = (platform) => {
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:&body=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`, '_blank');
        break;
    }
    handleClose();
  };
  
  const handleSaveImage = () => {
    if (imageUrl) {
      if (isMobile) {
        // For mobile devices, we'll use the Web Share API if available
        if (navigator.share) {
          fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
              const file = new File([blob], 'politix-meme.jpg', { type: 'image/jpeg' });
              navigator.share({
                files: [file],
                title: 'Politix Meme',
                text: 'Check out this meme!',
              }).then(() => {
                console.log('Successful share');
              }).catch((error) => {
                console.log('Error sharing', error);
              });
            });
        } else {
          // Fallback for mobile devices that don't support Web Share API
          window.open(imageUrl, '_blank');
        }
      } else {
        // For desktop, use file-saver as before
        saveAs(imageUrl, 'politix-meme.jpg');
      }
    }
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={<ShareIcon />}
      >
        Share
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            padding: '0.5rem',
          },
        }}
      >
        <MenuItem onClick={() => handleShareClick('facebook')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FacebookIcon size={32} round />
          Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShareClick('twitter')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TwitterIcon size={32} round />
          Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShareClick('whatsapp')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WhatsappIcon size={32} round />
          WhatsApp
        </MenuItem>
        <MenuItem onClick={handleSaveImage} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SaveIcon size={32} />
          {isMobile ? 'Save to Camera Roll' : 'Save Image'}
        </MenuItem>
        <MenuItem onClick={() => handleShareClick('sms')} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SmsIcon size={32} />
          iMessage
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownShareButton;