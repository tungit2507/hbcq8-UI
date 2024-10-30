import React, { useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput } from '@coreui/react';
import Swal from 'sweetalert2';
import axioInstance from '../../apiInstance';
import { ToastContainer, toast } from 'react-toastify';


const FacilityManagement = () => {
    const [facilities, setFacilities] = useState([
        { code: 'FC001', name: 'Căn Cứ A', pointCoor: '10.123, 20.456', createdDate: '2023-01-01', createdBy: 'Nguyễn Văn A' },
        { code: 'FC002', name: 'Căn Cứ B', pointCoor: '11.123, 21.456', createdDate: '2023-02-01', createdBy: 'Trần Thị B' },
        { code: 'FC003', name: 'Căn Cứ C', pointCoor: '12.123, 22.456', createdDate: '2023-03-01', createdBy: 'Lê Văn C' },
    ]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentFacility, setCurrentFacility] = useState({ code: '', name: '', pointCoor: '', createdDate: '', createdBy: '' });

    const addFacility = () => {
        const formData = new FormData();
        formData.append('code', currentFacility.code);
        formData.append('name', currentFacility.name);
        formData.append('pointCoor', currentFacility.pointCoor);
        formData.append('createdDate', currentFacility.createdDate);
        formData.append('createdBy', currentFacility.createdBy);

        axioInstance.post('/facility/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
            // Xử lý thành công
        })
        .catch(error => {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi thêm căn cứ. Vui lòng thử lại sau.');
        });
    };

    const editFacility = () => {
        const formData = new FormData();
        formData.append('code', currentFacility.code);
        formData.append('name', currentFacility.name);
        formData.append('pointCoor', currentFacility.pointCoor);
        formData.append('createdDate', currentFacility.createdDate);
        formData.append('createdBy', currentFacility.createdBy);

        axioInstance.post('/facility/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response);
            // Xử lý thành công
        })
        .catch(error => {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi chỉnh sửa căn cứ. Vui lòng thử lại sau.');
        });
    };

    const deleteFacility = (code) => {
        axioInstance.delete(`/facility/delete/${code}`)
        .then(response => {
            console.log(response);
            // Xử lý thành công
        })
        .catch(error => {
            console.error(error);
            toast.error('Đã xảy ra lỗi khi xóa căn cứ. Vui lòng thử lại sau.');
        });
    };

    const handleDeleteModal = (code) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa!',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFacility(code);
            }
        });
    };

    return (
        <div className="p-3 rounded">
            <h4>Quản Lý Căn Cứ</h4>
            <CButton color="primary" onClick={() => setShowAddModal(true)}>Thêm Căn Cứ</CButton>
            <div className="table-responsive mt-4">
                <CTable className="table-bordered rounded table-striped text-center">
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Mã Căn Cứ</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tên Căn Cứ</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tọa Độ</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày Tạo</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Người Tạo</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {facilities.map(facility => (
                            <CTableRow key={facility.code}>
                                <CTableDataCell>{facility.code}</CTableDataCell>
                                <CTableDataCell>{facility.name}</CTableDataCell>
                                <CTableDataCell>{facility.pointCoor}</CTableDataCell>
                                <CTableDataCell>{facility.createdDate}</CTableDataCell>
                                <CTableDataCell>{facility.createdBy}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton className='mx-1' color="warning" onClick={() => { setCurrentFacility(facility); setShowEditModal(true); }}>Chỉnh Sửa</CButton>
                                    <CButton className='mx-1' color="danger" onClick={() => handleDeleteModal(facility.code)}>Xóa</CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>

            {/* Modal Thêm Căn Cứ */}
            <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Thêm Căn Cứ</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Mã Căn Cứ"
                            label="Mã Căn Cứ"
                            onChange={(e) => setCurrentFacility({ ...currentFacility, code: e.target.value })}
                        />
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Tên Căn Cứ"
                            label="Tên Căn Cứ"
                            onChange={(e) => setCurrentFacility({ ...currentFacility, name: e.target.value })}
                        />
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Tọa Độ"
                            label="Tọa Độ"
                            onChange={(e) => setCurrentFacility({ ...currentFacility, pointCoor: e.target.value })}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowAddModal(false)}>Hủy</CButton>
                    <CButton color="primary" onClick={addFacility}>Thêm</CButton>
                </CModalFooter>
            </CModal>

            {/* Modal Chỉnh Sửa Căn Cứ */}
            <CModal visible={showEditModal} onClose={() => setShowEditModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Chỉnh Sửa Căn Cứ</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Mã Căn Cứ"
                            label="Mã Căn Cứ"
                            value={currentFacility.code}
                            onChange={(e) => setCurrentFacility({ ...currentFacility, code: e.target.value })}
                        />
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Tên Căn Cứ"
                            label="Tên Căn Cứ"
                            value={currentFacility.name}
                            onChange={(e) => setCurrentFacility({ ...currentFacility, name: e.target.value })}
                        />
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Tọa Độ"
                            label="Tọa Độ"
                            value={currentFacility.pointCoor}
                            onChange={(e) => setCurrentFacility({ ...currentFacility, pointCoor: e.target.value })}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowEditModal(false)}>Hủy</CButton>
                    <CButton color="primary" onClick={editFacility}>Lưu</CButton>
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

export default FacilityManagement;