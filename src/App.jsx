import { Navigate, Route, Routes } from "react-router-dom";
import DemoLayout from "./components/DemoLayout";
import CardPage from "./pages/CardPage";
import NotificationPage from "./pages/NotificationPage";
import TabsPage from "./pages/TabsPage";
import Test from "./demos/Test";

export default function App() {
  return (
    <Routes>
      <Route element={<DemoLayout />}>
        <Route index element={<Navigate to="/card" replace />} />
        <Route path="card" element={<CardPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="tabs" element={<TabsPage />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<Navigate to="/card" replace />} />
      </Route>
    </Routes>
  );
}
