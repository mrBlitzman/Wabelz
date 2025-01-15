import {React, useState, useEffect} from 'react';
import Main from '../Templates/Layouts/Main.jsx';
import Package from '../Templates/Components/Package.jsx';
import Loading from "../Templates/Components/Loading.jsx";

export default function Packages() {

    const [isNewDomain, setIsNewDomain] = useState(false);
    const [isNewHosting, setIsNewHosting] = useState(false);
    const [packagesData, setPackagesData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPackageData = async () => {
        try {
          const response = await fetch(`${process.env.VITE_API_ORIGIN}/api/packages/`);
          if (!response.ok) throw new Error("Failed to fetch package data");
          const data = await response.json();
          setPackagesData( data );
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPackageData();
    }, []);

    if(isLoading){return(
      <div className={"main-wrapper loading hidden"}>
        <div className={"loading-overlay visible"}>
          <Loading />
        </div>
    </div>
    )}

    console.log(packagesData);
    return (
        <>
        <Main>
          <div className="content-container">
            <div className="content-section no-topmargin">
              <div className="secondary-hero">
                <h1 className='header-primary text-yellow my-5'>Select a package</h1>
                <p className='paragraph text-white font-normal long-leading my-5'> 
                    Find the perfect package for your goals.
                    From beginner-friendly options to advanced features, we’ve got you covered. 
                    Select a package and take the first step towards building your ideal website.
                </p>
              </div>
            </div>
            <div className="packages-container">

              {packagesData.map((pkg, index) => (
                <Package 
                  key={index} 
                  title={pkg.title}
                  subtitle={pkg.tagline}
                  colorClass={pkg.slug} 
                  price={pkg.price}
                  oldPrice={pkg.oldPrice}
                  items={pkg.features}
                />
              ))}
              
            </div>
            <div className="content-section">
              <button className='button button-purple box-button scrolldown-btn'>None of the packages are right for you?
              Create your own.</button>
            </div>
            <div className="content-section secondary-section no-topmargin">
              <div className="secondary-hero">
                <h1 className='header-primary text-yellow my-5'>Create your own package</h1>
                <p className='paragraph text-white font-normal long-leading my-5'> 
                Create a package tailored to your specific needs and goals. 
                Select only the features and functionalities that matter most to you, ensuring a perfect fit for your project. 
                Build your vision with flexibility and precision, all in one convenient place. 
                </p>
              </div>
            </div>
            <div className="packages-container">
              <div className="custom-pkg">
                <div className='pkg-col'>
                  <div className="col-section first-col-section">
                    <h1 className='header'>Website Requirements</h1>
                    <div className="input-group">
                      <label htmlFor="pagenumber">Number of Pages</label>
                      <div className="input-container">
                        <input placeholder="Enter page count" type="number" name="" id="pagenumber" />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="revisionnumber">Number of Revisions</label>
                      <div className="input-container">
                        <input placeholder='Enter revision count' type="number" name="" id="revisionnumber" />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Design Features</label>
                      <div className="checkbox-container">
                        <div className="checkbox-group">
                          <input type="checkbox" id='advancedanimations' />
                          <label htmlFor="advancedanimations">Advanced Animations</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='videobackgroundintegration' />
                          <label htmlFor="videobackgroundintegration">Video & Background Integration</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='darklightmode' />
                          <label htmlFor="darklightmode">Dark-Light Mode</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='photoslideshows' />
                          <label htmlFor="photoslideshows">Photo Slideshows</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='logodesign' />
                          <label htmlFor="logodesign">Logo Design</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-section incolumn-section">
                    <h1 className='header'>Functionalities</h1>
                    <div className="input-group">
                      <label>Select the Features You Need</label>
                      <div className="checkbox-container">
                        <div className="checkbox-group">
                          <input type="checkbox" id='livechatintegration' />
                          <label htmlFor="livechatintegration">Live Chat Integration</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='ecommercefunctionality' />
                          <label htmlFor="ecommercefunctionality">E-commerce Functionality</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='productmanangement' />
                          <label htmlFor="productmanangement">Product Management</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='cartintegration' />
                          <label htmlFor="cartintegration">Cart Integration</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='loginregister' />
                          <label htmlFor="loginregister">Login & Register</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='blogmanagement' />
                          <label htmlFor="blogmanagement">Blog Management</label>
                        </div>
                        <div className="checkbox-group">
                          <input type="checkbox" id='adminpanel' />
                          <label htmlFor="adminpanel">Admin Panel</label>
                        </div>
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="multilingualsupport">Multilingual Support</label>
                      <div className="input-container">
                        
                        <select name="" id="multilingualsupport">
                          <option value="">Select</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pkg-col">
                  <div className="col-section">
                    <h1 className='header'>Technical Requirements</h1>
                    <div className="input-group">
                      <label htmlFor="maintenanceduration">Maintenance Duration</label>
                      <div className="input-container">
                        <select name="" id="maintenanceduration">
                          <option value="">Select</option>
                        </select>
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Maintenance Type</label>
                      <div className="radio-container">
                        <div className="radio-group">
                          <input type="radio" name="maintenancetype" id="standardmaintenance" />
                          <label htmlFor="standardmaintenance">Standard Maintenance</label>
                        </div>
                        <div className="radio-group">
                          <input type="radio" name="maintenancetype" id="prioritymaintenance" />
                          <label htmlFor="prioritymaintenance">Priority Maintenance</label>
                        </div>
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Domain</label>
                      <div className="radio-container">
                        <div className="radio-group">
                          <input checked={!isNewDomain} type="radio" name="domainradio" id="owndomain" onChange={() => setIsNewDomain(false)} />
                          <label htmlFor="owndomain">I have my own</label>
                        </div>
                        <div className="radio-group">
                          <input checked={isNewDomain} type="radio" name="domainradio" id="newdomain" onChange={() => setIsNewDomain(true)} />
                          <label htmlFor="newdomain">Yes</label>
                        </div>
                      </div>
                      {isNewDomain && 
                      <div className="input-container dual">
                        <input placeholder='www.example.com' type="text" name="" id="" />
                        <input placeholder='year' type="number" name="" id="" />
                      </div>
                      }
                    </div>
                    <div className="input-group">
                      <label>Hosting</label>
                      <div className="radio-container">
                        <div className="radio-group">
                          <input checked={!isNewHosting} type="radio" name="hostingradio" id="ownhosting" onChange={() => setIsNewHosting(false)} />
                          <label htmlFor="ownhosting">I have my own</label>
                        </div>
                        <div className="radio-group">
                          <input checked={isNewHosting} type="radio" name="hostingradio" id="newhosting" onChange={() => setIsNewHosting(true)} />
                          <label htmlFor="newhosting">Yes</label>
                        </div>
                      </div>
                      {isNewHosting && 
                      <div className="input-container dual">
                        <select name="">
                          <option value="">Select a hosting plan</option>
                        </select>
                        <input placeholder='year' type="number" name="" id="" />
                      </div>
                      }
                    </div>
                  </div>
                </div>
                <div className="pkg-col last-col">
                  <div className="col-section">
                    <h1 className='header'>Your Package</h1>
                    <h2 className='custom-pkg-price'>$1,806.00</h2>
                    <ul className="pkg-contents-overall">
                      <li>5 Pages:<span className='inline-price'>$129</span></li>
                      <li>Unlimited Revisions:<span className='inline-price'>$129</span></li>
                      <li>Advanced Animations:<span className='inline-price'>$129</span></li>
                      <li>Photo Slideshow:<span className='inline-price'>$129</span></li>
                      <li>Logo Design:<span className='inline-price'>$129</span></li>
                      <li>Live Chat Integration:<span className='inline-price'>$129</span></li>
                      <li>Login & Register:<span className='inline-price'>$129</span></li>
                      <li>Blog Management:<span className='inline-price'>$129</span></li>
                      <li>Admin Panel:<span className='inline-price'>$129</span></li>
                      <li>Product Management:<span className='inline-price'>$129</span></li>
                      <li>Multilingual: 2 Languages:<span className='inline-price'>$129</span></li>
                      <li>1 Year Priority Maintenance:<span className='inline-price'>$129</span></li>
                      <li>1 Year example.com Domain:<span className='inline-price'>$129</span></li>
                      <li>2 Year VPS Hosting:<span className='inline-price'>$129</span></li>
                    </ul>
                  </div>
                  <div className="col-section">
                    <button className='checkout-button'>Proceed to Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Main>
        </>
      );
}