import React, { useMemo, useRef, useState, useEffect } from 'react';
import { CForm, CFormInput, CButton, CFormLabel, CCard, CCardBody, CCardHeader } from '@coreui/react';
import Swal from 'sweetalert2';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchArticleById, updateArticle } from '../../api/articleApi';
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

const ArticleUpdate = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get('article-id');
  const quillRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [article, setArticle] = useState({
    title: '',
    description: '',
    content: '',
    imgUrl: '',
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetchArticleById(id);
        setArticle({
          title: response.title,
          description: response.description,
          content: response.content,
          imgUrl: response.imgUrl,
        });
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleUpdateArticle = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    if (article.title.length > 255) {
      Swal.fire('Lỗi', 'Tiêu đề không được quá 255 ký tự.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!article.content || article.content.trim() === '') {
      Swal.fire('Lỗi', 'Nội dung không được bỏ trống.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (!article.imgUrl) {
      Swal.fire('Lỗi', 'URL hình ảnh không được bỏ trống.', 'error');
      setIsSubmitting(false);
      return;
    }

    const updatedArticle = {
      ...article,
    };

    updatedArticle.id = id;

    try {
      await updateArticle(id, updatedArticle);
      Swal.fire('Thành công', 'Bài viết đã được cập nhật.', 'success');
      navigate('/management/article/list');
    } catch (error) {
      console.error('Error updating article:', error);
      Swal.fire('Lỗi', 'Không thể cập nhật bài viết. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageHandler = () => {
    Swal.fire({
      title: 'Chèn Đường Dẫn Hình Ảnh',
      input: 'url',
      inputPlaceholder: 'Nhập đường dẫn hình ảnh...',
      showCancelButton: true,
      confirmButtonText: 'Chèn',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const url = result.value;
        if (url && quillRef.current) {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', url, 'user');
        }
      }
    });
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
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
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

            <CFormLabel htmlFor="imgUrl">URL Hình Ảnh</CFormLabel>
            <CFormInput
              type="text"
              placeholder="Nhập URL Hình Ảnh"
              value={article.imgUrl}
              onChange={(e) =>
                setArticle({ ...article, imgUrl: e.target.value })
              }
            />
            {article.imgUrl && (
              <div className="image-preview mt-3">
                <img
                  src={article.imgUrl}
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
              <CButton type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Đang xử lý...' : 'Cập Nhật Bài Viết'}
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ArticleUpdate;