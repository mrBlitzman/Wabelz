import React, { useState } from "react";
import Icon from "./Icon.jsx";

export default function Accordion({
  accordions,
  customPkg = false,
  pkgDetails,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const unitMap = {
    Pages: "Pages",
    Revisions: "Revisions",
    "Multilingual Support": (quantity) =>
      `Multilingual Support: ${quantity} languages`,
    "Maintenance Duration": (quantity) =>
      `Maintenance Duration: ${quantity} month${quantity > 1 ? "s" : ""}`,
  };

  console.log(pkgDetails);

  return accordions.map((accordion, index) => (
    <div key={index} className="w-full">
      <button
        className={`${
          customPkg ? "custompkg" : "accordion-purple header-secondary"
        } accordion  ${activeIndex === index ? "active" : ""}`}
        onClick={() => togglePanel(index)}
      >
        {" "}
        <div className="title-acc">
          <Icon
            icon="faAngleUp"
            type="solid"
            color="#dec4ff"
            bgColor="transparent"
            className="acc-icon"
          />
          <p>{accordion.title}</p>
        </div>
        {customPkg && <h2>$ {pkgDetails.totalPrice.toFixed(2)}</h2>}
      </button>
      <div
        className={`acc-panel paragraph ${customPkg ? "custompkg" : ""} ${
          activeIndex === index ? "open" : ""
        }`}
      >
        {customPkg == false
          ? accordion.content
          : pkgDetails.orderDetails.map((order, index) => (
              <div key={index} className="order-elem">
                <p className="order-elem-header">
                  {order.type === "quantity" && order.quantity > 0
                    ? unitMap[order.invoiceTitle] &&
                      typeof unitMap[order.invoiceTitle] === "function"
                      ? `${unitMap[order.invoiceTitle](order.quantity)}`
                      : `${order.quantity} ${
                          unitMap[order.invoiceTitle] || order.invoiceTitle
                        }`
                    : order.invoiceTitle}
                </p>
                <p className="order-elem-price">
                  ${(order.price * order.quantity).toFixed(2)}
                </p>
              </div>
            ))}
      </div>
    </div>
  ));
}
