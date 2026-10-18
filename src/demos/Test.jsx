
import { useState } from "react";
import { motion } from "motion/react";

export default function Test() {
  const [t, setT] = useState(["A", "B", "C"]);

  return (
    <div style={{ width: 200 }}>
      {t.map((n) => (
        <motion.div
          key={n}
          layout
          style={{
            padding: 20,
            marginBottom: 10,
            backgroundColor: "#f97316",
            borderRadius: 8,
            color: "white"
          }}
        >
          {n}
        </motion.div>
      ))}

      <button onClick={() => setT(prev => [...prev].reverse())}>
        Reorder
      </button>
    </div>
  );
}
