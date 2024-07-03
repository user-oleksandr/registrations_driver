import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import Animations from './animations'; 

import { formatPhoneNumber } from './stringUtils';

function RegistrationForm() {
  
  const apiRegistrations = process.env.REACT_APP_API_REGISTRATIONS;
  const authToken = process.env.REACT_APP_AUTH_TOKEN;
  
  const [driverInfo, setDriverInfo] = useState('');
  const [nameLat, setNameLat] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [driverPassport, setDriverPassport] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  
  const [driverInfoError, setDriverInfoError] = useState(false);
  const [nameLatError, setNameLatError] = useState(false);
  const [contactInfoError, setContactInfoError] = useState(false);
  const [driverPassportError, setDriverPassportError] = useState(false);
  const [driverLicenseError, setDriverLicenseError] = useState(false);
 
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleChangeDriverInfo = (e) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(' '); 

    setDriverInfo(formattedValue);
    setDriverInfoError(false);
  };

  const handleChangeNameLat = (e) => {
    const inputValue = e.target.value;
    const formattedValue = inputValue
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(' '); 

    setNameLat(formattedValue);
    setNameLatError(false);
  };

  const handleChangeContactInfo = (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setContactInfo(formattedPhoneNumber);
    setContactInfoError(false);
  };

  const handleChangeDriverPassport = (e) => {
    setDriverPassport(e.target.value.toUpperCase());
    setDriverPassportError(false);
  };

  const handleChangeDriverLicense = (e) => {
    setDriverLicense(e.target.value);
    setDriverLicenseError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverInfo.trim()) {
      setDriverInfoError(true);
    }
    if (!nameLat.trim()) {
      setNameLatError(true);
    }
    if (!contactInfo.trim()) {
      setContactInfoError(true);
    }
    if (!driverPassport.trim()) {
      setDriverPassportError(true);
    }
    if (!driverLicense.trim()) {
      setDriverLicenseError(true);
    }
  
    if (!driverInfo.trim() || !nameLat.trim() || !contactInfo.trim() || !driverPassport.trim() || !driverLicense.trim()) {
      alert('Будь ласка, заповніть усі поля');
      return;
    }

    try {
      const data = `${driverInfo}, ${nameLat}, ${contactInfo}, ${driverPassport}, ${driverLicense.toUpperCase()}`;
      const response = await axios.post(apiRegistrations, data, {
        headers: {
          // 'Authorization': `Basic ${authToken}`,
          // 'Content-Type': 'application/json'
          'Content-Type': 'text/plain; charset=utf-8',
          'Authorization': 'Basic ' + btoa('admin:1234')
        }    
      });
      
      console.log(driverInfo, nameLat, contactInfo, driverPassport, driverLicense);
      alert('Ви успішно зареєструвались! Щасливої дороги!!!');

      setDriverInfo('');
      setNameLat('');
      setContactInfo('');
      setDriverPassport('');
      setDriverLicense('');
      setIsRegistered(true);
    } catch (error) {
      console.error('Помилка при відправленні даних:', error);
    }
  };

  const upperCaseDriverLicense = driverLicense.toUpperCase();

  return (
    <div className="formContainer">
      <h5 className="title">Форма реєстрації для водія</h5>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <input
            type="text"
            value={driverInfo}
            onChange={handleChangeDriverInfo}
            className={`input ${driverInfoError ? 'error' : ''}`}
            placeholder="ПІП водія"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={nameLat}
            onChange={handleChangeNameLat}
            className={`input ${nameLatError ? 'error' : ''}`}
            placeholder="Name(lat.)"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={contactInfo}
            onChange={handleChangeContactInfo}
            className={`input ${contactInfoError ? 'error' : ''}`}
            placeholder="Контактний телефон"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={driverPassport}
            onChange={handleChangeDriverPassport}
            className={`input ${driverPassportError ? 'error' : ''}`}
            placeholder="Паспорт водія"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={upperCaseDriverLicense}
            onChange={handleChangeDriverLicense}
            className={`input ${driverLicenseError ? 'error' : ''}`}
            placeholder="Водійське посвідчення"
          />
        </label>
    
        <button type="submit" className="button">Зареєструватись</button>
      </form>
      {/* {isRegistered && <Animations />} */}
    </div>
  );
}

export default RegistrationForm;
