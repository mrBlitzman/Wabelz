import React, { useEffect, useMemo, useState } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import Slider from "../Templates/Components/Slider.jsx";
import ContentSection from "../Templates/Components/ContentSection.jsx";
import Icon from "../Templates/Components/Icon.jsx";
import Accordion from "../Templates/Components/Accordion.jsx";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";
import Plyr from "plyr-react";
import img1 from "../Assets/Images/3.png";
import img2 from "../Assets/Images/6.png";
import img3 from "../Assets/Images/9.png";
import img4 from "../Assets/Images/12.png";
import img5 from "../Assets/Images/15.png";
import img6 from "../Assets/Images/slider-img/ordinarywebsite.png";
import img7 from "../Assets/Images/slider-img/physicalstore.png";
import img8 from "../Assets/Images/slider-img/wabelzwebsitevector.png";
import shape1 from "../Assets/Images/shape1.png";
import shape2 from "../Assets/Images/shape2.png";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function Mainpage() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      background: {
        color: {
          value: "#000010",
        },
      },
      fpsLimit: 120,
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#dec4ff",
          distance: 200,
          enable: true,
          opacity: 0.2,
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
          value: 100,
        },
        opacity: {
          value: 1,
        },
        shape: {
          type: "images",
          options: {
            images: [
              {
                src: shape1,
                width: 50,
                height: 50,
              },
              {
                src: shape2,
                width: 50,
                height: 50,
              },
            ],
          },
        },
        size: {
          value: 3,
        },
      },
      detectRetina: true,
    }),
    []
  );

  const videoSource = {
    type: "video",
    sources: [
      {
        src: "",
        type: "video/mp4",
      },
    ],
  };

  const videoOptions = {
    controls: ["play", "progress", "volume", "mute", "fullscreen"],
    settings: [],
    tooltips: { controls: false },
    autoplay: true,
    debug: false,
  };

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
        {init && (
          <div
            style={{
              position: "absolute",
              overflow: "hidden",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              zIndex: -1,
            }}
          >
            <Particles
              id="tsparticles"
              options={options}
              style={{ height: "100%" }}
            />
          </div>
        )}
        <div className="content-container">
          <div className="content-section no-topmargin">
            <FadeInSection translate={true}>
              <div className="hero-content">
                <h1 className="text-light-blue header-primary my-5">
                  <span className="text-pastel-purple">Empower</span> your brand
                  in the{" "}
                  <span className="text-pastel-purple">digital realm</span> and
                  reach more customers.
                </h1>
                <p className="paragraph text-white my-5">
                  You <span className="highlight">can’t reach</span> your
                  business growth goals without serving an interaction interface
                  to your customers.
                </p>
                <h2 className="text-pastel-purple header-secondary">
                  All you need is a high-performance{" "}
                  <span className="text-light-blue">“website”</span>.
                </h2>
              </div>
              <div className="player-container mx-auto">
                <Plyr source={videoSource} options={videoOptions} />
              </div>
              <div className="dual-button-container">
                <a href="/packages" className="button button-primary">
                  Get your website now!
                </a>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    const element =
                      document.getElementsByClassName("content-section")[1];
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                >
                  Read More
                </button>
              </div>
            </FadeInSection>
          </div>
          <div className="content-section">
            <FadeInSection translate={true}>
              <div className="secondary-hero">
                <h1 className="text-white header-primary my-5">
                  Whether you have a small shop or a large enterprise, you must
                  have an <span className="fancy">address</span> on the
                  internet.
                </h1>
                <div className="secondary-hero-content">
                  <p className="paragraph text-white font-normal">
                    Imagine a street that{" "}
                    <span className="text-pastel-purple font-bold">
                      billions of people
                    </span>{" "}
                    walk through{" "}
                    <span className="text-pastel-purple font-bold">
                      every day.
                    </span>
                  </p>
                  <p className="paragraph text-white font-normal">
                    Now think about the number of customers you're losing{" "}
                    <span className="text-pastel-purple font-bold">
                      every second
                    </span>{" "}
                    because you're not there.
                  </p>
                  <p className="paragraph text-white font-normal">
                    What are you still waiting for to be there?{" "}
                    <span className="highlight font-bold">
                      To lose more customers,
                    </span>{" "}
                    or something else?
                  </p>
                </div>
              </div>
              {<Slider />}
              <div className="btn-p-container">
                <a href="/packages" className="button button-primary">
                  Show packages
                </a>
                <p className="paragraph text-white little-text font-normal">
                  Each package includes logo design and one month of free
                  maintenance!
                </p>
              </div>
            </FadeInSection>
          </div>
          <ContentSection
            imgSource={img1}
            imgPosition="left"
            sectionIndex="01"
            sectionHeader="Showcase your professionalism"
            sectionBodyHeader="Establish a strong online presence that reflects your expertise and builds trust."
            sectionContentList={[
              "Create a memorable first impression.",
              "Effectively showcase your skills and services.",
              "Capture attention with a modern, responsive layout.",
            ]}
            btnContent="See all offers"
            btnHref="/packages"
          />

          <ContentSection
            imgSource={img2}
            imgPosition="right"
            sectionIndex="02"
            sectionHeader="Always be at the forefront"
            sectionBodyHeader="Optimize your digital presence with proven SEO strategies to ensure your business always stays ahead of the competition"
            sectionContentList={[
              "Drive organic traffic with targeted keywords.",
              "Boost visibility through tailored SEO tactics.",
              "Rank higher in search results with effective optimization.",
            ]}
            btnContent="See all offers"
            btnHref="/packages"
          />
          <ContentSection
            imgSource={img3}
            imgPosition="left"
            sectionIndex="03"
            sectionHeader="Make your message unforgettable"
            sectionBodyHeader="Deliver impactful messages that leave a lasting impression on your audience and establish your brand identity"
            sectionContentList={[
              "Strengthen your brand with unique content.",
              "Engage your audience with tailored communication.",
              "Ensure your message is remembered with purpose-driven words.",
            ]}
            btnContent="See all offers"
            btnHref="/packages"
          />
          <ContentSection
            imgSource={img4}
            imgPosition="right"
            sectionIndex="04"
            sectionHeader="Get more and more customers"
            sectionBodyHeader="Connect your brand with your target audience using the right techniques to boost your brand value and revenue"
            sectionContentList={[
              "Attract the right customers with precision targeting.",
              "Turn audience engagement into measurable growth.",
              "Drive more traffic with optimized strategies.",
            ]}
            btnContent="See all offers"
            btnHref="/packages"
          />
          <ContentSection
            imgSource={img5}
            imgPosition="left"
            sectionIndex="05"
            sectionHeader="See your business rising"
            sectionBodyHeader="Watch your business grow and achieve new milestones with innovative strategies and dedicated solutions"
            sectionContentList={[
              "Build a website that drives your business forward.",
              "Scale your success with results-driven techniques.",
              "Achieve sustainable growth and long-term impact.",
            ]}
            btnContent="See all offers"
            btnHref="/packages"
          />
          <div className="content-section">
            <FadeInSection translate={true}>
              <h1 className="text-white header-primary header-big">
                Make your choice.
              </h1>
              <div className="choice-decoration">choice.</div>
              <div className="box-container">
                <div className="box red-box mr-5">
                  <div className="mx-auto mb-5">
                    <img src={img6} alt="" width={150} />
                    <h1 className="text-pastel-purple box-img-alt">
                      Any Ordinary Website
                    </h1>
                  </div>
                  <div className="box-content">
                    <ul className="box-ul">
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        2000-3000 Customers per day
                      </li>
                      <li>
                        <Icon
                          icon="faCircleCheck"
                          type="solid"
                          color="#45a834"
                        />
                        The most expensive one costs 1,000 USD
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        It works even while you sleep (well, sometimes it
                        doesn’t)
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        Boring, difficult to use and understand
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        Customers leave the website as they entered it
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        The variety is limited and it is difficult to find the
                        style you want.
                      </li>
                    </ul>
                    <button className="button button-primary box-button">
                      I will make the wrong choice
                    </button>
                  </div>
                </div>
                <div className="box red-box ml-5">
                  <div className="mx-auto mb-5">
                    <img src={img7} alt="" width={150} />
                    <h1 className="text-pastel-purple box-img-alt">
                      Physical Store
                    </h1>
                  </div>
                  <div className="box-content">
                    <ul className="box-ul">
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        500-1000 Customers per day
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        Needs minimum 300,000 USD to invest
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        Needs your management{" "}
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        You have to be there to shop
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        You have to be there to shop
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        You need a very good marketer to sell well
                      </li>
                      <li>
                        <Icon
                          icon="faCircleXmark"
                          type="solid"
                          color="#ff3b3b"
                        />
                        It may be difficult to find a store in the style you
                        want and in a busy location.
                      </li>
                    </ul>
                    <button className="button button-primary box-button">
                      I will make the wrong choice
                    </button>
                  </div>
                </div>
                <div className="box gold-box mt-5 box-center">
                  <div className="box-center-left">
                    <div className="mx-auto mb-5">
                      <img src={img8} alt="" width={150} />
                      <h1 className="text-pastel-purple box-img-alt">
                        Elegant Wabelz Website
                      </h1>
                    </div>
                    <div className="box-content">
                      <ul className="box-ul">
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          10.000+ Customers per day
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          The most expensive one costs 1,500 USD
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          It works even while you sleep (never crashes like
                          others)
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          Easy to navigate and user friendly
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          Designed to convert visitors into loyal customers
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          Built with cutting-edge technology for top-notch
                          performance
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          A wide range of websites is available, designed
                          precisely as you envision
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          Optimized for SEO to boost your online visibility
                        </li>
                        <li>
                          <Icon
                            icon="faCircleCheck"
                            type="solid"
                            color="#45a834"
                          />
                          Enhanced security features to protect your customers
                          and data
                        </li>
                        <h3 className="ul-footer">And more...</h3>
                      </ul>
                    </div>
                  </div>
                  <div className="box-center-right">
                    <div className="box-center-right-content">
                      <h1 className="text-white header-primary text-left">
                        Why are we the{" "}
                        <span className="text-yellow">best choice</span> for
                        your business?
                      </h1>
                      <div className="features-section">
                        <div className="feature">
                          <h3 className="text-yellow header-secondary">
                            Fast and Reliable
                          </h3>
                          <p>
                            Your website will load in seconds, available to
                            customers anytime, anywhere.
                          </p>
                        </div>
                        <div className="feature">
                          <h3 className="text-yellow header-secondary">
                            Intuitive Design
                          </h3>
                          <p>
                            A seamless, user-friendly layout that keeps visitors
                            engaged and makes navigation effortless.
                          </p>
                        </div>
                        <div className="feature">
                          <h3 className="text-yellow header-secondary">
                            Inspires Purchase Intent
                          </h3>
                          <p>
                            Every detail is carefully designed to make your
                            customers feel confident and ready to buy. Our
                            persuasive content and strategic layouts guide
                            visitors smoothly from interest to action,
                            maximizing sales opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="box-center-right-button-container">
                      <a href="/packages">
                        <button className="button button-yellow button-centerbox">
                          Transform Your Brand Today – Let’s Get Started!
                        </button>
                      </a>
                      <p className="paragraph text-white little-text font-normal button-bottom-text">
                        Each package includes logo design and one month of free
                        maintenance. <br /> Don’t miss out on this opportunity!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
          <div className="content-section">
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
              <button
                className="button button-purple mx-auto after-faq-button"
                onClick={() => (window.location.href = "/packages")}
              >
                Still not sure? Take a look at our prices
              </button>
            </FadeInSection>
          </div>
        </div>
      </Main>
    </>
  );
}
