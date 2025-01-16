import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function CustomPackageForm({ quantities, elements }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [customPackage, setCustomPackage] = useState({
    pageNumber: undefined,
    revisionNumber: undefined,
    designFeatures: [],
    functionalFeatures: [],
    multilingualSupport: undefined,
    maintenanceDuration: undefined,
    maintenanceType: undefined,
  });

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (customPackage.pageNumber) {
      totalPrice += quantities.pages.price * customPackage.pageNumber;
    }

    if (customPackage.revisionNumber) {
      totalPrice +=
        customPackage.revisionNumber === "unlimited"
          ? elements["unlimited-revision"].price
          : quantities.revisions.price * customPackage.revisionNumber;
    }

    if (
      customPackage.designFeatures &&
      customPackage.designFeatures.length > 0
    ) {
      customPackage.designFeatures.forEach((item) => {
        totalPrice += elements[item].price;
      });
    }

    if (
      customPackage.functionalFeatures &&
      customPackage.functionalFeatures.length > 0
    ) {
      customPackage.functionalFeatures.forEach((item) => {
        totalPrice += elements[item].price;
      });
    }

    if (customPackage.multilingualSupport) {
      totalPrice +=
        customPackage.multilingualSupport === "more"
          ? elements["more-multilingual-support"].price
          : quantities["multilingual-support"].price *
            customPackage.multilingualSupport;
    }

    if (customPackage.maintenanceDuration) {
      totalPrice +=
        quantities["maintenance-duration"].price *
        customPackage.maintenanceDuration;
    }

    if (customPackage.maintenanceType) {
      totalPrice +=
        customPackage.maintenanceType === "standard-maintenance"
          ? elements["standard-maintenance"].price
          : elements["priority-maintenance"].price;
    }

    return totalPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    const pageNumber = customPackage.pageNumber || "";
    if (!pageNumber.trim()) {
      newErrors.pageNumber = "Page number is required.";
      return newErrors;
    } else {
      const validPageNumbers = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "15",
        "20",
        "25",
        "30",
      ];
      if (!validPageNumbers.includes(pageNumber)) {
        newErrors.pageNumber =
          "Invalid page number. Choose a valid one from options.";
        return newErrors;
      }
    }

    const revisionNumber = customPackage.revisionNumber || "";
    if (!revisionNumber.trim()) {
      newErrors.revisionNumber = "Revision number is required.";
      return newErrors;
    } else {
      const validRevisionNumbers = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "15",
        "20",
        "unlimited",
      ];
      if (!validRevisionNumbers.includes(revisionNumber)) {
        newErrors.revisionNumber =
          "Invalid revision number. Choose a valid one from options.";
        return newErrors;
      }
    }

    const designFeatures = customPackage.designFeatures || "";
    const validDesignFeatures = [
      "advanced-animations",
      "video-background-integration",
      "dark-light-mode",
      "photo-slideshows",
      "logo-design",
    ];
    designFeatures.map((item) => {
      if (!validDesignFeatures.includes(item)) {
        newErrors.designFeatures =
          "Invalid design feature. Choose a valid one.";
        return newErrors;
      }
    });

    const functionalFeatures = customPackage.functionalFeatures || "";
    const validFunctionalFeatures = [
      "live-chat-integration",
      "ecommerce-functionality",
      "product-management",
      "cart-integration",
      "login-register",
      "blog-management",
      "admin-panel",
    ];
    functionalFeatures.map((item) => {
      if (!validFunctionalFeatures.includes(item)) {
        newErrors.functionalFeatures =
          "Invalid functional feature. Choose a valid one.";
        return newErrors;
      }
    });

    const multilingualSupport = customPackage.multilingualSupport || "";
    const validMultilingualSupport = ["", "2", "3", "4", "more"];
    if (!validMultilingualSupport.includes(multilingualSupport)) {
      newErrors.multilingualSupport =
        "Invalid multilingual support. Choose a valid one from options.";
      return newErrors;
    }

    const maintenanceDuration = customPackage.maintenanceDuration || "";
    const validMaintenanceDuration = ["1", "2", "3", "6", "12"];
    if (!maintenanceDuration.trim()) {
      newErrors.maintenanceDuration = "Maintenance duration is required.";
      return newErrors;
    } else {
      if (!validMaintenanceDuration.includes(maintenanceDuration)) {
        newErrors.maintenanceDuration =
          "Invalid maintenance duration. Choose a valid one from options.";
        return newErrors;
      }
    }

    const maintenanceType = customPackage.maintenanceType || "";

    if (!maintenanceType.trim()) {
      newErrors.maintenanceType = "Maintenance type is required.";
      return newErrors;
    } else {
      const validMaintenanceType = [
        "standard-maintenance",
        "priority-maintenance",
      ];
      if (!validMaintenanceType.includes(maintenanceType)) {
        newErrors.maintenanceType =
          "Invalid maintenance type. Choose a valid one from options.";
        return newErrors;
      }
    }

    return newErrors;
  };

  const submitValidationRequest = async () => {
    try {
      const response = await fetch(
        `${process.env.VITE_API_ORIGIN}/api/info/items`
      );
      const data = await response.json();

      const {
        pageNumber,
        revisionNumber,
        designFeatures,
        functionalFeatures,
        multilingualSupport,
        maintenanceDuration,
        maintenanceType,
      } = customPackage;

      const quantitiesArray = [];

      if (pageNumber !== undefined) {
        quantitiesArray.push({
          id: data.quantities.pages.id,
          quantity: Number(pageNumber),
        });
      }
      if (revisionNumber !== undefined && revisionNumber !== "unlimited") {
        quantitiesArray.push({
          id: data.quantities.revisions.id,
          quantity: Number(revisionNumber),
        });
      } else if (revisionNumber === "unlimited") {
        quantitiesArray.push({
          id: data.elements["unlimited-revision"].id,
          quantity: 1,
        });
      }
      if (multilingualSupport !== undefined && multilingualSupport !== "more") {
        quantitiesArray.push({
          id: data.quantities["multilingual-support"].id,
          quantity: Number(multilingualSupport),
        });
      } else if (multilingualSupport === "more") {
        quantitiesArray.push({
          id: data.elements["more-multilingual-support"].id,
          quantity: 1,
        });
      }
      if (maintenanceDuration !== undefined) {
        quantitiesArray.push({
          id: data.quantities["maintenance-duration"].id,
          quantity: Number(maintenanceDuration),
        });
      }

      [...designFeatures, ...functionalFeatures].forEach((featureKey) => {
        const feature = data.elements[featureKey];
        if (feature) {
          quantitiesArray.push({ id: feature.id, quantity: 1 });
        }
      });

      if (maintenanceType !== undefined) {
        const maintenanceFeature = data.elements[maintenanceType];
        if (maintenanceFeature) {
          quantitiesArray.push({ id: maintenanceFeature.id, quantity: 1 });
        }
      }

      console.log("Prepared Array:");

      navigate("/order", {
        state: { products: quantitiesArray, extrasData: [], customPkg: true },
      });
    } catch (error) {
      console.error("Error submitting validation request:", error);
    }
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      submitValidationRequest();
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const firstErrorField = document.querySelector(".validate-error");
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);

  const handleChange = (e) => {
    setErrors({});
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [group, key] = name.split(".");
      setCustomPackage((prevData) => {
        const currentArray = prevData[group] || [];
        if (checked && !currentArray.includes(key)) {
          return {
            ...prevData,
            [group]: [...currentArray, key],
          };
        }
        return {
          ...prevData,
          [group]: currentArray.filter((item) => item !== key),
        };
      });
    } else {
      setCustomPackage((prevData) => ({
        ...prevData,
        [name]:
          type === "radio" ? value : type === "checkbox" ? checked : value,
      }));
    }
  };

  const itemTitles = {
    "advanced-animations": "Advanced Animations",
    "dark-light-mode": "Dark-Light Mode",
    "logo-design": "Logo Design",
    "video-background-integration": "Video & Background Integration",
    "photo-slideshows": "Photo Slideshows",
    "live-chat-integration": "Live Chat Integration",
    "product-management": "Product Management",
    "login-register": "Login & Register",
    "admin-panel": "Admin Panel",
    "ecommerce-functionality": "E-commerce Functionality",
    "cart-integration": "Cart Integration",
    "blog-management": "Blog Management",
    "standard-maintenance": "Standard Maintenance",
    "priority-maintenance": "Priority Maintenance",
    "unlimited-revision": "Unlimited Revision",
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="packages-container"
      >
        <form onSubmit={handleSubmit} className="custom-pkg">
          <div className="pkg-col">
            <div className="col-section first-col-section">
              <h1 className="header">Website Requirements</h1>
              <div className="input-group">
                <label htmlFor="page-number">
                  Number of Pages<span className="red-star">*</span>
                </label>
                <div className="input-container">
                  <select
                    onChange={handleChange}
                    name="pageNumber"
                    id="page-number"
                  >
                    <option value="">Select</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                    {[...Array(4)].map((_, i) => (
                      <option key={15 + i * 5} value={15 + i * 5}>
                        {15 + i * 5}
                      </option>
                    ))}
                  </select>
                  {errors.pageNumber && (
                    <p className="validate-error">{errors.pageNumber}</p>
                  )}
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="revision-number">
                  Number of Revisions<span className="red-star">*</span>
                </label>
                <div className="input-container">
                  <select
                    onChange={handleChange}
                    name="revisionNumber"
                    id="revision-number"
                  >
                    <option value="">Select</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                    {[...Array(2)].map((_, i) => (
                      <option key={15 + i * 5} value={15 + i * 5}>
                        {15 + i * 5}
                      </option>
                    ))}
                    <option value="unlimited">Unlimited</option>
                  </select>
                  {errors.revisionNumber && (
                    <p className="validate-error">{errors.revisionNumber}</p>
                  )}
                </div>
              </div>
              <div className="input-group">
                <label>Design Features</label>
                <div className="checkbox-container">
                  <div className="checkbox-group">
                    <input
                      name="designFeatures.advanced-animations"
                      onChange={handleChange}
                      type="checkbox"
                      id="advanced-animations"
                    />
                    <label htmlFor="advanced-animations">
                      Advanced Animations
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="designFeatures.video-background-integration"
                      onChange={handleChange}
                      type="checkbox"
                      id="video-background-integration"
                    />
                    <label htmlFor="video-background-integration">
                      Video & Background Integration
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="designFeatures.dark-light-mode"
                      onChange={handleChange}
                      type="checkbox"
                      id="dark-light-mode"
                    />
                    <label htmlFor="dark-light-mode">Dark-Light Mode</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="designFeatures.photo-slideshows"
                      onChange={handleChange}
                      type="checkbox"
                      id="photo-slideshows"
                    />
                    <label htmlFor="photo-slideshows">Photo Slideshows</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="designFeatures.logo-design"
                      onChange={handleChange}
                      type="checkbox"
                      id="logo-design"
                    />
                    <label htmlFor="logo-design">Logo Design</label>
                  </div>
                </div>
                {errors.designFeatures && (
                  <p className="validate-error">{errors.designFeatures}</p>
                )}
              </div>
            </div>
            <div className="col-section incolumn-section">
              <h1 className="header">Technical Requirements</h1>
              <div className="input-group">
                <label htmlFor="maintenan-ceduration">
                  Maintenance Duration<span className="red-star">*</span>
                </label>
                <div className="input-container">
                  <select
                    onChange={handleChange}
                    name="maintenanceDuration"
                    id="maintenance-duration"
                  >
                    <option value="">Select</option>
                    <option value="1">1 Month</option>
                    <option value="2">2 Month</option>
                    <option value="3">3 Month</option>
                    <option value="6">6 Month</option>
                    <option value="12">1 Year</option>
                  </select>{" "}
                  {errors.maintenanceDuration && (
                    <p className="validate-error">
                      {errors.maintenanceDuration}
                    </p>
                  )}
                </div>
              </div>
              <div className="input-group">
                <label>
                  Maintenance Type<span className="red-star">*</span>
                </label>
                <div className="radio-container">
                  <div className="radio-group">
                    <input
                      onChange={handleChange}
                      type="radio"
                      name="maintenanceType"
                      value="standard-maintenance"
                    />
                    <label htmlFor="standard-maintenance">
                      Standard Maintenance
                    </label>
                  </div>
                  <div className="radio-group">
                    <input
                      onChange={handleChange}
                      type="radio"
                      name="maintenanceType"
                      value="priority-maintenance"
                    />
                    <label htmlFor="priority-maintenance">
                      Priority Maintenance
                    </label>
                  </div>
                  {errors.maintenanceType && (
                    <p className="validate-error">{errors.maintenanceType}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pkg-col">
            <div className="col-section">
              <h1 className="header">Functionalities</h1>
              <div className="input-group">
                <label>Select the Features You Need</label>
                <div className="checkbox-container">
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.live-chat-integration"
                      onChange={handleChange}
                      type="checkbox"
                      id="live-chat-integration"
                    />
                    <label htmlFor="live-chat-integration">
                      Live Chat Integration
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.ecommerce-functionality"
                      onChange={handleChange}
                      type="checkbox"
                      id="ecommerce-functionality"
                    />
                    <label htmlFor="ecommerce-functionality">
                      E-commerce Functionality
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.product-management"
                      onChange={handleChange}
                      type="checkbox"
                      id="product-management"
                    />
                    <label htmlFor="product-management">
                      Product Management
                    </label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.cart-integration"
                      onChange={handleChange}
                      type="checkbox"
                      id="cart-integration"
                    />
                    <label htmlFor="cart-integration">Cart Integration</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.login-register"
                      onChange={handleChange}
                      type="checkbox"
                      id="login-register"
                    />
                    <label htmlFor="login-register">Login & Register</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.blog-management"
                      onChange={handleChange}
                      type="checkbox"
                      id="blog-management"
                    />
                    <label htmlFor="blog-management">Blog Management</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      name="functionalFeatures.admin-panel"
                      onChange={handleChange}
                      type="checkbox"
                      id="admin-panel"
                    />
                    <label htmlFor="admin-panel">Admin Panel</label>
                  </div>
                </div>
                {errors.functionalFeatures && (
                  <p className="validate-error">{errors.functionalFeatures}</p>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="multilingual-support">
                  Multilingual Support
                </label>
                <div className="input-container">
                  <select
                    onChange={handleChange}
                    name="multilingualSupport"
                    id="multilingual-support"
                  >
                    <option value="">None</option>
                    <option value="2">2 Languages</option>
                    <option value="3">3 Languages</option>
                    <option value="4">4 Languages</option>
                    <option value="more">4+ Languages</option>
                  </select>{" "}
                  {errors.multilingualSupport && (
                    <p className="validate-error">
                      {errors.multilingualSupport}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pkg-col last-col">
            <div className="col-section">
              <h1 className="header">Your Package</h1>
              <h2 className="custom-pkg-price">${calculateTotalPrice()}</h2>
              <ul className="pkg-contents-overall">
                {customPackage.pageNumber && (
                  <li>
                    {customPackage.pageNumber +
                      " Page" +
                      (customPackage.pageNumber > 1 ? "s" : "")}
                    <span className="inline-price">
                      ${quantities.pages.price * customPackage.pageNumber}
                    </span>
                  </li>
                )}
                {customPackage.revisionNumber && (
                  <li>
                    {" "}
                    {customPackage.revisionNumber === "unlimited"
                      ? "Unlimited revision"
                      : customPackage.revisionNumber +
                        " Revision" +
                        (customPackage.revisionNumber > 1 ? "s" : "")}{" "}
                    <span className="inline-price">
                      {" "}
                      $
                      {customPackage.revisionNumber === "unlimited"
                        ? elements["unlimited-revision"].price
                        : quantities.revisions.price *
                          customPackage.revisionNumber}{" "}
                    </span>{" "}
                  </li>
                )}
                {customPackage.designFeatures &&
                  customPackage.designFeatures.length > 0 &&
                  customPackage.designFeatures.map((item) => {
                    return (
                      <li key={item}>
                        {itemTitles[item]}
                        <span className="inline-price">
                          ${elements[item].price}
                        </span>
                      </li>
                    );
                  })}
                {customPackage.maintenanceDuration && (
                  <li>
                    {" "}
                    {customPackage.maintenanceDuration === "12"
                      ? "1 Year Maintenance"
                      : customPackage.maintenanceDuration +
                        " Month Maintenance"}{" "}
                    <span className="inline-price">
                      {" "}
                      $
                      {quantities["maintenance-duration"].price *
                        customPackage.maintenanceDuration}{" "}
                    </span>{" "}
                  </li>
                )}
                {customPackage.maintenanceType && (
                  <li>
                    {" "}
                    {customPackage.maintenanceType === "standard-maintenance"
                      ? "Standard Maintenance"
                      : "Priority Maintenance"}{" "}
                    <span className="inline-price">
                      {" "}
                      $
                      {customPackage.maintenanceType === "standard-maintenance"
                        ? elements["standard-maintenance"].price
                        : elements["priority-maintenance"].price}{" "}
                    </span>{" "}
                  </li>
                )}
                {customPackage.functionalFeatures &&
                  customPackage.functionalFeatures.length > 0 &&
                  customPackage.functionalFeatures.map((item) => {
                    return (
                      <li key={item}>
                        {itemTitles[item]}
                        <span className="inline-price">
                          ${elements[item].price}
                        </span>
                      </li>
                    );
                  })}
                {customPackage.multilingualSupport && (
                  <li>
                    {" "}
                    {customPackage.multilingualSupport === "more"
                      ? "4+ Languages Multilingual Support"
                      : customPackage.multilingualSupport +
                        " Language" +
                        (customPackage.multilingualSupport > 1 ? "s" : "") +
                        " Multilingual Support"}{" "}
                    <span className="inline-price">
                      {" "}
                      $
                      {customPackage.multilingualSupport === "more"
                        ? elements["more-multilingual-support"].price
                        : quantities["multilingual-support"].price *
                          customPackage.multilingualSupport}{" "}
                    </span>{" "}
                  </li>
                )}
              </ul>
            </div>
            <div className="col-section">
              <button type="submit" className="checkout-button">
                Order Now
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
}
