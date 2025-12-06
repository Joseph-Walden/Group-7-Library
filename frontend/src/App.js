import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookAvailability from "./pages/BookAvailability";
import WaitlistPage from "./pages/WaitlistPage";
import FeedbackPage from "./pages/FeedbackPage";
import HelpPage from "./pages/HelpPage";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/availability" element={<BookAvailability />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
