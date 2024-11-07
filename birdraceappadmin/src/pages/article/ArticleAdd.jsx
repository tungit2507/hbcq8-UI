import React, { useState } from 'react';
import { CForm, CFormInput, CButton, CFormLabel, CCard, CCardBody, CCardHeader } from '@coreui/react'; // Sửa CLabel thành CFormLabel
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for Quill
import { useDropzone } from 'react-dropzone';
import { addArticle } from '../../api/articleApi';

const ArticleAdd = () => {
    const [newArticle, setNewArticle] = useState({ title: '', description: '', content: '', image: null });

    const onDrop = (acceptedFiles) => {
        setNewArticle({ ...newArticle, image: acceptedFiles[0] });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleAddArticle = async (e) => {
        e.preventDefault();
        // Validate title
        if (!newArticle.title) {
            Swal.fire('Lỗi', 'Tiêu đề không được bỏ trống.', 'error');
            return;
        }
        if (newArticle.title.length > 255) {
            Swal.fire('Lỗi', 'Tiêu đề không được quá 255 ký tự.', 'error');
            return;
        }
        // Validate content
        if (!newArticle.content || newArticle.content.trim() === '') {
            Swal.fire('Lỗi', 'Nội dung không được bỏ trống.', 'error');
            return;
        }
        const formData = new FormData();
        formData.append('categoryId', 1);
        formData.append('title', newArticle.title);
        formData.append('content', newArticle.content);
        formData.append('imgUrl', "");
        
        await addArticle(formData);
        // Xử lý thêm bài viết mới
        console.log('Bài viết mới đã được thêm:', newArticle);
        Swal.fire('Thành công!', 'Bài viết đã được thêm.', 'success');
        setNewArticle({ title: '', description: '', content: '', image: null });
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }], // Căn lề tiêu đề
            ['bold', 'italic', 'underline'], // Định dạng chữ
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Danh sách
            [{ 'color': [] }, { 'background': [] }], // Màu chữ và nền
            [{ 'align': [] }],
            ['link'],
            [{ 'image': ['resize'] }], // Cho phép chỉnh lại size ảnh
            ['clean'],
            [{ 'align': [] }], // Thêm tính năng căn lề text
        ],
    };

    return (
        <div className="article-add-container mx-2">
            <CCard>
                <CCardHeader>
                    <h3 className='text-center'>Thêm Bài Viết Mới</h3>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleAddArticle}>
                        <CFormLabel htmlFor="title">Tiêu đề</CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Nhập Tiêu Đề"
                            value={newArticle.title}
                            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                        />
                        {/* <CFormLabel htmlFor="description">Mô tả</CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Nhập Mô tả"
                            value={newArticle.description}
                            onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                        /> */}
                        <CFormLabel htmlFor="description">Nội Dung Bài Viết</CFormLabel>                
                        <ReactQuill 
                            className="quill-editor rounded-circle bg-light"
                            value={newArticle.content}
                            onChange={(content) => setNewArticle({ ...newArticle, content })}
                            placeholder="Soạn thảo nội dung bài viết..."
                            modules={modules}
                        />
                        <div className="d-flex justify-content-center my-4">
                            <CButton type="submit" color="primary">Thêm Bài Viết</CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </div>
    );
};

export default ArticleAdd;
