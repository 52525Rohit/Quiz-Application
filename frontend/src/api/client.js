import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://quiz-application-3387.onrender.com",
});
