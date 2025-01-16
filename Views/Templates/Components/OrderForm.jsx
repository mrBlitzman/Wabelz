import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { countries } from "countries-list";
import iso3311a2 from "iso-3166-1-alpha-2";
import { PuffLoader } from "react-spinners";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const OrderForm = ({
  productData,
  setDidEmailSent,
  formData,
  setFormData,
  setInLoading,
  isLoading,
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setErrors({});
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (value) => {
    setErrors({});
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name and Surname cannot be empty.";
      return newErrors;
    } else if (
      formData.name.trim().length < 3 ||
      formData.name.trim().length > 50
    ) {
      newErrors.name = "Name and Surname must be between 3 and 50 characters.";
      return newErrors;
    } else if (
      !/^[a-zA-ZçÇşŞıİöÖüÜğĞ]+( [a-zA-ZçÇşŞıİöÖüÜğĞ]+)*$/.test(
        formData.name.trim()
      )
    ) {
      newErrors.name = "Name and Surname must contain only letters and spaces.";
      return newErrors;
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required.";
      return newErrors;
    } else if (formData.email.trim().length > 64) {
      newErrors.email = "Email must be 64 characters or fewer.";
      return newErrors;
    } else {
      const email = formData.email.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Email format is invalid.";
        return newErrors;
      }

      const [localPart] = email.split("@");
      if (localPart && localPart.length > 64) {
        newErrors.email =
          "Local part of the email must be 64 characters or fewer.";
        return newErrors;
      }

      const domainPart = email.split("@")[1];
      if (domainPart && domainPart.length > 255) {
        newErrors.email =
          "Domain part of the email must be 255 characters or fewer.";
        return newErrors;
      }

      if (/[\s<>()[\]{};:'"\\|,]/.test(email)) {
        newErrors.email = "Email contains invalid characters.";
        return newErrors;
      }
    }

    const country = formData.country || "";
    if (!country.trim()) {
      newErrors.country = "Country code is required.";
      return newErrors;
    } else if (!iso3311a2.getCountry(country)) {
      newErrors.country = "Invalid country code.";
      return newErrors;
    }

    if (!formData.phone || formData.phone.trim() === "") {
      newErrors.phone = "Phone number is required.";
      return newErrors;
    } else if (!formData.phone.startsWith("+")) {
      newErrors.phone = "Phone number must start with '+'.";
      return newErrors;
    } else if (
      !/^\+([1-9]{1,4})\d{4,14}$/.test(formData.phone.replace(/\s+/g, ""))
    ) {
      newErrors.phone =
        "Phone number format is invalid. It should include a country code and contain up to 15 digits.";
      return newErrors;
    }

    const industry = formData.industry || "";
    if (!industry.trim()) {
      newErrors.industry = "Industry is required.";
      return newErrors;
    } else {
      const validIndustries = [
        "Design",
        "Marketing",
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "Real Estate",
        "Retail",
        "Manufacturing",
        "Construction",
        "Transportation",
        "Telecommunications",
        "Energy",
        "Entertainment",
        "Media",
        "Agriculture",
        "Hospitality",
        "Food & Beverage",
        "Nonprofit",
        "Legal",
        "Consulting",
        "Software Development",
        "Tourism",
        "Automotive",
        "Insurance",
        "Pharmaceuticals",
        "Aerospace",
        "Sports",
        "Mining",
        "Public Sector",
        "Fashion",
        "Music",
        "Publishing",
        "Gaming",
        "Charity",
        "Art & Culture",
        "Retail & E-commerce",
        "Business Services",
        "Events & Conferences",
        "Security",
      ];
      if (!validIndustries.includes(industry)) {
        newErrors.industry =
          "Invalid industry. Choose a valid one from options.";
        return newErrors;
      }
    }

    const websiteType = formData.websiteType || "";
    if (!websiteType.trim()) {
      newErrors.websiteType = "Website type is required.";
      return newErrors;
    } else {
      const validWebsiteTypes = [
        "E-commerce",
        "Blog",
        "Portfolio",
        "Corporate",
        "Landing",
        "Business",
        "Personal",
        "Educational",
        "Nonprofit",
        "Community",
        "News",
        "Social",
        "Media",
        "Service",
        "Event",
        "Product",
        "Entertainment",
        "Directory",
        "Resource",
        "Agency",
        "Marketplace",
        "Government",
        "Hospitality",
        "Real Estate",
        "Health",
        "Technology",
        "Creative",
        "Consulting",
        "Travel",
        "Subscription",
        "Fitness",
        "Support",
        "Restaurant",
        "Online Course",
        "Gallery",
        "Forum",
        "Podcast",
        "News Portal",
        "Digital",
        "Platform",
        "Review",
        "Crowdfunding",
        "Survey",
        "App",
      ];
      if (!validWebsiteTypes.includes(websiteType)) {
        newErrors.websiteType =
          "Invalid website type. Choose a valid one from options.";
        return newErrors;
      }
    }

    const goal = formData.goal || "";
    if (!goal.trim()) {
      newErrors.goal = "Goal is required.";
      return newErrors;
    } else if (goal.length < 5 || goal.length > 50) {
      newErrors.goal = "Goal must be between 5 and 50 characters.";
      return newErrors;
    } else if (
      !/^[a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+( [a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+)*$/.test(
        goal
      )
    ) {
      newErrors.goal =
        "Goal must contain only letters, spaces, and basic punctuation.";
      return newErrors;
    }

    const description = formData.description || "";
    if (!description.trim()) {
      newErrors.description = "Description is required.";
      return newErrors;
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
      return newErrors;
    } else if (description.length > 100) {
      newErrors.description =
        "Description must be no more than 100 characters.";
      return newErrors;
    } else if (
      !/^[a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+( [a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+)*$/.test(
        description
      )
    ) {
      newErrors.description =
        "Description must contain only letters, spaces, and basic punctuation.";
      return newErrors;
    }

    if (formData.additionalNote === "") {
    } else if (formData.additionalNote.length > 200) {
      newErrors.additionalNote =
        "Additional note must be shorter than 200 characters.";
      return newErrors;
    } else if (
      !/^[a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+( [a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+)*$/.test(
        formData.additionalNote
      )
    ) {
      newErrors.additionalNote = "Additional note contains invalid characters.";
      return newErrors;
    }

    if (!formData.terms) {
      newErrors.terms = "Terms must be accepted.";
      return newErrors;
    }

    if (!formData.privacy) {
      newErrors.privacy = "Privacy Policy must be accepted.";
      return newErrors;
    }

    return newErrors;
  };

  const validateField = (field, value) => {
    const errors = {};

    if (field === "name") {
      if (!value || value.trim() === "") {
        errors.name = "Name and Surname cannot be empty.";
      } else if (value.trim().length < 3 || value.trim().length > 50) {
        errors.name = "Name and Surname must be between 3 and 50 characters.";
      } else if (
        !/^[a-zA-ZçÇşŞıİöÖüÜğĞ]+( [a-zA-ZçÇşŞıİöÖüÜğĞ]+)*$/.test(value.trim())
      ) {
        errors.name = "Name and Surname must contain only letters and spaces.";
      }
    }

    if (field === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value || value.trim() === "") {
        errors.email = "Email is required.";
      } else if (value.trim().length > 64) {
        errors.email = "Email must be 64 characters or fewer.";
      } else if (!emailPattern.test(value.trim())) {
        errors.email = "Email format is invalid.";
      } else {
        const [localPart] = value.split("@");
        if (localPart && localPart.length > 64) {
          errors.email =
            "Local part of the email must be 64 characters or fewer.";
        }

        const domainPart = value.split("@")[1];
        if (domainPart && domainPart.length > 255) {
          errors.email =
            "Domain part of the email must be 255 characters or fewer.";
        }

        if (/[\s<>()[\]{};:'"\\|,]/.test(value)) {
          errors.email = "Email contains invalid characters.";
        }
      }
    }

    if (field === "country") {
      if (!value.trim()) {
        errors.country = "Country code is required.";
      } else if (!iso3311a2.getCountry(value)) {
        errors.country = "Invalid country code.";
      }
    }

    if (field === "phone") {
      if (!value || value.trim() === "") {
        errors.phone = "Phone number is required.";
      } else if (!value.startsWith("+")) {
        errors.phone = "Phone number must start with '+'.";
      } else if (!/^\+([1-9]{1,4})\d{4,14}$/.test(value.replace(/\s+/g, ""))) {
        errors.phone =
          "Phone number format is invalid. It should include a country code and contain up to 15 digits.";
      }
    }

    if (field === "industry") {
      const validIndustries = [
        "Design",
        "Marketing",
        "Technology",
        "Finance",
        "Healthcare",
        "Education",
        "Real Estate",
        "Retail",
        "Manufacturing",
        "Construction",
        "Transportation",
        "Telecommunications",
        "Energy",
        "Entertainment",
        "Media",
        "Agriculture",
        "Hospitality",
        "Food & Beverage",
        "Nonprofit",
        "Legal",
        "Consulting",
        "Software Development",
        "Tourism",
        "Automotive",
        "Insurance",
        "Pharmaceuticals",
        "Aerospace",
        "Sports",
        "Mining",
        "Public Sector",
        "Fashion",
        "Music",
        "Publishing",
        "Gaming",
        "Charity",
        "Art & Culture",
        "Retail & E-commerce",
        "Business Services",
        "Events & Conferences",
        "Security",
      ];
      if (!value.trim()) {
        errors.industry = "Industry is required.";
      } else if (!validIndustries.includes(value)) {
        errors.industry = "Invalid industry. Choose a valid one from options.";
      }
    }

    if (field === "websiteType") {
      if (!value || value.trim() === "") {
        errors.websiteType = "Website type is required.";
      } else {
        const validWebsiteTypes = [
          "E-commerce",
          "Blog",
          "Portfolio",
          "Corporate",
          "Landing",
          "Business",
          "Personal",
          "Educational",
          "Nonprofit",
          "Community",
          "News",
          "Social",
          "Media",
          "Service",
          "Event",
          "Product",
          "Entertainment",
          "Directory",
          "Resource",
          "Agency",
          "Marketplace",
          "Government",
          "Hospitality",
          "Real Estate",
          "Health",
          "Technology",
          "Creative",
          "Consulting",
          "Travel",
          "Subscription",
          "Fitness",
          "Support",
          "Restaurant",
          "Online Course",
          "Gallery",
          "Forum",
          "Podcast",
          "News Portal",
          "Digital",
          "Platform",
          "Review",
          "Crowdfunding",
          "Survey",
          "App",
        ];
        if (!validWebsiteTypes.includes(value)) {
          errors.websiteType =
            "Invalid website type. Choose a valid one from options.";
        }
      }
    }

    if (field === "goal") {
      if (!value.trim()) {
        errors.goal = "Goal is required.";
      } else if (value.length < 5 || value.length > 50) {
        errors.goal = "Goal must be between 5 and 50 characters.";
      } else if (
        !/^[a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+( [a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+)*$/.test(
          value
        )
      ) {
        errors.goal =
          "Goal must contain only letters, spaces, and basic punctuation.";
      }
    }

    if (field === "description") {
      if (!value.trim()) {
        errors.description = "Description is required.";
      } else if (value.length < 10) {
        errors.description = "Description must be at least 10 characters.";
      } else if (value.length > 100) {
        errors.description = "Description must be no more than 100 characters.";
      } else if (
        !/^[a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+( [a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+)*$/.test(
          value
        )
      ) {
        errors.description =
          "Description must contain only letters, spaces, and basic punctuation.";
      }
    }

    if (field === "additionalNote") {
      if (value.length > 200) {
        errors.additionalNote =
          "Additional note must be shorter than 200 characters.";
      } else if (
        !/^[a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+( [a-zA-ZçÇşŞıİöÖüÜğĞ.,?!'";:()\-]+)*$/.test(
          value
        ) &&
        value.length > 0
      ) {
        errors.additionalNote =
          "Additional note must contain only letters, spaces, and basic punctuation.";
      }
    }

    if (field === "terms" && !value) {
      errors.terms = "Terms must be accepted.";
    }

    if (field === "privacy" && !value) {
      errors.privacy = "Privacy Policy must be accepted.";
    }

    return errors;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const errors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const submitValidationRequest = async () => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA did not loaded!");
      return;
    }
    setInLoading(true);
    try {
      const token = await executeRecaptcha("submitValidationRequest");
      const response = await fetch(
        `${process.env.VITE_API_ORIGIN}/api/validation/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: formData,
            products: productData,
            captcha: token,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to validate order");
      } else {
        const data = await response.json();
        if (!data.success) {
          let errorMessage = "";
          const errors = data.errors;
          for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
              errorMessage += `${errors[field]}\n`;
            }
          }
          setInLoading(false);
          alert(errorMessage);
        } else {
          if (data.mailSent === true) {
            setDidEmailSent(true);
          }
          setInLoading(false);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setInLoading(false);
    }
  };

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

  const countryList = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div id="captcha-container"></div>
      <div className="col-section">
        <h1 className="header">Order Form</h1>
        <div className="triple-input-container">
          <div className="input-group">
            <label>
              Name & Surname<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <input
                type="text"
                name="name"
                autoComplete="off"
                value={formData.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />{" "}
              {errors.name && <p className="validate-error">{errors.name}</p>}
            </div>
          </div>
          <div className="input-group">
            <label>
              Mail Address<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                autoComplete="off"
                onBlur={handleBlur}
                value={formData.email}
                onChange={handleChange}
              />{" "}
              {errors.email && <p className="validate-error">{errors.email}</p>}
            </div>
          </div>
          <div className="input-group">
            <label>
              Country<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                autoComplete="off"
                onBlur={handleBlur}
              >
                <option value="">Select</option>
                {countryList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>

              {errors.country && (
                <p className="validate-error">{errors.country}</p>
              )}
            </div>
          </div>
          <div className="input-group">
            <label>
              Phone Number<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <PhoneInput
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handlePhoneChange}
                name="phone"
                autoComplete="off"
                onBlur={handleBlur}
                defaultCountry="US"
                international
              />{" "}
              {errors.phone && <p className="validate-error">{errors.phone}</p>}
            </div>
          </div>
          <div className="input-group">
            <label>
              industry<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <select
                name="industry"
                autoComplete="off"
                value={formData.industry}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Construction">Construction</option>
                <option value="Transportation">Transportation</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Energy">Energy</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Media">Media</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Nonprofit">Nonprofit</option>
                <option value="Legal">Legal</option>
                <option value="Consulting">Consulting</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Tourism">Tourism</option>
                <option value="Automotive">Automotive</option>
                <option value="Insurance">Insurance</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Aerospace">Aerospace</option>
                <option value="Sports">Sports</option>
                <option value="Mining">Mining</option>
                <option value="Public Sector">Public Sector</option>
                <option value="Fashion">Fashion</option>
                <option value="Music">Music</option>
                <option value="Publishing">Publishing</option>
                <option value="Gaming">Gaming</option>
                <option value="Charity">Charity</option>
                <option value="Art & Culture">Art & Culture</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Business Services">Business Services</option>
                <option value="Events & Conferences">
                  Events & Conferences
                </option>
                <option value="Security">Security</option>
              </select>
              {errors.industry && (
                <p className="validate-error">{errors.industry}</p>
              )}
            </div>
          </div>
          <div className="input-group">
            <label>
              Website Type<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <select
                name="websiteType"
                autoComplete="off"
                value={formData.websiteType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Blog">Blog</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Corporate">Corporate</option>
                <option value="Landing">Landing</option>
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
                <option value="Educational">Educational</option>
                <option value="Nonprofit">Nonprofit</option>
                <option value="Community">Community</option>
                <option value="News">News</option>
                <option value="Social">Social</option>
                <option value="Media">Media</option>
                <option value="Service">Service</option>
                <option value="Event">Event</option>
                <option value="Product">Product</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Directory">Directory</option>
                <option value="Resource">Resource</option>
                <option value="Agency">Agency</option>
                <option value="Marketplace">Marketplace</option>
                <option value="Government">Government</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
                <option value="Creative">Creative</option>
                <option value="Consulting">Consulting</option>
                <option value="Travel">Travel</option>
                <option value="Subscription">Subscription</option>
                <option value="Fitness">Fitness</option>
                <option value="Support">Support</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Online Course">Online Course</option>
                <option value="Gallery">Gallery</option>
                <option value="Forum">Forum</option>
                <option value="Podcast">Podcast</option>
                <option value="News Portal">News Portal</option>
                <option value="Digital">Digital</option>
                <option value="Platform">Platform</option>
                <option value="Review">Review</option>
                <option value="Crowdfunding">Crowdfunding</option>
                <option value="Survey">Survey</option>
                <option value="App">App</option>
              </select>

              {errors.websiteType && (
                <p className="validate-error">{errors.websiteType}</p>
              )}
            </div>
          </div>
          <div className="input-group">
            <label>
              Website's Prior Goal<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <input
                type="text"
                name="goal"
                autoComplete="off"
                value={formData.goal}
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
              {errors.goal && <p className="validate-error">{errors.goal}</p>}
            </div>
          </div>
          <div className="input-group">
            <label>
              Short Description<span className="red-star">*</span>
            </label>
            <div className="input-container">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
              {errors.description && (
                <p className="validate-error">{errors.description}</p>
              )}
            </div>
          </div>
          <div className="input-group">
            <label>Additional Notes</label>
            <div className="input-container">
              <textarea
                name="additionalNote"
                autoComplete="off"
                value={formData.additionalNote}
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
              {errors.additionalNote && (
                <p className="validate-error">{errors.additionalNote}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-section">
        <div className="order-button-container">
          <div className="checkbox-group">
            <input type="checkbox" onChange={handleChange} name="terms" />
            <label>
              I have read and agree to the{" "}
              <a className="agreement-link" href="/legal/terms-of-service">
                Terms of Service
              </a>
              ,{" "}
              <a
                className="agreement-link"
                href="/legal/refund-and-cancellation-policy"
              >
                Refund and Cancellation Policy
              </a>
              , and{" "}
              <a
                className="agreement-link"
                href="/legal/user-license-agreement"
              >
                User License Agreement
              </a>
              .<span className="red-star">*</span>
            </label>
            {errors.terms && (
              <p className="validate-error ml-1">{errors.terms}</p>
            )}
          </div>
          <div className="checkbox-group">
            <input type="checkbox" onChange={handleChange} name="privacy" />
            <label>
              I have read and agree to the{" "}
              <a className="agreement-link" href="/legal/privacy-policy">
                Privacy Policy
              </a>
              .<span className="red-star">*</span>
            </label>
            {errors.privacy && (
              <p className="validate-error ml-1">{errors.privacy}</p>
            )}
          </div>
          <div className="checkbox-group">
            <input type="checkbox" onChange={handleChange} name="emailList" />
            <label>I want to recieve commercial mails from Wabelz.</label>
          </div>
          <button type="submit" className="button order-button">
            {!isLoading ? (
              "Place your Order"
            ) : (
              <PuffLoader size={25} color="#000010" />
            )}
          </button>
          <p className="star-desc">
            <span className="red-star">*</span>Required Field
          </p>
          <p className="star-desc">
            <span className="red-star">**</span>This is necessary for us to get
            an idea about your website. We will contact you for more details.
          </p>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
