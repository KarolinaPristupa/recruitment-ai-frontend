import * as yup from 'yup';
import { UserAccountData } from '@types/user-account-data';

export const EntEditSchema: yup.ObjectSchema<
  Pick<
    UserAccountData,
    'enterpriseName' | 'enterpriseAddress' | 'enterpriseContactEmail' | 'enterpriseContactPhone'
  >
> = yup.object({
  enterpriseName: yup.string().required('Название обязательно'),
  enterpriseAddress: yup.string().required('Адрес обязателен'),
  enterpriseContactEmail: yup.string().email('Неверный email').required('Email обязателен'),
  enterpriseContactPhone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Телефон должен быть валидным')
    .required('Телефон обязателен'),
});
