// Файл stringUtils.js

export const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Удаляем все нецифровые символы
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/); // Группируем номер по шаблону
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4]; // Возвращаем номер в формате "095-000-88-99"
    }
    return phoneNumber; // Возвращаем исходный номер, если не удалось преобразовать
  };
  