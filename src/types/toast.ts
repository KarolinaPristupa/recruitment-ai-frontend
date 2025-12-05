import { ToastType } from '@/types/toast-type';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
