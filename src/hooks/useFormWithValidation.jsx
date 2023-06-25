import { useState, useCallback, useEffect } from 'react';
import isEmail from 'validator/es/lib/isEmail';

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem("formValues"));
    if (savedValues) {
        setValues(savedValues);
    }
  }, []);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name } = input;

    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя может содержать только кириллицу или латиницу, пробел или дефис.')
    } else {
      input.setCustomValidity('');
    }

    if (name === 'email') {
      if (!isEmail(value)) {
          input.setCustomValidity('Некорректый адрес почты.');
      } else {
          input.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value });
    localStorage.setItem("formValues", JSON.stringify({ ...values, [name]: value }));
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid };
}
