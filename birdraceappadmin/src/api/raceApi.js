import axiosInstance from "./api";

const BASE_URL_RACES = '/api/v1/tournament';    


export const fetchRaces = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_RACES}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching races:', error);
        throw error;
    }
};

export const addRace = async (raceData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_RACES}`, raceData);
        return response.data;
    } catch (error) {
        console.error('Error adding race:', error);
        throw error;
    }
};



export const updateRace = async (id, raceData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL_RACES}/${id}`, raceData);
        return response.data;
    } catch (error) {
        console.error('Error updating race:', error);
        throw error;
    }
};


export const deleteRace = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL_RACES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting race:', error);
        throw error;
    }
}