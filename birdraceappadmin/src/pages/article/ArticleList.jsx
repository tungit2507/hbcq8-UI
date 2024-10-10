import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput } from '@coreui/react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { fetchArticles, deleteArticle } from '../../api/ArticleApi';

const ArticleList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const sampleArticles = [
        { id: 1, title: "Bài viết 1", description: "Mô tả ngắn của bài viết 1", content: "Nội dung bài viết 1", status: "Hoạt động", imageUrl: "https://example.com/image1.jpg", createdAt: new Date(), author: "Tác giả 1" },
        { id: 2, title: "Bài viết 2", description: "Mô tả ngắn của bài viết 2", content: "Nội dung bài viết 2", status: "Hoạt động", imageUrl: "https://example.com/image2.jpg", createdAt: new Date(), author: "Tác giả 2" },
        { id: 3, title: "Bài viết 3", description: "Mô tả ngắn của bài viết 3", content: "Nội dung bài viết 3", status: "Hoạt động", imageUrl: "https://example.com/image3.jpg", createdAt: new Date(), author: "Tác giả 3" },
        { id: 4, title: "Bài viết 4", description: "Mô tả ngắn của bài viết 4", content: "Nội dung bài viết 4", status: "Hoạt động", imageUrl: "https://example.com/image4.jpg", createdAt: new Date(), author: "Tác giả 4" },
        { id: 5, title: "Bài viết 5", description: "Mô tả ngắn của bài viết 5", content: "Nội dung bài viết 5", status: "Hoạt động", imageUrl: "https://example.com/image5.jpg", createdAt: new Date(), author: "Tác giả 5" },
      ];
      setArticles(sampleArticles);
    setCurrentPage(1);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (articleId) => {
    Swal.fire({
      title: 'Bạn có chắc muốn xóa bài viết này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await deleteArticle(articleId);
        // setArticles(articles.filter(article => article.id !== articleId));
        Swal.fire('Đã xóa!', 'Bài viết đã bị xóa.', 'success');
      }
    });
  };

  return (
    <div className="p-3 rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="mb-2 mb-md-0">Danh Sách Bài Viết</h3>
        <CForm className="d-flex flex-grow-1" style={{ maxWidth: "500px" }}>
          <CFormInput
            type="text"
            placeholder="Tìm kiếm theo tiêu đề bài viết..."
            value={searchTerm}
            onChange={handleSearch}
            className="me-2"
          />
          <CButton color="primary">Tìm Kiếm</CButton>
        </CForm>
      </div>
      <hr />

      <div className="table-responsive">
        <CTable className="table-bordered rounded table-striped text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Tiêu Đề</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mô Tả</CTableHeaderCell>
              <CTableHeaderCell scope="col">Trạng Thái</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hình Ảnh</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Tạo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tác Giả</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map(article => (
              <CTableRow key={article.id}>
                <CTableDataCell>{article.title}</CTableDataCell>
                <CTableDataCell>{article.description}</CTableDataCell>
                <CTableDataCell>{article.status}</CTableDataCell>
                <CTableDataCell><img src={article.imageUrl} alt={`Hình ảnh của ${article.title}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></CTableDataCell>
                <CTableDataCell>{new Date(article.createdAt).toLocaleString('vi-VN')}</CTableDataCell>
                <CTableDataCell>{article.author}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => handleDelete(article.id)}>Xóa</CButton>
                  <Link to={`/article/${article.id}`} style={{ marginLeft: '8px' }}><CButton color="success">Xem</CButton></Link>
                  <Link to={`/edit-article/${article.id}`} style={{ marginLeft: '8px' }}><CButton color="info">Chỉnh Sửa</CButton></Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <hr />
      <div className="d-flex justify-content-center mt-4">
        <CPagination aria-label="Điều hướng trang">
          <CPaginationItem 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </CPaginationItem>
          {[...Array(Math.ceil(articles.length / itemsPerPage)).keys()].map(number => (
            <CPaginationItem
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
            >
              {number + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(articles.length / itemsPerPage)}
          >
            Tiếp
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  );
};

export default ArticleList;
