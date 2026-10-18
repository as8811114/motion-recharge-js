import CodeDetails from "../components/CodeDetails";
import CssNotification from "../demos/notification/CssNotification";
import MotionNotification from "../demos/notification/MotionNotification";
import cssSource from "../demos/notification/CssNotification.jsx?raw";
import motionSource from "../demos/notification/MotionNotification.jsx?raw";
import bodySource from "../demos/notification/NotificationBody.jsx?raw";
import stylesSource from "../demos/notification/notificationStyles.js?raw";

const sourceSections = [
  { title: "CssNotification.jsx — Timer + transition", code: cssSource },
  { title: "MotionNotification.jsx — Timer + presence", code: motionSource },
  { title: "NotificationBody.jsx — Shared markup", code: bodySource },
  { title: "notificationStyles.js — Shared styles", code: stylesSource },
];

export default function NotificationPage() {
  return (
    <div className="page-stack">
      <div className="compare-grid"><CssNotification /><MotionNotification /></div>
      <div className="compare-note">
        <p><strong>React + Inline Styles:</strong> a Timer owns the three-second countdown, React State selects the entrance or exit target, and <code>onTransitionEnd</code> coordinates the final DOM removal.</p>
        <p><strong>Motion + React:</strong> <code>setTimeout</code> controls auto-close, <code>visible</code> controls whether the component should be shown, <code>exit</code> defines the outgoing animation, and <code>AnimatePresence</code> removes the DOM node after that animation.</p>
        <p>Both versions can auto-close after three seconds. Motion’s main advantage here is reducing the manual coordination between an exit animation and React component unmounting; it still uses React State and a Timer.</p>
      </div>
      <CodeDetails defaultOpen sections={sourceSections} />
    </div>
  );
}
