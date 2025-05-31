import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.errorMessage}>
      <p>{message || "Сталася помилка!"}</p>{" "}
    </div>
  );
}
