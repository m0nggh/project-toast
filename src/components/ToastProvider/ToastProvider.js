import { createContext, useState, useEffect, useCallback } from "react";

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

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Escape") {
      console.log("Remove all toasts!");
      setToasts([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // perform cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
