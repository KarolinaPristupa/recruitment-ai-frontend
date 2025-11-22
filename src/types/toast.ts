import { ToastType } from '@/hooks/useToast';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
