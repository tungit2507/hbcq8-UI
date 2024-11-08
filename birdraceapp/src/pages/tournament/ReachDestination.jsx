import React, { useEffect, useState } from 'react';
import axiosInstance from '../../apiInstance';
import { CButton, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CModal, CModalHeader, CModalTitle, CModalBody, CForm, CFormLabel, CFormSelect, CFormInput, CModalFooter } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const ReachDestination = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tourId = query.get('tourId');
    const [showReportModal, setShowReportModal] = useState(false);
    const [report, setReport] = useState({ birdCode: '', secretCode: '', tourCode: '' });
    const [birdCodes, setBirdCodes] = useState([]);

    const handleAddReport = () => {
        console.log('Add report:', report);
        if (!report.tourCode || !report.secretCode) {
            toast.error('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        if (!/^Z\d{3,4}$/.test(report.tourCode)) {
            toast.error('Mã căn cứ phải bắt đầu bằng "Z" và theo sau là 3 hoặc 4 chữ số.');
            return;
        }
        if (!/^\d{5}$/.test(report.secretCode)) {
            toast.error('Mã bí mật phải có 5 số.');
            return;
        }
        Swal.fire({
            title: 'Xác Nhận Báo Cáo',
            html: `Vui Lòng Xác Nhận Trước Khi Báo Cáo<p>${report.tourCode} ${report.birdCode} ${report.secretCode}</p>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                const formData = {
                    tourId: tourId,
                    requesterId: currentUser.id,
                    birdCode: report.birdCode,
                    pointKey: report.secretCode,
                    pointNo: birdCodes.indexOf(report.tourCode) === birdCodes.length - 1 ? 0 : birdCodes.indexOf(report.tourCode) + 1
                };
                axiosInstance.post('/tour/submit', formData, { responseType: 'blob' })
                    .then(response => {
                        const file = new Blob([response.data], { type: 'application/pdf' });
                        const fileURL = URL.createObjectURL(file);
                        const link = document.createElement('a');
                        link.href = fileURL;
                        const date = new Date();
                        const formattedDate = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
                        link.download = `phieughinhanthongtin_${formattedDate}.pdf`;
                        link.click();
                        const pdfWindow = window.open();
                        pdfWindow.location.href = fileURL;
                        URL.revokeObjectURL(fileURL);
                        toast.success('Báo cáo thành công!');
                        setReport({ birdCode: '', secretCode: '', tourCode: '' });
                        fetchData();
                    })
                    .catch(error => {
                        if(error.response.status === 408) {
                            const errorMessage = "Quá thời hạn chỉnh sửa lại";
                            toast.error(errorMessage, error);
                        }else{
                            const errorMessage = "Báo cáo không thành công";
                            toast.error(errorMessage, error);
                        }
                    });
            }
        });

        setShowReportModal(false);
    };

    const [birds, setBirds] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/tour/detail?tourId=${tourId}`);
            setBirds(response.data);
        } catch (error) {
            console.error('Error fetching birds:', error);
        }
    };

    useEffect(() => {
    
        fetchData();
    }, [tourId]);

    const openReportModal = (bird) => {
        const codes = [
            bird.point1Code,
            bird.point2Code,
            bird.point3Code,
            bird.point4Code,
            bird.point5Code,
            bird.endPointCode
        ].filter(code => code !== null);
        setBirdCodes(codes);
        setReport({ ...report, birdCode: bird.birdCode });
        setShowReportModal(true);
    };

    return (
        <div className="p-3 rounded">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h3 className="mb-2 mb-md-0">Chi Tiết Giải Đua</h3>
            </div>
            <hr className="my-4" />

            <div className="table-responsive">
                {birds.length > 0 ? (
                    <CTable className="table-bordered rounded table-striped text-center">
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">Mã Kiềng</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ Bắt Đầu</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ 1 </CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ 2</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ 3</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ 4</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ 5</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Mã Căn Cứ Đích</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {birds.map((bird, index) => (
                                <CTableRow key={index}>
                                    <CTableDataCell>{bird.birdCode}</CTableDataCell>
                                    <CTableDataCell>{bird.startPointCode}</CTableDataCell>
                                    <CTableDataCell className={bird.hasSubmit1 ? 'bg-success text-white' : ''}>{bird.point1Code}</CTableDataCell>
                                    <CTableDataCell className={bird.hasSubmit2 ? 'bg-success text-white' : ''}>{bird.point2Code}</CTableDataCell>
                                    <CTableDataCell className={bird.hasSubmit3 ? 'bg-success text-white' : ''}>{bird.point3Code}</CTableDataCell>
                                    <CTableDataCell className={bird.hasSubmit4 ? 'bg-success text-white' : ''}>{bird.point4Code}</CTableDataCell>
                                    <CTableDataCell className={bird.hasSubmit5 ? 'bg-success text-white' : ''}>{bird.point5Code}</CTableDataCell>
                                    <CTableDataCell className={bird.hasSubmit0 ? 'bg-success text-white' : ''}>{bird.endPointCode}</CTableDataCell>
                                    <CTableDataCell><CButton color='danger' onClick={() => openReportModal(bird)}>Báo Cáo</CButton></CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                ) : (
                    <p>No birds found.</p>
                )}
            </div>
            <CModal visible={showReportModal} onClose={() => setShowReportModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Chỉnh Sửa Căn Cứ</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel htmlFor="tourCode">Mã Căn Cứ</CFormLabel>
                        <CFormSelect
                            id="tourCode"
                            value={report.tourCode}
                            onChange={(e) => setReport({ ...report, tourCode: e.target.value })}
                        >
                            <option value="" disabled>Chọn căn cứ</option>
                            {birdCodes.map((code, index) => (
                                <option key={index} value={code}>{index === birdCodes.length - 1 ? `Căn Cứ Đích: ${code}` : `Căn Cứ ${index + 1}: ${code}`}</option>
                            ))}
                        </CFormSelect>
                        <CFormLabel htmlFor="secretCode">Mã Bí Mật</CFormLabel>
                        <CFormInput
                            className='my-1'
                            type="text"
                            id="secretCode"
                            placeholder="Nhập Mã Bí Mật (5 ký tự)"
                            value={report.secretCode}
                            onChange={(e) => setReport({ ...report, secretCode: e.target.value })}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowReportModal(false)}>Hủy</CButton>
                    <CButton color="primary" onClick={handleAddReport}>Báo Cáo</CButton>
                </CModalFooter>
            </CModal>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default ReachDestination;
