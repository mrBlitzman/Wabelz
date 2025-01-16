import React, { useState, useEffect, useRef } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import { motion, useSpring, useScroll } from "motion/react";

function RefundAndCancellation() {
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
                  Refund and Cancellation Policy
                </h1>
              </div>
              <div className="agreement-container">
                <div className="agreement-section">
                  <p>
                    At Wabelz, we strive to ensure customer satisfaction.
                    However, we recognize that there may be circumstances where
                    refunds or cancellations are necessary. This policy outlines
                    the terms under which refunds or cancellations may apply.
                    Please review it carefully before placing an order.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>1. Refund Policy</h2>
                  <p>
                    <strong>
                      Refunds will be issued under the following conditions:
                    </strong>
                  </p>
                  <p>
                    If Wabelz cannot contact the customer within 3 days of order
                    placement.
                  </p>
                  <p>
                    If the customer cannot contact Wabelz within the same 3-day
                    period, the order will be canceled. If payment has already
                    been made, it will be refunded.
                  </p>
                  <p>
                    If the service is not delivered by the specified delivery
                    date after payment, unless otherwise agreed upon.
                  </p>
                  <p>
                    If the delivered service does not match the agreed-upon
                    specifications.
                  </p>
                  <p>
                    In cases where a mutual agreement for cancellation is
                    reached between Wabelz and the customer.
                  </p>
                  <p>
                    Refund requests outside these conditions will be evaluated
                    on a case-by-case basis.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>2. Cancellation Policy</h2>
                  <p>
                    <strong>
                      Orders may be canceled under the following conditions:
                    </strong>
                  </p>
                  <p>
                    If payment is not made within 5 days of the order, the order
                    will be canceled.
                  </p>
                  <p>
                    If Wabelz cannot contact the customer within 3 days of order
                    placement, or if the customer cannot contact Wabelz within
                    the same period, the order will be canceled. If payment has
                    already been made, it will be refunded.
                  </p>
                  <p>
                    If Wabelz determines that the order violates our Terms of
                    Service or other policies.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>3. How to Request a Refund or Cancellation</h2>
                  <p>
                    To request a refund or cancellation, please{" "}
                    <a href="/contact">contact us</a>.
                  </p>
                  <p>
                    <strong>Please provide the following information:</strong>
                  </p>
                  <p>Your name and contact details.</p>
                  <p>Reason for the refund or cancellation request.</p>
                  <p>
                    When requested, certain information you previously provided
                    when placing an order.
                  </p>
                  <p>
                    Refunds will be processed within 10 business days of
                    approval, and funds will be returned via the original
                    payment method.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>4. Non-Refundable Cases</h2>
                  <p>
                    <strong>
                      Refunds will not be issued in the following cases:
                    </strong>
                  </p>
                  <p>
                    If the customer fails to provide accurate or complete
                    information during the order process.
                  </p>
                  <p>
                    If the order has been completed and delivered as per the
                    agreed-upon specifications.
                  </p>
                  <p>
                    If the request for a refund is made outside the terms
                    outlined in this policy.
                  </p>
                  <p>If production of the service has already started.</p>
                  <p>
                    If payment is made without including the necessary
                    information in the payment description as required.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>5. Contact Us</h2>
                  <p>
                    If you have any questions or concerns about Refund and
                    Cancellation Policy, please contact us. For all contact
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

export default RefundAndCancellation;
