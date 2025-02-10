import Axios from 'axios';

const API_URL = 'http://localhost:3001';

export const registerUser = async (user) => {
    try {
        const response = await Axios.post(`${API_URL}/auth/register`, user);

        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data?.error || error.message);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await Axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data?.error || error.message);
        throw error;
    }
};

export const getQuizzes = async () => {
    try {
        const response = await Axios.get(`${API_URL}/quizzes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return []; // Return an empty array to prevent Vue errors
    }
};

export const getQuizById = async (id) => {
    try {
        const response = await Axios.get(`${API_URL}/quizzes/${id}`);
        
        return response.data;
    } catch (error) {
        console.error('Error fetching a quiz:', error);
        return []; // Return an empty array to prevent Vue errors
    }

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

export const submitQuiz = async (quizId, selectedAnswers) => {
    try {
        const response = await Axios.post(`${API_URL}/quizzes/${quizId}/submit`, { answers: selectedAnswers });
        return response.data;
    } catch (error) {
        console.error('Error submitting quiz:', error);
        throw error;
    }
};

export default { registerUser, getQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz, loginUser};