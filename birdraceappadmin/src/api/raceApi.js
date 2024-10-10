
import axiosInstance from "./Api";
import Swal from "sweetalert2";
const BASE_URL_RACES = '/api/v1/admin/tournament';    


export const fetchRaces = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_RACES}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching races:', error);
    }
};

export const addRace = async (raceData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_RACES}`, raceData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding race:', error);
        throw error;
    }
};


export const fetchRaceById = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_RACES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching race:', error);
        throw error;
    }
};



export const updateRace = async (raceData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL_RACES}`, raceData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating race:', error);
        throw error;
    }
};


export const deleteRace = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL_RACES}/delete?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting race:', error);
        Swal.fire('Lỗi', 'Không thể xóa giải đua. Vui lòng thử lại sau.', 'error');
    }
}