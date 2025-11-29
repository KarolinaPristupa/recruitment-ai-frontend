export interface FormVacancy {
  title?: string;
  description?: string;
  requirements?: string;
  salaryMin?: string;
  salaryMax?: string;
  status?: 'DRAFT' | 'ACTIVE';
  currency?: 'RUB' | 'EUR' | 'USD';
  workFormat?: 'OFFICE' | 'REMOTE' | 'HYBRID';
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'PROJECT' | 'VOLUNTEER' | 'TRAINING';
  skills?: string;
  experience?: 'NO_EXPERIENCE' | 'BETWEEN_1_AND_3' | 'BETWEEN_3_AND_6' | '6_PLUS_YEARS';
  schedule?: 'FULL_DAY' | 'REMOTE' | 'FLEXIBLE' | 'SHIFT' | 'FLY_IN_FLY_OUT';
  category?: string;
}
