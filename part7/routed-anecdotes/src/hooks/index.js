/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

// created for 7.4
// updated for 7.5
export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearField = () => {
    setValue('');
  };

  return {
    type, value, onChange, clearField,
  };
};
