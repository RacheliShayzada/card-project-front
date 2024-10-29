import api from './axios.js';

export const getCards = async () => {
    try {
        const response = await api.get('/cards');
        return response.data;
    } catch (error) {
        console.log("Failed to fetch cards:", error);
    }
};

export const getCardById = async (id) => {
    try {
        const response = await api.get(`/cards/${id}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to fetch card with id ${id}:`, error);
    }
};

export const createCard = async (card) => {
    try {
        const response = await api.post('/cards', card);
        return response.data;
    } catch (error) {
        console.log("Failed to create card:", error);
    }
};

export const updateCard = async (id, updatedData) => {
    try {
        const response = await api.patch(`/cards/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.log(`Failed to update card with id ${id}:`, error);
    }
};

export const deleteCard = async (id) => {
    try {
        const response = await api.delete(`/cards/${id}`);
        return response.data;
    } catch (error) {
        console.log(`Failed to delete card with id ${id}:`, error);
    }
};
