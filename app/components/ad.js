import React, { useRef, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MediaCard({ videoUrl, title, description }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure the video plays automatically
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <Card sx={{ maxWidth: 200 }}>
      <video
        ref={videoRef}
        width="auto"
        height="350vh"
        autoPlay // Autoplay the video
        loop // Loop the video
        muted // Mute the video (required for autoplay in many browsers)
        style={{
          borderRadius: '10px 10px 0 0',
          pointerEvents: 'none', // Disable interaction
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <CardContent>
        <a 
          href="https://www.thechefagency.com/" 
          style={{ 
            textDecoration: 'underline', 
            color: 'inherit', 
            display: 'block', // Make the link a block element
          }} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              animation: 'blink 1s infinite', // Apply blinking animation
              fontWeight: 'bold',
              display: 'inline-block',
              textDecoration: 'underline',
            }}
          >
            Get{' '}
            <span
              style={{
                fontSize: '2em', // Make "50" bigger
                color: 'red', 
                
              }}
            >
              50
            </span>{' '}
            % Off
          </Typography>
        </a>
        <Typography variant="body2" color="text.secondary">
          <span >Savor the Flavor:</span> Hire Our Chefs Now and Enhance Your Culinary Experience!
        </Typography>
      </CardContent>
    </Card>
  );
}

// CSS for blinking effect
const css = `
@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
