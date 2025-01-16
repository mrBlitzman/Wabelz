import Icon from "./Icon.jsx";
import useMediaQuery from "../../Assets/Scripts/Hooks/useMediaQuery.js";

export default function WhatsappBtn() {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <div>
      <a
        className="whatsapp-fixed"
        href="https://wa.me/905362469085"
        target="_blank"
        rel="noreferrer"
      >
        <span className="wp-tooltip">Have questions? We're on WhatsApp!</span>
        <Icon
          icon="faWhatsapp"
          type="brand"
          color="white"
          size={isSmallScreen ? "2xl" : "4x"}
          marginRight="0"
          bgColor="transparent"
        />
      </a>
    </div>
  );
}
