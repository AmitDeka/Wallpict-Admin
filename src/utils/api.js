const { default: axios } = require("axios");

export const api = axios.create({
  baseURL: "https://wallpict-api.vercel.app",
});
