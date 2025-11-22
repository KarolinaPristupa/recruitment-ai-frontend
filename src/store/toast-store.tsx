import { create } from 'zustand';
import { ToastType } from '@/types/toast-type';
import { Toast } from '@/types/toast';

interface ToastStore {
  toasts: Toast[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (type, message, duration = 5000) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, type, message, duration }] }));

    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, duration);
    }
  },

  success: (msg, dur) => get().addToast('success', msg, dur),
  error: (msg, dur) => get().addToast('error', msg, dur),
  info: (msg, dur) => get().addToast('info', msg, dur),
  warning: (msg, dur) => get().addToast('warning', msg, dur),

  remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
