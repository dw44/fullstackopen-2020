import React from 'react';
import classes from './Notfication.module.css';

// added for 5.4
const Notification = ({ message, type }) => (
  <div id="notification" className={type === 'error' ? classes.Error : classes.Success}>
    <p id="notification-message">{ message }</p>
  </div>
);

export default Notification;
