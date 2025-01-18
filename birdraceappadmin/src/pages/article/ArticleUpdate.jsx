import React, { useMemo, useRef, useState, useEffect } from 'react';
import { CForm, CFormInput, CButton, CFormLabel, CCard, CCardBody, CCardHeader } from '@coreui/react';
import Swal from 'sweetalert2';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { uploadFile } from '../../api/uploadFileApi';
import { fetchArticleById, updateArticle } from '../../api/articleApi';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const ArticleUpdate = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get('article-id');
    const quillRef = useRef(null);

    const [article, setArticle] = useState({
        title: '',
        description: '',
        content: '',
        image: null,
        previewImage: null,
    });


    const fetchArticle = async () => {
        try {
            const response = await fetchArticleById(id);
            setArticle(() => ({
                ...response,
                previewImage: response.imgUrl,
            }));
            
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };


    useEffect(() => {
       
        fetchArticle();
    }, [id]);

    const onDrop = (acceptedFiles) => {
        setArticle({ ...article, image: acceptedFiles[0] });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setArticle({ ...article, image: file, previewImage: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateArticle = async (e) => {
        e.preventDefault();
        if (article.title.length > 255) {
            Swal.fire('Lỗi', 'Tiêu đề không được quá 255 ký tự.', 'error');
            return;
        }
        if (!article.content || article.content.trim() === '') {
            Swal.fire('Lỗi', 'Nội dung không được bỏ trống.', 'error');
            return;
        }
        let imageURL = article.previewImage;
        try {
            if (article.image) {
                imageURL = await uploadFile(article.image);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại sau.', 'error');
            return;
        }
        const updatedArticle = {
            ...article,
            imgUrl: imageURL,
        };
        try {
            await updateArticle(id, updatedArticle);
            Swal.fire('Thành công', 'Bài viết đã được cập nhật.', 'success');
            navigate('/management/article/list');
        } catch (error) {
            console.error('Error updating article:', error);
            Swal.fire('Lỗi', 'Không thể cập nhật bài viết. Vui lòng thử lại sau.', 'error');
        }
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
        <div className="article-update-container mx-2">
            <CCard>
                <CCardHeader>
                    <h3 className="text-center">Cập Nhật Bài Viết</h3>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleUpdateArticle}>
                        <CFormLabel htmlFor="title">Tiêu đề</CFormLabel>
                        <CFormInput
                            type="text"
                            placeholder="Nhập Tiêu Đề"
                            value={article.title}
                            onChange={(e) =>
                                setArticle({ ...article, title: e.target.value })
                            }
                        />

                        <CFormLabel htmlFor="image">Hình Ảnh</CFormLabel>
                        <CFormInput
                            type="file"
                            placeholder="Hình ảnh"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {article.previewImage && (
                            <div className="image-preview mt-3">
                                <img
                                    src={article.previewImage}
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
                            value={article.content}
                            onChange={(content) =>
                                setArticle({ ...article, content })
                            }
                            placeholder="Soạn thảo nội dung bài viết..."
                            modules={modules}
                        />

                        <div className="d-flex justify-content-center my-4">
                            <CButton type="submit" color="primary">
                                Cập Nhật Bài Viết
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </div>
    );
};

export default ArticleUpdate;