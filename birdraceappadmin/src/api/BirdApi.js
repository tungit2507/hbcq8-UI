import axiosInstance from "./api";
import Swal from "sweetalert2";

const BASE_URL_BIRD = '/api/v1/admin/bird';

export const fetchBirds = async (user) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_BIRD}?user=${user}`);      
        return response.data;
    } catch (error) {
        console.error('Error fetching facilities:', error);
        Swal.fire('Lỗi', 'Không thể lấy danh sách cơ sở. Vui lòng thử lại sau.', 'error');
    }
};

export const addBird = async (facilityData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_BIRD}`, facilityData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding facility:', error);
        throw error;
    }
};

export const fetchBirdById = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_BIRD}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching facility:', error);
        Swal.fire('Lỗi', 'Không thể lấy thông tin cơ sở. Vui lòng thử lại sau.', 'error');
    }
};

export const updateBird = async (id, facilityData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL_BIRD}/${id}`, facilityData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating facility:', error);
        throw error;
    }
};

export const deleteBird = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL_BIRD}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting facility:', error);
        Swal.fire('Lỗi', 'Không thể xóa cơ sở. Vui lòng thử lại sau.', 'error');
    }
};




