import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css';

function RegistrationForm() {
  const apiRegistrations = 'http://localhost/projectX/hs/apiProjectX/registrations';
  // const apiRegistrations = 'test';

  const [driverInfo, setDriverInfo] = useState('');
  const [autoInfo, setAutoInfo] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const [driverInfoError, setDriverInfoError] = useState(false);
  const [autoInfoError, setAutoInfoError] = useState(false);
  const [contactInfoError, setContactInfoError] = useState(false);

  const handleChangeDriverInfo = (e) => {
    setDriverInfo(e.target.value);
    setDriverInfoError(false);
  };

  const handleChangeAutoInfo = (e) => {
    setAutoInfo(e.target.value);
    setAutoInfoError(false);
  };

  const handleChangeContactInfo = (e) => {
    setContactInfo(e.target.value);
    setContactInfoError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverInfo.trim()) {
      setDriverInfoError(true);
    }
    if (!autoInfo.trim()) {
      setAutoInfoError(true);
    }
    if (!contactInfo.trim()) {
      setContactInfoError(true);
    }

    if (!driverInfo.trim() || !autoInfo.trim() || !contactInfo.trim()) {
      alert('Будь ласка, заповніть усі поля');
      return;
    }

    try {
      const data = `${driverInfo}, ${autoInfo}, ${contactInfo}`;
      const response = await axios.post(apiRegistrations, data);
      alert('Ви успішно зареєструвались! Щасливої дороги!!!');

      setDriverInfo('');
      setAutoInfo('');
      setContactInfo('');
    } catch (error) {
      console.error('Помилка при відправленні даних:', error);
    }
  };

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
            placeholder="Інформація про водія"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={autoInfo}
            onChange={handleChangeAutoInfo}
            className={`input ${autoInfoError ? 'error' : ''}`}
            placeholder="Інформація про авто"
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
    </div>
  );
}

export default RegistrationForm;