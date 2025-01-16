import React, { useEffect, useMemo, useState } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import Icon from "../Templates/Components/Icon.jsx";
import useMediaQuery from "../Assets/Scripts/Hooks/useMediaQuery.js";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function Contact() {
  const [init, setInit] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#000010",
        },
      },
      particles: {
        color: {
          value: ["#dec4ff"],
        },
        links: {
          color: "#8c8cec",
          distance: 200,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 60,
        },
        opacity: {
          value: 0.5,
          random: true,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: 3,
          random: true,
          animation: {
            enable: true,
            speed: 5,
            minimumValue: 0.5,
          },
        },
      },
      detectRetina: true,
      fpsLimit: 60,
    }),
    []
  );

  return (
    <Main>
      {/* Particles Background */}
      {init && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        >
          <Particles id="tsparticles" options={options} />
        </div>
      )}

      <div className="content-container">
        <div className="content-section no-topmargin">
          <FadeInSection translate={true}>
            <div className="hero-content">
              <h1 className="text-light-blue header-primary mt-5">
                Contact Us
              </h1>
              <h2 className="text-white header-secondary mb-0">
                The Wabelz team is always here for you!
                <br /> We look forward to your questions or cooperation offers.
              </h2>
            </div>
            <div className="contacts-container">
              <a target="_blank" className="contact">
                <Icon
                  icon="faEnvelope"
                  color="white"
                  bgColor="transparent"
                  size={!isSmallScreen ? "4x" : "2x"}
                  marginRight="0"
                />
                <h3 className="text-white header-secondary mt-3">Mail</h3>
              </a>
              <a
                href="https://wa.me/905362469085"
                target="_blank"
                className="contact"
              >
                <Icon
                  icon="faWhatsapp"
                  type="brand"
                  color="white"
                  bgColor="transparent"
                  size={!isSmallScreen ? "4x" : "2x"}
                  marginRight="0"
                />
                <h3 className="text-white header-secondary mt-3">Whatsapp</h3>
              </a>
              <a target="_blank" className="contact">
                <Icon
                  icon="faInstagram"
                  type="brand"
                  color="white"
                  bgColor="transparent"
                  size={!isSmallScreen ? "4x" : "2x"}
                  marginRight="0"
                />
                <h3 className="text-white header-secondary mt-3">Instagram</h3>
              </a>
              <a target="_blank" className="contact">
                <Icon
                  icon="faXTwitter"
                  type="brand"
                  color="white"
                  bgColor="transparent"
                  size={!isSmallScreen ? "4x" : "2x"}
                  marginRight="0"
                />
                <h3 className="text-white header-secondary mt-3">X</h3>
              </a>
            </div>
          </FadeInSection>
          <FadeInSection translate={true}>
            <div className="secondary-hero">
              <h1 className="text-light-blue header-primary mt-10">
                As Wabelz, we aim for excellence in our communication with our
                customers.
              </h1>
              <p className="paragraph text-white font-normal contact-desc">
                We are here to provide fast and effective solutions to your
                questions, guide you in your projects and manage collaborations
                in the most efficient way. We are here to provide the most
                suitable solutions for your needs and to facilitate the process.
              </p>
              <h2 className="text-white header-secondary text-xl">
                Do you have any questions? <br /> Feel free to contact us – we
                are here for you!
              </h2>
            </div>
          </FadeInSection>
        </div>
      </div>
    </Main>
  );
}

export default Contact;
