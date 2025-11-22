import { create } from 'zustand';
import { ToastType } from '@/types/toast-type';
import { Toast } from '@/types/toast';

interface ToastStore {
  toasts: Toast[];
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (type: ToastType, message: string, duration = 5000) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, type, message, duration }] }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
  },

  success: (msg, dur) => (set as any).getState().addToast('success', msg, dur),
  error: (msg, dur) => (set as any).getState().addToast('error', msg, dur),
  info: (msg, dur) => (set as any).getState().addToast('info', msg, dur),
  warning: (msg, dur) => (set as any).getState().addToast('warning', msg, dur),

  remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
