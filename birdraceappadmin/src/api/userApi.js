import { toast } from "react-toastify";
import axiosInstance from "./Api";
import { showErrorNotification } from "./SweetAlertNotify";


const BASE_URL_USERS = '/api/v1/admin/user';
const BASE_URL_LOGIN = '/api/v1/login';
const BASE_URL_LOGOUT = '/api/v1/logout';

export const getListUser = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_USERS}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getOneUser = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}


export const addOneUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_USERS}`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};





export const updateUser = async (id,userData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL_USERS}/${id}`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.errorMessage || "Đã xảy ra lỗi";
        console.log(errorMessage);
    }
};


export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL_USERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export const login = async (loginData) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL_LOGIN}`, loginData);
      return response.data;
    } catch (error) {
        const errorMessage = null;
        showErrorNotification(errorMessage || "Lỗi khi đăng nhập");
    }
};

export const logout = async () => {
    localStorage.removeItem('currentUser');
    try {
        const response = await axiosInstance.get(`${BASE_URL_LOGOUT}`);
        return response.data;
    } catch (error) {
        showErrorNotification("Lỗi khi đăng xuất");
    }
}

export const addUser = async (userData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_USERS}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}


export const changeRole =  async (id, role) =>{
    console.log(id);
    console.log(role);
}
