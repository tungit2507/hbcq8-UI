import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput, CFormCheck } from '@coreui/react';
import Swal from 'sweetalert2';

const RaceRegistrationList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRegistrations, setSelectedRegistrations] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu đăng ký
    const mockRegistrations = [
      { id: 1, name: 'Nguyễn Văn A', bird: 'Chim Sẻ', registrationDate: '2023-06-01', status: 'Chờ duyệt' },
      { id: 2, name: 'Trần Thị B', bird: 'Chim Cút', registrationDate: '2023-06-02', status: 'Đã duyệt' },
      { id: 3, name: 'Lê Văn C', bird: 'Chim Bồ Câu', registrationDate: '2023-06-03', status: 'Từ chối' },
      { id: 4, name: 'Phạm Thị D', bird: 'Chim Yến', registrationDate: '2023-06-04', status: 'Chờ duyệt' },
      { id: 5, name: 'Hoàng Văn E', bird: 'Chim Sáo', registrationDate: '2023-06-05', status: 'Đã duyệt' },
      { id: 6, name: 'Đỗ Thị F', bird: 'Chim Chào Mào', registrationDate: '2023-06-06', status: 'Chờ duyệt' },
      { id: 7, name: 'Vũ Văn G', bird: 'Chim Họa Mi', registrationDate: '2023-06-07', status: 'Đã duyệt' },
      { id: 8, name: 'Ngô Thị H', bird: 'Chim Chích Chòe', registrationDate: '2023-06-08', status: 'Từ chối' },
      { id: 9, name: 'Bùi Văn I', bird: 'Chim Vàng Anh', registrationDate: '2023-06-09', status: 'Chờ duyệt' },
      { id: 10, name: 'Lý Thị K', bird: 'Chim Cu Gáy', registrationDate: '2023-06-10', status: 'Đã duyệt' },
      { id: 11, name: 'Trương Văn L', bird: 'Chim Khướu', registrationDate: '2023-06-11', status: 'Chờ duyệt' },
      { id: 12, name: 'Mai Thị M', bird: 'Chim Sơn Ca', registrationDate: '2023-06-12', status: 'Từ chối' },
      { id: 13, name: 'Phan Văn N', bird: 'Chim Chào Mào', registrationDate: '2023-06-13', status: 'Đã duyệt' },
      { id: 14, name: 'Huỳnh Thị O', bird: 'Chim Vẹt', registrationDate: '2023-06-14', status: 'Chờ duyệt' },
      { id: 15, name: 'Đặng Văn P', bird: 'Chim Sáo Đá', registrationDate: '2023-06-15', status: 'Đã duyệt' },
      { id: 16, name: 'Võ Thị Q', bird: 'Chim Chích Bông', registrationDate: '2023-06-16', status: 'Từ chối' },
      { id: 17, name: 'Dương Văn R', bird: 'Chim Hoạ Mi', registrationDate: '2023-06-17', status: 'Chờ duyệt' },
      { id: 18, name: 'Hồ Thị S', bird: 'Chim Sẻ Đồng', registrationDate: '2023-06-18', status: 'Đã duyệt' },
      { id: 19, name: 'Đinh Văn T', bird: 'Chim Cu Đất', registrationDate: '2023-06-19', status: 'Chờ duyệt' },
      { id: 20, name: 'Lương Thị U', bird: 'Chim Chào Mào', registrationDate: '2023-06-20', status: 'Từ chối' },
    ];
    setRegistrations(mockRegistrations);
  // Sắp xếp danh sách theo trạng thái
  const sortedRegistrations = mockRegistrations.sort((a, b) => {
    const statusOrder = {
      'Chờ duyệt': 1,
      'Đã duyệt': 2,
      'Từ chối': 3
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  setRegistrations(sortedRegistrations);
  }, []);

  const handleSelect = (id) => {
    setSelectedRegistrations((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredRegistrations = registrations.filter(registration =>
    registration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRegistrations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleApprove = (id) => {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt đăng ký này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to approve registration
        Swal.fire('Đã duyệt!', 'Đăng ký đã được duyệt.', 'success');
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Bạn có chắc muốn từ chối đăng ký này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Từ chối',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Lý do từ chối',
          input: 'textarea',
          inputPlaceholder: 'Nhập lý do từ chối...',
          showCancelButton: true,
          confirmButtonText: 'Gửi',
          cancelButtonText: 'Hủy',
        }).then((reasonResult) => {
          if (reasonResult.isConfirmed) {
            // Logic to reject registration with reason
            Swal.fire('Đã từ chối!', 'Đăng ký đã bị từ chối.', 'success');
          }
        });
      }
    });
  };

  const handleApproveAll = () => {
    Swal.fire({
      title: 'Bạn có chắc muốn duyệt tất cả các đăng ký đã chọn?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Duyệt Tất Cả',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        const approvedRegistrations = registrations.filter(registration => 
          selectedRegistrations.includes(registration.id)
        );
        console.log('Đã duyệt các đăng ký:', approvedRegistrations);
        Swal.fire('Đã duyệt!', 'Tất cả các đăng ký đã được duyệt.', 'success');
      }
    });
  };

  return (
    <div className="p-3 rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="mb-2 mb-md-0">Danh Sách Đăng Ký</h3>
        <CForm className="d-flex flex-grow-1" style={{ maxWidth: "500px" }}>
          <CFormInput
            type="text"
            placeholder="Tìm kiếm theo tên người đăng ký..."
            value={searchTerm}
            onChange={handleSearch}
            className="me-2"
            style={{ 
              flexGrow: 1, 
              padding: "0.25rem 0.5rem", 
              fontSize: "1rem", 
              borderWidth: "1px", 
              lineHeight: "1.5"
            }}
          />
          <CButton color="primary" style={{ 
            padding: "0.25rem 0.5rem", 
            fontSize: "1rem", 
            borderWidth: "1px"
          }}>Tìm Kiếm</CButton> 
        </CForm>
      </div>
      <hr />

      <div className="table-responsive">
        <CTable className="table-bordered rounded table-striped text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Chọn</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tên Người Đăng Ký</CTableHeaderCell>
              <CTableHeaderCell scope="col">Chim</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Đăng Ký</CTableHeaderCell>
              <CTableHeaderCell scope="col">Trạng Thái</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map(registration => (
              <CTableRow key={registration.id}>
                <CTableDataCell>
                  {registration.status === 'Chờ duyệt' && (
                    <CFormCheck
                      checked={selectedRegistrations.includes(registration.id)}
                      onChange={() => handleSelect(registration.id)}
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell>{registration.name}</CTableDataCell>
                <CTableDataCell>{registration.bird}</CTableDataCell>
                <CTableDataCell>{registration.registrationDate}</CTableDataCell>
                <CTableDataCell>{registration.status}</CTableDataCell>
                <CTableDataCell>
                  {registration.status === 'Chờ duyệt' && (
                    <>
                      <CButton 
                        color="success" 
                        onClick={() => handleApprove(registration.id)} 
                        className="me-2 mb-2 mb-md-0"
                        style={{ 
                          marginTop: '0.5rem',
                          '@media (min-width: 768px)': {
                            marginTop: '0'
                          }
                        }}
                      >
                        Duyệt
                      </CButton>
                      <CButton color="danger" onClick={() => handleReject(registration.id)}
                        className="me-2 mb-2 mb-md-0"
                        style={{ 
                          marginTop: '0.5rem',
                          '@media (min-width: 768px)': {
                            marginTop: '0'
                          }
                        }}  
                      >Từ Chối</CButton>
                    </>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
      {selectedRegistrations.length > 0 && (
        <CButton color="primary" onClick={handleApproveAll} className="mt-3">Duyệt Tất Cả</CButton>
      )}
      <hr />
      <div className="d-flex justify-content-center mt-4">
        <CPagination aria-label="Điều hướng trang">
          <CPaginationItem 
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Trước
          </CPaginationItem>
          {[...Array(Math.ceil(filteredRegistrations.length / itemsPerPage)).keys()].map(number => (
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
            disabled={currentPage === Math.ceil(filteredRegistrations.length / itemsPerPage)}
          >
            Tiếp
          </CPaginationItem>
        </CPagination>
      </div>
      
    </div>
  );
};

export default RaceRegistrationList;
