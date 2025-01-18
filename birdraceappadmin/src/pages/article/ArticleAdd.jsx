import React, { useMemo, useRef, useState } from 'react';
import { CForm, CFormInput, CButton, CFormLabel, CCard, CCardBody, CCardHeader } from '@coreui/react';
import Swal from 'sweetalert2';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { addArticle } from '../../api/articleApi';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../api/uploadFileApi';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const ArticleAdd = () => {
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const [newArticle, setNewArticle] = useState({
        title: '',
        description: '',
        content: '',
        image: null,
        previewImage: null,
    });

    const onDrop = (acceptedFiles) => {
        setNewArticle({ ...newArticle, image: acceptedFiles[0] });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewArticle({ ...newArticle, image: file, previewImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddArticle = async (e) => {
        e.preventDefault();
        if (newArticle.title.length > 255) {
            Swal.fire('Lỗi', 'Tiêu đề không được quá 255 ký tự.', 'error');
            return;
        }
        if (!newArticle.content || newArticle.content.trim() === '') {
            Swal.fire('Lỗi', 'Nội dung không được bỏ trống.', 'error');
            return;
        }
        let imageURL = '';
        try {
            imageURL = await uploadFile(newArticle.image);
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại sau.', 'error');
            return;
        }
        const formData = new FormData();
        formData.append('categoryId', 1);
        formData.append('title', newArticle.title);
        formData.append('content', newArticle.content);
        formData.append('imgUrl', imageURL);
        try {
            await addArticle(formData);
        } catch (error) {
            console.error('Error adding article:', error);
        }
        navigate('/management/article/list');
    };

    const handleImageUpload = async (file) => {
        const link = await uploadFile(file);
        return link;
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const link = await handleImageUpload(file);
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                const range = quill.getSelection(true);
                if (range) {
                    quill.insertEmbed(range.index, 'image', link);
                    quill.setSelection(range.index + 1);
                } else {
                    Swal.fire('Lỗi', 'Không thể chèn hình ảnh vào vị trí hiện tại.', 'error');
                }
            } else {
                Swal.fire('Lỗi', 'Quill editor chưa được khởi tạo.', 'error');
            }
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['link', 'image'],
                    ['clean'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize']
            }
        }),
        []
    );

    return (
        <div className="article-add-container mx-2">
            <CCard>
                <CCardHeader>
                    <h3 className="text-center">Thêm Bài Viết Mới</h3>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleAddArticle}>
                        <CFormLabel htmlFor="title">Tiêu đề</CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Nhập Tiêu Đề"
                            value={newArticle.title}
                            onChange={(e) =>
                                setNewArticle({ ...newArticle, title: e.target.value })
                            }
                        />

                        <CFormLabel htmlFor="image">Hình Ảnh</CFormLabel>
                        <CFormInput
                            type="file"
                            placeholder="Hình ảnh"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {newArticle.previewImage && (
                            <div className="image-preview mt-3">
                                <img
                                    src={newArticle.previewImage}
                                    alt="Preview"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '300px',
                                        borderRadius: '5px',
                                    }}
                                />
                            </div>
                        )}

                        <CFormLabel htmlFor="content">Nội Dung Bài Viết</CFormLabel>
                        <ReactQuill
                            ref={quillRef}
                            className="quill-editor"
                            value={newArticle.content}
                            onChange={(content) =>
                                setNewArticle({ ...newArticle, content })
                            }
                            placeholder="Soạn thảo nội dung bài viết..."
                            modules={modules}
                        />

                        <div className="d-flex justify-content-center my-4">
                            <CButton type="submit" color="primary">
                                Thêm Bài Viết
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </div>
    );
};

export default ArticleAdd;