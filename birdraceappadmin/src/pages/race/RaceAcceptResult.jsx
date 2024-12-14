import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CFormCheck, CFormSelect } from "@coreui/react";
import { useLocation } from "react-router-dom";
import { fetchRaceDetail, approveResult, rejectResult, fetchRaceById, fetchTourStageResult } from '../../api/raceApi';
import Swal from 'sweetalert2';

const TourAccepResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tourId = queryParams.get('id');

    const [raceDetails, setRaceDetails] = useState([]);
    const [selectedBirds, setSelectedBirds] = useState([]);
    const [tourStages, setTourStages] = useState([]);
    const [tourStageResults, setTourStageResutls] = useState([]);
    const [selectedStage, setSelectedStage] = useState('');
    const [selectedTourStagesResult, setSelectedTourStagesResult] = useState([]);
    const fetchTourStage = async () => {
        try {
            const result = await fetchRaceById(tourId);
            setTourStages(result.tourStages);
            if(result.tourStages.length > 0){
                handleOnchaneSelectStage(result.tourStages[0].stageId);
            }
        } catch (error) {
            console.error('Error fetching race details:', error);
        }
    }

    useEffect(() => {
        fetchTourStage();
    }, [tourId]);

    const handleConfirm = (birdCode) => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn có muốn xác nhận kết quả cho chim có mã ${birdCode}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    let formData = new FormData();
                    formData.append('birdCode', birdCode);
                    formData.append('tourId', tourId);
                    formData.append('stageId', selectedStage);
                    approveResult(formData);
                    Swal.fire('Thành công', 'Kết quả đã được xác nhận thành công.', 'success');
                    handleOnchaneSelectStage(selectedStage);
                } catch (error) {
                    Swal.fire('Từ chối', 'Không thành công', 'error');
                }
            }
        });
    };

    const handleReject = (birdCode) => {
        Swal.fire({
            title: 'Nhập lý do từ chối',
            input: 'text',
            inputPlaceholder: 'Lý do từ chối...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tiếp tục',
            cancelButtonText: 'Hủy'
        }).then((inputResult) => {
            if (inputResult.isConfirmed && inputResult.value) {
                Swal.fire({
                    title: 'Bạn có chắc chắn?',
                    text: `Bạn có muốn từ chối kết quả cho chim có mã ${birdCode} với lý do: ${inputResult.value}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Từ chối!',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.isConfirmed) {
                        let formData = new FormData();
                        formData.append('birdCode', birdCode);
                        formData.append('tourId', tourId);
                        formData.append('stageId', selectedStage);
                        formData.append('memo', inputResult.value);
                        rejectResult(formData);
                        Swal.fire('Thành công', `Đã từ chối kết quả cho chim có mã ${birdCode}`, 'success');
                        handleOnchaneSelectStage(selectedStage);
                    }
                });
            }
        });
    };

    const handleSelectBird = (birdId) => {
        if (selectedBirds.includes(birdId)) {
          setSelectedBirds(selectedBirds.filter(id => id !== birdId));
        } else {
          if (selectedBirds.length < 10) {
            setSelectedBirds([...selectedBirds, birdId]);
          } else {
            Swal.fire('Giới hạn', 'Chỉ có thể chọn tối đa 10 chim.', 'warning');
          }
        }
    };

    const handleConfirmAll = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: `Bạn có muốn xác nhận kết quả cho các chim có mã ${selectedBirds.join(', ')}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    selectedBirds.forEach((birdCode) => {
                        let formData = new FormData();
                        formData.append('birdCode', birdCode);
                        formData.append('tourId', tourId);
                        formData.append('stageId', selectedStage);
                        approveResult(formData);
                    });
                    Swal.fire('Thành công', 'Kết quả đã được xác nhận thành công.', 'success');
                    handleOnchaneSelectStage(selectedStage);
                } catch (error) {
                    Swal.fire('Từ chối', 'Không thành công', 'error');
                }
            }
        });
    };

    const handleRejectAll = () => {
        Swal.fire({
            title: 'Nhập lý do từ chối',
            input: 'text',
            inputPlaceholder: 'Lý do từ chối...',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Tiếp tục',
            cancelButtonText: 'Hủy'
        }).then((inputResult) => {
            if (inputResult.isConfirmed && inputResult.value) {
                Swal.fire({
                    title: 'Bạn có chắc chắn?',
                    text: `Bạn có muốn từ chối kết quả cho các chim có mã ${selectedBirds.join(', ')} với lý do: ${inputResult.value}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Từ chối!',
                    cancelButtonText: 'Hủy'
                }).then((result) => {
                    if (result.isConfirmed) {
                        try {
                            selectedBirds.forEach((birdCode) => {
                                let formData = new FormData();
                                formData.append('birdCode', birdCode);
                                formData.append('tourId', tourId);
                                formData.append('stageId', selectedStage);
                                formData.append('memo', inputResult.value);
                                rejectResult(formData);
                            });
                            Swal.fire('Thành công', 'Kết quả đã được từ chối thành công.', 'success');
                            handleOnchaneSelectStage(selectedStage);
                        } catch (error) {
                            Swal.fire('Từ chối', 'Không thành công', 'error');
                        }
                    }
                });
            }
        });
    };

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };


    const handleOnchaneSelectStage = async (stageId) => {
        setSelectedStage(stageId);
        const tourStageResults = await fetchTourStageResult(tourId, stageId);
        setTourStageResutls(tourStageResults);
        console.log(tourStageResults);
    }

    return (
        <div className="p-3 rounded">
            <h3 className="mb-4">Xét Duyệt Kết Quả Chặng Đua</h3>
            <div className="mb-3">
                <CButton className='' color="success " onClick={handleConfirmAll} disabled={selectedBirds.length === 0}>Xác nhận tất cả</CButton>
                <CButton className='mx-2' color="danger " onClick={handleRejectAll} disabled={selectedBirds.length === 0}>Từ chối tất cả</CButton>
                <CFormSelect className='my-2 w-auto' onChange={ (e) => handleOnchaneSelectStage(e.target.value)}>
                    {tourStages.map((stage, index) => (
                        <option key={index} value={stage.stageId}>{    stage.startPointCode + ' - ' + stage.startPointName}</option>
                    ))}
                </CFormSelect>
            </div>
            <div className="table-responsive">
                <CTable className="table-bordered rounded table-striped text-center">
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell>
                                {/* <CFormCheck
                                    checked={selectedBirds.length === raceDetails.length}
                                    onChange={() => {
                                        if (selectedBirds.length === raceDetails.length) {
                                            setSelectedBirds([]);
                                        } else {
                                            setSelectedBirds(raceDetails.map(detail => detail.birdCode));
                                        }
                                    }}
                                /> */}
                            </CTableHeaderCell>
                            <CTableHeaderCell>Mã kiềng</CTableHeaderCell>
                            <CTableHeaderCell>Căn cứ xuất phát</CTableHeaderCell>
                            <CTableHeaderCell>Thời gian xuất phát</CTableHeaderCell>
                            <CTableHeaderCell>Căn cứ Đích</CTableHeaderCell>
                            <CTableHeaderCell>Thời gian về</CTableHeaderCell>
                            <CTableHeaderCell>Mã bí mật</CTableHeaderCell>
                            <CTableHeaderCell>Actions</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {tourStageResults.length > 0 ? (
                            tourStageResults.map((tourStageResult, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>
                                        <CFormCheck
                                            checked={selectedBirds.includes(tourStageResult.birdCode)}
                                            onChange={() => handleSelectBird(tourStageResult.birdCode)}
                                        />
                                    </CTableDataCell>
                                    <CTableDataCell>{tourStageResult.birdCode}</CTableDataCell>
                                    <CTableDataCell>{tourStageResult.startPointCode}</CTableDataCell>
                                    <CTableDataCell>{tourStageResult.startTime}</CTableDataCell>
                                    <CTableDataCell>{tourStageResult.endPointCode}</CTableDataCell>
                                    <CTableDataCell>{tourStageResult.endTime}</CTableDataCell>
                                    <CTableDataCell>{tourStageResult.pointKey}</CTableDataCell>

                                    <CTableDataCell>
                                        <CButton className='mx-2' color="success" onClick={() => handleConfirm(tourStageResult.birdCode)}>Xác nhận</CButton>
                                        <CButton color="danger" onClick={() => handleReject(tourStageResult.birdCode)}>Từ chối</CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan="23">Không có kết quả nào</CTableDataCell>
                            </CTableRow>
                        )}
                    </CTableBody>
                </CTable>
            </div>
        </div>
    );
};

export default TourAccepResult;
