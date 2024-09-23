import React, { useState } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserManagementAdd = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { control, register, handleSubmit, formState: { errors } } = useForm();

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

      toast.success('Thêm giải đua thành công!');
      // Clear image preview
      setImagePreview(null);
    } catch (error) {
      toast.error('Thêm giải đua thất bại.');
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
            <h5>Thêm Giải Đua Mới</h5>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit(onSubmit)}>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />}
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="image">Hình Ảnh</CFormLabel>
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'Hình Ảnh Là Bắt Buộc' }}
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
                  <CFormLabel htmlFor="raceName">Tên Giải Đua</CFormLabel>
                  <CFormInput
                    type="text"
                    id="raceName"
                    {...register('name', { required: 'Tên giải đua là bắt buộc' })}
                    invalid={!!errors.name}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="numberOfBirds">Số Chim</CFormLabel>
                  <CFormInput
                    type="number"
                    id="numberOfBirds"
                    {...register('numberOfBirds', { required: 'Số chim là bắt buộc', min: { value: 1, message: 'Phải có ít nhất 1 chim' } })}
                    invalid={!!errors.numberOfBirds}
                  />
                  {errors.numberOfBirds && <div className="invalid-feedback">{errors.numberOfBirds.message}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="startDate">Ngày Bắt Đầu</CFormLabel>
                  <CFormInput
                    type="date"
                    id="startDate"
                    {...register('startDate', { required: 'Ngày bắt đầu là bắt buộc' })}
                    invalid={!!errors.startDate}
                  />
                  {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="endDate">Ngày Kết Thúc</CFormLabel>
                  <CFormInput
                    type="date"
                    id="endDate"
                    {...register('endDate', { required: 'Ngày kết thúc là bắt buộc' })}
                    invalid={!!errors.endDate}
                  />
                  {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="breakTime">Thời Gian Nghỉ</CFormLabel>
                  <CFormInput
                    type="text"
                    id="breakTime"
                    {...register('breakTime', { required: 'Thời gian nghỉ là bắt buộc' })}
                    invalid={!!errors.breakTime}
                  />
                  {errors.breakTime && <div className="invalid-feedback">{errors.breakTime.message}</div>}
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

export default UserManagementAdd;
