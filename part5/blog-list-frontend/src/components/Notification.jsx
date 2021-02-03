import React from 'react';
import './components.css';

const Notification = ({ text, type }) => (
  <div 
    style={{
      backgroundColor: (type === 0) ? 'red' : 'green',
      padding: '10px',
      marginBottom: '10px',
      fontSize: '1.5em',
      color: '#fff',
      borderRadius: '10px',
    }}
    id="notification"
  >
    {text}
  </div>
);

export default Notification;
