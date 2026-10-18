import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NotificationBody from "./NotificationBody";

export default function MotionNotification() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const setShown = (next) => { visibleRef.current = next; setVisible(next); };
  const toggle = () => setShown(!visibleRef.current);
  const rapidTest = () => [0, 90, 180, 270, 360, 500].forEach((delay) => window.setTimeout(toggle, delay));

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>Motion + React</h3><code>AnimatePresence / exit</code></div>
      <div className="demo-stage notification-stage">
        <div className="mock-window"><span /><span /><span /><p>Notification preview</p></div>
        <AnimatePresence>
          {visible && (
            <motion.div key="saved-notification" className="notification"
              initial={{ opacity: 0, y: -20, scale: .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: .98 }}
              transition={{ duration: .28 }}>
              <NotificationBody onClose={() => setShown(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={toggle}>{visible ? "Hide" : "Show"}</button>
        <button className="button secondary" type="button" onClick={rapidTest}>Rapid toggle test</button>
        <span>Presence: {visible ? "shown" : "exiting / removed"}</span>
      </div>
    </article>
  );
}
