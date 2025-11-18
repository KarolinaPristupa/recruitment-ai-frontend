import { Stage } from '@/types/stage';

export const stages: Stage[] = [
  {
    num: '01',
    text: 'Регистрация компании',
    icon: 'company',
    fields: ['Название компании', 'Адрес', 'Контактный email', 'Телефон'],
    className: 'long',
  },
  {
    num: '02',
    text: 'Регистрация администратора',
    icon: 'user',
    fields: ['ФИО', 'Email', 'Телефон', 'Пароль'],
    className: 'short',
  },
  {
    num: '03',
    text: 'Добавление HR-специалистов',
    icon: 'users',
    fields: ['ФИО', 'Email', 'Телефон', 'Пароль'],
    className: 'short',
  },
  {
    num: '04',
    text: 'Создание вакансий',
    icon: 'briefcase',
    fields: ['Название вакансии', 'Описание', 'Требования', 'Зарплата'],
    className: 'long',
  },
];
