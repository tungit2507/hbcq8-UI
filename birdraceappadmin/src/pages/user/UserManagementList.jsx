import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput } from "@coreui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import exampleImage1 from './../../assets/images/avatars/1.jpg';
import Swal from 'sweetalert2';
import { deleteUser, changeRole, getListUser } from '../../api/UserApi';
import { showErrorNotification } from '../../api/SweetAlertNotify';

const UserManagementList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getListUser();
        setFilteredUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    navigate(`?page=${pageNumber}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = filteredUsers.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    navigate('?page=1');
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa người dùng này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire('Xóa thành công!', 'Người dùng đã được xóa.', 'success');
        const updatedUsers = await getListUser();
        setFilteredUsers(updatedUsers);
      } catch (error) {
        const errorMessage = error.response.data.errorMessage;
        showErrorNotification(errorMessage || "Lỗi! Không thể xóa người dùng.")
      }
    }
  };

  const handleChangeRole = async (id) => {
    const result = await Swal.fire({
      title: 'Thay đổi vai trò',
      text: 'Chọn vai trò mới cho người dùng này:',
      input: 'select',
      inputOptions: {
        'Admin': 'Admin',
        'User': 'User'
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      const newRole = result.value;
      try {
        await changeRole(id, newRole);
        Swal.fire('Thay đổi thành công!', 'Vai trò của người dùng đã được thay đổi.', 'success');
        const updatedUsers = await getListUser();
        setFilteredUsers(updatedUsers);
      } catch (error) {
        console.error('Error changing user role:', error);
        Swal.fire('Lỗi!', 'Không thể thay đổi vai trò của người dùng. Vui lòng thử lại.', 'error');
      }
    }
  };

  return (
    <div className="p-3 rounded">
      {/* Title and Search Form */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="mb-2 mb-md-0">Danh Sách Thành Viên</h3>
        <CForm className="d-flex" style={{ maxWidth: "400px", width: "100%" }}>
          <CFormInput
            type="search"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ borderRadius: '0.25rem', border: '1px solid #ced4da', padding: '0.375rem 0.75rem' }}
            className="me-2 flex-grow-1"
          />
          <CButton color="primary" onClick={handleSearch} style={{ borderRadius: '0.25rem', padding: '0.375rem 0.75rem' }}>Tìm Kiếm</CButton>
        </CForm>
      </div>
      <hr className="my-4" />

      {/* Responsive Table */}
      <div className="table-responsive">
        <CTable className="table-bordered rounded table-striped text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hình Ảnh</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tên Đăng Nhập</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Số Điện Thoại</CTableHeaderCell>
              <CTableHeaderCell scope="col">Địa Chỉ</CTableHeaderCell>
              <CTableHeaderCell scope="col">Vai Trò</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentUsers.map(user => (
              <CTableRow key={user.id}>
                <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                <CTableDataCell>
                  <img
                    src={exampleImage1}
                    alt="Profile"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                  />
                </CTableDataCell>
                <CTableDataCell>{user.username}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.address}</CTableDataCell>
                <CTableDataCell>{user.roleId=== 1?"Admin":"User"}</CTableDataCell>
                <CTableDataCell>
                  <Link className="m-1 btn btn-success" to={`/management/facility/list?user=${user.id}`}>Quản Lý Căn Cứ</Link>
                  <Link className="m-1 btn btn-primary" to={`/management/user/update?id=${user.id}`}>Chỉnh Sửa</Link>
                  <CButton className='m-1' color="info" onClick={() => handleChangeRole(user.id)}>Phân Quyền</CButton>
                  <CButton className='m-1' color="danger" onClick={() => handleDelete(user.id)}>Xóa</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <hr className="my-4" />
      <div className="d-flex justify-content-center mt-4">
        <CPagination aria-label="Page navigation example">
          <CPaginationItem 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </CPaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <CPaginationItem
              key={index}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </CPaginationItem>
          ))}
          <CPaginationItem
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Tiếp
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  );
};

export default UserManagementList;