import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const tabs = ["Overview", "Detailed report", "Settings"];

function CssTabs() {
  const [active, setActive] = useState(tabs[0]);
  const listRef = useRef(null);
  const refs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const selected = refs.current[active];
      if (list && selected) setIndicator({ left: selected.offsetLeft, width: selected.offsetWidth });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [active]);

  return <TabFrame active={active}><div className="tabs-list css-tabs-list" ref={listRef} role="tablist">{tabs.map((tab) => <button ref={(node) => { refs.current[tab] = node; }} key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)} role="tab" aria-selected={active === tab}>{tab}</button>)}<span className="css-tab-indicator" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} /></div></TabFrame>;
}

function MotionTabs() {
  const [active, setActive] = useState(tabs[0]);
  const [enabled, setEnabled] = useState(true);
  return <><TabFrame active={active}><div className="tabs-list" role="tablist">{tabs.map((tab) => <button key={tab} className={active === tab ? "active" : ""} onClick={() => setActive(tab)} role="tab" aria-selected={active === tab}>{tab}{active === tab && (enabled ? <motion.span className="motion-tab-indicator" layoutId="active-tab-indicator" transition={{ type: "spring", stiffness: 350, damping: 30 }} /> : <span className="motion-tab-indicator" />)}</button>)}</div></TabFrame><div className="controls"><label className="control-group"><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /> Enable layoutId</label></div></>;
}

function TabFrame({ active, children }) { return <div className="tab-frame">{children}<div className="tab-copy"><span className="eyebrow">{active}</span><h4>{active === "Overview" ? "A quick summary" : active === "Detailed report" ? "More room for analysis" : "Choose your preferences"}</h4><p>The underline follows labels with deliberately different widths.</p></div></div>; }

export default function SharedTabsDemo() {
  return (
    <section className="section-card">
      <div className="section-heading"><h3>B. layoutId</h3><p>A shared visual element moves between different parents. CSS measures the active button; Motion matches elements that share an ID.</p></div>
      <div className="compare-grid">
        <article className="layout-example"><div className="panel-heading"><h3>CSS + React</h3><code>refs + transform</code></div><CssTabs /></article>
        <article className="layout-example"><div className="panel-heading"><h3>Motion + React</h3><code>layoutId</code></div><MotionTabs /></article>
      </div>
    </section>
  );
}
