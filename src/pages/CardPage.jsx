import CodeDetails from "../components/CodeDetails";
import CssCard from "../demos/card/CssCard";
import MotionCard from "../demos/card/MotionCard";
import cssCardSource from "../demos/card/CssCard.jsx?raw";
import motionCardSource from "../demos/card/MotionCard.jsx?raw";
import cardContentSource from "../demos/card/CardContent.jsx?raw";
import cardStylesSource from "../demos/card/cardStyles.js?raw";

const sourceSections = [
  { title: "CssCard.jsx — Inline Styles", code: cssCardSource },
  { title: "MotionCard.jsx — Motion", code: motionCardSource },
  { title: "CardContent.jsx — Shared markup", code: cardContentSource },
  { title: "cardStyles.js — Shared style object", code: cardStylesSource },
];

export default function CardPage() {
  return (
    <div className="page-stack">
      <div className="compare-grid"><CssCard /><MotionCard /></div>
      <div className="compare-note">
        <strong>Comparison premise:</strong> With Inline Style limitations, the native version manages Hover and Press through Pointer Events and React State; Motion provides declarative gesture animation APIs. If a regular CSS stylesheet were allowed, a simple Hover could use <code>:hover</code> without React State.
      </div>
      <CodeDetails defaultOpen sections={sourceSections} />
    </div>
  );
}
