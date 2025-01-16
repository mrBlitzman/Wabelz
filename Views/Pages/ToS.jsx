import React, { useState, useEffect, useRef } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import { motion, useSpring, useScroll } from "motion/react";

function ToS() {
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
                  Terms of Service
                </h1>
              </div>
              <div className="agreement-container">
                <div className="agreement-section">
                  <p>
                    Welcome to Wabelz! These Terms of Service ("Terms") govern
                    your use of our website and services (collectively, the
                    "Services"). By accessing or using Wabelz, you agree to
                    comply with and be bound by these Terms. Please read them
                    carefully.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By accessing or using our Services, you confirm that you are
                    at least 18 years old or have the legal consent of a parent
                    or guardian. If you do not agree to these Terms, you may not
                    use our Services.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>2. Services Overview</h2>
                  <p>
                    Wabelz provides website creation and customization services
                    tailored to the needs of individuals and businesses. Our
                    goal is to deliver high-quality, user-friendly websites
                    developed with care.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>3. User Responsibilities</h2>
                  <p>
                    You agree to provide accurate, complete, and up-to-date
                    information when using our Services.
                  </p>
                  <p>
                    You agree not to use our Services for any unlawful purposes
                    or in violation of these Terms.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>4. Project Process and Payment</h2>
                  <p>
                    <strong>Order Submission:</strong> You will submit your
                    project details, including required features, design
                    preferences.
                  </p>
                  <p>
                    <strong>Pricing:</strong> Pricing is specified per package
                    or feature and is subject to updates, changes, or discounts
                    at Wabelz’s discretion.
                  </p>
                  <p>
                    <strong>Payment:</strong> Payments are to be made to the
                    provided IBAN. When making a payment, you must include the
                    email address provided during the order process in the
                    payment description. Wabelz is not responsible for incorrect
                    or incomplete payment descriptions or payments that do not
                    match order details. In such cases, Wabelz reserves the
                    right to decline service without providing a refund.
                  </p>
                  <p>
                    <strong>Payment Deadlines:</strong> If payment is not made
                    within 5 days of placing the order, the order will be
                    canceled. Until payment is received, Wabelz will only
                    proceed with the design phase, and the full service will
                    only be rendered after payment is completed.
                  </p>
                  <p>
                    <strong>Order Cancellation:</strong> If Wabelz cannot
                    contact the customer within 3 days of order placement, or if
                    the customer cannot contact Wabelz within the same period,
                    the order will be canceled. If payment has already been
                    made, it will be refunded.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>5. Refund Policy</h2>
                  <p>
                    <strong>
                      Refunds will be issued under the following conditions:
                    </strong>{" "}
                  </p>
                  <p>
                    If Wabelz cannot contact the customer within 3 days of order
                    placement.
                  </p>
                  <p>
                    If the service is not delivered by the specified delivery
                    date after payment, unless otherwise agreed upon.
                  </p>
                  <p>
                    Refunds are not available for completed or ongoing projects
                    unless explicitly agreed upon. Refund requests outside these
                    conditions will be evaluated on a case-by-case basis.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>6. Intellectual Property</h2>
                  <p>
                    <strong>Your Content:</strong> You retain ownership of any
                    content (text, images, etc.) you provide for your project.
                    By submitting content, you grant Wabelz a non-exclusive
                    license to use it for the purpose of completing your
                    project.
                  </p>
                  <p>
                    <strong>Delivered Work:</strong> Upon full payment,
                    ownership of the final deliverables will transfer to you.
                    Wabelz reserves the right to showcase completed projects in
                    its portfolio unless otherwise agreed.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>7. Limitation of Liability</h2>
                  <p>
                    <strong>Wabelz is not responsible for:</strong>
                  </p>
                  <p>
                    Errors or issues arising from inaccurate information
                    provided by the user.
                  </p>
                  <p>
                    Downtime or errors caused by third-party hosting services or
                    integrations.
                  </p>
                  <p>
                    Loss of data or revenue due to project delays or technical
                    issues.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>8. Termination</h2>
                  <p>
                    We reserve the right to terminate or suspend your access to
                    our Services at any time for violations of these Terms or
                    other misconduct.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>9. Privacy Policy</h2>
                  <p>
                    Your use of our Services is also governed by our Privacy
                    Policy, which explains how we collect, use, and protect your
                    information.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>10. Modifications to Terms</h2>
                  <p>
                    Wabelz may update these Terms from time to time. Any changes
                    will be communicated via our website, and your continued use
                    of our Services constitutes acceptance of the revised Terms.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>11. Contact Us</h2>
                  <p>
                    If you have any questions or concerns about these Terms,
                    please contact us. For all contact information, please visit
                    our <a href="/contact">Contact Page</a>.
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

export default ToS;
