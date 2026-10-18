
import { useState } from "react";
import { motion, useAnimationControls } from "motion/react";

export default function Test() {
  const [move, setMove] = useState(false);

   const controls = useAnimationControls();

  const shake = () => {
    // 瞬間設定起點
    controls.set({ rotate: -20 });

    // 從 -20 度震盪回 0 度
    controls.start({
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 5,
        mass: 0.6
      }
    });
  };

  return (
    <div>
      <p>Tween</p>
      <motion.div
        animate={{ x: move ? 200 : 0 }}
        transition={{
          type: "tween",
          duration: 0.6,
          ease: "easeInOut"
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#3b82f6"
        }}
      />
      <motion.layout>
        
      </motion.layout>
      <p>Spring</p>
      <motion.button
      animate={controls}
      onTap={shake}
      style={{
        width: 50,
        height: 50,
        backgroundColor: "#f97316"
      }}
    />

      <button onClick={() => setMove(!move)}>
        Move
      </button>
    </div>
  );
}
