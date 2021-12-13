const axios = require("axios").default;
import { mapCategories, mapBreeds } from "./mapper";

export const getImages = (params) => {
  return axios.post("api/images/search", params).then((res) => res.data);
};

export const getImage = (id) => {
  return axios.get(`/api/images/${id}`).then((res) => res.data);
};

export const getCategories = () => {
  return axios.get(`/api/categories`).then((res) => mapCategories(res.data));
};

export const getBreeds = () => {
  return axios.get(`/api/breeds`).then((res) => mapBreeds(res.data));
};
