import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput } from "@coreui/react";
import { Link } from "react-router-dom";
import sampleImage from './../../assets/images/avatars/1.jpg'; // Đảm bảo đường dẫn chính xác
import Swal from 'sweetalert2';
import { fetchRaces } from '../../api/raceApi';
import ErrorImage from '../../assets/images/avatars/1.jpg';
import { deleteRace } from '../../api/raceApi';

const RaceList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [races, setRaces] = useState([]);
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
    }).then( async (result) => {
      if (result.isConfirmed) {
        await deleteRace(id);
        Swal.fire("Đã xóa!", "Mục của bạn đã bị xóa.", "success");
        const loadRaces = async () => {
          try {
            const fetchedRaces = await fetchRaces();
            setRaces(fetchedRaces);            
          } catch (error) {
            console.error('Lỗi khi tải danh sách giải đua:', error);
          }
        };
        loadRaces();
      }
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };


  useEffect(() => {
    const loadRaces = async () => {
      try {
        const fetchedRaces = await fetchRaces();
        setRaces(fetchedRaces);
        console.log(races);
      } catch (error) {
        console.error('Lỗi khi tải danh sách giải đua:', error);
      }
    };
    setCurrentPage(1);
    loadRaces();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = races.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
              {/* <CTableHeaderCell scope="col">Người Tạo</CTableHeaderCell> */}
              <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map(race => (
              <CTableRow key={race.id}>
                <CTableHeaderCell scope="row">{race.id}</CTableHeaderCell>
                <CTableDataCell>
                  <img
                    src={race.image || ErrorImage}
                    alt="Race"
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                    onError={(e) => {e.target.src = ErrorImage}}
                  />
                </CTableDataCell>
                <CTableDataCell>{race.name}</CTableDataCell>
                <CTableDataCell>{race.birdsNum}</CTableDataCell>
                <CTableDataCell>{race.startDate}</CTableDataCell>
                <CTableDataCell>{race.endDate}</CTableDataCell>
                <CTableDataCell>{race.restTimePerDay}</CTableDataCell>
                {/* <CTableDataCell>{race.creator}</CTableDataCell> */}
                <CTableDataCell>
                  <Link className="btn btn-info mx-1" to={`/management/race/registration-list?id=${race.id}`}>Kiểm Duyệt</Link>
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
          {[...Array(Math.ceil(races.length / itemsPerPage)).keys()].map(number => (
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
            disabled={currentPage === Math.ceil(races.length / itemsPerPage)}
          >
            Tiếp
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  );
};

export default RaceList;