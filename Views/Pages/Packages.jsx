import { React, useState, useEffect, useRef } from "react";
import Main from "../Templates/Layouts/Main.jsx";
import Package from "../Templates/Components/Package.jsx";
import Loading from "../Templates/Components/Loading.jsx";
import CustomPackageForm from "../Templates/Components/CustomPackageForm.jsx";
import ContentSection from "../Templates/Components/ContentSection.jsx";
import picsum from "../Assets/Images/picsum.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FadeInSection from "../Templates/Components/FadeInSection.jsx";

export default function Packages() {
  const [packagesData, setPackagesData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressHeight, setProgressHeight] = useState(0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_API_ORIGIN}/api/info/packages/`
        );
        if (!response.ok) throw new Error("Failed to fetch package data");
        const data = await response.json();
        setPackagesData(data);
      } catch (e) {
        console.error(`An error happened: ${e.message}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, []);

  const [quantities, setQuantities] = useState({});
  const [elements, setElements] = useState({});

  useEffect(() => {
    const getItemDatas = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.VITE_API_ORIGIN}/api/info/items`
        );
        if (!response.ok) throw new Error("Failed to fetch item data");
        const items = await response.json();
        setQuantities(items.quantities);
        setElements(items.elements);
      } catch (e) {
        console.error(`An error happened: ${e.message}`);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getItemDatas();
  }, [setLoading, setError]);

  const myArray = useRef([]);
  useEffect(() => {
    const handleScroll = () => {
      const progressBarBg = document.querySelector(".progressbar-bg");
      const steps = document.querySelectorAll(".step");
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const viewportMiddle = viewportHeight / 2;

      const domHeightAtViewportMiddle = viewportMiddle + scrollPosition;

      if (progressBarBg) {
        const bgRect = progressBarBg.getBoundingClientRect();
        const progressBarBgHeight = progressBarBg.offsetHeight;
        const middleScrolled = Math.max(0, viewportMiddle - bgRect.top);
        const percentage = (middleScrolled / progressBarBgHeight) * 100;
        setProgressHeight(Math.min(percentage, 100));
      }

      steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        const stepMiddle = stepRect.top + stepRect.height / 2 + scrollPosition;

        if (
          domHeightAtViewportMiddle > stepMiddle &&
          !step.dataset.inViewport
        ) {
          step.classList.add("active");
          step.dataset.inViewport = "true";
        } else if (
          domHeightAtViewportMiddle <= stepMiddle &&
          step.dataset.inViewport
        ) {
          step.classList.remove("active");
          step.dataset.inViewport = "";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className={"main-wrapper loading hidden"}>
        <div className={"loading-overlay visible"}>
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <>
      <Main>
        <div className="content-container">
          <div className="content-section no-topmargin">
            <FadeInSection translate={true}>
              <div className="secondary-hero">
                <h1 className="header-primary text-light-blue my-5">
                  Select a package
                </h1>
                <p className="paragraph text-white font-normal long-leading my-5">
                  Find the perfect package for your goals. From
                  beginner-friendly options to advanced features, we’ve got you
                  covered. Select a package and take the first step towards
                  building your ideal website.
                </p>
              </div>
            </FadeInSection>
          </div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="packages-container"
          >
            {packagesData.map((pkg, index) => (
              <Package
                key={index}
                title={pkg.title}
                subtitle={pkg.tagline}
                colorClass={pkg.slug}
                price={pkg.price}
                oldPrice={pkg.oldPrice}
                items={pkg.features}
              />
            ))}
          </motion.div>
          <div className="content-section mb-10">
            <FadeInSection translate={true}>
              <button
                className="button button-purple box-button scrolldown-btn"
                onClick={() => {
                  const element = document.querySelector(".scrolltocustompkg");
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
              >
                None of the packages are right for you? Create your own.
              </button>
            </FadeInSection>
          </div>
          <div className="content-section secondary-section no-topmargin">
            <div className="progress-and-content">
              <div className="progressbar-bg">
                <div className="progressbar-container">
                  <div
                    className="progressbar"
                    style={{ height: `${progressHeight}%` }}
                  ></div>
                </div>
              </div>
              <div className="progress-contents addmargin">
                <ContentSection
                  imgSource={picsum}
                  imgPosition="right"
                  noIndex={true}
                  sectionIndex="1"
                  sectionHeader="Place Your Order"
                  sectionBodyHeader="Choose the package that matches your needs and take the first step toward creating your dream website."
                  sectionContentP="Take the first step toward building your ideal website by selecting the perfect package for your needs. Whether you’re a visionary entrepreneur or a growing business, this simple step unlocks access to a world of professional design and development expertise. From this moment on, we’re here to turn your ideas into a digital masterpiece."
                  noBtn={true}
                />
                <ContentSection
                  imgSource={picsum}
                  imgPosition="right"
                  noIndex={true}
                  sectionIndex="2"
                  sectionHeader="Align the Vision"
                  sectionBodyHeader="Join a live meeting where we discuss your goals, ideas, and preferences to craft a design that fits you perfectly."
                  sectionContentP="We believe great websites are born from collaboration. That’s why we schedule a personalized live online meeting to understand your needs in depth. During this session, we’ll explore your goals, discuss your design preferences, and address any specific features you desire. This is where creativity meets clarity, ensuring that every element of your website aligns with your unique expectations. Our goal? To ensure your satisfaction from the very beginning."
                  noBtn={true}
                />
                <ContentSection
                  imgSource={picsum}
                  imgPosition="right"
                  noIndex={true}
                  sectionIndex="3"
                  sectionHeader="Build with Precision"
                  sectionBodyHeader="We transform your ideas into reality, designing and developing a website that blends beauty with functionality."
                  sectionContentP="Armed with a clear understanding of your vision, our team of experts begins crafting your website. From cutting-edge design to seamless functionality, every aspect is meticulously built to meet your exact needs. We don’t just create websites; we engineer digital experiences that are visually captivating, highly responsive, and user-friendly. This phase transforms your ideas into a polished, professional reality that stands out in today’s competitive landscape."
                  noBtn={true}
                />
                <ContentSection
                  imgSource={picsum}
                  imgPosition="right"
                  noIndex={true}
                  sectionIndex="4"
                  sectionHeader="Deliver and Support"
                  sectionBodyHeader="Your website goes live, and we provide ongoing support to ensure everything runs smoothly as you grow."
                  sectionContentP="Your website is ready to shine, but our partnership doesn’t end at delivery. We provide a smooth handover, ensuring everything functions flawlessly, while our dedicated support team remains at your service. Whether you need adjustments, technical guidance, or just a helping hand, we’re here to ensure your website evolves with your goals. This is not just a delivery — it’s a promise of ongoing success and reliability."
                  noBtn={true}
                />
              </div>
            </div>
          </div>
          <div className="content-section secondary-section mt-20">
            <FadeInSection translate={true}>
              <div className="secondary-hero scrolltocustompkg">
                <h1 className="header-primary text-light-blue my-5">
                  Create your own package
                </h1>
                <p className="paragraph text-white font-normal long-leading my-5">
                  Create a package tailored to your specific needs and goals.
                  Select only the features and functionalities that matter most
                  to you, ensuring a perfect fit for your project. Build your
                  vision with flexibility and precision, all in one convenient
                  place.
                </p>
              </div>
            </FadeInSection>
          </div>
          <CustomPackageForm quantities={quantities} elements={elements} />
        </div>
      </Main>
    </>
  );
}
