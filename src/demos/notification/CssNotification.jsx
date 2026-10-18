import { useEffect, useState } from "react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const HOLD_MS = 3000;

export default function CssNotification() {
  const [mounted, setMounted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const show = () => {
    setMounted(true);
    setExiting(false);
  };

  const hide = () => {
    setExiting(true);
  };

  const finishExit = () => {
    setMounted(false);
    setExiting(false);
  };

  useEffect(() => {
    if (!mounted) return undefined;

    if (exiting && reducedMotion) {
      const timer = window.setTimeout(finishExit, 0);
      return () => window.clearTimeout(timer);
    }

    if (exiting) return undefined;

    const timer = window.setTimeout(hide, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [mounted, exiting, reducedMotion]);

  return (
    <article className="demo-panel">
      <div className="panel-heading">
        <h3>React + Inline Styles</h3>
        <code>exiting + transitionend</code>
      </div>
      <div className="demo-stage" style={notificationStyles.stage}>
        <div style={notificationStyles.mockWindow}>
          <span style={notificationStyles.mockDot} />
          <span style={notificationStyles.mockDot} />
          <span style={notificationStyles.mockDot} />
          <p style={notificationStyles.mockText}>Single notification preview</p>
        </div>
        {mounted && (
          <div
            style={{
              ...notificationStyles.container,
              opacity: exiting ? 0 : 1,
              transform: exiting ? "translateY(-20px)" : "translateY(0)",
              transition: reducedMotion ? "none" : "opacity 0.3s, transform 0.3s",
            }}
            onTransitionEnd={(event) => {
              if (exiting && event.target === event.currentTarget && event.propertyName === "opacity") {
                finishExit();
              }
            }}
          >
            <NotificationBody onClose={hide} />
          </div>
        )}
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={show} disabled={mounted}>Show</button>
        <button className="button secondary" type="button" onClick={hide} disabled={!mounted || exiting}>Close Now</button>
      </div>
    </article>
  );
}
