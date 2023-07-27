import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateSchedule from "./pages/CreateSchedule";
import EstimateRoundLength from "./pages/EstimateRoundLength";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSchedule />} />
        <Route path="/roundlength" element={<EstimateRoundLength />} />
      </Routes>
    </BrowserRouter>
  );
}
