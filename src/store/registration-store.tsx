import { RegistrationData } from '@/types/registration-data';
import { create } from 'zustand';

interface RegistrationStore {
  data: RegistrationData;
  setCompanyData: (company: Partial<RegistrationData>) => void;
  setAdminData: (admin: Partial<RegistrationData>) => void;
  reset: () => void;
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  data: {} as RegistrationData,

  setCompanyData: (company) =>
    set((state) => ({
      data: { ...state.data, ...company },
    })),

  setAdminData: (admin) =>
    set((state) => ({
      data: { ...state.data, ...admin },
    })),

  reset: () => set({ data: {} as RegistrationData }),
}));
