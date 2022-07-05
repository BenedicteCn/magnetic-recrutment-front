import axios from "axios";
import { API_URL } from "./constants";

const service = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const makeRequest = ({ token, headers = [], ...other }) => {
  return service.request({
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    ...other,
  });
};

export default makeRequest;
