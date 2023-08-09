import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import WCAScheduleMaker from "./pages/WCAScheduleMaker";
import CreateSchedule from "./pages/CreateSchedule";
import EstimateRoundLength from "./pages/EstimateRoundLength";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <NavigationBar />
      <Container className="my-5">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wca-schedule-maker" element={<WCAScheduleMaker />} />
            <Route
              path="/wca-schedule-maker/create"
              element={<CreateSchedule />}
            />
            <Route
              path="/wca-schedule-maker/roundlength"
              element={<EstimateRoundLength />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}
