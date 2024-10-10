import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput } from "@coreui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import exampleImage1 from './../../assets/images/avatars/1.jpg';
import Swal from 'sweetalert2';
import { deleteUser, changeRole } from '../../api/UserApi';





const usersData = [
  { id: 1, username: "Mark", email: "mark@example.com", phone: "1234567890", address: "123 Street", role: "Admin" },
  { id: 2, username: "Otto", email: "otto@example.com", phone: "0987654321", address: "456 Avenue", role: "User" },
  { id: 3, username: "Linh", email: "linh@example.com", phone: "0123456789", address: "789 Road", role: "User" },
  { id: 4, username: "Tuan", email: "tuan@example.com", phone: "9876543210", address: "101 Lane", role: "Admin" },
  { id: 5, username: "Mai", email: "mai@example.com", phone: "5678901234", address: "202 Boulevard", role: "User" },
  { id: 6, username: "Hoa", email: "hoa@example.com", phone: "3456789012", address: "303 Circle", role: "User" },
  { id: 7, username: "Minh", email: "minh@example.com", phone: "7890123456", address: "404 Square", role: "Admin" },
  { id: 8, username: "Anh", email: "anh@example.com", phone: "2345678901", address: "505 Court", role: "User" },
  { id: 9, username: "Duc", email: "duc@example.com", phone: "6789012345", address: "606 Place", role: "User" },
  { id: 10, username: "Lan", email: "lan@example.com", phone: "0123987654", address: "707 Drive", role: "Admin" },
  { id: 11, username: "Thanh", email: "thanh@example.com", phone: "0987654321", address: "808 Avenue", role: "User" },
  { id: 12, username: "Huong", email: "huong@example.com", phone: "0123456789", address: "909 Street", role: "User" },
  { id: 13, username: "Quang", email: "quang@example.com", phone: "9876543210", address: "1010 Road", role: "Admin" },
  { id: 14, username: "Nga", email: "nga@example.com", phone: "5678901234", address: "1111 Lane", role: "User" },
  { id: 15, username: "Tung", email: "tung@example.com", phone: "3456789012", address: "1212 Boulevard", role: "User" },
  { id: 16, username: "Thao", email: "thao@example.com", phone: "7890123456", address: "1313 Circle", role: "Admin" },
  { id: 17, username: "Hung", email: "hung@example.com", phone: "2345678901", address: "1414 Square", role: "User" },
  { id: 18, username: "Yen", email: "yen@example.com", phone: "6789012345", address: "1515 Court", role: "User" },
  { id: 19, username: "Son", email: "son@example.com", phone: "0123987654", address: "1616 Place", role: "Admin" },
  { id: 20, username: "Hien", email: "hien@example.com", phone: "9012345678", address: "1717 Drive", role: "User" },
  { id: 21, username: "Tram", email: "tram@example.com", phone: "0345678901", address: "1818 Avenue", role: "User" },
  { id: 22, username: "Khanh", email: "khanh@example.com", phone: "0567890123", address: "1919 Street", role: "Admin" },
  { id: 23, username: "Phong", email: "phong@example.com", phone: "0789012345", address: "2020 Road", role: "User" },
  { id: 24, username: "Linh", email: "linh@example.com", phone: "0901234567", address: "2121 Lane", role: "User" },
  { id: 25, username: "Trung", email: "trung@example.com", phone: "0123456789", address: "2222 Boulevard", role: "Admin" },
  { id: 26, username: "Mai", email: "mai@example.com", phone: "0234567890", address: "2323 Circle", role: "User" },
  { id: 27, username: "Duc", email: "duc@example.com", phone: "0345678901", address: "2424 Square", role: "User" },
  { id: 28, username: "Hong", email: "hong@example.com", phone: "0456789012", address: "2525 Court", role: "Admin" },
  { id: 29, username: "Tuan", email: "tuan@example.com", phone: "0567890123", address: "2626 Place", role: "User" },
  { id: 30, username: "Lan", email: "lan@example.com", phone: "0678901234", address: "2727 Drive", role: "User" },
  { id: 31, username: "Hoa", email: "hoa@example.com", phone: "0789012345", address: "2828 Avenue", role: "Admin" },
  { id: 32, username: "Minh", email: "minh@example.com", phone: "0890123456", address: "2929 Street", role: "User" },
  { id: 33, username: "Anh", email: "anh@example.com", phone: "0901234567", address: "3030 Road", role: "User" },
  { id: 34, username: "Thanh", email: "thanh@example.com", phone: "0123456789", address: "3131 Lane", role: "Admin" },
  { id: 35, username: "Huong", email: "huong@example.com", phone: "0234567890", address: "3232 Boulevard", role: "User" },
  { id: 36, username: "Quang", email: "quang@example.com", phone: "0345678901", address: "3333 Circle", role: "User" },
  { id: 37, username: "Nga", email: "nga@example.com", phone: "0456789012", address: "3434 Square", role: "Admin" },
  { id: 38, username: "Tung", email: "tung@example.com", phone: "0567890123", address: "3535 Court", role: "User" },
  { id: 39, username: "Thao", email: "thao@example.com", phone: "0678901234", address: "3636 Place", role: "User" },
  { id: 40, username: "Hung", email: "hung@example.com", phone: "0789012345", address: "3737 Drive", role: "Admin" },
  { id: 41, username: "Yen", email: "yen@example.com", phone: "0890123456", address: "3838 Avenue", role: "User" },
  { id: 42, username: "Son", email: "son@example.com", phone: "0901234567", address: "3939 Street", role: "User" },
  { id: 43, username: "Hien", email: "hien@example.com", phone: "0123456789", address: "4040 Road", role: "Admin" },
  { id: 44, username: "Tram", email: "tram@example.com", phone: "0234567890", address: "4141 Lane", role: "User" },
  { id: 45, username: "Khanh", email: "khanh@example.com", phone: "0345678901", address: "4242 Boulevard", role: "User" },
  { id: 46, username: "Phong", email: "phong@example.com", phone: "0456789012", address: "4343 Circle", role: "Admin" },
  { id: 47, username: "Linh", email: "linh@example.com", phone: "0567890123", address: "4444 Square", role: "User" },
  { id: 48, username: "Trung", email: "trung@example.com", phone: "0678901234", address: "4545 Court", role: "User" },
  { id: 49, username: "Mai", email: "mai@example.com", phone: "0789012345", address: "4646 Place", role: "Admin" },
  { id: 50, username: "Duc", email: "duc@example.com", phone: "0890123456", address: "4747 Drive", role: "User" },
  { id: 51, username: "Hong", email: "hong@example.com", phone: "0901234567", address: "4848 Avenue", role: "User" },
  { id: 52, username: "Tuan", email: "tuan@example.com", phone: "0123456789", address: "4949 Street", role: "Admin" },
  { id: 53, username: "Lan", email: "lan@example.com", phone: "0234567890", address: "5050 Road", role: "User" },
  { id: 54, username: "Hoa", email: "hoa@example.com", phone: "0345678901", address: "5151 Lane", role: "User" },
  { id: 55, username: "Minh", email: "minh@example.com", phone: "0456789012", address: "5252 Boulevard", role: "Admin" },
  { id: 56, username: "Anh", email: "anh@example.com", phone: "0567890123", address: "5353 Circle", role: "User" },
  { id: 57, username: "Thanh", email: "thanh@example.com", phone: "0678901234", address: "5454 Square", role: "User" },
  { id: 58, username: "Huong", email: "huong@example.com", phone: "0789012345", address: "5555 Court", role: "Admin" },
  { id: 59, username: "Quang", email: "quang@example.com", phone: "0890123456", address: "5656 Place", role: "User" },
  { id: 60, username: "Nga", email: "nga@example.com", phone: "0901234567", address: "5757 Drive", role: "User" },
  { id: 61, username: "Tung", email: "tung@example.com", phone: "0123456789", address: "5858 Avenue", role: "Admin" },
  { id: 62, username: "Thao", email: "thao@example.com", phone: "0234567890", address: "5959 Street", role: "User" },
  { id: 63, username: "Hung", email: "hung@example.com", phone: "0345678901", address: "6060 Road", role: "User" },
  { id: 64, username: "Yen", email: "yen@example.com", phone: "0456789012", address: "6161 Lane", role: "Admin" },
  { id: 65, username: "Son", email: "son@example.com", phone: "0567890123", address: "6262 Boulevard", role: "User" },
  { id: 66, username: "Hien", email: "hien@example.com", phone: "0678901234", address: "6363 Circle", role: "User" },
  { id: 67, username: "Tram", email: "tram@example.com", phone: "0789012345", address: "6464 Square", role: "Admin" },
  { id: 68, username: "Khanh", email: "khanh@example.com", phone: "0890123456", address: "6565 Court", role: "User" },
  { id: 69, username: "Phong", email: "phong@example.com", phone: "0901234567", address: "6666 Place", role: "User" },
  { id: 70, username: "Linh", email: "linh@example.com", phone: "0123456789", address: "6767 Drive", role: "Admin" },
  { id: 71, username: "Trung", email: "trung@example.com", phone: "0234567890", address: "6868 Avenue", role: "User" },
  { id: 72, username: "Mai", email: "mai@example.com", phone: "0345678901", address: "6969 Street", role: "User" },
  { id: 73, username: "Duc", email: "duc@example.com", phone: "0456789012", address: "7070 Road", role: "Admin" },
  { id: 74, username: "Hong", email: "hong@example.com", phone: "0567890123", address: "7171 Lane", role: "User" },
  { id: 75, username: "Tuan", email: "tuan@example.com", phone: "0678901234", address: "7272 Boulevard", role: "User" },
  { id: 76, username: "Lan", email: "lan@example.com", phone: "0789012345", address: "7373 Circle", role: "Admin" },
  { id: 77, username: "Hoa", email: "hoa@example.com", phone: "0890123456", address: "7474 Square", role: "User" },
  { id: 78, username: "Minh", email: "minh@example.com", phone: "0901234567", address: "7575 Court", role: "User" },
  { id: 79, username: "Anh", email: "anh@example.com", phone: "0123456789", address: "7676 Place", role: "Admin" },
  { id: 80, username: "Thanh", email: "thanh@example.com", phone: "0234567890", address: "7777 Drive", role: "User" },
  { id: 81, username: "Huong", email: "huong@example.com", phone: "0345678901", address: "7878 Avenue", role: "User" },
  { id: 82, username: "Quang", email: "quang@example.com", phone: "0456789012", address: "7979 Street", role: "Admin" },
  { id: 83, username: "Nga", email: "nga@example.com", phone: "0567890123", address: "8080 Road", role: "User" },
  { id: 84, username: "Tung", email: "tung@example.com", phone: "0678901234", address: "8181 Lane", role: "User" },
  { id: 85, username: "Thao", email: "thao@example.com", phone: "0789012345", address: "8282 Boulevard", role: "Admin" },
  { id: 86, username: "Hung", email: "hung@example.com", phone: "0890123456", address: "8383 Circle", role: "User" },
  { id: 87, username: "Yen", email: "yen@example.com", phone: "0901234567", address: "8484 Square", role: "User" },
  { id: 88, username: "Son", email: "son@example.com", phone: "0123456789", address: "8585 Court", role: "Admin" },
  { id: 89, username: "Hien", email: "hien@example.com", phone: "0234567890", address: "8686 Place", role: "User" },
  { id: 90, username: "Tram", email: "tram@example.com", phone: "0345678901", address: "8787 Drive", role: "User" },
  { id: 91, username: "Khanh", email: "khanh@example.com", phone: "0456789012", address: "8888 Avenue", role: "Admin" },
  { id: 92, username: "Phong", email: "phong@example.com", phone: "0567890123", address: "8989 Street", role: "User" },
  { id: 93, username: "Linh", email: "linh@example.com", phone: "0678901234", address: "9090 Road", role: "User" },
  { id: 94, username: "Trung", email: "trung@example.com", phone: "0789012345", address: "9191 Lane", role: "Admin" },
];



const UserManagementList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const usersPerPage = 10;

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
    const filtered = usersData.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    navigate('?page=1');
  };

  const handleDelete = (id) =>{
    Swal.fire({
      title: 'Xác nhận xóa',
      text: 'Bạn có chắc chắn muốn xóa người dùng này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          Swal.fire(
            'Xóa thành công!',
            'Người dùng đã được xóa.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire(
            'Lỗi!',
            'Không thể xóa người dùng. Vui lòng thử lại.',
            'error'
          );
        }
      }
    });
  }


  const handleChangeRole = (id) => {
    Swal.fire({
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newRole = result.value; // Lấy vai trò mới từ lựa chọn
        try {
          await changeRole({ id, role: newRole });
          Swal.fire(
            'Thay đổi thành công!',
            'Vai trò của người dùng đã được thay đổi.',
            'success'
          );
        } catch (error) {
          console.error('Error changing user role:', error);
          Swal.fire(
            'Lỗi!',
            'Không thể thay đổi vai trò của người dùng. Vui lòng thử lại.',
            'error'
          );
        }
      }
    });
  };

  useEffect(() => {
    // Cập nhật filteredUsers khi trang thay đổi
    const filtered = usersData.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery]);

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
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>
                  <Link className="m-1 btn btn-primary" to={`/management/user/update?username=${user.username}`}>Chỉnh Sửa</Link>
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