import { useEffect, useRef, useState } from "react";
import NotificationBody from "./NotificationBody";

export default function CssNotification() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState("hidden");
  const desiredVisible = useRef(false);
  const requestId = useRef(0);

  const show = () => {
    desiredVisible.current = true;
    const id = ++requestId.current;
    setVisible(true);
    setMounted(true);
    requestAnimationFrame(() => {
      if (requestId.current === id && desiredVisible.current) setPhase("entered");
    });
  };

  const hide = () => {
    desiredVisible.current = false;
    requestId.current += 1;
    setVisible(false);
    setPhase("exiting");
  };

  const toggle = () => (desiredVisible.current ? hide() : show());
  const rapidTest = () => [0, 90, 180, 270, 360, 500].forEach((delay) => window.setTimeout(toggle, delay));

  useEffect(() => () => { requestId.current += 1; }, []);

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>CSS + React</h3><code>transitionend</code></div>
      <div className="demo-stage notification-stage">
        <div className="mock-window"><span /><span /><span /><p>Notification preview</p></div>
        {mounted && (
          <div className={`notification css-notification is-${phase}`} onTransitionEnd={(event) => {
            if (event.propertyName === "opacity" && phase === "exiting" && !desiredVisible.current) {
              setMounted(false);
              setPhase("hidden");
            }
          }}>
            <NotificationBody onClose={hide} />
          </div>
        )}
      </div>
      <div className="controls">
        <button className="button" type="button" onClick={toggle}>{visible ? "Hide" : "Show"}</button>
        <button className="button secondary" type="button" onClick={rapidTest}>Rapid toggle test</button>
        <span>DOM: {mounted ? "mounted" : "unmounted"}</span>
      </div>
    </article>
  );
}
