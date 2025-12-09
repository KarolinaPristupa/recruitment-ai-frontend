import * as yup from 'yup';
import { HrAccountData } from '@/types/hr-account-data';

export const EntEditSchema: yup.ObjectSchema<
  Pick<
    HrAccountData,
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
