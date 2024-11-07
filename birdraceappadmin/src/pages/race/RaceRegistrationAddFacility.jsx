import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFacilities } from '../../api/FacilityApi';
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol, CFormSelect } from '@coreui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { getRaceRegistrationDetail } from '../../api/raceRegistration';
import { fetchRaceById } from '../../api/raceApi';
import { calculateDistance } from '../../api/raceLocationApi';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { toast } from 'react-toastify';
import { approveRaceRegistration } from '../../api/raceRegistration';
import { showErrorNotification, showSuccessNotification } from '../../api/sweetAlertNotify';
import { current } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

const RaceRegistrationAddFacility = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const requesterId = query.get('requesterId');
  const raceId = query.get('tourId');

  const { control, register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'selectedFacilities' });

  const [facilities, setFacilities] = useState([]);
  const [raceRegistration, setRaceRegistration] = useState(null);
  const [race, setRace] = useState(null);
  const [stageDistances, setStageDistances] = useState([]);
  const [endPointDistance, setEndPointDistance] = useState(0);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raceRegistrationDetail = await getRaceRegistrationDetail(raceId, requesterId);
        setRaceRegistration(raceRegistrationDetail);

        const facilitiesData = await fetchFacilities(requesterId);
        setFacilities(facilitiesData);

        const race = await fetchRaceById(raceId);
        setRace(race);

        setValue('startPointCode', race.startPointCode);
        setValue('endPointCode', race.endPointCode);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [raceId, requesterId, setValue]);

  const handleCalculateDistance = async () => {
    const selectedFacilities = watch('selectedFacilities');
    const unselectedFacility = selectedFacilities.find(facility => !facility.code);

    if (unselectedFacility) {
      toast.error('Vui lòng chọn tất cả các căn cứ trước khi tính khoảng cách.');
      return;
    }

    const stageCoordinates = watch('selectedFacilities').map(stage => stage.code);
    // const coordinatePattern = /^\d+(\.\d+)?;\d+(\.\d+)?$/;
    
    const stageCoordinatesWithCoor = stageCoordinates.map(code => {
      const facility = facilities.find(facility => facility.code === code);
      return facility ? facility.pointCoor : null;
    });

    try {
      const calculateDistanceDto = {
        startPoint: race.startPointCoor,
        point1: stageCoordinatesWithCoor[0] || null,
        point2: stageCoordinatesWithCoor[1] || null,
        point3: stageCoordinatesWithCoor[2] || null,
        point4: stageCoordinatesWithCoor[3] || null,
        point5: stageCoordinatesWithCoor[4] || null,
        endPoint: race.endPointCoor
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
          setValue(`selectedFacilities[${index}].distance`, distance);
        });
      } else {
        toast.error('Không nhận được kết quả tính khoảng cách hợp lệ.');
      }
    } catch (error) {
      console.error('Lỗi khi tính khoảng cách:', error);
      toast.error('Đã xảy ra lỗi khi tính khoảng cách.');
    }
  }

  const navigate = useNavigate();

  const onSubmit = async (data) => {

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));


    const formData = {
      tourId: raceId,
      requesterId: requesterId,
      approverId: currentUser.id, // Set this value as needed
      startPointCode: data.startPointCode,
      startPointCoor: race.startPointCoor,
      point1Code: data.selectedFacilities[0]?.code || null,
      point1Coor: facilities.find(facility => facility.code === data.selectedFacilities[0]?.code)?.pointCoor || null,
      point1Dist: data.selectedFacilities[0]?.distance || 0,
      point2Code: data.selectedFacilities[1]?.code || null,
      point2Coor: facilities.find(facility => facility.code === data.selectedFacilities[1]?.code)?.pointCoor || null,
      point2Dist: data.selectedFacilities[1]?.distance || 0,
      point3Code: data.selectedFacilities[2]?.code || null,
      point3Coor: facilities.find(facility => facility.code === data.selectedFacilities[2]?.code)?.pointCoor || null,
      point3Dist: data.selectedFacilities[2]?.distance || 0,
      point4Code: data.selectedFacilities[3]?.code || null,
      point4Coor: facilities.find(facility => facility.code === data.selectedFacilities[3]?.code)?.pointCoor || null,
      point4Dist: data.selectedFacilities[3]?.distance || 0,
      point5Code: data.selectedFacilities[4]?.code || null,
      point5Coor: facilities.find(facility => facility.code === data.selectedFacilities[4]?.code)?.pointCoor || null,
      point5Dist: data.selectedFacilities[4]?.distance || 0,
      endPointCode: data.endPointCode,
      endPointCoor: race.endPointCoor,
      endPointDist: data.endPoint.distance,
      memo: data.memo || ''
    };

      try {
        await approveRaceRegistration(formData);
        showSuccessNotification("Đơn đăng ký đã được duyệt thành công");
      } catch (error) {
        showErrorNotification("Lỗi khi duyệt đơn đăng ký");
      }
      navigate(`/management/race/registration-list?id=${raceId}`);
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
              <CRow className="mb-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="startPointCode">Mã căn cứ bắt đầu</CFormLabel>
                  <CFormInput
                    id="startPointCode"
                    disabled
                    {...register('startPointCode', { required: 'Mã căn cứ bắt đầu là bắt buộc' })}
                  />
                </CCol>
              </CRow>
              {fields.map((field, index) => (
                <CRow className="mb-3" key={field.id}>
                  <CCol md={6}>
                    <CFormLabel htmlFor={`selectedFacilities[${index}].code`}>Mã căn cứ {index + 1}</CFormLabel>
                    <CFormSelect
                      id={`selectedFacilities[${index}].code`}
                      {...register(`selectedFacilities[${index}].code`, { required: 'Mã căn cứ là bắt buộc' })}
                    >
                      <option value="">Chọn mã căn cứ</option>
                      {facilities.map(facility => (
                        <option key={facility.id} value={facility.code}>{facility.code}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor={`selectedFacilities[${index}].distance`}>Khoảng Cách (kilômét)</CFormLabel>
                    <CFormInput
                      type="number"
                      id={`selectedFacilities[${index}].distance`}
                      {...register(`selectedFacilities[${index}].distance`, { required: 'Số mét chặng là bắt buộc' })}
                      value={stageDistances[index] || ''}
                      readOnly
                    />
                  </CCol>
                  <CCol md={3} className="d-flex align-items-end">
                    <CButton color="danger" onClick={() => remove(index)}>Xóa</CButton>
                  </CCol>
                </CRow>
              ))}
              <CRow className="mb-3">
                <CCol>
                  {fields.length < 5 && (
                    <CButton type="button" color="secondary" onClick={() => append({ code: '' })}>Thêm Căn Cứ</CButton>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="endPointCode">Mã căn cứ đích</CFormLabel>
                  <CFormInput
                    id="endPointCode"
                    disabled
                    {...register('endPointCode', { required: 'Mã căn cứ đích là bắt buộc' })}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="endPointDistance">Khoảng Cách (kilômét)</CFormLabel>
                  <CFormInput
                    type="number"
                    id="endPointDistance"
                    {...register('endPoint.distance', { required: 'Số mét điểm kết thúc là bắt buộc' })}
                    value={endPointDistance || ''}
                    readOnly
                  />
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
                  <CButton className='my-2' type="submit" color="primary">Duyệt Đơn Đăng Ký</CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default RaceRegistrationAddFacility;
