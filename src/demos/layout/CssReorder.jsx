import { useLayoutEffect, useRef, useState } from "react";
import { layoutStyles as styles } from "./layoutStyles";

const initialItems = [
  { id: "a", label: "Item A" },
  { id: "b", label: "Item B" },
  { id: "c", label: "Item C" },
  { id: "d", label: "Item D" },
];

export default function CssReorder() {
  const [items, setItems] = useState(initialItems);
  const itemRefs = useRef(new Map());
  const previousPositions = useRef(new Map());
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reverseOrder = () => {
    previousPositions.current = new Map(
      items.map((item) => [item.id, itemRefs.current.get(item.id).getBoundingClientRect()]),
    );
    setItems((currentItems) => [...currentItems].reverse());
  };

  useLayoutEffect(() => {
    items.forEach((item) => {
      const node = itemRefs.current.get(item.id);
      const previous = previousPositions.current.get(item.id);
      if (!node || !previous) return;

      const current = node.getBoundingClientRect();
      const deltaY = previous.top - current.top;

      node.style.transition = "none";
      node.style.transform = `translateY(${deltaY}px)`;
      node.getBoundingClientRect();
      node.style.transition = reducedMotion ? "none" : "transform 0.45s ease";
      node.style.transform = "translateY(0)";
    });

    previousPositions.current.clear();
  }, [items, reducedMotion]);

  return (
    <article className="demo-panel">
      <div className="panel-heading">
        <h3>React + Inline Styles</h3>
        <code>FLIP + transform</code>
      </div>
      <div style={styles.stage}>
        <div style={styles.reorderDemo}>
          <button type="button" style={styles.button} onClick={reverseOrder}>Reverse Order</button>
          <div style={styles.list}>
            {items.map((item) => (
              <div
                key={item.id}
                ref={(node) => {
                  if (node) itemRefs.current.set(item.id, node);
                  else itemRefs.current.delete(item.id);
                }}
                style={styles.item}
              >
                <span style={styles.itemBadge}>{item.label.at(-1)}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
