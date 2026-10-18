import CodeDetails from "../components/CodeDetails";
import CssTabs from "../demos/layout/CssTabs";
import MotionTabs from "../demos/layout/MotionTabs";
import CssReorder from "../demos/layout/CssReorder";
import MotionReorder from "../demos/layout/MotionReorder";
import cssTabsSource from "../demos/layout/CssTabs.jsx?raw";
import motionTabsSource from "../demos/layout/MotionTabs.jsx?raw";
import cssReorderSource from "../demos/layout/CssReorder.jsx?raw";
import motionReorderSource from "../demos/layout/MotionReorder.jsx?raw";
import stylesSource from "../demos/layout/layoutStyles.js?raw";

export default function TabsPage() {
  return (
    <div className="page-stack">
      <section className="section-card">
        <div className="section-heading">
          <h3>Demo A: Animated Tabs</h3>
          <p>比較手動量測底線位置與 Motion layoutId 的共享元素動畫。</p>
        </div>
        <div className="compare-grid">
          <CssTabs />
          <MotionTabs />
        </div>
      </section>
      <p className="compare-note">
        <code>layoutId</code> 讓不同位置的選取底線產生共享元素轉場。
      </p>
      <CodeDetails
        defaultOpen
        sections={[
          { title: "CssTabs.jsx — Inline Styles", code: cssTabsSource },
          { title: "MotionTabs.jsx — Motion", code: motionTabsSource },
        ]}
      />

      <section className="section-card">
        <div className="section-heading">
          <h3>Demo B: Reorder List</h3>
          <p>更新相同的陣列順序，比較原生 FLIP 與 Motion layout 的位置動畫。</p>
        </div>
        <div className="compare-grid">
          <CssReorder />
          <MotionReorder />
        </div>
      </section>
      <p className="compare-note">
        React 負責更新陣列順序；Motion 的 <code>layout</code> 會偵測元素位置變化，並自動播放過渡動畫。原生版本則需要另外處理位置變化。
      </p>
      <CodeDetails
        defaultOpen
        sections={[
          { title: "CssReorder.jsx — Inline Styles", code: cssReorderSource },
          { title: "MotionReorder.jsx — Motion", code: motionReorderSource },
        ]}
      />

      <p className="compare-note">
        <code>layout</code> 處理同一個元素的位置變化；<code>layoutId</code> 則連接不同位置的共享元素。兩種效果也都能以原生方式完成。
      </p>
      <CodeDetails sections={[{ title: "layoutStyles.js — Shared styles", code: stylesSource }]} />
    </div>
  );
}
