import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormCheck } from "@coreui/react";
import { useNavigate, useLocation } from "react-router-dom";

const tournamentsData = [
  { id: 1, name: "Giải đấu mùa xuân", startDate: "2023-03-01", endDate: "2023-03-15", location: "Sân vận động Thống Nhất", status: "Đã kết thúc" },
  { id: 2, name: "Giải đấu mùa hè", startDate: "2023-06-01", endDate: "2023-06-30", location: "Sân vận động Hoa Lư", status: "Đang diễn ra" },
  { id: 3, name: "Giải đấu mùa thu", startDate: "2023-09-01", endDate: "2023-09-15", location: "Sân vận động Phú Thọ", status: "Sắp diễn ra" },
  // Thêm các giải đấu khác vào đây...
];

const TournamentList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTournaments, setFilteredTournaments] = useState(tournamentsData);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [selectedBirds, setSelectedBirds] = useState([]);
  const tournamentsPerPage = 10;

  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage);

  const handlePageChange = (pageNumber) => {
    navigate(`?page=${pageNumber}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = tournamentsData.filter(tournament =>
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTournaments(filtered);
    navigate('?page=1');
  };

  useEffect(() => {
    const filtered = tournamentsData.filter(tournament =>
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTournaments(filtered);
  }, [searchQuery]);

  const handleOpenPopup = (tournamentId) => {
    setSelectedTournamentId(tournamentId);
    setShowPopup(true);
  };

  const handleBirdSelection = (birdId) => {
    setSelectedBirds(prevSelectedBirds => {
      if (prevSelectedBirds.includes(birdId)) {
        return prevSelectedBirds.filter(id => id !== birdId);
      } else {
        return [...prevSelectedBirds, birdId];
      }
    });
  };

  const handleRegister = () => {
    // Xử lý đăng ký ở đây
    console.log(`Đăng ký giải đấu ${selectedTournamentId} với các chim: ${selectedBirds.join(', ')}`);
    setShowPopup(false);
    setSelectedBirds([]);
  };

  // Giả sử danh sách chim của người dùng
  const userBirds = [
    { id: 1, name: "Chim 1" },
    { id: 2, name: "Chim 2" },
    { id: 3, name: "Chim 3" },
  ];

  return (
    <div className="p-3 rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h3 className="mb-2 mb-md-0">Danh Sách Giải Đấu</h3>
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

      <div className="table-responsive">
        <CTable className="table-bordered rounded table-striped text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tên Giải Đấu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Bắt Đầu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Kết Thúc</CTableHeaderCell>
              <CTableHeaderCell scope="col">Địa Điểm</CTableHeaderCell>
              <CTableHeaderCell scope="col">Trạng Thái</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentTournaments.map(tournament => (
              <CTableRow key={tournament.id}>
                <CTableHeaderCell scope="row">{tournament.id}</CTableHeaderCell>
                <CTableDataCell>{tournament.name}</CTableDataCell>
                <CTableDataCell>{tournament.startDate}</CTableDataCell>
                <CTableDataCell>{tournament.endDate}</CTableDataCell>
                <CTableDataCell>{tournament.location}</CTableDataCell>
                <CTableDataCell>{tournament.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => handleOpenPopup(tournament.id)}>Đăng Ký</CButton>
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

      <CModal visible={showPopup} onClose={() => setShowPopup(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Chọn chim để đăng ký</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {userBirds.map(bird => (
            <CFormCheck
              key={bird.id}
              id={`bird-${bird.id}`}
              label={bird.name}
              checked={selectedBirds.includes(bird.id)}
              onChange={() => handleBirdSelection(bird.id)}
            />
          ))}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowPopup(false)}>
            Hủy
          </CButton>
          <CButton color="primary" onClick={handleRegister}>
            Xác nhận đăng ký
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default TournamentList;
