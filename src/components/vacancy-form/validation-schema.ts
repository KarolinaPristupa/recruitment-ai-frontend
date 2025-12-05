import * as yup from 'yup';

export const createVacancySchema = yup.object({
  title: yup
    .string()
    .required('Название вакансии обязательно')
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов'),

  description: yup
    .string()
    .required('Опишите вакансию')
    .min(50, 'Описание должно быть не короче 50 символов'),

  requirements: yup
    .string()
    .required('Укажите требования к кандидату')
    .min(20, 'Минимум 20 символов'),

  salaryMin: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .matches(/^\d*$/, 'Только цифры')
    .test('min-max', 'Минимальная зарплата не может быть больше максимальной', function (value) {
      const { salaryMax } = this.parent;
      if (!value || !salaryMax) return true;
      return Number(value) <= Number(salaryMax);
    }),

  salaryMax: yup
    .string()
    .transform((value) => (value === '' ? null : value))
    .nullable()
    .matches(/^\d*$/, 'Только цифры'),

  status: yup
    .mixed<'ACTIVE' | 'DRAFT'>()
    .oneOf(['ACTIVE', 'DRAFT'], 'Выберите статус')
    .required('Выберите статус'),

  currency: yup
    .string()
    .oneOf(['RUB', 'EUR', 'USD'], 'Выберите валюту')
    .required('Выберите валюту'),

  skills: yup.string().optional(),
  workFormat: yup.string().oneOf(['OFFICE', 'REMOTE', 'HYBRID']).required('Выберите формат работы'),
  employmentType: yup
    .string()
    .oneOf(['FULL_TIME', 'PART_TIME', 'PROJECT', 'VOLUNTEER', 'TRAINING'])
    .required('Выберите тип занятости'),
  experience: yup
    .string()
    .oneOf(['NO_EXPERIENCE', 'BETWEEN_1_AND_3', 'BETWEEN_3_AND_6', '6_PLUS_YEARS'])
    .required('Выберите опыт'),
  schedule: yup
    .string()
    .oneOf(['FULL_DAY', 'REMOTE', 'FLEXIBLE', 'SHIFT', 'FLY_IN_FLY_OUT'])
    .optional(),
  category: yup.string().optional(),
});

export type CreateVacancyFormData = yup.InferType<typeof createVacancySchema>;
