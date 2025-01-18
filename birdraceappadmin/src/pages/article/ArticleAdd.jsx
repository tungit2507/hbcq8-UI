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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = (acceptedFiles) => {
    setNewArticle({ ...newArticle, image: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewArticle({ ...newArticle, image: file, previewImage: previewUrl });
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    if (!newArticle.image) {
      Swal.fire('Lỗi', 'Hình ảnh không được bỏ trống.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!newArticle.title) {
      Swal.fire('Lỗi', 'Tiêu đề không được bỏ trống.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (newArticle.title.length > 255) {
      Swal.fire('Lỗi', 'Tiêu đề không được quá 255 ký tự.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!newArticle.content || newArticle.content.trim() === '') {
      Swal.fire('Lỗi', 'Nội dung không được bỏ trống.', 'error');
      setIsSubmitting(false);
      return;
    }

    let imgUrl = newArticle.previewImage;
    if (newArticle.image) {
      try {
        imgUrl = await uploadFile(newArticle.image);
      } catch (error) {
        console.error('Error uploading image:', error);
        Swal.fire('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại sau.', 'error');
        setIsSubmitting(false);
        return;
      }
    }

    const articleData = {
      ...newArticle,
      imgUrl,
    };

    try {
      await addArticle(articleData);
      Swal.fire('Thành công', 'Bài viết đã được tạo.', 'success');
      navigate('/management/article/list');
    } catch (error) {
      console.error('Error creating article:', error);
      Swal.fire('Lỗi', 'Không thể tạo bài viết. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsSubmitting(false);
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
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
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
              <CButton type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Đang xử lý...' : 'Thêm Bài Viết'}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ArticleAdd;