const axios = require("axios");

const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: { 'x-api-key': '6b3cb058-7be4-41f6-a087-f5a8571e6d6e' }
});

module.exports = api;