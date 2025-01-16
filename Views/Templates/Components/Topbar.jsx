import { useState, useEffect } from "react";
import wabelzLogo from "../../Assets/Images/wabelz-logo.png";
import useMediaQuery from "../../Assets/Scripts/Hooks/useMediaQuery.js";
import Icon from "./Icon.jsx";

export default function Topbar() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [hamburgerToggle, setHamburgerToggle] = useState(false);

  useEffect(() => {
    if (hamburgerToggle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hamburgerToggle]);

  return (
    <div className="topbar">
      <div className="topbar-content">
        <a href="/" className="logowrap row">
          <img src={wabelzLogo} alt="Wabelz Logo" className="logo-img" />
          <h1 className="logo-text">Wabelz</h1>
        </a>
        {!isSmallScreen && (
          <nav className="justify-between">
            <a href="/" className="nav-elem">
              Home
            </a>
            <a href="/packages" className="nav-elem">
              Packages
            </a>
            <a href="/contact" className="nav-elem">
              Contact
            </a>
          </nav>
        )}
        {isSmallScreen && (
          <div className="hamburger">
            <div
              className={
                hamburgerToggle ? "fixed-sidebar active" : "fixed-sidebar"
              }
            >
              <nav
                className={
                  hamburgerToggle ? "sidebar-nav visible" : "sidebar-nav"
                }
              >
                <a href="/" className="sidebar-elem">
                  Home
                </a>
                <a href="/packages" className="sidebar-elem">
                  Packages
                </a>
                <a href="/contact" className="sidebar-elem">
                  Contact
                </a>
              </nav>
            </div>
            <button
              onClick={() => setHamburgerToggle((prev) => !prev)}
              id="hamburgerBtn"
              className="hamburger-button"
            >
              <Icon
                icon={!hamburgerToggle ? "faBars" : "faXmark"}
                type="solid"
                color="#8c8cec"
                size="2x"
                bgColor="transparent"
                marginRight="0"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
