import React, {useState, useEffect} from 'react';
import VerificationInput from "react-verification-input";
import ClipLoader from './ClipLoader.jsx';

export default function VerifyMail({productData, formData, didEmailSent, setDidEmailSent}) {
    const [code,
        setCode] = useState('');
    const [error,
        setError] = useState('');
    const [timeLeft,
        setTimeLeft] = useState(120);
    const [timer,
        setTimer] = useState(null);
    const [loading,
        setLoading] = useState(false);

    useEffect(() => {
        if (didEmailSent && timeLeft === 120) {
            if (timer) {
                clearInterval(timer);
            }

            const newTimer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(newTimer);
                        setError('Code expired.');
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
    }, [
        didEmailSent, timeLeft === 120
    ]);

    const validateCode = (code) => {
        const isValid = /^\d{6}$/.test(code);
        return isValid;
    };

    const handleSubmit = async() => {
        if (!validateCode(code)) {
            setError('Please enter a valid 6-digit verification code.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.VITE_API_ORIGIN}/api/verification/verifyEmail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: formData.email, code: code, form: formData, products: productData})
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Success:', data);
            } else {
                const errorData = await response.json();
                if (errorData.process === "code_did_not_match") {
                    setError('Code did not match. Try again.');
                }
                if (errorData.process === "email_did_not_found") {
                    setError('Code expired.');
                }
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Request failed', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        setError((prev) => prev === "Code expired."
            ? "Code expired."
            : '');
    };

    const submitValidationRequest = async() => {
        try {
            setLoading(true);

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
                setError('');
                setCode('');
                setTimeLeft(120);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="box verify-box relative">
                <ClipLoader isLoading={loading} />
                <h1>Verify your email.</h1>
                <p>Please enter the verification code we sent to your email address. If you
                    didn't receive the email, check your spam folder or request a new code.
                </p>
                <div className='verificationinput-container'>
                    <VerificationInput
                        validChars={/^ \d * $ /}
                        classNames={{
                        container: "container",
                        character: "vi-character",
                        characterInactive: "character--inactive",
                        characterSelected: "vi-character--selected",
                        characterFilled: "vi-character--filled"
                    }}
                        onChange={handleCodeChange}
                        value={code}/>
                </div>

                {didEmailSent && timeLeft > 0 && (
                    <p className='code-timer'>You have {timeLeft} seconds remaining to verify your code.</p>
                )}

                <button className='button vi-submit order-button' onClick={handleSubmit}>
                    Submit
                </button>
                {error && <p className="validate-error">{error}{error == "Code expired." && <label>
                        <button onClick={() => submitValidationRequest()}>send again.</button>
                    </label>}</p>}
        </div>
    );
}
