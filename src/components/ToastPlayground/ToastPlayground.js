import { useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0]);
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

  function removeToast(currentId) {
    const filteredToasts = toasts.filter((toast) => toast.id !== currentId);
    setToasts(filteredToasts);
  }

  const addToast = (event) => {
    event.preventDefault();

    const toastId = crypto.randomUUID();
    const newToast = {
      id: toastId,
      message,
      variant,
    };
    const newToasts = [...toasts, newToast];
    console.log(newToast);
    setToasts(newToasts);
    // clear message and reset variant
    setMessage("");
    setVariant(VARIANT_OPTIONS[0]);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} deactivateToast={removeToast}></ToastShelf>

      <form className={styles.controlsWrapper} onSubmit={addToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantType, index) => (
              <label key={index} htmlFor={`variant-${variantType}`}>
                <input
                  key={index}
                  id={`variant-${variantType}`}
                  name="variant"
                  type="radio"
                  value={variantType}
                  checked={variant === variantType}
                  onChange={(event) => setVariant(event.target.value)}
                />
                {variantType}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
