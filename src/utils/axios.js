import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const axiosGet = (url, config = {}) => {
  return axiosInstance.get(url, config);
};

export const axiosPost = (url, data = {}, config = {}) => {
  return axiosInstance.post(url, data, config);
};

export const axiosPut = (url, data = {}, config = {}) => {
  return axiosInstance.put(url, data, config);
};

export const axiosPatch = (url, data = {}, config = {}) => {
  return axiosInstance.patch(url, data, config);
};

export const axiosDelete = (url, config = {}) => {
  return axiosInstance.delete(url, config);
};

export default axiosInstance;
