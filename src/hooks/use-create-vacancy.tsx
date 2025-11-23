import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/instance';
import { CreateVacancyFormData } from '@components/vacancy-form/create-form/validation.schema'; // или откуда у тебя

export const useCreateVacancy = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (data: CreateVacancyFormData) => {
    setIsSubmitting(true);
    try {
      await api.post('/api/vacancies', {
        ...data,
        salaryMin: data.salaryMin ? Number(data.salaryMin) : null,
        salaryMax: data.salaryMax ? Number(data.salaryMax) : null,
      });

      navigate('/hr/vacancies', { replace: true });
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Не удалось создать вакансию';

      alert(message);

      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancel = () => {
    navigate('/vacancies');
  };

  return {
    isSubmitting,
    submit,
    cancel,
  };
};
