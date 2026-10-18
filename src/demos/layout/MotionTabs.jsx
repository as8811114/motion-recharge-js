import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { layoutStyles as styles } from "./layoutStyles";

const tabs = ["Overview", "Detailed Report", "Settings"];

const descriptions = {
  Overview: ["A quick summary", "Review the most important results at a glance."],
  "Detailed Report": ["More room for analysis", "Explore the complete report and supporting details."],
  Settings: ["Choose your preferences", "Adjust how this workspace behaves for you."],
};

export default function MotionTabs() {
  const [activeTab, setActiveTab] = useState("Overview");
  const reducedMotion = useReducedMotion();
  const [title, description] = descriptions[activeTab];

  return (
    <article className="demo-panel">
      <div className="panel-heading">
        <h3>React + Motion</h3>
        <code>layoutId</code>
      </div>
      <div style={styles.stage}>
        <div style={styles.demo}>
          <div role="tablist" style={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="active-tab-underline"
                    aria-hidden="true"
                    style={{ ...styles.indicator, right: 0 }}
                    transition={reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
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
