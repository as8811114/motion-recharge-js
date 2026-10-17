import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

const demoInfo = {
  card: { number: "01", title: "Interactive Card", subtitle: "initial / animate / whileHover / whileTap" },
  notification: { number: "02", title: "Notification", subtitle: "AnimatePresence / exit / key" },
  tabs: { number: "03", title: "Animated Tabs", subtitle: "layout / layoutId" },
};

function AnimatedCardDemo() {
  const [enabled, setEnabled] = useState(true);
  const [duration, setDuration] = useState(0.4);
  const [replay, setReplay] = useState(0);

  const card = (
    <div className="showcase-card-content">
      <div className="card-thumbnail">✳</div>
      <span className="mini-label">INTERACTIVE COMPONENT</span>
      <h3>UI with feedback.</h3>
      <p>指標進入卡片、按下卡片，再觀察 React 元件的回饋。</p>
      <div className="mini-action">Explore motion <span aria-hidden="true">↗</span></div>
    </div>
  );

  return (
    <section className="demo-grid">
      <div className="stage">
        <div className="stage-tag">LIVE PREVIEW</div>
        {enabled ? (
          <motion.div
            className="showcase-card"
            key={replay}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "tween", duration, ease: "easeOut" }}
            tabIndex={0}
            aria-label="Animated interactive demonstration card"
          >
            {card}
          </motion.div>
        ) : (
          <div className="showcase-card static-card">{card}</div>
        )}
      </div>
      <aside className="control-panel">
        <div className="eyebrow">DEMO 01 — HOW TO PRESENT</div>
        <h2>先比較，再逐步加動畫</h2>
        <p>先關掉動畫示範「沒有互動回饋的卡片」，再開啟、Hover、Tap。按 Replay 觀察 initial → animate。</p>
        <label className="toggle-row">
          <span>Enable Motion</span>
          <input aria-label="Enable Motion" type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
        </label>
        <label className="range-group" htmlFor="duration">
          <span>transition duration</span>
          <strong>{duration.toFixed(1)} 秒</strong>
        </label>
        <input id="duration" type="range" min="0.2" max="1.5" step="0.1" value={duration} onChange={e => setDuration(Number(e.target.value))} />
        <button className="primary-button" type="button" onClick={() => setReplay(v => v + 1)} disabled={!enabled}>Replay entrance ↻</button>
        <div className="code-pill">whileHover = scale: 1.05</div>
      </aside>
    </section>
  );
}

function NotificationDemo() {
  const [withMotion, setWithMotion] = useState(true);
  const [visible, setVisible] = useState(false);
  const content = (
    <div className="notification-content">
      <div className="notification-icon">✓</div>
      <div><strong>Changes saved</strong><small>你的設定已經成功更新。</small></div>
      <button className="icon-button" type="button" onClick={() => setVisible(false)} aria-label="關閉通知">×</button>
    </div>
  );

  return (
    <section className="demo-grid">
      <div className="stage notification-stage">
        <div className="stage-tag">LIVE PREVIEW</div>
        <div className="fake-dashboard">
          <div className="fake-topbar"><div className="dot-row"><i /><i /><i /></div><span>Account settings</span></div>
          <div className="fake-bar" /><div className="fake-bar mid" /><div className="fake-bar short" />
          <button className="primary-button" type="button" onClick={() => setVisible(v => !v)}>{visible ? "Hide notification" : "Save changes"}</button>
        </div>
        {withMotion ? (
          <AnimatePresence>
            {visible && (
              <motion.div
                className="toast"
                key="settings-saved"
                initial={{ opacity: 0, y: -24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >{content}</motion.div>
            )}
          </AnimatePresence>
        ) : visible ? <div className="toast">{content}</div> : null}
      </div>
      <aside className="control-panel">
        <div className="eyebrow">DEMO 02 — HOW TO PRESENT</div>
        <h2>移除 DOM 前，完成退出動畫</h2>
        <p>關閉 Motion 看通知立即消失，再打開 Motion，對照 initial / animate / exit。重點是 AnimatePresence 包住條件渲染。</p>
        <label className="toggle-row"><span>Enable AnimatePresence</span><input aria-label="Enable AnimatePresence" type="checkbox" checked={withMotion} onChange={e => { setVisible(false); setWithMotion(e.target.checked); }} /></label>
        <button className="primary-button" type="button" onClick={() => setVisible(v => !v)}>{visible ? "Hide notification" : "Show notification"}</button>
        <div className="code-pill">exit = opacity: 0, y: -24</div>
      </aside>
    </section>
  );
}

const tabs = ["Overview", "Analytics", "Settings"];
function TabsDemo() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [useLayout, setUseLayout] = useState(true);
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="demo-grid">
      <div className="stage tabs-stage">
        <div className="stage-tag">LIVE PREVIEW</div>
        <div className="browser-panel">
          <div className="tabs-bar" role="tablist" aria-label="Demo pages">
            {tabs.map(tab => (
              <button key={tab} role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className="tab-button" type="button">
                {tab}
                {activeTab === tab && (useLayout
                  ? <motion.span className="active-underline" layoutId="active-tab-indicator" transition={{ type: "spring", stiffness: 420, damping: 32 }} />
                  : <span className="active-underline" />)}
              </button>
            ))}
          </div>
          {useLayout ? (
            <motion.div layout className="tab-content" style={{ minHeight: expanded ? 230 : 150 }} transition={{ type: "spring", stiffness: 230, damping: 27 }}>
              <div className="eyebrow">{activeTab.toUpperCase()}</div>
              <h3>{activeTab === "Overview" ? "At a glance" : activeTab === "Analytics" ? "Your performance" : "Personalize your app"}</h3>
              <p>{activeTab === "Overview" ? "A simplified dashboard overview." : activeTab === "Analytics" ? "Analyze the recent activity and metrics." : "Adjust the settings of your workspace."}</p>
              {expanded && <p className="extra-line">這裡是一行新增內容，觀察容器高度變化。</p>}
            </motion.div>
          ) : (
            <div className="tab-content" style={{ minHeight: expanded ? 230 : 150 }}>
              <div className="eyebrow">{activeTab.toUpperCase()}</div><h3>{activeTab} content</h3>
              <p>Without layout: state changes happen immediately.</p>
              {expanded && <p className="extra-line">這裡是一行新增內容，容器直接跳到新高度。</p>}
            </div>
          )}
        </div>
      </div>
      <aside className="control-panel">
        <div className="eyebrow">DEMO 03 — HOW TO PRESENT</div>
        <h2>共享元素與版面變化</h2>
        <p>先連按三個 Tab 看底線如何移動，再切換 Animate layout，展開內容比較 layout 的效果。</p>
        <label className="toggle-row"><span>Enable layout / layoutId</span><input aria-label="Enable layout" type="checkbox" checked={useLayout} onChange={e => setUseLayout(e.target.checked)} /></label>
        <button className="primary-button" type="button" onClick={() => setExpanded(v => !v)}>{expanded ? "Collapse content" : "Expand content"}</button>
        <div className="code-pill">layoutId = active-tab-indicator</div>
      </aside>
    </section>
  );
}

export default function App() {
  const [activeDemo, setActiveDemo] = useState("card");
  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <header className="site-header">
          <div className="site-logo">m<span>.</span></div>
          <div><div className="eyebrow">FRONTEND RECHARGE / LIVE DEMO</div><h1>Motion for React</h1></div>
          <div className="right-header"><span className="green-dot" /> 40-minute tech sharing</div>
        </header>
        <nav className="demo-nav" aria-label="Choose demo">
          {Object.keys(demoInfo).map(id => <button key={id} type="button" className={activeDemo === id ? "demo-nav-item selected" : "demo-nav-item"} onClick={() => setActiveDemo(id)}><span>{demoInfo[id].number}</span><strong>{demoInfo[id].title}</strong></button>)}
        </nav>
        <div className="intro"><span className="eyebrow">{demoInfo[activeDemo].number} / 03 — PLAYGROUND</span><h2>{demoInfo[activeDemo].title}</h2><p>{demoInfo[activeDemo].subtitle}</p></div>
        {activeDemo === "card" ? <AnimatedCardDemo /> : activeDemo === "notification" ? <NotificationDemo /> : <TabsDemo />}
        <footer>Motion API: <code>motion/react</code> · React + JavaScript · Press tabs above to switch demos</footer>
      </div>
    </MotionConfig>
  );
}
