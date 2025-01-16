import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

export default function Icon({
  icon,
  type = "solid",
  color = "black",
  bgColor = "white",
  className,
  size = "lg",
  marginRight = "10px",
}) {
  const iconType =
    type === "solid"
      ? solidIcons
      : type === "regular"
      ? regularIcons
      : type === "brand"
      ? brandIcons
      : solidIcons;

  const selectedIcon = iconType[icon];

  if (!selectedIcon) {
    console.error(`Icon "${icon}" did not found.`);
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: "50%",
        display: "inline-flex",
        justifyContent: "center",
        marginRight: marginRight,
        border: `2px solid ${bgColor}`,
      }}
      className={className}
    >
      <FontAwesomeIcon icon={selectedIcon} color={color} size={size} />
    </div>
  );
}
