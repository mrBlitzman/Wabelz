import { useLocation, useNavigate } from "react-router-dom";
import Main from "../Templates/Layouts/Main.jsx";
import Icon from "../Templates/Components/Icon.jsx";
import Loading from "../Templates/Components/Loading.jsx";
import Plyr from "plyr-react";
import { useState, useEffect } from "react";

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Package = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageName = queryParams.get("package");
  const navigate = useNavigate();
  const [packagesData, setPackagesData] = useState(null);
  const [extrasData, setExtrasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_API_ORIGIN}/api/info/packages/${packageName}`
        );
        if (!response.ok) throw new Error("Failed to fetch package data");
        const data = await response.json();
        setPackagesData({ [packageName]: data });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [packageName]);

  useEffect(() => {
    const fetchExtraData = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_API_ORIGIN}/api/info/extras/${packageName}`
        );
        if (!response.ok) throw new Error("Failed to fetch extras data");
        const data = await response.json();
        setExtrasData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExtraData();
  }, [packageName]);

  if (loading)
    return (
      <div className={"main-wrapper loading hidden"}>
        <div className={"loading-overlay visible"}>
          <Loading />
        </div>
      </div>
    );
  if (error)
    return (
      <Main>
        <p>Error: {error}</p>
      </Main>
    );

  if (!packagesData || !packagesData[packageName]) {
    window.location.href = "/packages";
    return null;
  }

  const packageData = packagesData[packageName];

  const orderList = [
    {
      name: `${capitalize(packageName)} website package`,
      price: packageData.price,
    },
  ];

  const videoSource = {
    type: "video",
    sources: [
      {
        src: `${process.env.VITE_API_ORIGIN}${packageData.videoUrl}`,
        type: "video/mp4",
      },
    ],
  };

  const videoOptions = {
    controls: ["play", "progress", "volume", "mute", "fullscreen"],
    settings: [],
    tooltips: { controls: false },
    autoplay: true,
    debug: false,
  };

  const handleOrderClick = () => {
    if (loading) {
      return (
        <div className={"main-wrapper loading hidden"}>
          <div className={"loading-overlay visible"}>
            <Loading />
          </div>
        </div>
      );
    }

    const products = [{ id: packageData.id, quantity: 1 }];

    navigate("/order", { state: { products, extrasData } });
  };
  return (
    <Main>
      <div className="content-container">
        <div className="packages-container">
          <div className={`pkg-info-container ${packageData.slug}`}>
            <div className="pkg-info-left-content">
              <div>
                <h1 className="pkg-info-header">
                  {packageData.title}: {packageData.tagline}
                </h1>
                <h2 className="pkg-info-header-desc">{packageData.subtitle}</h2>
                <div className="prices-container">
                  <h3 className={`text-${packageName}`}>
                    ${packageData.price}
                  </h3>
                  <p className="old-price">${packageData.oldPrice}</p>
                </div>
                <div className="pkg-info-list">
                  <ul>
                    {packageData.features
                      .slice(0, Math.ceil(packageData.features.length / 2))
                      .map((feature, index) => (
                        <li key={index}>
                          <Icon
                            icon={
                              feature.includeType === "included"
                                ? "faCircleCheck"
                                : feature.includeType === "vip"
                                ? "faCrown"
                                : "faCircleXmark"
                            }
                            type="solid"
                            color={
                              feature.includeType === "included"
                                ? "#45a834"
                                : feature.includeType === "vip"
                                ? "#f7ef8a"
                                : "#dd6666"
                            }
                            bgColor={
                              feature.includeType === "vip"
                                ? "#000010"
                                : undefined
                            }
                          />
                          {feature.name}
                        </li>
                      ))}
                  </ul>
                  <ul>
                    {packageData.features
                      .slice(Math.ceil(packageData.features.length / 2))
                      .map((feature, index) => (
                        <li key={index}>
                          <Icon
                            icon={
                              feature.includeType === "included"
                                ? "faCircleCheck"
                                : "faCircleXmark"
                            }
                            type="solid"
                            color={
                              feature.includeType === "included"
                                ? "#45a834"
                                : "#ff3b3b"
                            }
                          />
                          {feature.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className="pkg-info-desc">
                <p>{packageData.description}</p>
              </div>
            </div>
            <div className="pkg-info-right-content">
              <Plyr source={videoSource} options={videoOptions} />
              <div>
                <div className="action-buttons">
                  <button
                    onClick={() => handleOrderClick()}
                    className={`bg-${packageName}`}
                  >
                    Order Now
                  </button>
                  <button className="button-secondary">Book a Call</button>
                </div>
                <div className="action-buttons-desc">
                  <p>Your payment is 100% secure. Shop with confidence!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Package;
