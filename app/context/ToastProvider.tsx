"use client";
type Variant = "info" | "success" | "danger";
type Toast = {
  title: string;
  description: string;
  action?: string;
  variant?: Variant;
};

interface ToastContextProps {
  toast: Toast | null;
  notify: (toast: Toast) => void;
  remove: () => void;
}
import { Provider } from "@radix-ui/react-toast";
import { createContext, useContext, useState } from "react";

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<Toast | null>(null);

  const notify = (newToast: Toast) => {
    setToast(newToast);
  };

  const remove = () => {
    setToast(null);
  };

  const value: ToastContextProps = {
    toast,
    notify,
    remove,
  };

  return (
    <ToastContext.Provider value={value}>
      <Provider>{children}</Provider>
    </ToastContext.Provider>
  );
}
