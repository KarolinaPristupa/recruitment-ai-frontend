import api from '@/api/instance';
import {
  ResponseDelayDTO,
  SkillCountDTO,
  SkillGapDTO,
  VacancyStatsDTO,
  TopResumeDTO,
} from '@/types/analytics';

export const getResponseDelay = async (vacancyId: number) => {
  const res = await api.get<ResponseDelayDTO[]>(`/api/analytics/${vacancyId}/response-delays`);
  return res.data;
};

export const getTopSkills = async (vacancyId: number) => {
  const res = await api.get<SkillCountDTO[]>(`/api/analytics/${vacancyId}/skills/top`);
  return res.data;
};

export const getSkillGap = async (vacancyId: number) => {
  const res = await api.get<SkillGapDTO[]>(`/api/analytics/${vacancyId}/skills/gap`);
  return res.data;
};

export const getVacancyStats = async (vacancyId: number) => {
  const res = await api.get<VacancyStatsDTO>(`/api/analytics/${vacancyId}/stats`);
  return res.data;
};

export const getTopResumes = async (vacancyId: number, limit: number) => {
  const res = await api.get<TopResumeDTO[]>(
    `/api/analytics/${vacancyId}/top-resumes?limit=${limit}`,
  );
  return res.data;
};
