import React, { useState, useEffect } from "react";
import VerificationInput from "react-verification-input";
import PuffInLoader from "./PuffInLoader.jsx";
import { PuffLoader } from "react-spinners";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export default function VerifyMail({
  productData,
  formData,
  didEmailSent,
  setOrderCompleted,
}) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mailCount, setMailCount] = useState(1);

  useEffect(() => {
    if (mailCount > 0 && timeLeft === 120) {
      if (timer) {
        clearInterval(timer);
      }

      const newTimer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(newTimer);
            setError("Code expired.");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [mailCount]);

  const validateCode = (code) => {
    const isValid = /^\d{6}$/.test(code);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateCode(code)) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.VITE_API_ORIGIN}/api/verification/verifyEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            code: code,
            form: formData,
            products: productData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Success:", data);
          setTimeLeft(0);
          setOrderCompleted(true);
        } else {
          alert(data.errors);
        }
      } else {
        const errorData = await response.json();
        if (errorData.process === "code_did_not_match") {
          setError("Code did not match. Try again.");
        }
        if (errorData.process === "too_much_requests") {
          setError("Too much requests. Try again 1 minute later.");
        }
        if (errorData.process === "email_did_not_found") {
          setError("Code expired.");
          setTimeLeft(0);
        }
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Request failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setError((prev) => (prev === "Code expired." ? "Code expired." : ""));
  };

  const submitValidationRequest = async () => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA did not loaded!");
      return;
    }
    setLoading(true);
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
          setLoading(false);
          alert(errorMessage);
        } else {
          if (data.mailSent === true) {
            if (data.mailSent === true) {
              setError("");
              setCode("");
              setTimeLeft(120);
              setMailCount((prev) => prev + 1);
            }
          }
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  return (
    <div className="box verify-box relative">
      <div id="captcha-container"></div>
      <PuffInLoader isLoading={loading} />
      <h1>Verify your email.</h1>
      <p>
        Please enter the verification code we sent to your email address. If you
        didn't receive the email, check your spam folder or request a new code.
      </p>
      <div className="verificationinput-container">
        <VerificationInput
          validChars={/^ \d * $ /}
          classNames={{
            container: "container",
            character: "vi-character",
            characterInactive: "character--inactive",
            characterSelected: "vi-character--selected",
            characterFilled: "vi-character--filled",
          }}
          onChange={handleCodeChange}
          value={code}
        />
      </div>

      {didEmailSent && timeLeft > 0 && (
        <p className="code-timer">
          You have {timeLeft} seconds remaining to verify your code.
        </p>
      )}

      <button className="button vi-submit order-button" onClick={handleSubmit}>
        {" "}
        {!loading ? "Submit" : <PuffLoader size={20} color="#000010" />}
      </button>
      {error && (
        <p className="validate-error">
          {error}
          {error == "Code expired." && (
            <label>
              <button onClick={() => submitValidationRequest()}>
                send again.
              </button>
            </label>
          )}
        </p>
      )}
    </div>
  );
}
