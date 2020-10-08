import React from 'react';

// created for exercise 2.10
const Notification = ({ message }) => {
  if (message === null) return null;

  return (
    <h2 className="notification">{ message }</h2>
  );
}

export default Notification;