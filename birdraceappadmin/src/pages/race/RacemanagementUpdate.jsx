import React, { useState, useEffect } from 'react';
import { CForm, CFormLabel, CFormInput, CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CFormSelect } from '@coreui/react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from '../../api/SweetAlertNotify';
import { calculateDistance } from '../../api/RaceLocationApi';
import { fetchRaceById, updateRace } from '../../api/RaceApi';
import { fetchFacilities } from '../../api/FacilityApi';

const UpdateRaceForm = () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const [imagePreview, setImagePreview] = useState(null);
  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'stages' });
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [endPointDistance, setEndPointDistance] = useState(0);
  const [stageDistances, setStageDistances] = useState([]);

  const currentUser = sessionStorage.getItem('currentUser');
  const userId = currentUser ? JSON.parse(currentUser).id : '';

  useEffect(() => {
    const fetchFacilitiesData = async () => {
      const data = await fetchFacilities(userId);
      setFacilities(data);
    };

    const fetchRaceData = async () => {
      try {
        const response = await fetchRaceById(id);
        const raceData = response;
        
        setValue('name', raceData.name);
        setValue('numberOfBirds', raceData.birdsNum);
        setValue('startDate', raceData.startDate.replace(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
        setValue('endDate', raceData.endDate.replace(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'));
        setValue('breakTime', raceData.restTimePerDay);
        setValue('startPointCode', raceData.startPointCode);
        setValue('endPointCode', raceData.endPointCode);

        
        
        
        const stagesData = [];
        for (let i = 1; i <= 5; i++) {
          const point = raceData.tourLocation[`point${i}`];
          if (point) {
            stagesData.push({
              name: point.name,
              coordinates: point.coor,
              distance: point.dist
            });
          }
        }
        setValue('stages', stagesData);

        setImagePreview(raceData.imgUrl);
        setIsActive(raceData.isActived);
      } catch (error) {
        toast.error('Không thể tải dữ liệu giải đua.');
      }
    };

    fetchFacilitiesData().then(() => fetchRaceData());
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append('name', data.name);
      formData.append('birdsNum', data.numberOfBirds);
      formData.append('startDate', `${data.startDate.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:00')}`);
      formData.append('endDate', `${data.endDate.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/, '$3-$2-$1 $4:$5:00')}`);
      formData.append('restTimePerDay', data.breakTime);
      formData.append('isActived', isActive);
      formData.append('startPointCode', data.startPointCode);
      formData.append('endPointCode', data.endPointCode);

   

      await updateRace(id, formData);
      showSuccessNotification('Cập nhật giải đua thành công!');
      setImagePreview(null);
      navigate('/management/race/list');
    } catch (error) {
      const errorMessage = error.response.data.errorMessage ? error.response.data.errorMessage : 'Cập nhật giải đua thất bại.';
      showErrorNotification(errorMessage);
    }
  };

  const handleCalculateDistance = async () => {
    const startCoordinates = facilities.find(facility => facility.code === watch('startPointCode'))?.pointCoor;
    const endCoordinates = facilities.find(facility => facility.code === watch('endPointCode'))?.pointCoor;
    const stageCoordinates = watch('stages').map(stage => stage.coordinates);

    const coordinatePattern = /^\d+(\.\d+)?;\d+(\.\d+)?$/;

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

      if (result) {
        setValue('endPoint.distance', result.endPoint);
        setEndPointDistance(result.endPoint);

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
      <CCol md={11}>
        <CCard>
          <CCardHeader>
            <h5 className='text-center'>Cập Nhật Giải Đua</h5>
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
                    render={({ field }) => (
                      <CFormInput
                        disabled
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
                    placeholder='Tên giải đua'
                    type="text"
                    id="raceName"
                    {...register('name', { required: 'Tên giải đua là bắt buộc' })}
                    invalid={!!errors.name}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="numberOfBirds">Số lượng chim đua tối đa</CFormLabel>
                  <CFormInput
                    placeholder='Nhập Số Chim'
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
                  <CFormLabel htmlFor="breakTime">Thời gian nghỉ (Đơn vị: 0.5 giờ)</CFormLabel>
                  <CFormInput
                    type="number"
                    id="breakTime"
                    step={0.1}
                    placeholder='Nhập thời gian nghỉ'
                    {...register('breakTime', { 
                      required: 'Thời gian nghỉ là bắt buộc', 
                      min: { value: 0, message: 'Thời gian nghỉ không được nhỏ hơn 0' },
                      max: { value: 24, message: 'Thời gian nghỉ không được lớn hơn 24' }},
                    )}
                    invalid={!!errors.breakTime}
                  />
                  {errors.breakTime && <div className="invalid-feedback">{errors.breakTime.message}</div>}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormLabel htmlFor="startPointCode">Mã căn cứ bắt đầu </CFormLabel>
                  <CFormSelect
                    id="startPointCode"
                    {...register('startPointCode', { required: 'Tên điểm bắt đầu là bắt buộc' })}
                    invalid={!!errors.startPoint?.name}
                  >
                    <option value="">Chọn mã căn cứ bắt đầu</option>
                    {facilities.map(facility => (
                      <option key={facility.id} value={facility.code}>{facility.code}</option>
                    ))}
                  </CFormSelect>
                  {errors.startPoint?.name && <div className="invalid-feedback">{errors.startPoint.name.message}</div>}
                </CCol>
                <CCol md={3}> 
                  <CFormLabel htmlFor="startPointDistance">Khoảng Cách (kilômét)</CFormLabel>
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
                      placeholder='Nhập Tên Chặng'
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
                      placeholder='193.000;152.222'
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
                    <CFormLabel htmlFor={`stages[${index}].distance`}>Khoảng Cách (kilômét)</CFormLabel>
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
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointCode">Mã căn cứ đích</CFormLabel>
                  <CFormSelect
                    id="endPointCode"
                    {...register('endPointCode', { required: 'Mã căn cứ đích là bắt buộc' })}
                    invalid={!!errors.endPoint?.name}
                  >
                    <option value="">Chọn mã căn cứ đích</option>
                    {facilities.map(facility => (
                      <option key={facility.id} value={facility.code}>{facility.code}</option>
                    ))}
                  </CFormSelect>
                  {errors.endPoint?.name && <div className="invalid-feedback">{errors.endPoint.name.message}</div>}
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointDistance">Khoảng Cách (kilômét)</CFormLabel>
                  <CFormInput
                    type="number"
                    id="endPointDistance"
                    {...register('endPoint.distance', { required: 'Số mét điểm kết thúc là bắt buộc' })}
                    invalid={!!errors.endPoint?.distance}
                    value={endPointDistance || ''}
                    readOnly
                  />
                  {errors.endPoint?.distance && <div className="invalid-feedback">{errors.endPoint.distance.message}</div>}
                </CCol>
                <CCol md={3} className="d-flex align-items-end">
                  <CButton
                    color="primary"
                    onClick={() => handleCalculateDistance()}
                  >
                    Tính Khoảng Cách
                  </CButton>
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