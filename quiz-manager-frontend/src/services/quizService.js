import Axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getQuizzes = async () => {
    const response = await Axios.get(`${API_URL}/quizzes`);
    return response.data;
};

export const getQuizById = async (id) => {
    const response = await Axios.get(`${API_URL}/quizzes/${id}`);
    return response.data;
};

export const createQuiz = async (quiz) => { 
    const response = await Axios.post(`${API_URL}/quizzes`, quiz);
    return response.data;
};

export const updateQuiz = async (quiz) => {
    const response = await Axios.put(`${API_URL}/quizzes/${quiz.id}`, quiz);
    return response.data;
};

export const deleteQuiz = async (id) => {
    const response = await Axios.delete(`${API_URL}/quizzes/${id}`);
    return response.data;
};