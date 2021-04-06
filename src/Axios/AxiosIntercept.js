import axios from "axios";

const customAxios = axios.create({
  baseURL: `https://todo-api-learning.herokuapp.com/v1/`,
  headers: { "Content-type": "application/json" },
});

customAxios.interceptors.response.use(
  (response) => {
    if (!(response.status === 200 || response.status === 204)) {
      return alert(response.message);
    } else return response;
  },
  (error) => {
    alert(error);
    return error;
  }
);

export default customAxios;
