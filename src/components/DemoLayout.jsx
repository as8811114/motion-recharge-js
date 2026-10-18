import { MotionConfig } from "motion/react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { demos } from "../demoInfo";

export default function DemoLayout() {
  const { pathname } = useLocation();
  const activeDemo = demos.find((demo) => demo.path === pathname) ?? demos[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell">
        <header className="site-header">
          <div>
            <span className="eyebrow">React animation comparison</span>
            <h1>CSS vs Motion</h1>
          </div>
          <p>Same interaction, two implementations.</p>
        </header>
        <nav className="demo-nav" aria-label="Demo navigation">
          {demos.map((demo) => (
            <NavLink key={demo.path} to={demo.path} className={({ isActive }) => `demo-nav-item${isActive ? " selected" : ""}`}>
              <span>{demo.number}</span><strong>{demo.title}</strong>
            </NavLink>
          ))}
        </nav>
        <main>
          <div className="intro">
            <span className="eyebrow">Demo {activeDemo.number}</span>
            <h2>{activeDemo.title}</h2>
            <p>{activeDemo.subtitle}</p>
          </div>
          <Outlet />
        </main>
        <footer>React state drives both examples. Only the animation coordination differs.</footer>
      </div>
    </MotionConfig>
  );
}
