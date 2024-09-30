import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput } from "@coreui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import exampleImage1 from './../../assets/images/avatars/1.jpg';



const usersData = [
  { id: 1, username: "Mark", email: "mark@example.com", phone: "1234567890", address: "123 Street" },
  { id: 2, username: "Otto", email: "otto@example.com", phone: "0987654321", address: "456 Avenue" },
  { id: 3, username: "Linh", email: "linh@example.com", phone: "0123456789", address: "789 Road" },
  { id: 4, username: "Tuan", email: "tuan@example.com", phone: "9876543210", address: "101 Lane" },
  { id: 5, username: "Mai", email: "mai@example.com", phone: "5678901234", address: "202 Boulevard" },
  { id: 6, username: "Hoa", email: "hoa@example.com", phone: "3456789012", address: "303 Circle" },
  { id: 7, username: "Minh", email: "minh@example.com", phone: "7890123456", address: "404 Square" },
  { id: 8, username: "Anh", email: "anh@example.com", phone: "2345678901", address: "505 Court" },
  { id: 9, username: "Duc", email: "duc@example.com", phone: "6789012345", address: "606 Place" },
  { id: 10, username: "Lan", email: "lan@example.com", phone: "0123987654", address: "707 Drive" },
  { id: 11, username: "Thanh", email: "thanh@example.com", phone: "0987654321", address: "808 Avenue" },
  { id: 12, username: "Huong", email: "huong@example.com", phone: "0123456789", address: "909 Street" },
  { id: 13, username: "Quang", email: "quang@example.com", phone: "9876543210", address: "1010 Road" },
  { id: 14, username: "Nga", email: "nga@example.com", phone: "5678901234", address: "1111 Lane" },
  { id: 15, username: "Tung", email: "tung@example.com", phone: "3456789012", address: "1212 Boulevard" },
  { id: 16, username: "Thao", email: "thao@example.com", phone: "7890123456", address: "1313 Circle" },
  { id: 17, username: "Hung", email: "hung@example.com", phone: "2345678901", address: "1414 Square" },
  { id: 18, username: "Yen", email: "yen@example.com", phone: "6789012345", address: "1515 Court" },
  { id: 19, username: "Son", email: "son@example.com", phone: "0123987654", address: "1616 Place" },
  { id: 20, username: "Hien", email: "hien@example.com", phone: "9012345678", address: "1717 Drive" },
  { id: 21, username: "Tram", email: "tram@example.com", phone: "0345678901", address: "1818 Avenue" },
  { id: 22, username: "Khanh", email: "khanh@example.com", phone: "0567890123", address: "1919 Street" },
  { id: 23, username: "Phong", email: "phong@example.com", phone: "0789012345", address: "2020 Road" },
  { id: 24, username: "Linh", email: "linh@example.com", phone: "0901234567", address: "2121 Lane" },
  { id: 25, username: "Trung", email: "trung@example.com", phone: "0123456789", address: "2222 Boulevard" },
  { id: 26, username: "Mai", email: "mai@example.com", phone: "0234567890", address: "2323 Circle" },
  { id: 27, username: "Duc", email: "duc@example.com", phone: "0345678901", address: "2424 Square" },
  { id: 28, username: "Hong", email: "hong@example.com", phone: "0456789012", address: "2525 Court" },
  { id: 29, username: "Tuan", email: "tuan@example.com", phone: "0567890123", address: "2626 Place" },
  { id: 30, username: "Lan", email: "lan@example.com", phone: "0678901234", address: "2727 Drive" },
  { id: 31, username: "Hoa", email: "hoa@example.com", phone: "0789012345", address: "2828 Avenue" },
  { id: 32, username: "Minh", email: "minh@example.com", phone: "0890123456", address: "2929 Street" },
  { id: 33, username: "Anh", email: "anh@example.com", phone: "0901234567", address: "3030 Road" },
  { id: 34, username: "Thanh", email: "thanh@example.com", phone: "0123456789", address: "3131 Lane" },
  { id: 35, username: "Huong", email: "huong@example.com", phone: "0234567890", address: "3232 Boulevard" },
  { id: 36, username: "Quang", email: "quang@example.com", phone: "0345678901", address: "3333 Circle" },
  { id: 37, username: "Nga", email: "nga@example.com", phone: "0456789012", address: "3434 Square" },
  { id: 38, username: "Tung", email: "tung@example.com", phone: "0567890123", address: "3535 Court" },
  { id: 39, username: "Thao", email: "thao@example.com", phone: "0678901234", address: "3636 Place" },
  { id: 40, username: "Hung", email: "hung@example.com", phone: "0789012345", address: "3737 Drive" },
  { id: 41, username: "Yen", email: "yen@example.com", phone: "0890123456", address: "3838 Avenue" },
  { id: 42, username: "Son", email: "son@example.com", phone: "0901234567", address: "3939 Street" },
  { id: 43, username: "Hien", email: "hien@example.com", phone: "0123456789", address: "4040 Road" },
  { id: 44, username: "Tram", email: "tram@example.com", phone: "0234567890", address: "4141 Lane" },
  { id: 45, username: "Khanh", email: "khanh@example.com", phone: "0345678901", address: "4242 Boulevard" },
  { id: 46, username: "Phong", email: "phong@example.com", phone: "0456789012", address: "4343 Circle" },
  { id: 47, username: "Linh", email: "linh@example.com", phone: "0567890123", address: "4444 Square" },
  { id: 48, username: "Trung", email: "trung@example.com", phone: "0678901234", address: "4545 Court" },
  { id: 49, username: "Mai", email: "mai@example.com", phone: "0789012345", address: "4646 Place" },
  { id: 50, username: "Duc", email: "duc@example.com", phone: "0890123456", address: "4747 Drive" },
  { id: 51, username: "Hong", email: "hong@example.com", phone: "0901234567", address: "4848 Avenue" },
  { id: 52, username: "Tuan", email: "tuan@example.com", phone: "0123456789", address: "4949 Street" },
  { id: 53, username: "Lan", email: "lan@example.com", phone: "0234567890", address: "5050 Road" },
  { id: 54, username: "Hoa", email: "hoa@example.com", phone: "0345678901", address: "5151 Lane" },
  { id: 55, username: "Minh", email: "minh@example.com", phone: "0456789012", address: "5252 Boulevard" },
  { id: 56, username: "Anh", email: "anh@example.com", phone: "0567890123", address: "5353 Circle" },
  { id: 57, username: "Thanh", email: "thanh@example.com", phone: "0678901234", address: "5454 Square" },
  { id: 58, username: "Huong", email: "huong@example.com", phone: "0789012345", address: "5555 Court" },
  { id: 59, username: "Quang", email: "quang@example.com", phone: "0890123456", address: "5656 Place" },
  { id: 60, username: "Nga", email: "nga@example.com", phone: "0901234567", address: "5757 Drive" },
  { id: 61, username: "Tung", email: "tung@example.com", phone: "0123456789", address: "5858 Avenue" },
  { id: 62, username: "Thao", email: "thao@example.com", phone: "0234567890", address: "5959 Street" },
  { id: 63, username: "Hung", email: "hung@example.com", phone: "0345678901", address: "6060 Road" },
  { id: 64, username: "Yen", email: "yen@example.com", phone: "0456789012", address: "6161 Lane" },
  { id: 65, username: "Son", email: "son@example.com", phone: "0567890123", address: "6262 Boulevard" },
  { id: 66, username: "Hien", email: "hien@example.com", phone: "0678901234", address: "6363 Circle" },
  { id: 67, username: "Tram", email: "tram@example.com", phone: "0789012345", address: "6464 Square" },
  { id: 68, username: "Khanh", email: "khanh@example.com", phone: "0890123456", address: "6565 Court" },
  { id: 69, username: "Phong", email: "phong@example.com", phone: "0901234567", address: "6666 Place" },
  { id: 70, username: "Linh", email: "linh@example.com", phone: "0123456789", address: "6767 Drive" },
  { id: 71, username: "Trung", email: "trung@example.com", phone: "0234567890", address: "6868 Avenue" },
  { id: 72, username: "Mai", email: "mai@example.com", phone: "0345678901", address: "6969 Street" },
  { id: 73, username: "Duc", email: "duc@example.com", phone: "0456789012", address: "7070 Road" },
  { id: 74, username: "Hong", email: "hong@example.com", phone: "0567890123", address: "7171 Lane" },
  { id: 75, username: "Tuan", email: "tuan@example.com", phone: "0678901234", address: "7272 Boulevard" },
  { id: 76, username: "Lan", email: "lan@example.com", phone: "0789012345", address: "7373 Circle" },
  { id: 77, username: "Hoa", email: "hoa@example.com", phone: "0890123456", address: "7474 Square" },
  { id: 78, username: "Minh", email: "minh@example.com", phone: "0901234567", address: "7575 Court" },
  { id: 79, username: "Anh", email: "anh@example.com", phone: "0123456789", address: "7676 Place" },
  { id: 80, username: "Thanh", email: "thanh@example.com", phone: "0234567890", address: "7777 Drive" },
  { id: 81, username: "Huong", email: "huong@example.com", phone: "0345678901", address: "7878 Avenue" },
  { id: 82, username: "Quang", email: "quang@example.com", phone: "0456789012", address: "7979 Street" },
  { id: 83, username: "Nga", email: "nga@example.com", phone: "0567890123", address: "8080 Road" },
  { id: 84, username: "Tung", email: "tung@example.com", phone: "0678901234", address: "8181 Lane" },
  { id: 85, username: "Thao", email: "thao@example.com", phone: "0789012345", address: "8282 Boulevard" },
  { id: 86, username: "Hung", email: "hung@example.com", phone: "0890123456", address: "8383 Circle" },
  { id: 87, username: "Yen", email: "yen@example.com", phone: "0901234567", address: "8484 Square" },
  { id: 88, username: "Son", email: "son@example.com", phone: "0123456789", address: "8585 Court" },
  { id: 89, username: "Hien", email: "hien@example.com", phone: "0234567890", address: "8686 Place" },
  { id: 90, username: "Tram", email: "tram@example.com", phone: "0345678901", address: "8787 Drive" },
  { id: 91, username: "Khanh", email: "khanh@example.com", phone: "0456789012", address: "8888 Avenue" },
  { id: 92, username: "Phong", email: "phong@example.com", phone: "0567890123", address: "8989 Street" },
  { id: 93, username: "Linh", email: "linh@example.com", phone: "0678901234", address: "9090 Road" },
  { id: 94, username: "Trung", email: "trung@example.com", phone: "0789012345", address: "9191 Lane" },
  { id: 95, username: "Mai", email: "mai@example.com", phone: "0890123456", address: "9292 Boulevard" },
  { id: 96, username: "Duc", email: "duc@example.com", phone: "0901234567", address: "9393 Circle" },
  { id: 97, username: "Hong", email: "hong@example.com", phone: "0123456789", address: "9494 Square" },
  { id: 98, username: "Tuan", email: "tuan@example.com", phone: "0234567890", address: "9595 Court" },
  { id: 99, username: "Lan", email: "lan@example.com", phone: "0345678901", address: "9696 Place" },
  { id: 100, username: "Hoa", email: "hoa@example.com", phone: "0456789012", address: "9797 Drive" }
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
                <CTableDataCell>
                  <Link className="btn btn-primary" to={`/management/user/update?username=${user.username}`}>Chỉnh Sửa</Link>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      {/* Pagination */}
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
