import CodeDetails from "../components/CodeDetails";
import ExpandDemo from "../demos/layout/ExpandDemo";
import SharedTabsDemo from "../demos/layout/SharedTabsDemo";
import LayoutGroupDemo from "../demos/layout/LayoutGroupDemo";
import "../demos/layout/layout.css";

const layoutCode = `.css-expander { display: grid; grid-template-rows: 0fr; }
.css-expander.open { grid-template-rows: 1fr; }

<motion.div layout={layoutValue}
  transition={{ type: "spring", stiffness: 260, damping: 28 }}>
  {open && <motion.div layout="position">...</motion.div>}
</motion.div>`;

const layoutIdCode = `// CSS: measure the selected button
setIndicator({ left: selected.offsetLeft, width: selected.offsetWidth });

// Motion: render the shared indicator in the active button
{active === tab && (
  <motion.span layoutId="active-tab-indicator"
    transition={{ type: "spring", stiffness: 350, damping: 30 }} />
)}`;

const groupCode = `<LayoutGroup id="accordion-group">
  <div className="accordion-list">
    {items.map(item => (
      <MotionItem key={item.id} item={item} />
    ))}
  </div>
</LayoutGroup>

function MotionItem({ item }) {
  const [open, setOpen] = useState(false);
  return <motion.article layout>...</motion.article>;
}`;

export default function TabsPage() {
  return (
    <div className="page-stack">
      <ExpandDemo />
      <CodeDetails sections={[{ title: "CSS grid vs Motion layout", code: layoutCode }]} />
      <SharedTabsDemo />
      <CodeDetails sections={[{ title: "Measured indicator vs layoutId", code: layoutIdCode }]} />
      <LayoutGroupDemo />
      <CodeDetails sections={[{ title: "Independent state + coordinated layout", code: groupCode }]} />
      <p className="compare-note"><b>layout</b> follows one element’s geometry; <b>layoutId</b> connects the same visual marker across parents; <b>LayoutGroup</b> coordinates measurements when several independently stateful components affect one another.</p>
    </div>
  );
}
