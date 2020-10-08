import React from 'react';

// created for exercise 2.10
const Notification = ({ message }) => {
  if (message[0] === null) return null;
  else {
    if (message[1] === 'S') {
      return (
        <h2 className="notification-success">{ message[0] }</h2>
      );
    } else {
      return (
        <h2 className="notification-error">{ message[0] }</h2>
      );
    }
  }
}

export default Notification;