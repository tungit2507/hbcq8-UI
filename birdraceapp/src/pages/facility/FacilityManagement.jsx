import React, { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput } from '@coreui/react';
import Swal from 'sweetalert2';
import axioInstance from '../../apiInstance';
import { ToastContainer, toast } from 'react-toastify';

const FacilityManagement = () => {
    const [facilities, setFacilities] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentFacility, setCurrentFacility] = useState({ code: '', pointCoor: '' });

    useEffect(() => {
        fetchFacilities();
    }, []);


    const fetchFacilities = async () => {
        try {
            const response = await axioInstance.get('/user-location/me', {
                withCredentials: true
            });
            console.log(response);
            if (response.data && Array.isArray(response.data)) {
                setFacilities(response.data);
            } else {
                fetchFacilities();
                console.error('Dữ liệu căn cứ không hợp lệ:', response.data);
                toast.error('Đã xảy ra lỗi khi tải danh sách căn cứ. Dữ liệu không hợp lệ.');
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách căn cứ:', error);
            toast.error('Đã xảy ra lỗi khi tải danh sách căn cứ. Vui lòng thử lại sau.');
        }
    };

    const addFacility = () => {
        const formData = new FormData();
        formData.append('code', currentFacility.code);
        formData.append('pointCoor', currentFacility.pointCoor);

        axioInstance.post('/user-location', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            fetchFacilities();
            toast.success('Thêm căn cứ thành công!');
            setShowAddModal(false); 
        })
        .catch(error => {
            console.error(error);
            const errorMessage = error.response.data.errorMessage;
            toast.error(errorMessage);
        });
    };

    const editFacility = () => {
        const formData = new FormData();
        formData.append('code', currentFacility.code);
        formData.append('pointCoor', currentFacility.pointCoor);

        axioInstance.put(`/user-location/${currentFacility.id}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            fetchFacilities();
            toast.success('Chỉnh sửa căn cứ thành công!');
            setShowEditModal(false);
        })
        .catch(error => {
            console.error(error);
            const errorMessage = error.response.data.errorMessage;
            toast.error(errorMessage);
        });
    };

    const deleteFacility = (id) => {
        axioInstance.delete(`/user-location/${id}`)
        .then(response => {
            fetchFacilities();
            console.log(response);
            toast.success('Xóa căn cứ thành công!');
            
        })
        .catch(error => {
            console.error(error);
            const errorMessage = error.response.data.errorMessage;
            toast.error(errorMessage);
        });
    };

    const handleDeleteModal = (id) => {
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
                deleteFacility(id);
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
                            <CTableHeaderCell scope="col">Tọa Độ</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày Tạo</CTableHeaderCell>
                            {/* <CTableHeaderCell scope="col">Người Tạo</CTableHeaderCell> */}
                            <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {facilities.map(facility => (
                            <CTableRow key={facility.id}>
                                <CTableDataCell>{facility.code}</CTableDataCell>
                                <CTableDataCell>{facility.pointCoor}</CTableDataCell>
                                <CTableDataCell>{facility.createdAt}</CTableDataCell>
                                {/* <CTableDataCell>{facility.createdBy}</CTableDataCell> */}
                                <CTableDataCell>
                                    <CButton className='mx-1' color="warning" onClick={() => { setCurrentFacility(facility); setShowEditModal(true); }}>Chỉnh Sửa</CButton>
                                    <CButton className='mx-1' color="danger" onClick={() => handleDeleteModal(facility.id)}>Xóa</CButton>
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