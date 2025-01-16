import Icon from "./Icon.jsx";

export default function Package({
  title,
  subtitle,
  colorClass,
  price,
  oldPrice,
  items,
}) {
  return (
    <div className={`package ${colorClass}`}>
      {colorClass == "momentum" && (
        <div className={`popular-label ${colorClass}`}>Most Popular</div>
      )}
      <div className="package-header">
        <h1 className="header-secondary">{title}</h1>
        <h2>{subtitle}</h2>
        <div className="prices-container">
          <h3 className={`text-${colorClass}`}>${price}</h3>
          <p className="old-price">${oldPrice}</p>
        </div>
      </div>
      <div className="package-content">
        <p>Includes:</p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Icon
                icon={
                  item.includeType === "included"
                    ? "faCircleCheck"
                    : item.includeType === "vip"
                    ? "faCrown"
                    : "faCircleXmark"
                }
                type="solid"
                color={
                  item.includeType === "included"
                    ? "#45a834"
                    : item.includeType === "vip"
                    ? "#f7ef8a"
                    : "#dd6666"
                }
                bgColor={item.includeType === "vip" ? "#000010" : undefined}
                size={item.includeType === "vip" ? "sm" : "lg"}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <a
        href={`/package?package=${title.toLowerCase()}`}
        className={`package-button bg-${colorClass}`}
      >
        See Details
      </a>
    </div>
  );
}
