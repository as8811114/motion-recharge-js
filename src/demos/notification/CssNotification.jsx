import { useEffect, useRef, useState } from "react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const HOLD_MS = 3000;
const EXIT_MS = 300;

export default function CssNotification() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);
  const autoCloseTimer = useRef(null);
  const exitFallback = useRef(null);
  const enterFrame = useRef(null);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const finishExit = () => {
    window.clearTimeout(exitFallback.current);
    setMounted(false);
    setExiting(false);
  };

  const hide = () => {
    window.clearTimeout(autoCloseTimer.current);
    setExiting(true);
    exitFallback.current = window.setTimeout(finishExit, reducedMotion ? 0 : EXIT_MS + 80);
  };

  const show = () => {
    window.clearTimeout(autoCloseTimer.current);
    window.clearTimeout(exitFallback.current);
    cancelAnimationFrame(enterFrame.current);
    setMounted(true);
    setEntered(false);
    setExiting(false);
    enterFrame.current = requestAnimationFrame(() => setEntered(true));
    autoCloseTimer.current = window.setTimeout(hide, HOLD_MS);
  };

  useEffect(() => () => {
    window.clearTimeout(autoCloseTimer.current);
    window.clearTimeout(exitFallback.current);
    cancelAnimationFrame(enterFrame.current);
  }, []);

  const active = entered && !exiting;
  const phase = !mounted ? "Unmounted" : exiting ? "Exiting" : entered ? "Visible" : "Entering";

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>React + Inline Styles</h3><code>exiting + transitionend</code></div>
      <div className="demo-stage" style={notificationStyles.stage}>
        <div style={notificationStyles.mockWindow}>
          <span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} />
          <p style={notificationStyles.mockText}>Single notification preview</p>
        </div>
        {mounted && (
          <div
            style={{
              ...notificationStyles.container,
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(-20px)",
              transition: reducedMotion || !entered ? "none" : `opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease`,
            }}
            onTransitionEnd={(event) => {
              if (exiting && event.target === event.currentTarget && event.propertyName === "opacity") finishExit();
            }}
          >
            <NotificationBody onClose={hide} />
          </div>
        )}
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={show}>Show / Restart</button>
        <button className="button secondary" type="button" onClick={hide} disabled={!mounted || exiting}>Close Now</button>
        <div style={notificationStyles.lifecycle}><span style={notificationStyles.statusText}><i style={notificationStyles.statusDot} />{phase}</span><span style={notificationStyles.timing}>timer 3s · exit 0.3s</span></div>
      </div>
    </article>
  );
}
