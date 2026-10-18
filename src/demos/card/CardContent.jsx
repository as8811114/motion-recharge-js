import { cardStyles } from "./cardStyles";

export default function CardContent() {
  return (
    <>
      <div style={cardStyles.artwork} aria-hidden="true">✦</div>
      <span style={cardStyles.label}>INTERACTIVE COMPONENT</span>
      <h4 style={cardStyles.title}>Small interactions, clear feedback.</h4>
      <p style={cardStyles.description}>
        Hover, press, and replay the entrance to compare two ways of describing the same animation.
      </p>
      <span style={cardStyles.action}>Explore <b>→</b></span>
    </>
  );
}
