import axiosInstance from "./api";
import { showErrorNotification } from "./sweetAlertNotify";

const BASE_URL_RACE_REGISTRATION = "/api/v1/admin/tour-apply";
const BASE_URL_RACE_REGISTRATION_NONE_ADMIN = "/api/v1/tour-apply";

export const fetchRaceRegistrationByRaceId = async (raceId) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_RACE_REGISTRATION}/${raceId}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin địa điểm cuộc đua:', error);
        showErrorNotification('Mã cuộc đua không tồn tại');
    }
};


export const approveRaceRegistration = async (dto) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_RACE_REGISTRATION}/approve`, dto, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi duyệt đăng ký:', error);
        showErrorNotification('Lỗi khi duyệt đăng ký');
    }
};




