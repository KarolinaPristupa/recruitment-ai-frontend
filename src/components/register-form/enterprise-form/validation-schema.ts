import * as yup from 'yup';
import { EnterpriseRegisterFormData } from '@/types/enterprise-register-form-data';
import { ALLOWED_COUNTRIES } from '@constants/allowed-counties';

const enterpriseRegisterSchema: yup.ObjectSchema<EnterpriseRegisterFormData> = yup.object({
  name: yup.string().required('Название компании обязательно'),
  address: yup
    .string()
    .required('Адрес обязателен')
    .test(
      'country-start',
      'Адрес должен начинаться с названия страны (например: "Беларусь, Минск")',
      (value) => {
        if (!value) return false;
        const trimmed = value.trim().toLowerCase();
        return ALLOWED_COUNTRIES.some((country) => trimmed.startsWith(country.toLowerCase()));
      },
    ),
  contactEmail: yup.string().email('Неверный email').required('Email обязателен'),
  contactPhone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Телефон должен быть валидным')
    .required('Телефон обязателен'),
}) as yup.ObjectSchema<EnterpriseRegisterFormData>;

export default enterpriseRegisterSchema;
