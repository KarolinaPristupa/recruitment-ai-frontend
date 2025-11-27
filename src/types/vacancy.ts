export interface Vacancy {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  requirements: string;
  skills: string;
  salaryMin: string;
  salaryMax: string;
  currency: string;
  status: 'DRAFT' | 'ACTIVE';
  workFormat: 'OFFICE' | 'REMOTE' | 'HYBRID';
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'VOLUNTEER' | 'TRAINING';
  experience: 'NO_EXPERIENCE' | '1_3_YEARS' | '3_6_YEARS' | '6_PLUS_YEARS';
  schedule?: 'FULL_DAY' | 'REMOTE' | 'FLEXIBLE' | 'SHIFT' | 'FLY_IN_FLY_OUT';
  category: string;
  publishedAt?: string;
  externalIds?: string;
  createdAt?: string;
  updatedAt?: string;
}
