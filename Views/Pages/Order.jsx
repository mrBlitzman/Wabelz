import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderForm from "../Templates/Components/OrderForm.jsx";
import VerifyMail from "../Templates/Components/VerifyMail.jsx";
import Loading from "../Templates/Components/Loading.jsx";
import Accordion from "../Templates/Components/Accordion.jsx";
import Main from "../Templates/Layouts/Main.jsx";
import PuffInLoader from "../Templates/Components/PuffInLoader.jsx";
import OrderRecieved from "../Templates/Components/OrderRecieved.jsx";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

export default function Order() {
  const location = useLocation();
  const [orderResult, setOrderResult] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [didEmailSent, setDidEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inLoading, setInLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const products = location.state?.products || [];
  const extras = location.state?.extrasData;
  const customPkg = location.state?.customPkg || false;
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    industry: "",
    websiteType: "",
    goal: "",
    description: "",
    additionalNote: "",
    terms: false,
    privacy: false,
    emailList: false,
  });

  const accordions = [
    {
      title: "Custom Package",
    },
  ];

  useEffect(() => {
    if (!location.state) {
      navigate("/packages");
      return;
    }
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.VITE_API_ORIGIN}/api/proceedOrder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(products),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to process order");
        }

        const data = await response.json();
        setOrderResult(data);
        setCartProducts([...data.orderDetails]);
        setLoading(false);
      } catch (error) {
        console.error("Order processing error:", error);
        setOrderResult({ error: error.message });
        setLoading(false);
      }
    };

    if (products.length > 0) {
      fetchOrderDetails();
    }
  }, [products]);

  function toggleExtrasToCart(id, extras, orderResult) {
    setCartProducts((prevCartProducts) => {
      const productIndex = prevCartProducts.findIndex(
        (product) => product.id === id
      );

      if (productIndex !== -1) {
        return prevCartProducts.filter((product) => product.id !== id);
      } else {
        const productToAdd =
          extras.find((extra) => extra.id === id) ||
          orderResult.find((result) => result.id === id);
        if (productToAdd) {
          return [...prevCartProducts, productToAdd];
        }
        return prevCartProducts;
      }
    });
  }

  useEffect(() => {
    const newTotalPrice = cartProducts.reduce((total, item) => {
      const quantity = item.type !== "extra" ? item.quantity : 1;
      return total + item.price * quantity;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [cartProducts]);

  useEffect(() => {
    const verificationBox = document.querySelector(
      ".verificationinput-container"
    );
    if (verificationBox) {
      verificationBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [didEmailSent === true]);

  if (loading)
    return (
      <div className={"main-wrapper loading hidden"}>
        <div className={"loading-overlay visible"}>
          <Loading />
        </div>
      </div>
    );

  return (
    <Main>
      <div className="content-container">
        <div className="packages-container order relative">
          <PuffInLoader isLoading={inLoading} />
          {!orderCompleted ? (
            !didEmailSent ? (
              <div className="custom-pkg">
                <div className="pkg-col">
                  <div className="col-section first-col-section">
                    <h1 className="header">Order List</h1>
                    {!customPkg &&
                      orderResult.orderDetails.map((order, index) => (
                        <div key={index} className="order-elem">
                          <p className="order-elem-header">
                            {order.invoiceTitle}
                          </p>
                          <p className="order-elem-price">
                            ${order.price * order.quantity}
                          </p>
                        </div>
                      ))}
                    {customPkg == true ? (
                      <Accordion
                        accordions={accordions}
                        customPkg={true}
                        pkgDetails={orderResult}
                      ></Accordion>
                    ) : null}
                  </div>
                  {extras.length && (
                    <div className="col-section addtopmargin">
                      {<h1 className="header">Add Extras</h1>}
                      {extras.map((extra, index) => (
                        <div key={index} className="order-elem">
                          <div className="checkbox-group">
                            <input
                              type="checkbox"
                              onChange={() =>
                                toggleExtrasToCart(
                                  extra.id,
                                  extras,
                                  orderResult
                                )
                              }
                            />
                            <label>{extra.title}</label>
                          </div>
                          <p className="order-elem-price">${extra.price}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="col-section addtopmargin">
                    <div className="justify-between">
                      <h1 className="header">Total:</h1>
                      <h1 className="header total-price">
                        ${totalPrice.toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="pkg-col twospan">
                  <GoogleReCaptchaProvider
                    reCaptchaKey="6LervbIqAAAAAHxZpWCPyFStpKIHg2TXkKccp57M"
                    container={{
                      element: "captcha-container",
                      parameters: {
                        badge: "bottomleft",
                        theme: "light",
                      },
                    }}
                  >
                    <OrderForm
                      productData={cartProducts}
                      setDidEmailSent={setDidEmailSent}
                      formData={formData}
                      setFormData={setFormData}
                      setInLoading={setInLoading}
                      isLoading={inLoading}
                    />
                  </GoogleReCaptchaProvider>
                </div>
              </div>
            ) : (
              <GoogleReCaptchaProvider
                reCaptchaKey="6LervbIqAAAAAHxZpWCPyFStpKIHg2TXkKccp57M"
                container={{
                  element: "captcha-container",
                  parameters: {
                    badge: "bottomleft",
                    theme: "light",
                  },
                }}
              >
                <VerifyMail
                  productData={cartProducts}
                  formData={formData}
                  didEmailSent={didEmailSent}
                  setOrderCompleted={setOrderCompleted}
                />
              </GoogleReCaptchaProvider>
            )
          ) : (
            <OrderRecieved name={formData.name} />
          )}
        </div>
      </div>
    </Main>
  );
}
