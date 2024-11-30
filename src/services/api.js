import axios from 'axios';
import {getNowTimestamp} from "./date";

const userName = process.env.REACT_APP_USER_NAME;
const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/${userName}`;

export const getAllPosts = () => axios.get(`${API_BASE_URL}`);
export const getPostById = (id) => axios.get(`${API_BASE_URL}/${id}`);
export const createPost = (data) => axios.post(`${API_BASE_URL}`, {...data, timestamp: getNowTimestamp()});
export const updatePost = (id, data) =>
    axios.put(`${API_BASE_URL}/${id}`, {...data, timestamp: getNowTimestamp()});
export const deletePost = (id) =>
    id ? axios.delete(`${API_BASE_URL}/${id}`) : axios.delete(`${API_BASE_URL}`);
export const generateSampleData = () =>
    axios.get(`${API_BASE_URL}/generateSampleData`);
