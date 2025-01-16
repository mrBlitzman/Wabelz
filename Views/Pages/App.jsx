import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mainpage from "./Mainpage.jsx";
import Packages from "./Packages.jsx";
import Package from "./Package.jsx";
import Order from "./Order.jsx";
import Contact from "./Contact.jsx";
import ToS from "./ToS.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import RefundAndCancellation from "./RefundAndCancellation.jsx";
import UserLicenseAgreement from "./UserLicenseAgreement.jsx";
import FAQ from "./FAQ.jsx";
import NotFound from "./NotFound.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Mainpage />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/package" element={<Package />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal/terms-of-service" element={<ToS />} />
        <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/legal/refund-and-cancellation-policy"
          element={<RefundAndCancellation />}
        />
        <Route
          path="/legal/user-license-agreement"
          element={<UserLicenseAgreement />}
        />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
