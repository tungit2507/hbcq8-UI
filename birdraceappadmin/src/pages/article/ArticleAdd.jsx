import React, { useState } from 'react';
import { CForm, CFormInput, CButton, CFormLabel, CCard, CCardBody, CCardHeader } from '@coreui/react'; // Sửa CLabel thành CFormLabel
import Swal from 'sweetalert2';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for Quill
import { useDropzone } from 'react-dropzone';

const ArticleAdd = () => {
    const [newArticle, setNewArticle] = useState({ title: '', description: '', content: '', image: null });

    const onDrop = (acceptedFiles) => {
        setNewArticle({ ...newArticle, image: acceptedFiles[0] });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleAddArticle = (e) => {
        e.preventDefault();
        // Xử lý thêm bài viết mới
        console.log('Bài viết mới đã được thêm:', newArticle);
        Swal.fire('Thành công!', 'Bài viết đã được thêm.', 'success');
        setNewArticle({ title: '', description: '', content: '', image: null }); // Reset form
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
                        <CFormLabel htmlFor="description">Mô tả</CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Nhập Mô tả"
                            value={newArticle.description}
                            onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                            required
                        />
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
