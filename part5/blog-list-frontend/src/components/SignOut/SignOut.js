import React from 'react';
import classes from './SignOut.module.css';

const SignOut = ({ user, signOut }) => (
  <div className={classes.User}>
    <p>
      { user.name }
      {' '}
      logged in!
    </p>
    <button className={classes.SignOut} onClick={signOut}>Sign Out</button>
  </div>
);

export default SignOut;
