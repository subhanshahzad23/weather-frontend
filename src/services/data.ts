import { backendURL } from "./backendURL";
import axios from "axios";
const URL = backendURL + "/data";


export const getAllBlogs = async () => {
    try {
        const response = await axios.get(`${URL}/blogs`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all blogs:", error);
        throw error;
    }
};

export const getAllNews = async () => {
    try {
        const response = await axios.get(`${URL}/news`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all news:", error);
        throw error;
    }
};

export const getBlogById = async (id: string) => {
    try {
        const response = await axios.get(`${URL}/blogs/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog by ID:", error);
        throw error;
    }
};

export const getNewsById = async (id: string) => {
    try {
        const response = await axios.get(`${URL}/news/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching news by ID:", error);
        throw error;
    }
};
