/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

// created for 7.4
export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};
