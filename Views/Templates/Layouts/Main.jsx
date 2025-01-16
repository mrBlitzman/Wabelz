import { useState, useEffect } from "react";
import Loading from "../Components/Loading.jsx";
import Topbar from "../Components/Topbar.jsx";
import Footer from "../Components/Footer.jsx";
import WhatsappBtn from "../Components/WhatsappBtn.jsx";

export default function Main({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      setIsLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className={`main-wrapper ${isLoading ? "loading hidden" : "loaded"}`}>
      <div className={`loading-overlay ${isLoading ? "visible" : "hidden"}`}>
        <Loading />
      </div>
      <div className={`page-content ${isLoading ? "hidden" : "visible"}`}>
        <WhatsappBtn />
        <Topbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
