# Motion for React — Recharge Live Demo

React + JavaScript (JSX) + Vite 專案，對應技術報告第 6、8、10 頁。

## 啟動

```bash
npm install
npm run dev
```

開啟終端機顯示的網址，通常是 http://localhost:5173 。

## 三個 Demo 操作順序

1. **Interactive Card（第 6 頁，15:00–20:00）**：先取消 Enable Motion 比較沒有動畫，重新開啟，滑鼠移入卡片、點擊卡片，再調整 duration 並按 Replay。
2. **Notification（第 8 頁，23:00–28:00）**：先取消 Enable AnimatePresence，連續顯示／隱藏通知，看突然消失的行為；再勾選，觀察 `exit` 退場動畫。
3. **Animated Tabs（第 10 頁，31:00–35:00）**：切換 Overview / Analytics / Settings 看共享底線移動；取消 Enable layout / layoutId 對照，再點 Expand content 看容器高度過渡。

## 安裝環境

建議 Node.js 20.19+ 或 Node.js 22.12+。套件以 package.json 為準。執行 `npm run build` 可產生正式版，程式碼以 JavaScript / JSX 撰寫，沒有 TypeScript 設定。

## 技術說明

- `import { motion, AnimatePresence, MotionConfig } from "motion/react"`
- `MotionConfig reducedMotion="user"`：尊重 OS 的 Reduced Motion 設定，因此若系統設定減少動態效果，實際動畫可能和演講示範不同。
- 通知的 `AnimatePresence` 位在條件判斷之外，子元件使用穩定 key。
- `layoutId` 提供不同 React 元素間的共享動畫，不需要自己計算座標。

官方文件：https://motion.dev/docs/react

## JavaScript 版的差異

- 所有元件使用 `.jsx`；Vite 設定為 `vite.config.js`。
- 不需要 `tsconfig.json`，也沒有 `type`、`Record<>`、`as const` 等 TypeScript 語法。
- `App.jsx` 放三個 Demo； `main.jsx` 負責掛載 React。
- 如果想個別看 Demo，可搜尋 `AnimatedCardDemo`、`NotificationDemo`、`TabsDemo` 三個 function。
