import { useState, useEffect } from 'react';
import useMediaQuery from'../../Assets/Scripts/Hooks/useMediaQuery.js';

export default function ContentSection({
  imgSource,
  imgPosition: initialImgPosition,
  sectionIndex,
  sectionHeader,
  sectionBodyHeader,
  sectionContentList,
  btnContent,
  btnHref,
}) {

  const isSmallScreen = useMediaQuery('(max-width: 1100px)');

  const imgPosition = isSmallScreen && initialImgPosition === 'right' ? 'left' : initialImgPosition;

  return (
    <>
      <div className="content-section cs-card">
        <div className="centered-row cs-card-row">
          {imgPosition === 'left' && <img src={imgSource} className="img cs-img" />}
          <div className={imgPosition === 'left' ? 'divider-text-left' : 'divider-text-right'}>
            <div className="head-and-stripe">
              <div className="sections-head">
                <h1 className="text-white sections-number">{sectionIndex}</h1>
                <h1 className="text-white sections-header header-primary">{sectionHeader}</h1>
              </div>
            </div>
            <div className="sections-body">
              <p className="text-pastel-purple header-secondary text-left section-body-header mt-5">
                {sectionBodyHeader}
              </p>
              <ul>
                {sectionContentList.map((item, index) => (
                  <li key={index} className="text-white text-left section-body-li">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <a href='/packages'><button className="button button-primary section-button mx-auto">{btnContent}</button></a>        
          </div>
          {imgPosition === 'right' && <img src={imgSource} className="img cs-img" />}
        </div>
      </div>
    </>
  );
}
