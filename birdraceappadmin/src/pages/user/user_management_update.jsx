import React, { useEffect, useState } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, getOneUser } from '../../api/userApi';
import { useLocation } from 'react-router-dom';
import { current } from '@reduxjs/toolkit';
import moment from 'moment';

const UserManagementUpdate = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState(() =>{
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      storedUser.birthday = moment(storedUser.birthday).format('YYYY-MM-DD');
      return storedUser;
    }
    return null;
  });

  // Get id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const username = query.get('username');


  useEffect(()=>{
  
  })

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('numberOfBirds', data.numberOfBirds);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('breakTime', data.breakTime);
      if (data.image[0]) formData.append('image', data.image[0]);

      // Make API call
      await axios.post('/api/races', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      toast.success('Cập nhật hội viên thành công!');
      // Clear image preview
      setImagePreview(null);
    } catch (error) {
      toast.error('Cập nhật giải đua thất bại.');
    }
  };

  // Image preview handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <CRow className="justify-content-center">
      <CCol md={8}>
        <CCard>
          <CCardHeader>
            <h5>Cập Nhật Thành Viên</h5>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              <CRow>
                  <CCol md={2}>
                     <CFormLabel htmlFor="id">ID :</CFormLabel>
                     <CFormInput
                        readOnly
                        type="text"
                        id="id"
                        value={user?.id || ''}
                        {...register('id', { required: 'Id là bắt buộc' })}
                        invalid={!!errors.id}
                        />
                        {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                     </CCol>
              </CRow>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />}
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="image">Ảnh Đại Diện</CFormLabel>
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'Ảnh đại diện là bắt buộc' }}
                    render={({ field }) => (
                      <CFormInput
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e);
                          handleImageChange(e);
                        }}
                        invalid={!!errors.image}
                      />
                    )}
                  />
                  {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Ngày Sinh</CFormLabel>
                  <CFormInput
                    type="date"
                    id="birthday"
                    value={user?.birthday || ''}
                    {...register('birthday', { required: 'Ngày sinh là bắt buộc' })}
                    invalid={!!errors.birthday}
                  />
                  {errors.birthday && <div className="invalid-feedback">{errors.birthday.message}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Số điện thoại</CFormLabel>
                  <CFormInput
                    type="text"
                    id="phone"
                    value={user?.phone || ''}
                    {...register('phone', { required: 'Số điện thoại là bắt buộc' })}
                    invalid={!!errors.phone}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="breakTime">Địa chỉ</CFormLabel>
                  <CFormInput
                    type="text"
                    id="address"
                    value={user?.address || ''}
                    {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                    invalid={!!errors.address}
                  />
                  {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton type="submit" color="primary">Thêm Giải Đua</CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default UserManagementUpdate;
