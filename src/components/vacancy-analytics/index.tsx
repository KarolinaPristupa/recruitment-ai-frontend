import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  VacancyStatsDTO,
  ResponseDelayDTO,
  SkillCountDTO,
  SkillGapDTO,
  TopResumeDTO,
} from '@/types/analytics';
import styles from './index.module.scss';
import { getAllAnalytics } from '@/api/instance/analytics-api';

interface Props {
  vacancyId?: number;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a78bfa', '#f87171'];

const VacancyAnalytics: React.FC<Props> = ({ vacancyId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseDelay, setResponseDelay] = useState<ResponseDelayDTO[]>([]);
  const [topSkills, setTopSkills] = useState<SkillCountDTO[]>([]);
  const [skillGap, setSkillGap] = useState<SkillGapDTO[]>([]);
  const [stats, setStats] = useState<VacancyStatsDTO | null>(null);
  const [topResumes, setTopResumes] = useState<TopResumeDTO[]>([]);

  const getResumeLink = (fileUrl: string | null) =>
    fileUrl ? `http://localhost:8080${fileUrl}` : null;

  const fetchAnalytics = async () => {
    if (!vacancyId) return;
    setLoading(true);
    setError(null);

    try {
      const data = await getAllAnalytics(vacancyId, 5);

      const delayWithDay = data.responseDelay.map((d, idx) => ({
        ...d,
        day: `Отклик ${idx + 1}`,
      }));

      setResponseDelay(delayWithDay);
      setTopSkills(data.topSkills);
      setSkillGap(data.skillGap);
      setStats(data.stats);
      setTopResumes(data.topResumes);
    } catch {
      setError('Не удалось загрузить аналитику');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [vacancyId]);

  const handleAnalyze = async () => {
    if (!vacancyId) return;
    setLoading(true);
    try {
      await fetchAnalytics();
    } catch {
      setError('Ошибка при запуске анализа откликов');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loader}>Загрузка аналитики…</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!stats) return null;

  return (
    <motion.div className={styles.analytics}>
      <button onClick={handleAnalyze} className={styles.analyzeBtn}>
        Проанализировать отклики
      </button>

      <div className={styles.statsCards}>
        <div className={styles.card}>
          <h4>Всего откликов</h4>
          <p>{responseDelay.length}</p>
        </div>
        <div className={styles.card}>
          <h4>Среднее время отклика</h4>
          <p>
            {responseDelay.length > 0
              ? Math.round(
                  responseDelay.reduce((sum, d) => sum + d.hours, 0) / responseDelay.length,
                )
              : 0}{' '}
            ч
          </p>
        </div>
        <div className={styles.card}>
          <h4>Количество кандидатов</h4>
          <p>{topResumes.length}</p>
        </div>
      </div>

      <div className={styles.charts}>
        <div className={styles.chart}>
          <h5>Задержка откликов</h5>
          {responseDelay.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={responseDelay}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.chart}>
          <h5>Топ навыков</h5>
          {topSkills.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topSkills}>
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className={styles.chart}>
          <h5>Разрыв навыков</h5>
          {skillGap.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={skillGap}
                  dataKey="count"
                  nameKey="skill"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {skillGap.map((item) => (
                    <Cell
                      key={item.skill}
                      fill={COLORS[Math.floor(Math.random() * COLORS.length)]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.chart}>
          <h5>Топ резюме</h5>
          {topResumes.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ul className={styles.topResumes}>
              {topResumes.map((r) => (
                <li key={r.id}>
                  <button
                    className={styles.resumeLink}
                    onClick={() => {
                      const link = getResumeLink(r.fileUrl);
                      if (link) window.open(link, '_blank');
                    }}
                  >
                    {r.applicantName}
                  </button>
                  <strong> — {Math.round(r.score)}%</strong> совпадения
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VacancyAnalytics;
