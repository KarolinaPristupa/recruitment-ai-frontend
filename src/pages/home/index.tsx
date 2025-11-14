import React, { useState } from 'react';
import styles from './index.module.scss';
import heroImage from '@/assets/ai-human.png';
import chartImage from '@/assets/ai-graph.png';

const faqItems = [
  {
    question: 'Как работает AI-анализ кандидатов?',
    answer:
      'Нейросеть анализирует резюме, определяет ключевые навыки, опыт и сопоставляет их с требованиями вакансии. В результате вы получаете рейтинг кандидатов по степени соответствия.',
  },
  {
    question: 'Можно ли интегрировать систему с нашим HRM?',
    answer:
      'Да, мы предоставляем REST API и готовые интеграции с популярными HRM-платформами. Подключение занимает не более одного дня.',
  },
  {
    question: 'Подходит ли платформа для малого бизнеса?',
    answer:
      'Да, Recruitment AI адаптируется под масштаб компании. Для стартапов предусмотрен бесплатный тариф на 3 вакансии.',
  },
  {
    question: 'Нужны ли технические знания для работы?',
    answer:
      'Нет. Интерфейс интуитивный, а система подскажет каждый шаг — от регистрации до анализа кандидатов.',
  },
];

const Home: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.home}>
      {/* --- Главная --- */}
      <section id="main" className={styles.mainSection}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>V.AI</h1>
          <p className={styles.subtitle}>
            Онлайн-платформа для автоматизации подбора персонала.
            <br />
            Публикуйте вакансии, собирайте отклики и получайте <strong>AI-анализ кандидатов</strong>
            .
          </p>
          <p className={styles.slogan}>Меньше рутинной работы — больше качественных кандидатов.</p>
        </div>
        <img src={heroImage} alt="AI cooperation" className={styles.heroImage} />
      </section>

      <section id="stages" className={styles.stagesSection}>
        <h2 className={styles.sectionTitle}>Этапы запуска</h2>
        <div className={styles.stagesGrid}>
          {[
            {
              num: '01',
              text: 'Регистрация компании',
              fields: ['Название предприятия', 'Адрес', 'Контактный email', 'Телефон'],
              className: 'long',
            },
            {
              num: '02',
              text: 'Регистрация администратора',
              fields: ['Имя', 'Фамилия', 'Email', 'Телефон', 'Пароль'],
              className: 'short',
            },
            {
              num: '03',
              text: 'Добавление HR-специалистов',
              fields: ['Имя', 'Фамилия', 'Email', 'Телефон', 'Пароль'],
              className: 'short',
            },
            {
              num: '04',
              text: 'Создание вакансий',
              fields: [
                'Название вакансии',
                'Описание',
                'Требования',
                'Минимальная зарплата',
                'Максимальная зарплата',
                'Статус вакансии',
              ],
              className: 'long',
            },
          ].map((stage) => (
            <div key={stage.num} className={`${styles.stageCard} ${styles[stage.className]}`}>
              <p>{stage.text}</p>
              <ul>
                {stage.fields.map((field, i) => (
                  <li key={i} style={{ fontSize: '0.95rem', margin: '0.25rem 0' }}>
                    {field}
                  </li>
                ))}
              </ul>
              <span className={styles.stageNum}>{stage.num}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="results" className={styles.resultsSection}>
        <h2 className={styles.sectionTitle}>Результаты внедрения</h2>
        <p className={styles.resultsText}>
          После внедрения Recruitment AI компании экономят до <strong>60% времени</strong> на отбор
          кандидатов и получают <strong>на 40% больше релевантных откликов</strong>. Аналитика
          помогает точно определить, какие каналы приносят лучших кандидатов.
        </p>
        <img src={chartImage} alt="AI analytics graph" className={styles.resultImage} />
      </section>

      <section id="faq" className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Часто задаваемые вопросы</h2>
        <ul className={styles.faqList}>
          {faqItems.map((item, index) => (
            <li key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.open : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                {item.question}
              </button>
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.show : ''}`}>
                {item.answer}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
