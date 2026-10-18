import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const HOLD_MS = 3000;

export default function MotionNotification() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setTimeout(() => setVisible(false), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <article className="demo-panel">
      <div className="panel-heading">
        <h3>React + Motion</h3>
        <code>exit + AnimatePresence</code>
      </div>
      <div className="demo-stage" style={notificationStyles.stage}>
        <div style={notificationStyles.mockWindow}>
          <span style={notificationStyles.mockDot} />
          <span style={notificationStyles.mockDot} />
          <span style={notificationStyles.mockDot} />
          <p style={notificationStyles.mockText}>Single notification preview</p>
        </div>
        <AnimatePresence>
          {visible && (
            <motion.div
              key="notification"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: reducedMotion ? 0 : 0.3 }}
              style={notificationStyles.container}
            >
              <NotificationBody onClose={() => setVisible(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={() => setVisible(true)} disabled={visible}>Show</button>
        <button className="button secondary" type="button" onClick={() => setVisible(false)} disabled={!visible}>Close Now</button>
      </div>
    </article>
  );
}
