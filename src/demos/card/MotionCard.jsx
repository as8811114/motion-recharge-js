import { useState } from "react";
import { motion } from "motion/react";
import CardContent from "./CardContent";
import { cardStyles } from "./cardStyles";

const rest = { opacity: 1, y: 0, scale: 1 };

export default function MotionCard() {
  const [enabled, setEnabled] = useState(true);
  const [duration, setDuration] = useState(0.45);
  const [replayKey, setReplayKey] = useState(0);

  const handleEnabledChange = (event) => {
    const nextEnabled = event.target.checked;
    setEnabled(nextEnabled);
    if (nextEnabled) setReplayKey((key) => key + 1);
  };

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>React + Motion</h3><code>whileHover / whileTap</code></div>
      <div className="demo-stage">
        <motion.div
          key={replayKey}
          style={cardStyles.container}
          tabIndex="0"
          role="button"
          aria-label="Interactive demonstration card"
          initial={enabled ? { opacity: 0, y: 28, scale: 1 } : false}
          animate={rest}
          whileHover={enabled ? { scale: 1.035, y: -4 } : undefined}
          whileFocus={{ boxShadow: "0 0 0 3px #8ab4ff, 0 18px 45px #26334a25" }}
          whileTap={enabled ? { scale: 0.97, y: 0 } : undefined}
          transition={enabled ? { type: "tween", duration, ease: "easeOut" } : { duration: 0 }}
        >
          <CardContent />
        </motion.div>
      </div>
      <div className="controls">
        <label className="control-group"><input type="checkbox" checked={enabled} onChange={handleEnabledChange} /> Enable animation</label>
        <label className="control-group">Duration <input type="range" min="0.2" max="1.2" step="0.05" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /> {duration.toFixed(2)}s</label>
        <button className="button" type="button" onClick={() => setReplayKey((key) => key + 1)}>Replay</button>
      </div>
    </article>
  );
}
