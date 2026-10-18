import { useEffect, useRef, useState } from "react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const MAX_ITEMS = 5;
const HOLD_MS = 3000;
const EXIT_MS = 300;

export default function CssNotificationStack() {
  const [items, setItems] = useState([]);
  const itemsRef = useRef([]);
  const nextId = useRef(1);
  const autoCloseTimers = useRef(new Map());
  const exitTimers = useRef(new Map());
  const enterFrames = useRef(new Map());
  const rapidTimers = useRef([]);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateItems = (update) => {
    const nextItems = typeof update === "function" ? update(itemsRef.current) : update;
    itemsRef.current = nextItems;
    setItems(nextItems);
  };

  const removeItem = (id) => {
    window.clearTimeout(exitTimers.current.get(id));
    exitTimers.current.delete(id);
    updateItems((current) => current.filter((item) => item.id !== id));
  };

  const dismiss = (id) => {
    const item = itemsRef.current.find((entry) => entry.id === id);
    if (!item || item.exiting) return;
    window.clearTimeout(autoCloseTimers.current.get(id));
    cancelAnimationFrame(enterFrames.current.get(id));
    autoCloseTimers.current.delete(id);
    updateItems((current) => current.map((entry) => entry.id === id ? { ...entry, exiting: true } : entry));
    exitTimers.current.set(id, window.setTimeout(() => removeItem(id), reducedMotion ? 0 : EXIT_MS + 80));
  };

  const add = (amount) => {
    const capacity = MAX_ITEMS - itemsRef.current.length;
    const additions = Array.from({ length: Math.min(amount, capacity) }, () => {
      const id = nextId.current++;
      return { id, title: `Notification ${id}`, entered: false, exiting: false };
    });
    if (!additions.length) return;
    updateItems((current) => [...current, ...additions]);

    additions.forEach((item) => {
      const frame = requestAnimationFrame(() => {
        updateItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, entered: true } : entry));
        enterFrames.current.delete(item.id);
      });
      enterFrames.current.set(item.id, frame);
      autoCloseTimers.current.set(item.id, window.setTimeout(() => dismiss(item.id), HOLD_MS));
    });
  };

  const removeMiddle = () => {
    const activeItems = itemsRef.current.filter((item) => !item.exiting);
    if (activeItems.length) dismiss(activeItems[Math.floor(activeItems.length / 2)].id);
  };

  const dismissAll = () => {
    itemsRef.current.filter((item) => !item.exiting).forEach((item) => dismiss(item.id));
  };

  const clearTimers = () => {
    [...autoCloseTimers.current.values(), ...exitTimers.current.values(), ...rapidTimers.current].forEach(clearTimeout);
    enterFrames.current.forEach(cancelAnimationFrame);
    autoCloseTimers.current.clear();
    exitTimers.current.clear();
    enterFrames.current.clear();
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
      <div className="panel-heading"><h3>React + Inline Styles</h3><code>exit state + grid rows</code></div>
      <div className="demo-stage" style={notificationStyles.stackStage}>
        <span style={notificationStyles.stackCount}>{items.length} / {MAX_ITEMS} mounted</span>
        <div style={notificationStyles.stackViewport}>
          {!items.length && <div style={notificationStyles.stackEmpty}>Add notifications to begin.</div>}
          <div style={notificationStyles.stackList}>
            {items.map((item) => {
              const active = item.entered && !item.exiting;
              return (
                <div
                  key={item.id}
                  style={{
                    ...notificationStyles.stackSlot,
                    gridTemplateRows: active ? "1fr" : "0fr",
                    marginBottom: active ? 8 : 0,
                    opacity: active ? 1 : 0,
                    transform: active ? "translate(0, 0) scale(1)" : item.exiting ? "translateX(40px) scale(0.95)" : "translateY(-14px)",
                    transition: reducedMotion || !item.entered ? "none" : `grid-template-rows ${EXIT_MS}ms ease, margin ${EXIT_MS}ms ease, opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`,
                  }}
                  onTransitionEnd={(event) => {
                    if (item.exiting && event.target === event.currentTarget && event.propertyName === "opacity") removeItem(item.id);
                  }}
                >
                  <div style={notificationStyles.stackSlotInner}>
                    <div style={notificationStyles.stackCard}>
                      <NotificationBody title={item.title} detail="Auto-closes independently after 3 seconds." onClose={() => dismiss(item.id)} />
                    </div>
                  </div>
                </div>
              );
            })}
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
