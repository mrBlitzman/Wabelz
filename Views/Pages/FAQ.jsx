import React, { useState, useEffect, useRef } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import Accordion from "../Templates/Components/Accordion.jsx";

function PrivacyPolicy() {
  const accordions = [
    {
      title: "Will my website look exactly how I want it?",
      content:
        "Absolutely! We aim to create a website that reflects your vision as closely as possible. After your order is placed, we’ll schedule an online meeting to discuss your desired design features in detail. However, the final outcome depends on the features included in your selected package and the technical possibilities. We’ll always do our best to deliver a site that meets your expectations within these parameters.",
    },
    {
      title: "Do I need a domain name and hosting for my website?",
      content:
        "We can help you purchase and set up a domain name and hosting, or you can use your existing ones.",
    },
    {
      title: "Will my website be mobile-friendly?",
      content:
        "Absolutely. Every website we create is fully responsive and optimized for all devices.",
    },
    {
      title: "How long does it take to build a website?",
      content:
        "The timeline depends on the project's complexity, but most websites are completed within 1-2 weeks.",
    },
    {
      title:
        "Do you offer maintenance and support after the website is launched?",
      content:
        "Yes, all our packages include free maintenance for the first month, with affordable options for ongoing support.",
    },
  ];

  return (
    <>
      <Main>
        <div className="content-container">
          <div className="content-section no-topmargin">
            <FadeInSection translate={true}>
              <div className="faq">
                <h1 className="text-white header-primary mt-10 mb-10">
                  Frequently asked questions
                </h1>
                <div className="accordion-container">
                  <div className="accordions">
                    <Accordion accordions={accordions} />
                  </div>
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
