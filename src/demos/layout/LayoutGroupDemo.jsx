import { useState } from "react";
import { LayoutGroup, motion } from "motion/react";

const initialItems = [
  { id: "alpha", title: "Alpha", text: "Alpha owns its own open state. Expanding it moves both siblings." },
  { id: "bravo", title: "Bravo section", text: "Each row is keyed by a stable data ID, including after reorder." },
  { id: "charlie", title: "Charlie", text: "Motion can coordinate layout measurements across these components." },
];

function CssItem({ item }) {
  const [open, setOpen] = useState(false);
  return <article className="accordion-item"><button onClick={() => setOpen((value) => !value)} aria-expanded={open}><span>{item.title}</span><b>{open ? "−" : "+"}</b></button><div className={`css-expander${open ? " open" : ""}`}><div><p>{item.text}</p></div></div></article>;
}

function MotionItem({ item, enabled }) {
  const [open, setOpen] = useState(false);
  return <motion.article layout={enabled} className="accordion-item" transition={{ type: "spring", stiffness: 300, damping: 30 }}><motion.button layout="position" onClick={() => setOpen((value) => !value)} aria-expanded={open}><span>{item.title}</span><b>{open ? "−" : "+"}</b></motion.button>{open && <motion.div layout="position" className="motion-accordion-copy"><p>{item.text}</p></motion.div>}</motion.article>;
}

const reorder = (items) => [items[2], items[0], items[1]];

export default function LayoutGroupDemo() {
  const [cssItems, setCssItems] = useState(initialItems);
  const [motionItems, setMotionItems] = useState(initialItems);
  const [enabled, setEnabled] = useState(true);
  const motionList = <div className="accordion-list">{motionItems.map((item) => <MotionItem key={item.id} item={item} enabled={enabled} />)}</div>;

  return (
    <section className="section-card">
      <div className="section-heading"><h3>C. LayoutGroup</h3><p>Independent children change a shared layout. Reorder makes the difference especially clear: CSS rows jump to their new order, while grouped Motion rows animate together.</p></div>
      <div className="compare-grid">
        <article className="layout-example"><div className="panel-heading"><h3>CSS + React</h3><code>CSS Grid rows</code></div><div className="accordion-list">{cssItems.map((item) => <CssItem key={item.id} item={item} />)}</div><div className="controls"><button className="button secondary" onClick={() => setCssItems(reorder)}>Reorder</button></div></article>
        <article className="layout-example"><div className="panel-heading"><h3>Motion + React</h3><code>LayoutGroup + layout</code></div>{enabled ? <LayoutGroup id="accordion-group">{motionList}</LayoutGroup> : motionList}<div className="controls"><label className="control-group"><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /> Enable LayoutGroup</label><button className="button secondary" onClick={() => setMotionItems(reorder)}>Reorder</button></div></article>
      </div>
    </section>
  );
}
