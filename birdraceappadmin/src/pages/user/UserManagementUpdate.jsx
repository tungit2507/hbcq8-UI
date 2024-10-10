import React, { useEffect, useState } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useForm, Controller } from 'react-hook-form';
import { updateUser, getOneUser } from '../../api/UserApi';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { showErrorNotification } from '../../api/SweetAlertNotify';

const UserManagementUpdate = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { control, register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState(() =>{
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      console.log(storedUser);
      storedUser.birthday = moment(storedUser.birthday).format('YYYY-MM-DD');
      console.log(storedUser);
      return storedUser;
    }
    return null;
  });

  // Get id from URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const username = query.get('username');


  // useEffect(()=>{
  //  
  // })

  // Form submission handler
  const onSubmit = async (data) => {
      try {
        console.log(data);
        data.imgUrl = "";
        const response  =  await updateUser(data);
      } catch (error) {
        showErrorNotification("Lỗi xảy ra khi cập nhật thành viên");
        console.log(error);
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
      <CCol md={11}>
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
                        type="number"
                        id="id"
                        value={user?.id || ''}
                        {...register('userId', { required: 'Id là bắt buộc' })}
                        invalid={!!errors.id}
                        />
                        {errors.id && <div className="invalid-feedback">{errors.id.message}</div>}
                     </CCol>
              </CRow>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />}
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="imgUrl">Ảnh Đại Diện</CFormLabel>
                  <Controller
                    name="imgUrl"
                    control={control}
                    rules={{ required: 'Ảnh đại diện là bắt buộc' }}
                    render={({ field }) => (
                      <CFormInput
                        type="file"
                        id="imgUrl"
                        accept="image/*"
                        onChange={(e) => {
                          field.onChange(e);
                          handleImageChange(e);
                        }}
                        invalid={!!errors.imgUrl}
                      />
                    )}
                  />
                  {errors.imgUrl && <div className="invalid-feedback">{errors.imgUrl.message}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Ngày Sinh</CFormLabel>
                  <CFormInput
                    type="date"
                    id="birthday"
                    defaultValue={user?.birthday ? moment(user.birthday).format('YYYY-MM-DD') : ''}
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
                  <CButton type="submit" color="primary">Cập Nhật</CButton>
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
