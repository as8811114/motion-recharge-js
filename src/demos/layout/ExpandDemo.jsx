import { useState } from "react";
import { motion } from "motion/react";

const copy = (
  <div className="expand-copy">
    <p>The extra content changes this card’s height and pushes the note below it.</p>
    <ul><li>No fixed max-height</li><li>Content remains in normal document flow</li></ul>
  </div>
);

export default function ExpandDemo() {
  const [cssOpen, setCssOpen] = useState(false);
  const [motionOpen, setMotionOpen] = useState(false);
  const [mode, setMode] = useState("true");
  const layoutValue = mode === "off" ? false : mode === "true" ? true : mode;

  return (
    <section className="section-card">
      <div className="section-heading"><h3>A. layout</h3><p>One element changes its own size and position. The CSS version transitions a grid row; Motion observes layout changes.</p></div>
      <div className="compare-grid">
        <article className="layout-example">
          <div className="panel-heading"><h3>CSS + React</h3><code>grid-template-rows</code></div>
          <div className="expand-stack">
            <div className="expand-card"><strong>Expandable card</strong><p>A short introduction stays visible.</p><div className={`css-expander${cssOpen ? " open" : ""}`}><div>{copy}</div></div><button className="button" onClick={() => setCssOpen((open) => !open)}>{cssOpen ? "Collapse" : "Expand"}</button></div>
            <div className="following-note">The next element follows the card.</div>
          </div>
        </article>
        <article className="layout-example">
          <div className="panel-heading"><h3>Motion + React</h3><code>layout={String(mode)}</code></div>
          <div className="expand-stack">
            <motion.div className="expand-card" layout={layoutValue} transition={{ type: "spring", stiffness: 260, damping: 28 }}>
              <motion.strong layout="position">Expandable card</motion.strong><motion.p layout="position">A short introduction stays visible.</motion.p>
              {motionOpen && <motion.div layout="position">{copy}</motion.div>}
              <motion.button layout="position" className="button" onClick={() => setMotionOpen((open) => !open)}>{motionOpen ? "Collapse" : "Expand"}</motion.button>
            </motion.div>
            <motion.div className="following-note" layout={layoutValue} transition={{ type: "spring", stiffness: 260, damping: 28 }}>The next element follows the card.</motion.div>
          </div>
          <div className="controls"><label>Layout mode <select value={mode} onChange={(event) => setMode(event.target.value)}><option value="true">layout=true</option><option value="position">layout=position</option><option value="size">layout=size</option><option value="off">off</option></select></label></div>
        </article>
      </div>
    </section>
  );
}
