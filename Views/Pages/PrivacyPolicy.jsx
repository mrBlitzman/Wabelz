import React, { useState, useEffect, useRef } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import { motion, useSpring, useScroll } from "motion/react";

function PrivacyPolicy() {
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#dec4ff",
          zIndex: 1,
        }}
      />
      <Main>
        <div className="content-container">
          <div ref={contentRef} className="content-section no-topmargin">
            <FadeInSection translate={true}>
              <div className="hero-content">
                <h1 className="text-light-blue header-primary mt-5">
                  Privacy Policy
                </h1>
              </div>
              <div className="agreement-container">
                <div className="agreement-section">
                  <p>
                    At Wabelz, we are committed to safeguarding your privacy.
                    This Privacy Policy explains how we collect, use, disclose,
                    and protect your personal information when you use our
                    website and services. By using Wabelz, you agree to the
                    terms outlined in this Privacy Policy.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>1. Information We Collect</h2>
                  <p>
                    We collect personal information that you voluntarily provide
                    to us when you make a purchase, subscribe to our newsletter,
                    or use other services on our platform. The following types
                    of personal information may be collected:
                  </p>
                  <p>Name & Surname</p>
                  <p>Email Address</p>
                  <p>Country</p>
                  <p>Phone Number</p>
                  <p>Industry</p>
                  <p>Order Informations</p>
                  <p>
                    The information you provide is used to process your order,
                    communicate with you regarding your account or order status,
                    and improve your overall user experience.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>2. How We Use Your Information</h2>
                  <p>
                    <strong>
                      We use your personal information for the following
                      purposes:
                    </strong>
                  </p>
                  <p>
                    <strong>To process and fulfill orders:</strong> We use the
                    information you provide, such as your name, email, and
                    country, to process your orders and ensure proper delivery
                    of the services.
                  </p>
                  <p>
                    <strong>To send you communications:</strong> If you
                    subscribe to our newsletter, we will use your email address
                    to send you relevant updates, promotions, and other
                    communications about our services.
                  </p>
                  <p>
                    <strong>To improve our services:</strong> Your feedback,
                    notes, and other provided information help us enhance our
                    platform and tailor our services to better meet your needs.
                  </p>
                  <p>
                    <strong>Usage Data:</strong> We collect usage data such as
                    IP addresses and statistics about your interactions with our
                    website. This information helps us improve the user
                    experience and analyze trends, preferences, and performance.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>3. Information Sharing and Disclosure</h2>
                  <p>
                    We are committed to keeping your personal information
                    confidential. We do not sell, rent, or share your personal
                    data with third parties, except in the following cases:
                  </p>
                  <p>
                    <strong>Service Providers:</strong> We may share your
                    information with third-party vendors and service providers
                    who assist us in the operation of our website, processing
                    payments, or delivering services to you. These third parties
                    are obligated to keep your information confidential and use
                    it solely for the purpose of providing their services to us.
                  </p>
                  <p>
                    <strong>Legal Requirements:</strong> We may disclose your
                    personal information if required by law, regulation, legal
                    process, or government request.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>4. Data Retention</h2>
                  <p>
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes outlined in this Privacy
                    Policy or as required by law. Once your data is no longer
                    needed, we will securely delete it.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>5. Security of Your Information</h2>
                  <p>
                    We take appropriate technical and organizational measures to
                    protect your personal information from unauthorized access,
                    disclosure, alteration, or destruction. However, while we
                    strive to use commercially acceptable means to protect your
                    personal data, it is important to note that no method of
                    transmission over the internet or method of electronic
                    storage is 100% secure. There is always a risk of data
                    breach or unauthorized access.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>6. Your Rights and Choices</h2>
                  <p>
                    <strong>You have the right to:</strong>
                  </p>
                  <p>
                    <strong>Access your personal information:</strong> You can
                    request to access the personal information we hold about
                    you.
                  </p>
                  <p>
                    <strong>Correct or update your information:</strong> You may
                    update or correct any inaccurate or incomplete personal
                    information.
                  </p>
                  <p>
                    <strong>Opt-out of communications:</strong> You can
                    unsubscribe from our newsletter or marketing communications
                    at any time by following the instructions in our emails.
                  </p>
                  <p>
                    <strong>Delete your information:</strong> You can request
                    the deletion of your personal information, subject to
                    applicable laws and retention requirements.
                  </p>
                  <p>
                    To exercise any of these rights, please contact us using the
                    details provided at the end of this policy.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>7. Cookies and Tracking Technologies</h2>
                  <p>
                    We use cookies and similar tracking technologies to enhance
                    your user experience and collect information about how you
                    use our website. These technologies help us analyze web
                    traffic, personalize content, and improve our services. You
                    can control the use of cookies through your browser
                    settings.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>8. Children’s Privacy</h2>
                  <p>
                    Our services are not intended for children under the age of
                    13, and we do not knowingly collect personal information
                    from individuals under 13. If we become aware that we have
                    collected personal information from a child under the age of
                    13, we will take steps to delete the information as soon as
                    possible.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>9. International Data Transfers</h2>
                  <p>
                    If you are accessing our services from outside the country
                    where we are based, please note that your personal
                    information may be transferred to and processed in other
                    countries with different data protection laws. By using our
                    services, you consent to the transfer of your information to
                    those countries.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>10. Changes to This Privacy Policy</h2>
                  <p>
                    We reserve the right to update or modify this Privacy Policy
                    at any time. Any changes will be posted on this page, and
                    the "Last Updated" date will be revised accordingly. We
                    encourage you to review this policy periodically to stay
                    informed about how we are protecting your information.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>11. Contact Us</h2>
                  <p>
                    If you have any questions, concerns, or requests regarding
                    this Privacy Policy, please contact us. For all contact
                    information, please visit our{" "}
                    <a href="/contact">Contact Page</a>.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </Main>
    </>
  );
}

export default PrivacyPolicy;
