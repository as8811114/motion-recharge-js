import { useEffect, useRef, useState } from "react";
import NotificationBody from "./NotificationBody";
import { notificationStyles } from "./notificationStyles";

const HOLD_MS = 3000;
const TRANSITION_MS = 280;

function formatPhase(phase) {
  return phase.charAt(0).toUpperCase() + phase.slice(1);
}

export default function CssNotification() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("unmounted");
  const [isActive, setIsActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const mountedRef = useRef(false);
  const desiredVisible = useRef(false);
  const phaseRef = useRef("unmounted");
  const generation = useRef(0);
  const autoCloseTimer = useRef(null);
  const completionTimer = useRef(null);
  const animationFrames = useRef([]);
  const rapidTimers = useRef([]);

  function updatePhase(nextPhase) {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }

  function clearAutoClose() {
    window.clearTimeout(autoCloseTimer.current);
    autoCloseTimer.current = null;
  }

  function clearCompletionTimer() {
    window.clearTimeout(completionTimer.current);
    completionTimer.current = null;
  }

  function clearAnimationFrames() {
    animationFrames.current.forEach(cancelAnimationFrame);
    animationFrames.current = [];
  }

  function finishExit(token) {
    if (generation.current !== token || desiredVisible.current) return;
    clearCompletionTimer();
    mountedRef.current = false;
    setMounted(false);
    setIsActive(false);
    updatePhase("unmounted");
  }

  function beginExit(token = generation.current) {
    if (generation.current !== token || !mountedRef.current || phaseRef.current === "exiting") return;
    desiredVisible.current = false;
    clearAutoClose();
    clearCompletionTimer();
    clearAnimationFrames();
    setVisible(false);
    setIsActive(false);
    updatePhase("exiting");
    completionTimer.current = window.setTimeout(
      () => finishExit(token),
      reducedMotion ? 0 : TRANSITION_MS + 80,
    );
  }

  function scheduleAutoClose(token) {
    clearAutoClose();
    autoCloseTimer.current = window.setTimeout(() => beginExit(token), HOLD_MS);
  }

  function finishEntering(token) {
    if (generation.current !== token || !desiredVisible.current) return;
    clearCompletionTimer();
    updatePhase("visible");
  }

  function startEntrance(token) {
    clearAnimationFrames();
    setIsActive(false);
    updatePhase("entering");

    const firstFrame = requestAnimationFrame(() => {
      const secondFrame = requestAnimationFrame(() => {
        if (generation.current !== token || !desiredVisible.current) return;
        setIsActive(true);
        if (reducedMotion) {
          finishEntering(token);
        } else {
          completionTimer.current = window.setTimeout(
            () => finishEntering(token),
            TRANSITION_MS + 80,
          );
        }
      });
      animationFrames.current.push(secondFrame);
    });
    animationFrames.current.push(firstFrame);
  }

  function showNotification({ replay = false } = {}) {
    const token = generation.current + 1;
    generation.current = token;
    desiredVisible.current = true;
    clearAutoClose();
    clearCompletionTimer();
    clearAnimationFrames();
    setVisible(true);

    if (mountedRef.current && phaseRef.current === "visible" && !replay) {
      scheduleAutoClose(token);
      return;
    }

    mountedRef.current = true;
    setMounted(true);
    startEntrance(token);
    scheduleAutoClose(token);
  }

  function runRapidTest() {
    rapidTimers.current.forEach(clearTimeout);
    rapidTimers.current = [
      window.setTimeout(() => showNotification({ replay: true }), 0),
      window.setTimeout(() => beginExit(), 100),
      window.setTimeout(() => showNotification({ replay: true }), 200),
      window.setTimeout(() => beginExit(), 300),
      window.setTimeout(() => showNotification({ replay: true }), 420),
    ];
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReducedMotion(event.matches);
    media.addEventListener("change", handleChange);

    return () => {
      media.removeEventListener("change", handleChange);
      generation.current += 1;
      clearAutoClose();
      clearCompletionTimer();
      clearAnimationFrames();
      rapidTimers.current.forEach(clearTimeout);
    };
  }, []);

  const animatedStyle = {
    ...notificationStyles.container,
    opacity: isActive ? 1 : 0,
    transform: isActive ? "translateY(0) scale(1)" : "translateY(-20px) scale(0.98)",
    transition: reducedMotion || (phase === "entering" && !isActive)
      ? "none"
      : `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
  };

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>React + Inline Styles</h3><code>Timer + transitionend</code></div>
      <div className="demo-stage" style={notificationStyles.stage}>
        <div style={notificationStyles.mockWindow}>
          <span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} /><span style={notificationStyles.mockDot} />
          <p style={notificationStyles.mockText}>Notification preview</p>
        </div>
        {mounted && (
          <div
            style={animatedStyle}
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget || event.propertyName !== "opacity") return;
              if (phaseRef.current === "entering") finishEntering(generation.current);
              if (phaseRef.current === "exiting") finishExit(generation.current);
            }}
          >
            <NotificationBody onClose={() => beginExit()} />
          </div>
        )}
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={() => showNotification()}>Show / Restart</button>
        <button className="button secondary" type="button" onClick={() => beginExit()} disabled={!mounted || phase === "exiting"}>Close Now</button>
        <button className="button secondary" type="button" onClick={runRapidTest}>Rapid Toggle Test</button>
        <div style={notificationStyles.lifecycle}>
          <span style={notificationStyles.statusText}><i style={notificationStyles.statusDot} />{formatPhase(phase)}</span>
          <span style={notificationStyles.timing}>{visible ? "requested: shown" : "requested: hidden"} · hold 3s · exit 0.28s</span>
        </div>
      </div>
    </article>
  );
}
