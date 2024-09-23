import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput } from "@coreui/react";
import { Link } from "react-router-dom";
import sampleImage from './../../assets/images/avatars/1.jpg'; // Đảm bảo đường dẫn chính xác
import Swal from 'sweetalert2';

const RaceList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleOnclickRemove = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa mục này?",
      text: "Bạn sẽ không thể khôi phục lại dữ liệu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Đã xóa!", "Mục của bạn đã bị xóa.", "success");
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const races = [
    { id: 1, name: "Giải Đua Số 1", numberOfBirds: 10, startDate: "20/09/2024", endDate: "22/09/2024", breakTime: "1:00", creator: "Tùng Hoàng", image: sampleImage },
  { id: 2, name: "Giải Đua Mùa Xuân", numberOfBirds: 15, startDate: "01/03/2025", endDate: "03/03/2025", breakTime: "1:30", creator: "Minh Nguyễn", image: sampleImage },
  { id: 3, name: "Cuộc Đua Chim Bồ Câu", numberOfBirds: 20, startDate: "15/05/2025", endDate: "17/05/2025", breakTime: "2:00", creator: "Hương Trần", image: sampleImage },
  { id: 4, name: "Giải Vô Địch Chim Đua", numberOfBirds: 25, startDate: "10/07/2025", endDate: "12/07/2025", breakTime: "1:45", creator: "Quang Lê", image: sampleImage },
  { id: 5, name: "Đua Chim Mùa Thu", numberOfBirds: 18, startDate: "20/09/2025", endDate: "22/09/2025", breakTime: "1:15", creator: "Lan Phạm", image: sampleImage },
  { id: 6, name: "Giải Đua Chim Đông", numberOfBirds: 12, startDate: "05/12/2025", endDate: "07/12/2025", breakTime: "1:30", creator: "Tuấn Vũ", image: sampleImage },
  { id: 7, name: "Cuộc Đua Chim Biển", numberOfBirds: 22, startDate: "18/02/2026", endDate: "20/02/2026", breakTime: "2:15", creator: "Mai Linh", image: sampleImage },
  { id: 8, name: "Giải Đua Chim Núi", numberOfBirds: 16, startDate: "03/04/2026", endDate: "05/04/2026", breakTime: "1:45", creator: "Đức Anh", image: sampleImage },
  { id: 9, name: "Đua Chim Đồng Bằng", numberOfBirds: 14, startDate: "22/06/2026", endDate: "24/06/2026", breakTime: "1:30", creator: "Thảo Nguyễn", image: sampleImage },
  { id: 10, name: "Giải Vô Địch Mùa Hè", numberOfBirds: 30, startDate: "10/08/2026", endDate: "12/08/2026", breakTime: "2:30", creator: "Hùng Trần", image: sampleImage },
  { id: 11, name: "Cuộc Đua Chim Sáo", numberOfBirds: 17, startDate: "25/10/2026", endDate: "27/10/2026", breakTime: "1:45", creator: "Yến Phương", image: sampleImage },
  { id: 12, name: "Giải Đua Chim Cánh Cụt", numberOfBirds: 8, startDate: "12/01/2027", endDate: "14/01/2027", breakTime: "1:15", creator: "Sơn Đặng", image: sampleImage },
  { id: 13, name: "Đua Chim Đại Bàng", numberOfBirds: 6, startDate: "28/03/2027", endDate: "30/03/2027", breakTime: "2:00", creator: "Hiền Hồ", image: sampleImage },
  { id: 14, name: "Giải Đua Chim Cánh Cụt", numberOfBirds: 10, startDate: "15/05/2027", endDate: "17/05/2027", breakTime: "1:30", creator: "Trâm Anh", image: sampleImage },
  { id: 15, name: "Cuộc Đua Chim Sẻ", numberOfBirds: 25, startDate: "02/07/2027", endDate: "04/07/2027", breakTime: "1:45", creator: "Khánh Linh", image: sampleImage },
  { id: 16, name: "Giải Đua Chim Cánh Cụt Mùa Đông", numberOfBirds: 12, startDate: "18/09/2027", endDate: "20/09/2027", breakTime: "2:15", creator: "Phong Vũ", image: sampleImage },
  { id: 17, name: "Đua Chim Hải Âu", numberOfBirds: 20, startDate: "05/11/2027", endDate: "07/11/2027", breakTime: "1:30", creator: "Linh Đan", image: sampleImage },
  { id: 18, name: "Giải Vô Địch Chim Đua Quốc Gia", numberOfBirds: 35, startDate: "22/01/2028", endDate: "24/01/2028", breakTime: "2:45", creator: "Trung Kiên", image: sampleImage },
  { id: 19, name: "Cuộc Đua Chim Bồ Câu Đưa Thư", numberOfBirds: 15, startDate: "10/03/2028", endDate: "12/03/2028", breakTime: "1:15", creator: "Mai Anh", image: sampleImage },
  { id: 20, name: "Giải Đua Chim Yến", numberOfBirds: 18, startDate: "25/05/2028", endDate: "27/05/2028", breakTime: "1:45", creator: "Đức Thắng", image: sampleImage },
  { id: 21, name: "Đua Chim Sáo Sao", numberOfBirds: 22, startDate: "12/07/2028", endDate: "14/07/2028", breakTime: "2:00", creator: "Hồng Nhung", image: sampleImage },
  { id: 22, name: "Giải Đua Chim Cánh Cụt Mùa Hè", numberOfBirds: 10, startDate: "28/09/2028", endDate: "30/09/2028", breakTime: "1:30", creator: "Tuấn Anh", image: sampleImage },
  { id: 23, name: "Cuộc Đua Chim Én", numberOfBirds: 28, startDate: "15/11/2028", endDate: "17/11/2028", breakTime: "2:15", creator: "Lan Hương", image: sampleImage },
  { id: 24, name: "Giải Đua Chim Cánh Cụt Mùa Xuân", numberOfBirds: 14, startDate: "02/02/2029", endDate: "04/02/2029", breakTime: "1:45", creator: "Minh Tuấn", image: sampleImage },
  { id: 25, name: "Đua Chim Sẻ Đồng", numberOfBirds: 30, startDate: "20/04/2029", endDate: "22/04/2029", breakTime: "2:30", creator: "Thanh Thảo", image: sampleImage },
  { id: 26, name: "Giải Vô Địch Chim Đua Quốc Tế", numberOfBirds: 40, startDate: "08/06/2029", endDate: "10/06/2029", breakTime: "3:00", creator: "Quốc Bảo", image: sampleImage },
  { id: 27, name: "Cuộc Đua Chim Cánh Cụt Băng Giá", numberOfBirds: 8, startDate: "25/08/2029", endDate: "27/08/2029", breakTime: "1:15", creator: "Hạ Vy", image: sampleImage },
  { id: 28, name: "Giải Đua Chim Hải Âu Biển", numberOfBirds: 16, startDate: "12/10/2029", endDate: "14/10/2029", breakTime: "2:00", creator: "Đăng Khoa", image: sampleImage },
  { id: 29, name: "Đua Chim Sáo Đá", numberOfBirds: 24, startDate: "30/12/2029", endDate: "01/01/2030", breakTime: "1:45", creator: "Mỹ Tâm", image: sampleImage },
  { id: 30, name: "Giải Đua Chim Cánh Cụt Mùa Thu", numberOfBirds: 12, startDate: "18/02/2030", endDate: "20/02/2030", breakTime: "1:30", creator: "Hoàng Long", image: sampleImage },
  { id: 31, name: "Cuộc Đua Chim Bồ Câu Đêm", numberOfBirds: 20, startDate: "05/04/2030", endDate: "07/04/2030", breakTime: "2:15", creator: "Thùy Linh", image: sampleImage },
  { id: 32, name: "Giải Đua Chim Sẻ Rừng", numberOfBirds: 26, startDate: "22/06/2030", endDate: "24/06/2030", breakTime: "1:45", creator: "Quang Huy", image: sampleImage },
  { id: 33, name: "Đua Chim Yến Biển", numberOfBirds: 18, startDate: "10/08/2030", endDate: "12/08/2030", breakTime: "2:00", creator: "Ngọc Anh", image: sampleImage },
  { id: 34, name: "Giải Vô Địch Chim Đua Châu Á", numberOfBirds: 35, startDate: "28/10/2030", endDate: "30/10/2030", breakTime: "2:45", creator: "Minh Quân", image: sampleImage },
  { id: 35, name: "Cuộc Đua Chim Cánh Cụt Băng Đảo", numberOfBirds: 10, startDate: "15/12/2030", endDate: "17/12/2030", breakTime: "1:30", creator: "Bảo Ngọc", image: sampleImage },
  { id: 36, name: "Giải Đua Chim Sáo Núi", numberOfBirds: 22, startDate: "02/02/2031", endDate: "04/02/2031", breakTime: "2:15", creator: "Đức Thịnh", image: sampleImage },
  { id: 37, name: "Đua Chim Én Lửa", numberOfBirds: 28, startDate: "20/04/2031", endDate: "22/04/2031", breakTime: "1:45", creator: "Hồng Nhung", image: sampleImage },
  { id: 38, name: "Giải Đua Chim Cánh Cụt Bắc Cực", numberOfBirds: 8, startDate: "08/06/2031", endDate: "10/06/2031", breakTime: "1:15", creator: "Quốc Anh", image: sampleImage },
  { id: 39, name: "Cuộc Đua Chim Bồ Câu Trắng", numberOfBirds: 16, startDate: "25/08/2031", endDate: "27/08/2031", breakTime: "1:30", creator: "Mai Phương", image: sampleImage },
  { id: 40, name: "Giải Đua Chim Sẻ Vàng", numberOfBirds: 24, startDate: "12/10/2031", endDate: "14/10/2031", breakTime: "2:00", creator: "Thành Long", image: sampleImage },
  { id: 41, name: "Đua Chim Hải Âu Bạc", numberOfBirds: 20, startDate: "30/12/2031", endDate: "01/01/2032", breakTime: "1:45", creator: "Ngọc Linh", image: sampleImage },
  { id: 42, name: "Giải Vô Địch Chim Đua Thế Giới", numberOfBirds: 50, startDate: "18/02/2032", endDate: "20/02/2032", breakTime: "3:00", creator: "Hoàng Nam", image: sampleImage },
  { id: 43, name: "Cuộc Đua Chim Cánh Cụt Nam Cực", numberOfBirds: 12, startDate: "05/04/2032", endDate: "07/04/2032", breakTime: "1:30", creator: "Thùy Dương", image: sampleImage },
  { id: 44, name: "Giải Đua Chim Sáo Đen", numberOfBirds: 26, startDate: "22/06/2032", endDate: "24/06/2032", breakTime: "2:15", creator: "Quang Minh", image: sampleImage },
  { id: 45, name: "Đua Chim Yến Hang Động", numberOfBirds: 18, startDate: "10/08/2032", endDate: "12/08/2032", breakTime: "1:45", creator: "Hạnh Phúc", image: sampleImage },
  { id: 46, name: "Giải Đua Chim Bồ Câu Xanh", numberOfBirds: 22, startDate: "28/10/2032", endDate: "30/10/2032", breakTime: "2:00", creator: "Minh Hiếu", image: sampleImage },
  { id: 47, name: "Cuộc Đua Chim Sẻ Đỏ", numberOfBirds: 30, startDate: "15/12/2032", endDate: "17/12/2032", breakTime: "2:30", creator: "Thanh Tâm", image: sampleImage },
  { id: 48, name: "Giải Đua Chim Cánh Cụt Hoàng Đế", numberOfBirds: 10, startDate: "02/02/2033", endDate: "04/02/2033", breakTime: "1:15", creator: "Đức Long", image: sampleImage },
  { id: 49, name: "Đua Chim Hải Âu Đại Dương", numberOfBirds: 25, startDate: "20/04/2033", endDate: "22/04/2033", breakTime: "2:15", creator: "Bích Ngọc", image: sampleImage },
  { id: 50, name: "Giải Vô Địch Chim Đua Liên Lục Địa", numberOfBirds: 40, startDate: "08/06/2033", endDate: "10/06/2033", breakTime: "3:00", creator: "Quốc Việt", image: sampleImage },
  ];

  const filteredRaces = races.filter(race =>
    race.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRaces.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="p-3 rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="mb-2 mb-md-0">Danh Sách Giải Đua</h3>
        <CForm className="d-flex flex-grow-1" style={{ maxWidth: "500px" }}>
          <CFormInput
            type="text"
            placeholder="Tìm kiếm theo tên giải đua..."
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
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hình Ảnh</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tên Giải Đua</CTableHeaderCell>
              <CTableHeaderCell scope="col">Số Chim</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Bắt Đầu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Kết Thúc</CTableHeaderCell>
              <CTableHeaderCell scope="col">Thời Gian Nghỉ</CTableHeaderCell>
              <CTableHeaderCell scope="col">Người Tạo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map(race => (
              <CTableRow key={race.id}>
                <CTableHeaderCell scope="row">{race.id}</CTableHeaderCell>
                <CTableDataCell>
                  <img
                    src={race.image}
                    alt="Race"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                  />
                </CTableDataCell>
                <CTableDataCell>{race.name}</CTableDataCell>
                <CTableDataCell>{race.numberOfBirds}</CTableDataCell>
                <CTableDataCell>{race.startDate}</CTableDataCell>
                <CTableDataCell>{race.endDate}</CTableDataCell>
                <CTableDataCell>{race.breakTime}</CTableDataCell>
                <CTableDataCell>{race.creator}</CTableDataCell>
                <CTableDataCell>
                  <Link className="btn btn-primary mx-1" to={`/management/race/update?id=${race.id}`}>Chỉnh Sửa</Link>
                  <CButton className="btn btn-danger text-white mx-1" onClick={() => handleOnclickRemove(race.id)}>Xóa</CButton>
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
          {[...Array(Math.ceil(filteredRaces.length / itemsPerPage)).keys()].map(number => (
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
            disabled={currentPage === Math.ceil(filteredRaces.length / itemsPerPage)}
          >
            Tiếp
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  );
};

export default RaceList;