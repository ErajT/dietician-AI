// app/components/Glassmorphism.jsx
import React from 'react';

const Glassmorphism = ({ children, style }) => {
  return (
    <div
      style={{
        ...style,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '20px',
      }}
    >
      {children}
    </div>
  );
};

export default Glassmorphism;
