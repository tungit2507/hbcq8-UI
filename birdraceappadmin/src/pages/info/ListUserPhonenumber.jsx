import React, { useState, useEffect } from 'react';
import { CFormLabel, CInputGroup, CInputGroupText, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormInput } from '@coreui/react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { fetchBirds, updateBird, addBird, deleteBird } from '../../api/BirdApi';
import { showErrorNotification } from '../../api/sweetAlertNotify';
import { useLocation } from 'react-router-dom';

const UserPhonenumberList = () => {
    const [birds, setBirds] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentBird, setCurrentBird] = useState({ name: '', phoneNumber: '', id: '' });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('user');

    useEffect(() => {
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        // const data = await fetchBirds(userId);
        const data = [];
        setBirds(data);
    };

    const handleAddBird = async () => {
        if (!currentBird.name || !currentBird.phoneNumber) {
            showErrorNotification("Tên và số điện thoại không được bỏ trống.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('name', currentBird.name);
            formData.append('phoneNumber', currentBird.phoneNumber);
            await addBird(formData);
            fetchData();
            setShowAddModal(false);
        } catch (error) {
            const errorMessage = error.response.data.errorMessage;
            showErrorNotification(errorMessage || "Lỗi trong quá trình xử lý ");
        }
    };

    const handleEditBird = async () => {
        if (!currentBird.name || !currentBird.phoneNumber) {
            showErrorNotification("Tên và số điện thoại không được bỏ trống.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('name', currentBird.name);
            formData.append('phoneNumber', currentBird.phoneNumber);
            formData.append('id', currentBird.id);
            await updateBird(formData);
            fetchData();
            setShowEditModal(false);
        } catch (error) {
            const errorMessage = error.response.data.errorMessage;
            showErrorNotification(errorMessage || "Lỗi trong quá trình cập nhật");
        }
    };

    const handleDeleteBird = async (id) => {
        try {
            await deleteBird(id);
            fetchData();
            Swal.fire('Thành công', 'Thông tin  đã được xóa thành công.', 'success');
        } catch (error) {
            const errorMessage = error.response.data.errorMessage;
            showErrorNotification(errorMessage || "Không thể xóa Thông tin . Vui lòng thử lại sau.");
        }
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
                handleDeleteBird(id);
            }
        });
    };

    return (
        <div className="p-3 rounded">
            <h4>Quản Lý Thông tin </h4>
            <CButton color="primary" onClick={() => setShowAddModal(true)}>Thêm Thông tin </CButton>
            <div className="table-responsive mt-4">
                <CTable className="table-bordered rounded table-striped text-center">
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Hành Động</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {birds?.map(bird => (
                            <CTableRow key={bird.id}>
                                <CTableDataCell>{bird.name}</CTableDataCell>
                                <CTableDataCell>{bird.phoneNumber}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton className='mx-1' color="warning" onClick={() => { setCurrentBird({ ...bird, id: bird.id }); setShowEditModal(true); }}>Chỉnh Sửa</CButton>
                                    <CButton className='mx-1' color="danger" onClick={() => handleDeleteModal(bird.id)}>Xóa</CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>

            {/* Modal Thêm Thông tin  */}
            <CModal visible={showAddModal} onClose={() => setShowAddModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Thêm Thông tin </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel htmlFor="name" className="mt-3">Tên</CFormLabel>
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Tên"
                            onChange={(e) => setCurrentBird({ ...currentBird, name: e.target.value })}
                        />
                        <CFormLabel htmlFor="phoneNumber" className="mt-3">Số điện thoại</CFormLabel>
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Số điện thoại"
                            onChange={(e) => setCurrentBird({ ...currentBird, phoneNumber: e.target.value })}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowAddModal(false)}>Hủy</CButton>
                    <CButton color="primary" onClick={handleAddBird}>Thêm</CButton>
                </CModalFooter>
            </CModal>

            {/* Modal Chỉnh Sửa Thông tin  */}
            <CModal visible={showEditModal} onClose={() => setShowEditModal(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Chỉnh Sửa Thông tin </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormLabel htmlFor="name" className="mt-3">Tên</CFormLabel>
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Tên"
                            value={currentBird.name}
                            onChange={(e) => setCurrentBird({ ...currentBird, name: e.target.value })}
                        />
                        <CFormLabel htmlFor="phoneNumber" className="mt-3">Số điện thoại</CFormLabel>
                        <CFormInput
                            className='my-1'
                            type="text"
                            placeholder="Nhập Số điện thoại"
                            value={currentBird.phoneNumber}
                            onChange={(e) => setCurrentBird({ ...currentBird, phoneNumber: e.target.value })}
                        />
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowEditModal(false)}>Hủy</CButton>
                    <CButton color="primary" onClick={handleEditBird}>Lưu</CButton>
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

export default UserPhonenumberList;
