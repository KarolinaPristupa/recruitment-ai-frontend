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
import styles from './index.module.scss';
import api from '@/api/instance/index';
import { useToastStore } from '@/store/toast-store';

interface UserActivity {
  [userEmail: string]: { [action: string]: number };
}

interface HeatmapHourData {
  [hour: string]: number;
}

interface HeatmapData {
  [day: string]: HeatmapHourData;
}

interface FeatureUsage {
  [action: string]: number;
}

interface AnalyticsDTO {
  type: 'user_activity' | 'sessions' | 'feature_usage';
  data: any;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#a78bfa', '#f87171'];

const getAllAnalytics = async () => {
  const res = await api.get(`/api/logs/statistics`);
  return res.data as AnalyticsDTO[];
};

const EntEmployeeStatistics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity>({});
  const [heatmap, setHeatmap] = useState<HeatmapData>({});
  const [featureUsage, setFeatureUsage] = useState<FeatureUsage>({});
  const { error: showError } = useToastStore();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllAnalytics();
        data.forEach((item) => {
          switch (item.type) {
            case 'user_activity':
              setUserActivity(item.data);
              break;
            case 'sessions':
              setHeatmap(item.data.heatmap || {});
              break;
            case 'feature_usage':
              setFeatureUsage(item.data.usage || {});
              break;
          }
        });
      } catch {
        setError('Не удалось загрузить аналитику');
        showError('Ошибка загрузки аналитики');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className={styles.loader}>
        <div className={styles.spinner} />
      </div>
    );

  if (error) return <div className={styles.error}>{error}</div>;

  const userActivityData = Object.entries(userActivity).map(([user, actions]) => ({
    user,
    ...actions,
  }));

  const heatmapData = Object.entries(heatmap).map(([day, hours]) => ({
    day,
    ...hours,
  }));

  const featureUsageData = Object.entries(featureUsage).map(([action, value]) => ({
    action,
    value,
  }));

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>Статистика сотрудников предприятия</h2>

      <div className={styles.charts}>
        <div className={styles.chart}>
          <h5>Активность HR/админов</h5>
          {userActivityData.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityData} layout="vertical" margin={{ left: 90 }}>
                <XAxis type="number" />
                <YAxis dataKey="user" type="category" />
                <Tooltip />
                {Object.keys(userActivityData[0])
                  .filter((k) => k !== 'user')
                  .map((action, idx) => (
                    <Bar key={action} dataKey={action} fill={COLORS[idx % COLORS.length]} />
                  ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.chart}>
          <h5>Пиковые часы активности</h5>
          {heatmapData.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={heatmapData} layout="vertical" margin={{ left: 30 }}>
                <XAxis type="number" />
                <YAxis dataKey="day" type="category" />
                <Tooltip />
                {Array.from({ length: 24 }, (_, i) => i).map((hour, idx) => (
                  <Bar
                    key={hour}
                    dataKey={hour.toString()}
                    stackId="a"
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className={styles.chart}>
          <h5>Использование функционала</h5>
          {featureUsageData.length === 0 ? (
            <p className={styles.empty}>Нет данных</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={featureUsageData}
                  dataKey="value"
                  nameKey="action"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {featureUsageData.map((entry, idx) => (
                    <Cell key={entry.action} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EntEmployeeStatistics;
