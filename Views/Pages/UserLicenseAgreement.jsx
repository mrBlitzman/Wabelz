import React, { useState, useEffect, useRef } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import { motion, useSpring, useScroll } from "motion/react";

function UserLicenseAgreement() {
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
                  User License Agreement
                </h1>
              </div>
              <div className="agreement-container">
                <div className="agreement-section">
                  <p>
                    This User License Agreement ("Agreement") is made between
                    Wabelz ("Company", "We", "Our") and the user ("User") who
                    wishes to use the Wabelz platform ("Service"). By accessing
                    or using the Service, you agree to be bound by this
                    Agreement. Please read this Agreement carefully before using
                    the Service.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>1. Grant of License</h2>
                  <p>
                    The Company grants the User a limited, revocable,
                    non-transferable, non-exclusive license to use the Service
                    solely for personal or commercial purposes, subject to the
                    terms and conditions set forth in this Agreement.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>2. User Responsibilities</h2>
                  <p>
                    The User agrees to use the Service solely for lawful
                    purposes and in compliance with all applicable laws and
                    regulations.
                  </p>
                  <p>
                    <strong>Additionally, the User agrees not to:</strong>
                  </p>
                  <p>Violate any rights of third parties.</p>
                  <p>Distribute harmful or offensive content.</p>
                  <p>
                    Misuse the platform in any way, including through the
                    distribution of malware or engaging in activities that
                    disrupt the service.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>3. Intellectual Property Rights</h2>
                  <p>
                    All content, software, graphics, and other materials related
                    to the Service are the intellectual property of the Company
                    and are protected by copyright laws. The User may only use
                    the Service as permitted and may not infringe on any
                    intellectual property rights of the Company.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>4. Restrictions on Use</h2>
                  <p>
                    <strong>The User agrees not to:</strong>
                  </p>
                  <p>
                    Reverse-engineer, decompile, or disassemble any software or
                    technology associated with the Service.
                  </p>
                  <p>
                    Engage in any activity that may compromise the security or
                    integrity of the Service’s systems or networks.
                  </p>
                  <p>
                    Use or distribute the Service for commercial purposes
                    without the Company’s prior approval.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>5. Modifications or Termination of Service</h2>
                  <p>
                    The Company reserves the right to modify, suspend, or
                    discontinue the Service at any time. The User agrees that
                    the Service may be subject to changes or interruptions, and
                    the Company is not liable for any such modifications or
                    discontinuations.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>6. Limitation of Liability</h2>
                  <p>
                    The Company shall not be liable for any direct, indirect,
                    incidental, special, or consequential damages arising from
                    the use or inability to use the Service. This includes, but
                    is not limited to, loss of data or profits.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>7. Privacy</h2>
                  <p>
                    By using the Service, the User acknowledges and agrees to
                    the collection and processing of personal data in accordance
                    with the Company’s Privacy Policy.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>8. Governing Law</h2>
                  <p>
                    This Agreement shall be governed by and construed in
                    accordance with the laws of the jurisdiction in which the
                    Company is located. Any disputes arising from this Agreement
                    shall be subject to the exclusive jurisdiction of the courts
                    in that jurisdiction.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>9. Changes to the Agreement</h2>
                  <p>
                    The Company reserves the right to update or modify this
                    Agreement at any time. Any changes will be posted on the
                    platform, and the User’s continued use of the Service will
                    constitute acceptance of those changes.
                  </p>
                </div>
                <div className="agreement-section">
                  <h2>10. Contact Us</h2>
                  <p>
                    If you have any questions or concerns about User License
                    Agreement, please contact us. For all contact information,
                    please visit our <a href="/contact">Contact Page</a>.
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

export default UserLicenseAgreement;
