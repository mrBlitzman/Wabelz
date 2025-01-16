import useMediaQuery from "../../Assets/Scripts/Hooks/useMediaQuery.js";
import FadeInSection from "./FadeInSection.jsx";

export default function ContentSection({
  imgSource,
  imgPosition: initialImgPosition,
  noIndex = false,
  sectionIndex,
  sectionHeader,
  sectionBodyHeader,
  sectionContentList,
  btnContent,
  btnHref,
  noBtn = false,
  sectionContentP,
}) {
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  const imgPosition =
    isSmallScreen && initialImgPosition === "right"
      ? "left"
      : initialImgPosition;

  return (
    <>
      <div
        className={`content-section cs-card ${noBtn ? "more-margin" : ""} ${
          !noIndex && "overflow-hidden"
        }`}
      >
        <FadeInSection>
          <div>
            <div className="centered-row cs-card-row">
              {imgPosition === "left" && (
                <img src={imgSource} className="img cs-img" />
              )}
              <div
                className={
                  imgPosition === "left"
                    ? "divider-text-left"
                    : "divider-text-right"
                }
              >
                <div
                  className={`head-and-stripe ${
                    noIndex ? "no-leftmargin" : ""
                  }`}
                >
                  <div className={`sections-head ${!noIndex ? "striped" : ""}`}>
                    {!noIndex && (
                      <h1 className="text-white sections-number">
                        {sectionIndex}
                      </h1>
                    )}
                    {noIndex ? (
                      <div className="row relative">
                        <div className="step" data-step={sectionIndex}></div>
                        <h1 className="text-white sections-header header-primary no-topmargin">
                          {sectionHeader}
                        </h1>
                      </div>
                    ) : (
                      <h1 className="text-white sections-header header-primary">
                        {sectionHeader}
                      </h1>
                    )}
                  </div>
                </div>
                <div className="sections-body">
                  <p className="text-pastel-purple header-secondary text-left section-body-header mt-5">
                    {sectionBodyHeader}
                  </p>
                  {sectionContentP && (
                    <p className="text-white text-left paragraph">
                      {sectionContentP}
                    </p>
                  )}
                  {sectionContentList && (
                    <ul>
                      {sectionContentList.map((item, index) => (
                        <li
                          key={index}
                          className="text-white text-left section-body-li"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {!noBtn && (
                  <a href={btnHref}>
                    <button className="button button-primary section-button mx-auto">
                      {btnContent}
                    </button>
                  </a>
                )}
              </div>
              {imgPosition === "right" && (
                <img src={imgSource} className="img cs-img" />
              )}
            </div>
          </div>
        </FadeInSection>
      </div>
    </>
  );
}
