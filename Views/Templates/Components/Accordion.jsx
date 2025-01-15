import React, { useState } from "react";
import Icon from './Icon.jsx';

export default function Accordion({ accordions }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    accordions.map((accordion, index) => (
      <div key={index} className="w-full">
        <button
          className={`accordion header-secondary ${activeIndex === index ? "active" : ""}`}
          onClick={() => togglePanel(index)}
        > <Icon icon="faAngleUp" type='solid' color="#dec4ff" bgColor="transparent" className="acc-icon"/>
          {accordion.title}
        </button>
        <div className={`acc-panel paragraph ${activeIndex === index ? "open" : ""}`}>
          {accordion.content}
        </div>
      </div>
    ))
  );
}
