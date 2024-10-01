import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
import { calculateDistance } from '../../api/raceLocationApi';
import { showErrorNotification, showSuccessNotification } from '../../api/sweetAlertNotify';
import { addRace } from '../../api/raceApi';
import { useNavigate } from 'react-router-dom';

const AddRaceForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'stages' });
  const [endPointDistance, setEndPointDistance] = useState(0);
  const [stageDistances, setStageDistances] = useState([]);
  const navigate = useNavigate();

  const startPointCoordinates = watch('startPoint.coordinates');
  const endPointCoordinates = watch('endPoint.coordinates');
  const stages = watch('stages');

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('birdsNum', data.numberOfBirds);
      formData.append('startDate', `${data.startDate.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:00')}`);
      formData.append('endDate', `${data.endDate.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:00')}`);
      formData.append('restTimePerDay', data.breakTime);
      formData.append('isActived', true);
      if (data.image[0]) formData.append('imgUrl', data.image[0]);

      formData.append('tourLocation.startPoint.name', data.startPoint.name);
      formData.append('tourLocation.startPoint.coor', data.startPoint.coordinates);
      formData.append('tourLocation.startPoint.dist', "0");

      formData.append('tourLocation.endPoint.name', data.endPoint.name);
      formData.append('tourLocation.endPoint.coor', data.endPoint.coordinates);
      formData.append('tourLocation.endPoint.dist', data.endPoint.distance.toString());

      for (let i = 0; i < 5; i++) {
        formData.append(`tourLocation.point${i+1}.name`, data.stages[i]?.name || "");
        formData.append(`tourLocation.point${i+1}.coor`, data.stages[i]?.coordinates || "");
        formData.append(`tourLocation.point${i+1}.dist`, data.stages[i]?.distance?.toString() || "0");
      }

      await addRace(formData);
      
      console.log(Object.fromEntries(formData));
      showSuccessNotification("Thêm Giải Đua Thành Công")
      setImagePreview(null);
      navigate('/management/race/list');
      
    } catch (error) {
      const errorMessage =  error.response.data.errorMessage? error.response.data.errorMessage : "Lỗi khi thêm giải đua";
      showErrorNotification(errorMessage);
    }
  };

  const handleCalculateDistance = async () => {
    const startCoordinates = watch('startPoint.coordinates');
    const endCoordinates = watch('endPoint.coordinates');
    const stageCoordinates = watch('stages').map(stage => stage.coordinates);

    const coordinatePattern = /^\d+(\.\d+)?;\d+(\.\d+)?$/;

    if (!coordinatePattern.test(startCoordinates)) {
      showErrorNotification("Tọa độ điểm bắt đầu không hợp lệ")
      return;
    }

    if (!coordinatePattern.test(endCoordinates)) {
      showErrorNotification('Tọa độ điểm kết thúc không hợp lệ');
      return;
    }

    for (let i = 0; i < stageCoordinates.length; i++) {
      if (!coordinatePattern.test(stageCoordinates[i])) {
        showErrorNotification(`Tọa độ chặng ${i + 1} không hợp lệ`);
        return;
      }
    }

    const allCoordinates = [startCoordinates, ...stageCoordinates, endCoordinates].filter(Boolean);

    const calDistanceRequestDto = {
      coordinates: allCoordinates
    };
    console.log(calDistanceRequestDto);

    try {
      const calculateDistanceDto = {
        startPoint: startCoordinates,
        point1: stageCoordinates[0] || null,
        point2: stageCoordinates[1] || null,
        point3: stageCoordinates[2] || null,
        point4: stageCoordinates[3] || null,
        point5: stageCoordinates[4] || null,
        endPoint: endCoordinates
      };

      const result = await calculateDistance(calculateDistanceDto);
      console.log('Kết quả từ API:', result);

      if (result) {
        setValue('endPoint.distance', result.endPoint);
        setEndPointDistance(result.endPoint);
        console.log('Đã cập nhật khoảng cách điểm kết thúc:', result.endPoint);
        
        const newStageDistances = [];
        for (let i = 1; i <= 5; i++) {
          const pointDistance = result[`point${i}`];
          if (pointDistance !== null && pointDistance !== undefined && pointDistance !== 0) {
            newStageDistances.push(pointDistance);
          } else {
            break;
          }
        }
        
        setStageDistances(newStageDistances);
        
        newStageDistances.forEach((distance, index) => {
          setValue(`stages[${index}].distance`, distance);
        });
      } else {
        toast.error('Không nhận được kết quả tính khoảng cách hợp lệ.');
      }
    } catch (error) {
      console.error('Lỗi khi tính khoảng cách:', error);
      toast.error('Đã xảy ra lỗi khi tính khoảng cách.');
    }
  }

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

  useEffect(() => {
  }, [fields]);

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
                    type="datetime-local"
                    id="startDate"
                    {...register('startDate', { required: 'Ngày bắt đầu là bắt buộc' })}
                    invalid={!!errors.startDate}
                  />
                  {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="endDate">Ngày Kết Thúc</CFormLabel>
                  <CFormInput
                    type="datetime-local"
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
                    type="number"
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
                    defaultValue="Xuất Phát"
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
                        value: /^\d{1,3}\.\d{1,3};\d{1,3}\.\d{1,3}$/,
                        message: 'Tọa độ không hợp lệ. Định dạng đúng: "kinh_độ;vĩ_độ" (ví dụ: 193.000;152.555)'
                      }
                    })}
                    invalid={!!errors.startPoint?.coordinates}
                  />
                  {errors.startPoint?.coordinates && <div className="invalid-feedback">{errors.startPoint.coordinates.message}</div>}
                </CCol>
                <CCol md={3}> 
                  <CFormLabel htmlFor="startPointDistance">Khoảng Cách</CFormLabel>
                  <CFormInput
                    type="number"
                    id="startPointDistance"
                    defaultValue={0}
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
                          value: /^\d{1,3}\.\d{1,3};\d{1,3}\.\d{1,3}$/,
                          message: 'Tọa độ không hợp lệ. Định dạng đúng: "kinh_độ;vĩ_độ" (ví dụ: 193.000;152.555)'
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
                      value={stageDistances[index] || ''}
                      readOnly
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
                    defaultValue="Kết Thúc"
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
                        value: /^\d{1,3}\.\d{1,3};\d{1,3}\.\d{1,3}$/,
                        message: 'Tọa độ không hợp lệ. Định dạng đúng: "vĩ độ,kinh độ"'
                      }
                    })}
                    invalid={!!errors.endPoint?.coordinates}
                  />
                  {errors.endPoint?.coordinates && <div className="invalid-feedback">{errors.endPoint.coordinates.message}</div>}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointDistance">Khoảng Cách</CFormLabel>
                  <CFormInput
                    type="number"
                    id="endPointDistance"
                    {...register('endPoint.distance', { required: 'Số mét điểm kết thúc là bắt buộc' })}
                    invalid={!!errors.endPoint?.distance}
                    value={endPointDistance}
                    readOnly
                  />
                  {errors.endPoint?.distance && <div className="invalid-feedback">{errors.endPoint.distance.message}</div>}
                </CCol>
                <CCol md={3} className="d-flex align-items-end">
                  <CButton
                    color="primary"
                    onClick={() => handleCalculateDistance()}
                    // disabled={!startPointCoordinates || !endPointCoordinates || stages.some(stage => !stage.coordinates)}
                  >
                    Tính Khoảng Cách
                  </CButton>
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

export default AddRaceForm;