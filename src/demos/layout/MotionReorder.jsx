import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { layoutStyles as styles } from "./layoutStyles";

const initialItems = [
  { id: "a", label: "Item A" },
  { id: "b", label: "Item B" },
  { id: "c", label: "Item C" },
  { id: "d", label: "Item D" },
];

export default function MotionReorder() {
  const [items, setItems] = useState(initialItems);
  const reducedMotion = useReducedMotion();

  const reverseOrder = () => {
    setItems((currentItems) => [...currentItems].reverse());
  };

  return (
    <article className="demo-panel">
      <div className="panel-heading">
        <h3>React + Motion</h3>
        <code>layout</code>
      </div>
      <div style={styles.stage}>
        <div style={styles.reorderDemo}>
          <button type="button" style={styles.button} onClick={reverseOrder}>Reverse Order</button>
          <div style={styles.list}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                transition={reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 30 }}
                style={styles.item}
              >
                <span style={styles.itemBadge}>{item.label.at(-1)}</span>
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
