import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const HOLD_MS = 3000;

export default function MotionNotification() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("Unmounted");
  const [notificationId, setNotificationId] = useState(0);
  const currentId = useRef(0);

  const show = () => {
    currentId.current += 1;
    setNotificationId(currentId.current);
    setStatus("Entering");
    setVisible(true);
  };

  const hide = () => {
    setStatus("Exiting");
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return undefined;
    const id = notificationId;
    const timer = window.setTimeout(() => {
      if (id === currentId.current) hide();
    }, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [notificationId, visible]);

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>Motion + React</h3><code>exit + AnimatePresence</code></div>
      <div className="demo-stage" style={notificationStyles.stage}>
        <div style={notificationStyles.mockWindow}>
          <span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} />
          <p style={notificationStyles.mockText}>Single notification preview</p>
        </div>
        <AnimatePresence onExitComplete={() => { if (!visible) setStatus("Unmounted"); }}>
          {visible && (
            <motion.div
              key={notificationId}
              style={notificationStyles.container}
              initial={reducedMotion ? false : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease: "easeOut" }}
              onAnimationComplete={(definition) => {
                if (definition?.opacity === 1) setStatus("Visible");
              }}
            >
              <NotificationBody onClose={hide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={show}>Show / Restart</button>
        <button className="button secondary" type="button" onClick={hide} disabled={!visible}>Close Now</button>
        <div style={notificationStyles.lifecycle}><span style={notificationStyles.statusText}><i style={notificationStyles.statusDot} />{status}</span><span style={notificationStyles.timing}>timer 3s · exit 0.3s</span></div>
      </div>
    </article>
  );
}
