import { useEffect } from "react";
import styles from "./TimerSesi.module.css";

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function TimerSesi({ seconds, onTick }) {
  useEffect(() => {
    const intervalId = window.setInterval(() => onTick((current) => current + 1), 1000);
    return () => window.clearInterval(intervalId);
  }, [onTick]);

  return (
    <div className={styles.timer} aria-label={`Lama sesi ${formatDuration(seconds)}`}>
      <span className={styles.dot} aria-hidden="true" />
      <span>Sesi</span>
      <strong>{formatDuration(seconds)}</strong>
    </div>
  );
}
