export type ResponseDelayDTO = {
  responseId: number;
  hours: number;
};

export type SkillCountDTO = {
  skill: string;
  count: number;
};

export type SkillGapDTO = {
  skill: string;
  count: number;
};

export type VacancyStatsDTO = {
  avgScore: number;
  avgMatch: number;
};

export type TopResumeDTO = {
  responseId: number;
  applicantName: string;
  score: number;
};
