import { useEffect, useRef, useState } from "react";
import CardContent from "./CardContent";
import { cardStyles } from "./cardStyles";

export default function CssCard() {
  const [enabled, setEnabled] = useState(true);
  const [duration, setDuration] = useState(0.45);
  const [replayKey, setReplayKey] = useState(0);
  const [isEntered, setIsEntered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animationFrames = useRef([]);

  useEffect(() => {
    animationFrames.current.forEach(cancelAnimationFrame);
    animationFrames.current = [];

    if (!enabled) {
      setIsEntered(true);
      setIsHovered(false);
      setIsPressed(false);
      return undefined;
    }

    setIsEntered(false);
    const firstFrame = requestAnimationFrame(() => {
      const secondFrame = requestAnimationFrame(() => setIsEntered(true));
      animationFrames.current.push(secondFrame);
    });
    animationFrames.current.push(firstFrame);

    return () => animationFrames.current.forEach(cancelAnimationFrame);
  }, [enabled, replayKey]);

  const handlePointerEnter = (event) => {
    if (enabled && event.pointerType !== "touch") setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handlePointerDown = (event) => {
    if (!enabled || (event.pointerType === "mouse" && event.button !== 0)) return;
    setIsPressed(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const clearPress = () => setIsPressed(false);

  const handleBlur = () => {
    setIsFocused(false);
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleKeyDown = (event) => {
    if (!enabled || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    setIsPressed(true);
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" || event.key === " ") setIsPressed(false);
  };

  const interactionTransform = isPressed
    ? "translateY(0) scale(0.97)"
    : isHovered
      ? "translateY(-4px) scale(1.035)"
      : "translateY(0) scale(1)";

  const animatedStyle = {
    ...cardStyles.container,
    boxShadow: isFocused
      ? "0 0 0 3px #8ab4ff, 0 18px 45px #26334a25"
      : cardStyles.container.boxShadow,
    opacity: isEntered ? 1 : 0,
    transform: isEntered ? interactionTransform : "translateY(28px) scale(1)",
    transition: enabled && isEntered
      ? `opacity ${duration}s ease-out, transform ${duration}s ease-out`
      : "none",
  };

  return (
    <article className="demo-panel">
      <div className="panel-heading"><h3>React + Inline Styles</h3><code>Pointer Events + State</code></div>
      <div className="demo-stage">
        <div
          style={animatedStyle}
          tabIndex="0"
          role="button"
          aria-label="Interactive demonstration card"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={clearPress}
          onPointerCancel={clearPress}
          onLostPointerCapture={clearPress}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
        >
          <CardContent />
        </div>
      </div>
      <div className="controls">
        <label className="control-group"><input type="checkbox" checked={enabled} onChange={(event) => setEnabled(event.target.checked)} /> Enable animation</label>
        <label className="control-group">Duration <input type="range" min="0.2" max="1.2" step="0.05" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /> {duration.toFixed(2)}s</label>
        <button className="button" type="button" onClick={() => setReplayKey((key) => key + 1)}>Replay</button>
      </div>
    </article>
  );
}
