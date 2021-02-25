import React, { useState, useImperativeHandle, forwardRef } from 'react';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisible = () => setVisible(!visible);
  // making toggleVisible accesible outside the component
  useImperativeHandle(ref, () => ({ toggleVisible }));

  return (
    <div className="togglable-container">
      <button className="toggle-button" style={hideWhenVisible} onClick={toggleVisible}>{props.buttonLabel}</button>
      <div className="togglable-visible" style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>Cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
