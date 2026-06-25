import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import WeekPage from "./pages/WeekPage";

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen" style={{ backgroundColor: "#0d0f1e" }}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/week/:weekId" element={<WeekPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
