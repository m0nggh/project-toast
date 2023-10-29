import { createContext, useCallback, useRef, useState } from "react";

import useKeydown from "../../hooks/useKeydown";

export const ToastProviderContext = createContext();

function ToastProvider(props) {
  const { children } = props;
  const [toasts, setToasts] = useState([
    {
      id: crypto.randomUUID(),
      message: "Notice",
      variant: "notice",
    },
    {
      id: crypto.randomUUID(),
      message: "Success",
      variant: "success",
    },
  ]);

  const removeToastsKey = "Escape";
  const emptyToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const ref = useRef(emptyToasts);
  console.log("is function the same:", ref.current === emptyToasts);
  useKeydown(removeToastsKey, emptyToasts);

  function addToast(message, variant) {
    const toastId = crypto.randomUUID();
    const newToast = {
      id: toastId,
      message,
      variant,
    };
    const newToasts = [...toasts, newToast];
    console.log(newToast);
    setToasts(newToasts);
  }

  function removeToast(currentId) {
    const filteredToasts = toasts.filter((toast) => toast.id !== currentId);
    setToasts(filteredToasts);
  }

  return (
    <ToastProviderContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastProviderContext.Provider>
  );
}

export default ToastProvider;
