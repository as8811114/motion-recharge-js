import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const MAX_ITEMS = 5;
const HOLD_MS = 3000;

export default function MotionNotificationStack() {
  const reducedMotion = useReducedMotion();
  const [items, setItems] = useState([]);
  const itemsRef = useRef([]);
  const nextId = useRef(1);
  const autoCloseTimers = useRef(new Map());
  const rapidTimers = useRef([]);

  const updateItems = (update) => {
    const nextItems = typeof update === "function" ? update(itemsRef.current) : update;
    itemsRef.current = nextItems;
    setItems(nextItems);
  };

  const dismiss = (id) => {
    window.clearTimeout(autoCloseTimers.current.get(id));
    autoCloseTimers.current.delete(id);
    updateItems((current) => current.filter((item) => item.id !== id));
  };

  const add = (amount) => {
    const capacity = MAX_ITEMS - itemsRef.current.length;
    const additions = Array.from({ length: Math.min(amount, capacity) }, () => {
      const id = nextId.current++;
      return { id, title: `Notification ${id}` };
    });
    if (!additions.length) return;
    updateItems((current) => [...current, ...additions]);
    additions.forEach((item) => {
      autoCloseTimers.current.set(item.id, window.setTimeout(() => dismiss(item.id), HOLD_MS));
    });
  };

  const removeMiddle = () => {
    if (itemsRef.current.length) dismiss(itemsRef.current[Math.floor(itemsRef.current.length / 2)].id);
  };

  const dismissAll = () => itemsRef.current.map((item) => item.id).forEach(dismiss);

  const clearTimers = () => {
    [...autoCloseTimers.current.values(), ...rapidTimers.current].forEach(clearTimeout);
    autoCloseTimers.current.clear();
    rapidTimers.current = [];
  };

  const reset = () => {
    clearTimers();
    updateItems([]);
  };

  const rapidTest = () => {
    reset();
    rapidTimers.current = [
      window.setTimeout(() => add(5), 0),
      window.setTimeout(removeMiddle, 180),
      window.setTimeout(() => add(1), 550),
      window.setTimeout(dismissAll, 850),
      window.setTimeout(() => add(5), 1300),
    ];
  };

  useEffect(() => clearTimers, []);

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>Motion + React</h3><code>popLayout + layout</code></div>
      <div className="demo-stage" style={notificationStyles.stackStage}>
        <span style={notificationStyles.stackCount}>{items.length} / {MAX_ITEMS} in items</span>
        <div style={notificationStyles.stackViewport}>
          {!items.length && <div style={notificationStyles.stackEmpty}>Add notifications to begin.</div>}
          <div style={notificationStyles.stackList}>
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  style={{ ...notificationStyles.stackCard, marginBottom: 8 }}
                  initial={reducedMotion ? false : { opacity: 0, y: -14 }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    ease: "easeOut",
                    layout: reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
                  }}
                >
                  <NotificationBody title={item.title} detail="Auto-closes independently after 3 seconds." onClose={() => dismiss(item.id)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <StackControls count={items.length} add={add} removeMiddle={removeMiddle} dismissAll={dismissAll} rapidTest={rapidTest} reset={reset} />
    </article>
  );
}

function StackControls({ count, add, removeMiddle, dismissAll, rapidTest, reset }) {
  return <div className="controls"><button className="button" type="button" onClick={() => add(5)} disabled={count >= MAX_ITEMS}>Add 5 Notifications</button><button className="button secondary" type="button" onClick={() => add(1)} disabled={count >= MAX_ITEMS}>Add One</button><button className="button secondary" type="button" onClick={removeMiddle} disabled={!count}>Remove Middle</button><button className="button secondary" type="button" onClick={dismissAll} disabled={!count}>Dismiss All</button><button className="button secondary" type="button" onClick={rapidTest}>Rapid Test</button><button className="button secondary" type="button" onClick={reset}>Reset</button></div>;
}
