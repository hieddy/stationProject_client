import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing/LandingPage";
import { StationPage } from "./pages/Station/StationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const Path = {
  HOME: "/",
  STATION: "/station",
};

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/station" element={<StationPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export { Router };
