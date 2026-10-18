import CodeDetails from "../components/CodeDetails";
import CssNotification from "../demos/notification/CssNotification";
import MotionNotification from "../demos/notification/MotionNotification";
import cssSource from "../demos/notification/CssNotification.jsx?raw";
import motionSource from "../demos/notification/MotionNotification.jsx?raw";
import bodySource from "../demos/notification/NotificationBody.jsx?raw";
import stylesSource from "../demos/notification/notificationStyles.js?raw";

export default function NotificationPage() {
  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="section-heading">
          <h3>Single Notification</h3>
          <p>同一個退出效果，分別以 Inline Styles 與 Motion 實作。</p>
        </div>
        <div className="compare-grid">
          <CssNotification />
          <MotionNotification />
        </div>
      </section>

      <div className="compare-note">
        <p><strong>React + Inline Styles：</strong>先設定 exiting 觸發 CSS Transition，再由 onTransitionEnd 呼叫 setMounted(false)。</p>
        <p><strong>React + Motion：</strong>設定 visible 為 false，AnimatePresence 會先播放 exit，再移除 DOM。</p>
        <p>兩邊都可以輕鬆做到單一通知退出；Motion 主要省下退出動畫與元件卸載的手動協調。</p>
      </div>

      <CodeDetails
        defaultOpen
        sections={[
          { title: "CssNotification.jsx", code: cssSource },
          { title: "MotionNotification.jsx", code: motionSource },
        ]}
      />
      <CodeDetails
        sections={[
          { title: "NotificationBody.jsx - Shared", code: bodySource },
          { title: "notificationStyles.js - Shared", code: stylesSource },
        ]}
      />
    </div>
  );
}
