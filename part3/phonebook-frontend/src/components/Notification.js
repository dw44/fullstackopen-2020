import React from 'react';

// created for exercise 2.19
const Notification = ({ message }) => {
  if (message[0] === null) return null;

  if (message[1] === 'S') {
    return (
      <h2 className="notification-success">{ message[0] }</h2>
    );
  }
  return (
    <h2 className="notification-error">{ message[0] }</h2>
  );
};

export default Notification;
