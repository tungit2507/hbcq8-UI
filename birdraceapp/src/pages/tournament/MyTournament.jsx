import React, { useEffect, useState } from 'react';
import axiosInstance from '../../apiInstance';
import { CButton ,CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { Link } from 'react-router-dom';


const MyTournament = () => {
    const [tournaments, setTournaments] = useState([]);

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await axiosInstance.get('/tour/me');
                setTournaments(response.data);
            } catch (error) {
                console.error('Error fetching tournaments:', error);
            }
        };

        fetchTournaments();
    }, []);



    return (
        <div className="p-3 rounded">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h3 className="mb-2 mb-md-0">Giải Đua Đã Đăng Ký</h3>
            </div>
            <hr className="my-4" />

            <div className="table-responsive">
                {tournaments.length > 0 ? (
                    <CTable className="table-bordered rounded table-striped text-center">
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Tên Giải Đấu</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Ngày Bắt Đầu</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Ngày Kết Thúc</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Vị Trí Bắt Đầu</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Vị Trí Kết Thúc</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Số Lượng Chim</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Trạng Thái</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {tournaments.map((tournament) => (
                                <CTableRow key={tournament.tourId}>
                                    <CTableDataCell>{tournament.tourId}</CTableDataCell>
                                    <CTableDataCell>{tournament.tourName}</CTableDataCell>
                                    <CTableDataCell>{tournament.startDate}</CTableDataCell>
                                    <CTableDataCell>{tournament.endDate}</CTableDataCell>
                                    <CTableDataCell>{tournament.startLocationCode}</CTableDataCell>
                                    <CTableDataCell>{tournament.endLocationCode}</CTableDataCell>
                                    <CTableDataCell>{tournament.birdsNum}</CTableDataCell>
                                    <CTableDataCell>{tournament.tourStatus}</CTableDataCell>
                                    <CTableDataCell>
                                        {/* {tournament.isFinished === true ? (
                                            <Link to={`/tour-detail?tourId=${tournament.tourId}`} className="btn btn-primary">
                                                Báo Về Đích
                                            </Link>
                                        ) : (
                                            <Link to={`/tournament-result?tourId=${tournament.tourId}`} className="btn btn-primary">
                                                Xem Kết Quả
                                            </Link>
                                        )} */}

                                            <Link to={`/tour-detail?tourId=${tournament.tourId}`} className="btn btn-primary m-1">
                                                Báo Về Đích
                                            </Link>
                                            <Link to={`/tournament-result?tourId=${tournament.tourId}`} className="btn btn-primary m-1">
                                                Xem Kết Quả
                                            </Link>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                ) : (
                    <h4 className='text-center'>Hiện Không Có Giải Đua</h4>
                )}
            </div>
        </div>
    );
};

export default MyTournament;
