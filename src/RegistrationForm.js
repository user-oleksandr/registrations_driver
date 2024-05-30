import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import Animations from './animations'; 

import { formatPhoneNumber } from './stringUtils';

function RegistrationForm() {
  
  const apiRegistrations = process.env.REACT_APP_API_REGISTRATIONS;
  const authToken = process.env.REACT_APP_AUTH_TOKEN;
  
  const [driverInfo, setDriverInfo] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [autoInfo, setAutoInfo] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const [driverInfoError, setDriverInfoError] = useState(false);
  const [driverLicenseError, setDriverLicenseError] = useState(false);
  const [autoInfoError, setAutoInfoError] = useState(false);
  const [contactInfoError, setContactInfoError] = useState(false);

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

   const handleChangeDriverLicense = (e) => {
    setDriverLicense(e.target.value);
    setDriverLicenseError(false);
  };

  const handleChangeAutoInfo = (e) => {
    setAutoInfo(e.target.value);
    setAutoInfoError(false);
  };

  const handleChangeContactInfo = (e) => {
    let inputValue = e.target.value;
    // Ограничиваем ввод только цифрами
    inputValue = inputValue.replace(/\D/g, '');
    // Ограничиваем длину ввода до 10 цифр
    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    // Форматируем номер телефона
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setContactInfo(formattedPhoneNumber);
    setContactInfoError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverInfo.trim()) {
      setDriverInfoError(true);
    }
    if (!driverLicense.trim()) {
      setDriverLicenseError(true);
    }
    if (!autoInfo.trim()) {
      setAutoInfoError(true);
    }
    if (!contactInfo.trim()) {
      setContactInfoError(true);
    }

    if (!driverInfo.trim() || !driverLicense.trim() || !autoInfo.trim() || !contactInfo.trim()) {
      alert('Будь ласка, заповніть усі поля');
      return;
    }

    try {
      const data = `${driverInfo}, ${driverLicense.toUpperCase()}, ${autoInfo.toUpperCase()}, ${contactInfo},`;
      const response = await axios.post(apiRegistrations, data, {
        headers: {
          'Authorization': `Basic ${authToken}`,
          'Content-Type': 'application/json'
        }    
      });
      
      console.log(driverInfo, driverLicense, autoInfo, contactInfo);
      alert('Ви успішно зареєструвались! Щасливої дороги!!!');

      setDriverInfo('');
      setDriverLicense('');
      setAutoInfo('');
      setContactInfo('');
      setIsRegistered(true);
    } catch (error) {
      console.error('Помилка при відправленні даних:', error);
    }
  };

  const upperCaseAutoInfo = autoInfo.toUpperCase();
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
            value={upperCaseDriverLicense}
            onChange={handleChangeDriverLicense}
            className={`input ${driverLicenseError ? 'error' : ''}`}
            placeholder="Водійське посвідчення"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={upperCaseAutoInfo}
            onChange={handleChangeAutoInfo}
            className={`input ${autoInfoError ? 'error' : ''}`}
            placeholder="Номерний знак авто"
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
        <button type="submit" className="button">Зареєструватись</button>
      </form>
      {/* {isRegistered && <Animations />} */}
    </div>
  );
}

export default RegistrationForm;