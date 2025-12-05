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

export interface VacancyStatsDTO {
  avgScore: number;
  avgMatch: number;

  totalResponses?: number;
  avgResponseTime?: number;
  candidateCount?: number;
}

export interface TopResumeDTO {
  id: number;
  name: string;
  matchCount: number;
  score?: number;
  applicantName: string;
  fileUrl?: string | null;
}
