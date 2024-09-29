import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { updateRace, fetchRaceById} from '../../api/raceApi';
import { updateRaceLocation, fetchRaceLocationByRaceId } from '../../api/raceLocationApi';

const UpdateRaceForm = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'stages' });

  useEffect(() => {
    // Fetch race data by ID
    const fetchRaceData = async () => {
      try {

        const response = await fetchRaceById(1)
        const raceData = response.data;

        // Set form values
        setValue('name', raceData.name);
        setValue('numberOfBirds', raceData.numberOfBirds);
        setValue('startDate', raceData.startDate);
        setValue('endDate', raceData.endDate);
        setValue('breakTime', raceData.breakTime);
        setValue('startPoint', raceData.startPoint);
        setValue('endPoint', raceData.endPoint);
        setValue('stages', raceData.stages);

        // Set image preview
        setImagePreview(raceData.image);
      } catch (error) {
        toast.error('Không thể tải dữ liệu giải đua.');
      }
    };

    fetchRaceData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('numberOfBirds', data.numberOfBirds);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('breakTime', data.breakTime);
      if (data.image[0]) formData.append('image', data.image[0]);
      formData.append('startPoint', JSON.stringify(data.startPoint));
      formData.append('endPoint', JSON.stringify(data.endPoint));
      formData.append('stages', JSON.stringify(data.stages));

      // Make API call
      // await axios.put(`/api/races/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log(formData);
      toast.success('Cập nhật giải đua thành công!');
      // Clear image preview
      setImagePreview(null);
    } catch (error) {
      toast.error('Cập nhật giải đua thất bại.');
    }
  };

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
            <h5>Cập Nhật Giải Đua</h5>
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
                    value={id}
                  />
                </CCol>
              </CRow>
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />}
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="image">Hình Ảnh</CFormLabel>
                  <Controller
                    name="image"
                    control={control}
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
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel htmlFor="startPointName">Tên Điểm Bắt Đầu</CFormLabel>
                  <CFormInput
                    type="text"
                    id="startPointName"
                    {...register('startPoint.name', { required: 'Tên điểm bắt đầu là bắt buộc' })}
                    invalid={!!errors.startPoint?.name}
                  />
                  {errors.startPoint?.name && <div className="invalid-feedback">{errors.startPoint.name.message}</div>}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="startPointCoordinates">Tọa Độ Điểm Bắt Đầu</CFormLabel>
                  <CFormInput
                    type="text"
                    id="startPointCoordinates"
                    {...register('startPoint.coordinates', { 
                      required: 'Tọa độ điểm bắt đầu là bắt buộc',
                      pattern: {
                        value: /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
                        message: 'Tọa độ không hợp lệ. Định dạng đúng: "lat,lng"'
                      }
                    })}
                    invalid={!!errors.startPoint?.coordinates}
                  />
                  {errors.startPoint?.coordinates && <div className="invalid-feedback">{errors.startPoint.coordinates.message}</div>}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="startPointDistance">Khoảng Cách Điểm Bắt Đầu</CFormLabel>
                  <CFormInput
                    type="number"
                    id="startPointDistance"
                    {...register('startPoint.distance', { required: 'Số mét điểm bắt đầu là bắt buộc' })}
                    invalid={!!errors.startPoint?.distance}
                  />
                  {errors.startPoint?.distance && <div className="invalid-feedback">{errors.startPoint.distance.message}</div>}
                </CCol>
              </CRow>
              {fields.map((field, index) => (
                <CRow className="mb-3" key={field.id}>
                  <CCol md={3}>
                    <CFormLabel htmlFor={`stages[${index}].name`}>Tên Chặng {index + 1}</CFormLabel>
                    <CFormInput
                      type="text"
                      id={`stages[${index}].name`}
                      {...register(`stages[${index}].name`, { required: 'Tên chặng là bắt buộc' })}
                      invalid={!!errors.stages?.[index]?.name}
                    />
                    {errors.stages?.[index]?.name && <div className="invalid-feedback">{errors.stages[index].name.message}</div>}
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor={`stages[${index}].coordinates`}>Tọa Độ Chặng {index + 1}</CFormLabel>
                    <CFormInput
                      type="text"
                      id={`stages[${index}].coordinates`}
                      {...register(`stages[${index}].coordinates`, { 
                        required: 'Tọa độ chặng là bắt buộc',
                        pattern: {
                          value: /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
                          message: 'Tọa độ không hợp lệ. Định dạng đúng: "lat,lng"'
                        }
                      })}
                      invalid={!!errors.stages?.[index]?.coordinates}
                    />
                    {errors.stages?.[index]?.coordinates && <div className="invalid-feedback">{errors.stages[index].coordinates.message}</div>}
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor={`stages[${index}].distance`}>Khoảng Cách</CFormLabel>
                    <CFormInput
                      type="number"
                      id={`stages[${index}].distance`}
                      {...register(`stages[${index}].distance`, { required: 'Số mét chặng là bắt buộc' })}
                      invalid={!!errors.stages?.[index]?.distance}
                    />
                    {errors.stages?.[index]?.distance && <div className="invalid-feedback">{errors.stages[index].distance.message}</div>}
                  </CCol>
                  <CCol md={3} className="d-flex align-items-end">
                    <CButton color="danger" onClick={() => remove(index)}>Xóa Chặng</CButton>
                  </CCol>
                </CRow>
              ))}
              <CRow className="mb-3">
                <CCol>
                  {fields.length < 5 && (
                    <CButton type="button" color="secondary" onClick={() => append({ name: '', coordinates: '', distance: '' })}>Thêm Chặng</CButton>
                  )}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointName">Tên Điểm Kết Thúc</CFormLabel>
                  <CFormInput
                    type="text"
                    id="endPointName"
                    {...register('endPoint.name', { required: 'Tên điểm kết thúc là bắt buộc' })}
                    invalid={!!errors.endPoint?.name}
                  />
                  {errors.endPoint?.name && <div className="invalid-feedback">{errors.endPoint.name.message}</div>}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointCoordinates">Tọa Độ Điểm Kết Thúc</CFormLabel>
                  <CFormInput
                    type="text"
                    id="endPointCoordinates"
                    {...register('endPoint.coordinates', { 
                      required: 'Tọa độ điểm kết thúc là bắt buộc',
                      pattern: {
                        value: /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/,
                        message: 'Tọa độ không hợp lệ. Định dạng đúng: "lat,lng"'
                      }
                    })}
                    invalid={!!errors.endPoint?.coordinates}
                  />
                  {errors.endPoint?.coordinates && <div className="invalid-feedback">{errors.endPoint.coordinates.message}</div>}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointDistance">Khoảng Cách Điểm Kết Thúc</CFormLabel>
                  <CFormInput
                    type="number"
                    id="endPointDistance"
                    {...register('endPoint.distance', { required: 'Số mét điểm kết thúc là bắt buộc' })}
                    invalid={!!errors.endPoint?.distance}
                  />
                  {errors.endPoint?.distance && <div className="invalid-feedback">{errors.endPoint.distance.message}</div>}
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

export default UpdateRaceForm;