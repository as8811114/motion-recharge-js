import CodeDetails from "../components/CodeDetails";
import CssNotification from "../demos/notification/CssNotification";
import MotionNotification from "../demos/notification/MotionNotification";
import "../demos/notification/notification.css";

const cssCode = `const [mounted, setMounted] = useState(false);
const [phase, setPhase] = useState("hidden");
const desiredVisible = useRef(false);

const hide = () => {
  desiredVisible.current = false;
  setPhase("exiting");
};

{mounted && <div className={\`notification is-\${phase}\`}
  onTransitionEnd={(event) => {
    if (event.propertyName === "opacity" &&
        phase === "exiting" && !desiredVisible.current) {
      setMounted(false);
    }
  }} />}`;

const motionCode = `<AnimatePresence>
  {visible && (
    <motion.div key="saved-notification"
      initial={{ opacity: 0, y: -20, scale: .98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: .98 }}
      transition={{ duration: .28 }}
    />
  )}
</AnimatePresence>`;

export default function NotificationPage() {
  return (
    <div className="page-stack">
      <div className="compare-grid"><CssNotification /><MotionNotification /></div>
      <p className="compare-note">Both versions animate the same properties. The CSS version keeps separate mounted and exit states, then guards removal against stale transition events. AnimatePresence owns that exit-to-unmount sequence for Motion.</p>
      <CodeDetails sections={[{ title: "CSS + React", code: cssCode }, { title: "Motion + React", code: motionCode }]} />
    </div>
  );
}
