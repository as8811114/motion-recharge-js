import { useLayoutEffect, useRef, useState } from "react";
import { layoutStyles as styles } from "./layoutStyles";

const tabs = ["Overview", "Detailed Report", "Settings"];

const descriptions = {
  Overview: ["A quick summary", "Review the most important results at a glance."],
  "Detailed Report": ["More room for analysis", "Explore the complete report and supporting details."],
  Settings: ["Choose your preferences", "Adjust how this workspace behaves for you."],
};

export default function CssTabs() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const listRef = useRef(null);
  const tabRefs = useRef({});
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useLayoutEffect(() => {
    const measure = () => {
      const selectedTab = tabRefs.current[activeTab];
      if (!selectedTab) return;

      setIndicator({
        left: selectedTab.offsetLeft,
        width: selectedTab.offsetWidth,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  const [title, description] = descriptions[activeTab];

  return (
    <article className="demo-panel">
      <div className="panel-heading">
        <h3>React + Inline Styles</h3>
        <code>refs + measurement</code>
      </div>
      <div style={styles.stage}>
        <div style={styles.demo}>
          <div ref={listRef} role="tablist" style={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(node) => { tabRefs.current[tab] = node; }}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}
              >
                {tab}
              </button>
            ))}
            <span
              aria-hidden="true"
              style={{
                ...styles.indicator,
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
                transition: reducedMotion ? "none" : "transform 0.3s ease, width 0.3s ease",
              }}
            />
          </div>
          <div style={styles.tabContent}>
            <span style={styles.eyebrow}>{activeTab}</span>
            <h4 style={styles.contentTitle}>{title}</h4>
            <p style={styles.contentText}>{description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
