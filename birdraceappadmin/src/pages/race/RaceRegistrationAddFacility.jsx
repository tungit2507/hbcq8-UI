import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchFacilities } from '../../api/FacilityApi';
import { CForm, CFormLabel, CFormInput, CButton, CRow, CCol, CFormSelect } from '@coreui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchRaceById } from '../../api/raceApi';

const RaceRegistrationAddFacility = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const requesterId = query.get('requesterId');
  const tourId = query.get('tourId');

  const [facilities, setFacilities] = useState([]);
  const [race, setrace] = useState([]);

  const { control, handleSubmit, register } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const facilitiesData = await fetchFacilities();
        setFacilities(facilitiesData);

        if (tourId) {
          const raceData = await fetchRaceById(tourId);
          setrace(raceData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tourId]);

};

export default RaceRegistrationAddFacility;
