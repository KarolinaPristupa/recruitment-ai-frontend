import * as yup from 'yup';
import { EnterpriseRegisterFormData } from '@/types/enterprise-register-form-data';

const enterpriseRegisterSchema: yup.ObjectSchema<EnterpriseRegisterFormData> = yup.object({
  name: yup.string().required('Название компании обязательно'),
  address: yup.string().required('Адрес обязателен'),
  contactEmail: yup.string().email('Неверный email').required('Email обязателен'),
  contactPhone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Телефон должен быть валидным')
    .required('Телефон обязателен'),
}) as yup.ObjectSchema<EnterpriseRegisterFormData>;

export default enterpriseRegisterSchema;
