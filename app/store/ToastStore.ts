import { create } from "zustand";

type Variant = "info" | "success" | "danger";
type Toast = {
  title: string;
  description: string;
  action?: string;
  variant?: Variant;
};
interface ToastStore {
  toast: Toast | null;
  remove: () => void;
  notify: (toast: Toast) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  notify: ({ title, description, variant = "info" }) => {
    set({
      toast: {
        title,
        description,
        variant,
      },
    });
  },
  remove: () => {
    set({ toast: null });
  },
}));
