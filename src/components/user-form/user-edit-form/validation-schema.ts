import * as yup from 'yup';
import { UserEditFormData } from '@/types/user-edit-form-data';

interface Context {
  isAdminEditingOther: boolean;
}

export const UserEditSchema: yup.ObjectSchema<UserEditFormData, Context> = yup.object({
  firstName: yup.string().required('Имя обязательно'),
  lastName: yup.string().required('Фамилия обязательна'),
  email: yup.string().email('Неверный email').required('Email обязателен'),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Телефон должен быть валидным')
    .required('Телефон обязателен'),

  password: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .min(6, 'Минимум 6 символов')
    .notRequired()
    .when('$isAdminEditingOther', {
      is: true,
      then: (s) => s.strip(),
    }),

  confirmPassword: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .when('password', {
      is: (val: string | null) => !!val,
      then: (schema: yup.StringSchema) =>
        schema.required('Повторите пароль').oneOf([yup.ref('password')], 'Пароли должны совпадать'),
      otherwise: (schema: yup.StringSchema) => schema.notRequired(),
    }),
});
