import { LoginFormData } from '@/types/login-form-data';
import * as yup from 'yup';

const loginSchema: yup.ObjectSchema<LoginFormData> = yup.object({
  email: yup.string().email('Некорректный email').required('Email обязателен'),

  password: yup
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Пароль обязателен'),
}) as yup.ObjectSchema<LoginFormData>;

export default loginSchema;
