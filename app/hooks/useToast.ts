import { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";

export default function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
