// src/components/TournamentResults.js
import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CPagination, CPaginationItem, CButton, CForm, CFormInput, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CFormCheck } from "@coreui/react";


const TournamentResults = () => {
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;


    useEffect(() => {
        const hardcodedResults = [
            { id: 1, name: 'Người Chơi 1', score: 100, rank: 1, birdcode: 'BIRD001' },
            { id: 3, name: 'Người Chơi 2', score: 100, rank: 2, birdcode: 'BIRD002' },
            { id: 4, name: 'Người Chơi 3', score: 90, rank: 3, birdcode: 'BIRD003' },
            { id: 5, name: 'Người Chơi 4', score: 80, rank: 4, birdcode: 'BIRD004' },
            { id: 6, name: 'Người Chơi 5', score: 70, rank: 5, birdcode: 'BIRD005' },
            { id: 7, name: 'Người Chơi 6', score: 60, rank: 6, birdcode: 'BIRD006' },
            { id: 8, name: 'Người Chơi 7', score: 50, rank: 7, birdcode: 'BIRD007' },
            { id: 9, name: 'Người  hơi 8', score: 40, rank: 8, birdcode: 'BIRD008' },
            { id: 10, name: 'Người Chơi 9', score: 30, rank: 9, birdcode: 'BIRD009' },
            { id: 11, name: 'Người Chơi 10', score: 20, rank: 10, birdcode: 'BIRD010' },
        ];
        setResults(hardcodedResults);
    }, []);

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='rounded p-5'>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h3 className="mb-2 mb-md-0">Kết Quả Giải Đấu</h3>
            </div>
            <hr className="my-4" />
            <div className="table-responsive">
            <CTable className="table-bordered rounded table-striped text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Hạng</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tên Người Tham Gia</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mã Kiềng Chim</CTableHeaderCell>
              <CTableHeaderCell scope="col">Điểm số</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {results.map(ranker => (
              <CTableRow key={ranker.id}>
                <CTableHeaderCell scope="row">{ranker.rank}</CTableHeaderCell>
                <CTableDataCell>{ranker.name}</CTableDataCell>
                <CTableDataCell>{ranker.birdcode}</CTableDataCell>
                <CTableDataCell>{ranker.score}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <CPagination>
                    <CPaginationItem
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </CPaginationItem>
                    {Array.from({ length: Math.ceil(results.length / resultsPerPage) }, (_, i) => (
                        <CPaginationItem key={i} onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </CPaginationItem>
                    ))}
                    <CPaginationItem onClick={() => handlePageChange(currentPage + 1)}>
                        Sau
                    </CPaginationItem>
                </CPagination>
            </div>
        </div>
    );
};

export default TournamentResults;

