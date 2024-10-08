import axiosInstance from "./api";
import Swal from "sweetalert2";

const BASE_URL_ARTICLES = '/api/v1/admin/articles'; // Thay đổi đường dẫn cho phù hợp

// Lấy danh sách bài viết
export const fetchArticles = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_ARTICLES}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        Swal.fire('Lỗi', 'Không thể lấy danh sách bài viết. Vui lòng thử lại sau.', 'error');
    }
};

// Thêm bài viết
export const addArticle = async (articleData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL_ARTICLES}`, articleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding article:', error);
        Swal.fire('Lỗi', 'Không thể thêm bài viết. Vui lòng thử lại sau.', 'error');
    }
};

// Lấy bài viết theo ID
export const fetchArticleById = async (id) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL_ARTICLES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching article:', error);
        Swal.fire('Lỗi', 'Không thể lấy thông tin bài viết. Vui lòng thử lại sau.', 'error');
    }
};

// Cập nhật bài viết
export const updateArticle = async (id, articleData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL_ARTICLES}/${id}`, articleData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating article:', error);
        Swal.fire('Lỗi', 'Không thể cập nhật bài viết. Vui lòng thử lại sau.', 'error');
    }
};

// Xóa bài viết
export const deleteArticle = async (id) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL_ARTICLES}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting article:', error);
        Swal.fire('Lỗi', 'Không thể xóa bài viết. Vui lòng thử lại sau.', 'error');
    }
};
