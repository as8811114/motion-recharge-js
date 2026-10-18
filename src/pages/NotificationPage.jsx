import CodeDetails from "../components/CodeDetails";
import CssNotification from "../demos/notification/CssNotification";
import MotionNotification from "../demos/notification/MotionNotification";
import CssNotificationStack from "../demos/notification/CssNotificationStack";
import MotionNotificationStack from "../demos/notification/MotionNotificationStack";
import cssSource from "../demos/notification/CssNotification.jsx?raw";
import motionSource from "../demos/notification/MotionNotification.jsx?raw";
import cssStackSource from "../demos/notification/CssNotificationStack.jsx?raw";
import motionStackSource from "../demos/notification/MotionNotificationStack.jsx?raw";
import bodySource from "../demos/notification/NotificationBody.jsx?raw";
import stylesSource from "../demos/notification/notificationStyles.js?raw";

export default function NotificationPage() {
  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="section-heading">
          <h3>Demo A: Single Notification</h3>
          <p>A focused comparison of one exit animation and the moment its DOM node can be removed.</p>
        </div>
        <div className="compare-grid"><CssNotification /><MotionNotification /></div>
      </section>
      <CodeDetails defaultOpen sections={[
        { title: "CssNotification.jsx - Single", code: cssSource },
        { title: "MotionNotification.jsx - Single", code: motionSource },
      ]} />

      <section className="section-card">
        <div className="section-heading">
          <h3>Notification Stack — Managing Multiple Exits</h3>
          <p>Five independent timers, simultaneous exits, and smooth reflow after a middle item is dismissed.</p>
        </div>
        <div className="compare-grid"><CssNotificationStack /><MotionNotificationStack /></div>
      </section>
      <div className="compare-note">
        <p><strong>React + Inline Styles:</strong> each item keeps an exit state; transition completion controls data removal; an animated Grid row collapses height so neighboring items fill the space smoothly.</p>
        <p><strong>Motion:</strong> <code>AnimatePresence</code> manages multiple exiting nodes, while <code>layout</code> moves the remaining items as the <code>items</code> array changes.</p>
        <p>CSS can produce the same result without a FLIP implementation. Motion becomes more useful when several independently timed elements enter, exit, and reflow together; both versions still need React State and timers.</p>
      </div>
      <CodeDetails sections={[
        { title: "CssNotificationStack.jsx", code: cssStackSource },
        { title: "MotionNotificationStack.jsx", code: motionStackSource },
      ]} />
      <CodeDetails sections={[
        { title: "NotificationBody.jsx - Shared", code: bodySource },
        { title: "notificationStyles.js - Shared", code: stylesSource },
      ]} />

    </div>
  );
}
