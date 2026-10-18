import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const HOLD_MS = 3000;
const TRANSITION_SECONDS = 0.3;

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function MotionNotification() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("unmounted");
  const [notificationId, setNotificationId] = useState(0);
  const visibleRef = useRef(false);
  const currentId = useRef(0);
  const rapidTimers = useRef([]);

  function closeNotification(id = currentId.current) {
    if (id !== currentId.current || !visibleRef.current) return;
    visibleRef.current = false;
    setVisible(false);
    setStatus("exiting");
  }

  function showNotification() {
    const nextId = currentId.current + 1;
    currentId.current = nextId;
    visibleRef.current = true;
    setNotificationId(nextId);
    setStatus("entering");
    setVisible(true);
  }

  function runRapidTest() {
    rapidTimers.current.forEach(clearTimeout);
    rapidTimers.current = [
      window.setTimeout(showNotification, 0),
      window.setTimeout(() => closeNotification(), 100),
      window.setTimeout(showNotification, 200),
      window.setTimeout(() => closeNotification(), 300),
      window.setTimeout(showNotification, 420),
    ];
  }

  useEffect(() => {
    if (!visible) return undefined;

    const id = notificationId;
    const autoCloseTimer = window.setTimeout(() => closeNotification(id), HOLD_MS);
    return () => window.clearTimeout(autoCloseTimer);
  }, [notificationId, visible]);

  useEffect(() => () => {
    visibleRef.current = false;
    rapidTimers.current.forEach(clearTimeout);
  }, []);

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>Motion + React</h3><code>Timer + AnimatePresence</code></div>
      <div className="demo-stage" style={notificationStyles.stage}>
        <div style={notificationStyles.mockWindow}>
          <span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} />
          <p style={notificationStyles.mockText}>Notification preview</p>
        </div>
        <AnimatePresence
          onExitComplete={() => {
            if (!visibleRef.current) setStatus("unmounted");
          }}
        >
          {visible && (
            <motion.div
              key={notificationId}
              style={notificationStyles.container}
              initial={reducedMotion ? false : { opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : TRANSITION_SECONDS, ease: "easeOut" }}
              onAnimationComplete={(definition) => {
                if (
                  visibleRef.current
                  && currentId.current === notificationId
                  && definition?.opacity === 1
                ) {
                  setStatus("visible");
                }
              }}
            >
              <NotificationBody onClose={() => closeNotification(notificationId)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={showNotification}>Show / Restart</button>
        <button className="button secondary" type="button" onClick={() => closeNotification()} disabled={status === "unmounted" || status === "exiting"}>Close Now</button>
        <button className="button secondary" type="button" onClick={runRapidTest}>Rapid Toggle Test</button>
        <div style={notificationStyles.lifecycle}>
          <span style={notificationStyles.statusText}><i style={notificationStyles.statusDot} />{formatStatus(status)}</span>
          <span style={notificationStyles.timing}>visible: {visible ? "true" : "false"} · timer 3s · exit 0.3s</span>
        </div>
      </div>
    </article>
  );
}
