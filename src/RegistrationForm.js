import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {

  const apiRegistrations = process.env.REACT_APP_API_REGISTRATIONS;
  const username = process.env.REACT_APP_USERNAME;
  const password = process.env.REACT_APP_PASSWORD;

  const [driverInfo, setDriverInfo] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [driverPassport, setDriverPassport] = useState('');
  const [authority, setAuthority] = useState('');

  const [driverInfoError, setDriverInfoError] = useState(false);
  const [driverLicenseError, setDriverLicenseError] = useState(false);
  const [contactInfoError, setContactInfoError] = useState(false);
  const [driverPassportError, setDriverPassportError] = useState(false);
  const [authorityError, setAuthorityError] = useState(false);

  const [isRegistered, setIsRegistered] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

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
    setDriverLicense(e.target.value.toUpperCase());
    setDriverLicenseError(false);
  };

  const handleChangeContactInfo = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (!inputValue.startsWith('380')) {
      inputValue = '380' + inputValue.slice(3);
    }
    if (inputValue.length > 12) {
      inputValue = inputValue.slice(0, 12);
    }
    const formattedPhoneNumber = `+${inputValue}`;
    setContactInfo(formattedPhoneNumber);
    setContactInfoError(false);
  };

  const handleChangeDriverPassport = (e) => {
    setDriverPassport(e.target.value.toUpperCase());
    setDriverPassportError(false);
  };

  const handleChangeAuthority = (e) => {
    const inputValue = e.target.value;
    setAuthority(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
    setAuthorityError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!driverInfo.trim()) {
      setDriverInfoError(true);
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
    if (!authority.trim()) {
      setAuthorityError(true);
    }

    if (!driverInfo.trim() || !driverLicense.trim() || !contactInfo.trim() || !driverPassport.trim() || !authority.trim()) {
      toast.error('Будь ласка, заповніть усі поля', {
        className: 'toast-error custom-toast',
        bodyClassName: 'toast-container',
      });
      return;
    }

    setShowLoader(true);

    try {
      const data = `${driverInfo},${driverLicense.toUpperCase()},${contactInfo},${driverPassport},${authority}`;
      const response = await axios.post(apiRegistrations, data, {
        headers: {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`),
          'Content-Type': 'application/json'
        }
      });

      console.log(driverInfo, driverLicense, contactInfo, driverPassport, authority);
      toast.success('Ви успішно зареєструвались! Щасливої дороги!!!');

      setDriverInfo('');
      setDriverLicense('');
      setContactInfo('');
      setDriverPassport('');
      setAuthority('');
      setIsRegistered(true);
    } catch (error) {
      console.error('Помилка при відправленні даних:', error);
      toast.error('Сталася помилка при відправленні даних.', {
        className: 'toast-error custom-toast',
        bodyClassName: 'toast-container',
      });
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const contactInput = document.getElementById('contactInfo');
    contactInput.addEventListener('focus', () => {
      if (contactInfo === '') {
        setContactInfo('+380');
        setTimeout(() => {
          contactInput.setSelectionRange(4, 4);
        }, 0);
      }
    });
  }, [contactInfo]);

  return (
    <div className="formContainer">
      <ToastContainer />
      <img src='https://cdn1.komiz.io/16089838/share/front/logo.svg' alt="Logo" className="logo" />
      <h5 className="title">Форма реєстрації водія</h5>
      <form onSubmit={handleSubmit} className="form">
        <label className="label">
          <input
            type="text"
            value={driverInfo}
            onChange={handleChangeDriverInfo}
            className={`input ${driverInfoError ? 'error' : ''}`}
            placeholder="ПІБ водія"
          />
        </label>
        <label className="label">
          <input
            type="text"
            value={driverLicense.toUpperCase()}
            onChange={handleChangeDriverLicense}
            className={`input ${driverLicenseError ? 'error' : ''}`}
            placeholder="Водійське посвідчення"
          />
        </label>
        <label className="label">
          <input
            type="text"
            id="contactInfo"
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
            value={authority}
            onChange={handleChangeAuthority}
            className={`input ${authorityError ? 'error' : ''}`}
            placeholder="Ким видан"
          />
        </label>

        <button type="submit" className="button">Зареєструватись</button>

        {showLoader && (
          <div className="loader">
            <svg className="envelope" viewBox="0 0 24 24">
              <path d="M2 6h20v12H2z" fill="#FFD125" />
              <path d="M0 8l12 8 12-8" fill="none" stroke="#fff" stroke-width="2" />
            </svg>
          </div>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;
