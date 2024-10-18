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
              <CTableHeaderCell scope="col">Tên Giải Đấu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Bắt Đầu</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Kết Thúc</CTableHeaderCell>
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

