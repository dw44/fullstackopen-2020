// module created for 5.5
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import classes from './Togglable.module.css';

const Togglable = forwardRef((props, ref) => {
  const [childVisible, setChildVisible] = useState(false);

  const toggleVisible = () => setChildVisible(!childVisible);

  useImperativeHandle(ref, () => ({ toggleVisible }));

  return (
    <div className={classes.Main}>
      <button
        className={classes.Toggle}
        style={childVisible ? { display: 'none' } : null}
        onClick={toggleVisible}
      >
        { props.buttonText }
      </button>
      <div
        className={classes.Children}
        style={childVisible ? null : { display: 'none' }}
      >
        { props.children }
      </div>
    </div>
  );
});

export default Togglable;
