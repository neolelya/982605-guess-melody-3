import axios from 'axios';

const StatusCode = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onAuthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    if (err.response.status === StatusCode.UNAUTHORIZED) {
      onAuthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onError);

  return api;
};
