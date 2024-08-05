// components/DropdownShareButton.js
import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Share as ShareIcon, Save as SaveIcon } from '@mui/icons-material';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  // Uncomment the next line if you have a custom iMessageIcon or use an appropriate icon
  // iMessageIcon
} from 'react-share';

// Replace the following with an appropriate icon or your custom icon
import SmsIcon from '@mui/icons-material/Sms';

const DropdownShareButton = ({ imageUrl }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shareUrl = imageUrl || window.location.href;
  const title = 'Check out this meme!';

  const handleShareClick = (event, url) => {
    event.preventDefault();
    window.open(url, '_blank');
  };

  const handleSaveImage = () => {
    // Function to save the image
    const link = document.createElement('a');
    link.href = shareUrl;
    link.download = 'meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        <MenuItem onClick={handleClose} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
              onClick={(e) => handleShareClick(e, `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)} 
              style={{ display: 'none' }}
            >
              Share on Facebook
            </a>
          </FacebookShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
            <a 
              href={`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`} 
              onClick={(e) => handleShareClick(e, `https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`)} 
              style={{ display: 'none' }}
            >
              Share on Twitter
            </a>
          </TwitterShareButton>
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round />
            <a 
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`} 
              onClick={(e) => handleShareClick(e, `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`)} 
              style={{ display: 'none' }}
            >
              Share on WhatsApp
            </a>
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem onClick={handleSaveImage} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SaveIcon size={32} round />
          Save Image
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a 
            href={`sms:&body=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`} 
            onClick={(e) => handleShareClick(e, `sms:&body=${encodeURIComponent(title)}%20${encodeURIComponent(shareUrl)}`)} 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}
          >
            <SmsIcon size={32} round />
            Share on iMessage
          </a>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownShareButton;
