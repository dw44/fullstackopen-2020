/* eslint-disable no-unused-vars */
// created for 7.8. entire module is for 7.8
import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl)
      .then((response) => {
        console.log('getAll Response: ');
        console.log(response);
        setResources(response.data);
        return response;
      })
      .catch((error) => console.log(error));
  }, [baseUrl]);

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then((response) => {
        // console.log('create Response: ');
        // console.log(response.data);
        setResources([...resources, response.data]);
        return response;
      })
      .catch((error) => console.log(error));
  };

  const service = {
    create,
  };

  return [
    resources,
    service,
  ];
};

export default useResource;
