import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import CreateSchedule from "./pages/CreateSchedule";
import EstimateRoundLength from "./pages/EstimateRoundLength";
import NoPage from "./pages/NoPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateSchedule />} />
          <Route path="roundlength" element={<EstimateRoundLength />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
