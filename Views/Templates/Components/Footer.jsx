import React, { useState, useEffect } from "react";
import Icon from "./Icon.jsx";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(undefined);

  async function subscribeNewsletter(e) {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }
    try {
      setStatus("loading");
      const response = await fetch(
        `${process.env.VITE_API_ORIGIN}/api/auth/registerEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setStatus(false);
        setError(data.message);
      } else {
        setStatus(true);
        setError(null);
      }
    } catch {
      console.error("An error occurred:", error);
      setError("An error occurred.");
      setStatus(false);
    }
  }

  function emailOnChange(val) {
    setEmail(val);
    setError(null);
    setStatus(undefined);
  }

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h1>Wabelz</h1>
          <div className="socials">
            <a href="#">
              <Icon
                icon="faSquareInstagram"
                marginRight="0px"
                type="brand"
                color="#fff"
                size="xl"
                bgColor="transparent"
              />
            </a>
            <a href="#">
              <Icon
                icon="faSquareXTwitter"
                marginRight="0px"
                type="brand"
                color="#fff"
                size="xl"
                bgColor="transparent"
              />
            </a>
            <a href="#">
              <Icon
                icon="faSquareFacebook"
                marginRight="0px"
                type="brand"
                color="#fff"
                size="xl"
                bgColor="transparent"
              />
            </a>
            <a href="#">
              <Icon
                icon="faLinkedin"
                marginRight="0px"
                type="brand"
                color="#fff"
                size="xl"
                bgColor="transparent"
              />
            </a>
            <a href="#">
              <Icon
                icon="faSquareYoutube"
                marginRight="0px"
                type="brand"
                color="#fff"
                size="xl"
                bgColor="transparent"
              />
            </a>
          </div>
          <form
            onSubmit={subscribeNewsletter}
            className="newsletter-input"
            action="#"
          >
            <p>Subscribe to newsletter:</p>
            <input
              type="text"
              onChange={(e) => emailOnChange(e.target.value)}
              placeholder="Enter your email"
            />
            <button type="submit">
              {status == true
                ? "Subscribed!"
                : status == "loading"
                ? "loading..."
                : "Subscribe"}
            </button>
            {error && <p className="validate-error maillist-error">{error}</p>}
          </form>
        </div>
        <div className="footer-link-group first">
          <h1>Packages</h1>
          <ul>
            <li>
              <a href="/packages">All website packages</a>
            </li>
            <li>
              <a href="/package?package=ignite">Ignite website package</a>
            </li>
            <li>
              <a href="/package?package=momentum">Momentum website package</a>
            </li>
            <li>
              <a href="/package?package=hyperion">Hyperion website package</a>
            </li>
            <li>
              <a href="/package?package=zenith">Zenith website package</a>
            </li>
          </ul>
        </div>
        <div className="footer-link-group">
          <h1>Company</h1>
          <ul>
            <li>
              <a href="/legal/terms-of-service">Terms of Service</a>
            </li>
            <li>
              <a href="/legal/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/legal/refund-and-cancellation-policy">
                Refund and Cancellation
              </a>
            </li>
            <li>
              <a href="/legal/user-license-agreement">User License Agreement</a>
            </li>
          </ul>
        </div>
        <div className="footer-link-group">
          <h1>Support</h1>
          <ul>
            <li>
              <a href="/faq">Frequently Asked Questions</a>
            </li>
            <li>
              <a href="https://wa.me/905362469085" target="_blank">
                Help Center
              </a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="">Rate Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright-text">
        Copyright © 2024 - 2025 Wabelz®. All rights reserved.
      </div>
    </div>
  );
}
