import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFacilities } from '../../api/FacilityApi'; // Giả sử bạn đã tạo API này
import { CForm, CFormLabel, CFormSelect, CButton, CRow, CCol } from '@coreui/react';
import { useForm, useFieldArray } from 'react-hook-form';

const RaceRegistrationAddFacility = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const requesterId = query.get('requesterId');
  const raceId = query.get('raceId');

  const { control, register, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: 'selectedFacilities' });

  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    const loadFacilities = async () => {
      const data = [
        { id: 1, name: 'Căn Cứ A', coordinates: [10, 20] },
        { id: 2, name: 'Căn Cứ B', coordinates: [30, 40] },
        { id: 3, name: 'Căn Cứ C', coordinates: [50, 60] },
        { id: 4, name: 'Căn Cứ D', coordinates: [70, 80] },
        { id: 5, name: 'Căn Cứ E', coordinates: [90, 100] },
      ];
      setFacilities(data);
    

    fetchRaceDetails();
    };


    // const fetchRaceDetails = async () => {
    //     try {
    //       const response = await fetch(`/api/races/${raceId}`);
    //       if (!response.ok) {
    //         throw new Error('Không thể tải chi tiết giải đua');
    //       }
    //       const raceDetails = await response.json();
    //       console.log('Chi tiết giải đua:', raceDetails);
    //       // Xử lý dữ liệu chi tiết giải đua
    //     } catch (error) {
    //       console.error('Lỗi khi tải chi tiết giải đua:', error);
    //     }
    // };

    // fetchRaceDetails();

    const fetchRaceDetails = async () => {
        try {
          const response = await fetch(`/api/races/${raceId}`);
          if (!response.ok) {
            throw new Error('Không thể tải chi tiết giải đua');
          }
          const raceDetails = await response.json();
          console.log('Chi tiết giải đua:', raceDetails);
        } catch (error) {
          console.error('Lỗi khi tải chi tiết giải đua:', error);
        }
    };

    fetchRaceDetails();

    
    loadFacilities();
  }, []);

  const onSubmit = (data) => {
    console.log('Selected Facilities:', data.selectedFacilities);
    // Xử lý gửi dữ liệu đã chọn
  };

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <CRow key={field.id} className="mb-3">
          <CCol md={6}>
            <CFormLabel htmlFor={`facility-${index}`}>Chọn Căn Cứ cho Chim {index + 1}</CFormLabel>
            <CFormSelect
              id={`facility-${index}`}
              {...register(`selectedFacilities.${index}.facilityId`, { required: 'Cần chọn ít nhất 1 căn cứ' })}
            >
              <option value="">Chọn Căn Cứ</option>
              {facilities.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={2} className="d-flex align-items-end">
            <CButton color="danger" onClick={() => remove(index)}>Xóa</CButton>
          </CCol>
        </CRow>
      ))}
      <CButton type="button" color="secondary" onClick={() => append({})}>Thêm Căn Cứ</CButton>
      <CButton type="submit" color="primary" className="mt-3">Xác Nhận</CButton>
    </CForm>
  );
};

export default RaceRegistrationAddFacility;
