import React, {useState, useEffect} from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const OrderForm = ({productData, setDidEmailSent, formData, setFormData, setInLoading}) => {

    const [errors,
        setErrors] = useState({});

    const handleChange = (e) => {
        setErrors({});
        const {name, value, type, checked} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox'
                ? checked
                : value
        }));
    };

    const handlePhoneChange = (value) => {
        setErrors({});
        setFormData((prevData) => ({
            ...prevData,
            phone: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
            return newErrors;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            return newErrors;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email format is invalid.";
            return newErrors;
        }

        if (!formData.country || formData.country === "") {
            newErrors.country = "Country is required.";
            return newErrors;
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
            return newErrors;
        } else if (!/^\+([1-9]{1,4})\d{1,14}$/.test(formData.phone.replace(/\s+/g, ''))) {
            newErrors.phone = "Phone format is invalid.";
            return newErrors;
        }

        if (!formData.industry || formData.industry === "") {
            newErrors.industry = "industry is required.";
            return newErrors;
        }

        if (!formData.websiteType || formData.websiteType === "") {
            newErrors.websiteType = "Website type is required.";
            return newErrors;
        } else if (formData.websiteType.length < 3) {
            newErrors.websiteType = "Website type should be at least 3 characters long.";
            return newErrors;
        }

        if (!formData.goal.trim()) {
            newErrors.goal = "Website's prior goal is required.";
            return newErrors;
        } else if (formData.goal.length < 10) {
            newErrors.goal = "Goal description should be at least 10 characters long.";
            return newErrors;
        }

        if (!formData.description.trim()) {
            newErrors.description = "Short description is required.";
            return newErrors;
        } else if (formData.description.length < 20) {
            newErrors.description = "Description should be at least 20 characters long.";
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

        if (field === "email") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (value && !emailPattern.test(value)) {
                errors.email = "Email format is invalid. Please enter a valid email address.";
            }
        } else if (field === "phone") {
            if (value && !/^\+([1-9]{1,4})\d{1,14}$/.test(value.replace(/\s+/g, ''))) {
                errors.phone = "Phone format is invalid.";
            }
        } else if (field === "websiteType") {
            if (value && value.length < 3) {
                errors.websiteType = "Website type should be at least 3 characters long.";
            }
        } else if (field === "goal") {
            if (value && value.length < 10) {
                errors.goal = "Goal description should be at least 10 characters long.";
            }
        } else if (field === "description") {
            if (value && value.length < 20) {
                errors.description = "Description should be at least 20 characters long.";
            }
        }

        return errors;
    };

    const handleBlur = (event) => {
        const {name, value} = event.target;
        const errors = validateField(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            ...errors
        }));
    };

    const submitValidationRequest = async() => {
        setInLoading(true);
        try {
            const response = await fetch(`${process.env.VITE_API_ORIGIN}/api/validation/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({form: formData, products: productData})
            });

            if (!response.ok) {
                throw new Error("Failed to validate order");
            }

            const data = await response.json();
            console.log(data);
            if (data.mailSent === true) {
                setDidEmailSent(true);
            }
            setInLoading(false)
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
        const firstErrorField = document.querySelector('.validate-error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [errors]);

    return (
        <form onSubmit={handleSubmit}>
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
                                value={formData.name}
                                onBlur={handleBlur}
                                onChange={handleChange}/> {errors.name && <p className="validate-error">{errors.name}</p>}
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
                                onBlur={handleBlur}
                                value={formData.email}
                                onChange={handleChange}/> {errors.email && <p className="validate-error">{errors.email}</p>}
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
                                onBlur={handleBlur}>
                                <option value="">Select</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                            </select>

                            {errors.country && <p className="validate-error">{errors.country}</p>}
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
                                onBlur={handleBlur}
                                defaultCountry="US"
                                international/> {errors.phone && <p className="validate-error">{errors.phone}</p>}
                        </div>
                    </div>
                    <div className="input-group">
                        <label>
                            industry<span className="red-star">*</span>
                        </label>
                        <div className="input-container">
                            <select
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                onBlur={handleBlur}>
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
                                <option value="Software Development">Software Development</option>
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
                                <option value="Events & Conferences">Events & Conferences</option>
                                <option value="Security">Security</option>
                            </select>
                            {errors.industry && <p className="validate-error">{errors.industry}</p>}
                        </div>
                    </div>
                    <div className="input-group">
                        <label>
                            Website Type<span className="red-star">*</span>
                        </label>
                        <div className="input-container">
                            <select
                                name="websiteType"
                                value={formData.websiteType}
                                onChange={handleChange}
                                onBlur={handleBlur}>
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

                            {errors.websiteType && <p className="validate-error">{errors.websiteType}</p>}
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
                                value={formData.goal}
                                onChange={handleChange}
                                onBlur={handleBlur}/> {errors.goal && <p className="validate-error">{errors.goal}</p>}
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
                                onBlur={handleBlur}/> {errors.description && <p className="validate-error">{errors.description}</p>}
                        </div>
                    </div>
                    <div className="input-group">
                        <label>
                            Additional Notes
                        </label>
                        <div className="input-container">
                            <textarea
                                name="additionalNote"
                                value={formData.additionalNote}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-section">
                <div className="order-button-container">
                    <div className="checkbox-group">
                        <input type="checkbox" onChange={handleChange} name="terms"/>
                        <label>
                            I have read and agree to the Terms of Service, Refund and Cancellation Policy,
                            and User License Agreement.
                            <span className="red-star">*</span>
                        </label>
                        {errors.terms && <p className="validate-error ml-1">{errors.terms}</p>}
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" onChange={handleChange} name="privacy"/>
                        <label>
                            I have read and agree to the Privacy Policy.
                            <span className="red-star">*</span>
                        </label>
                        {errors.privacy && <p className="validate-error ml-1">{errors.privacy}</p>}
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox"/>
                        <label>
                            I want to recieve commercial mails from Wabelz.
                        </label>
                    </div>
                    <button type="submit" className="button order-button">Place your Order</button>
                    <p className="star-desc">
                        <span className="red-star">*</span>Required Field
                    </p>
                    <p className="star-desc">
                        <span className="red-star">**</span>This is necessary for us to get an idea
                        about your website. We will contact you for more details.
                    </p>
                </div>
            </div>
        </form>
    );
};

export default OrderForm;
