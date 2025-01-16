import Icon from "./Icon.jsx";

export default function OrderReceived({ name }) {
  return (
    <div className="box verify-box success">
      <h1>
        Hey, &nbsp;{name}.<br /> We received your order!
      </h1>
      <p>
        Thank you for choosing us! We will contact you shortly to ensure the
        best possible service. Your order details have been sent to your email.
        Stay tuned!
      </p>
      <Icon icon="faCircleCheck" type="solid" color="#45a834" size="3x" />
      <div className="dual-button-container">
        <a href="/contact" className="button button-primary">
          Contact us
        </a>
        <a href="/" className="button button-secondary">
          Back to home
        </a>
      </div>
    </div>
  );
}
