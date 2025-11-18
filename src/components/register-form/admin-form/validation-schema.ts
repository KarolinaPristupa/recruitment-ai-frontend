import * as yup from 'yup';

export const adminRegisterSchema = yup.object({
  firstName: yup.string().required('Имя обязательно'),
  lastName: yup.string().required('Фамилия обязательна'),
  email: yup.string().email('Неверный email').required('Email обязателен'),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Телефон должен быть валидным')
    .required('Телефон обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Повторите пароль'),
});
