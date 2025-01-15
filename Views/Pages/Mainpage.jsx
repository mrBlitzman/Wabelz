import {useEffect, useState, useRef} from 'react';
import React from 'react';
import Main from '../Templates/Layouts/Main.jsx';
import Slider from '../Templates/Components/Slider.jsx';
import ContentSection from '../Templates/Components/ContentSection.jsx';
import Icon from '../Templates/Components/Icon.jsx';
import Accordion from '../Templates/Components/Accordion.jsx';
import Plyr from 'plyr-react';
import myvid from '../Assets/Videos/fivervideo.mp4'
import img1 from '../Assets/Images/slider-img/3.png';
import img2 from '../Assets/Images/slider-img/6.png';
import img3 from '../Assets/Images/slider-img/9.png';
import img4 from '../Assets/Images/slider-img/12.png';
import img5 from '../Assets/Images/slider-img/15.png';

export default function Mainpage() {

    const videoSource = {
        type: "video",
        sources: [
          {
            src: myvid,
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


    const accordions = [
        { title: "Pellentesque mollis, mi vulputate imperdiet finibus?", content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lacus auctor, efficitur orci vitae, egestas lacus. Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus?" },
        { title: "Pellentesque mollis, mi vulputate imperdiet finibus?", content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lacus auctor, efficitur orci vitae, egestas lacus. Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus?" },
        { title: "Pellentesque mollis, mi vulputate imperdiet finibus?", content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lacus auctor, efficitur orci vitae, egestas lacus. Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus?" },
        { title: "Pellentesque mollis, mi vulputate imperdiet finibus?", content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lacus auctor, efficitur orci vitae, egestas lacus. Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus?" },
        { title: "Pellentesque mollis, mi vulputate imperdiet finibus?", content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed lacus auctor, efficitur orci vitae, egestas lacus. Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus? Pellentesque mollis, mi vulputate imperdiet finibus?" }
      ];
    
    return (
        <>
            <Main>
                <div className='content-container'>
                    <div className='content-section no-topmargin'>
                        <div className='hero-content'>
                            <h1 className='text-pastel-purple header-primary my-5'>
                                Take your position <span className='text-light-blue'>against<br /> digital world to interact with </span>more customers.
                            </h1>
                            <p className='paragraph text-white my-5'>
                                You <span className='highlight'>can’t reach</span> your business growth goals without serving an interaction interface to your customers.
                            </p>
                            <h2 className='text-pastel-purple header-secondary'>All your need is a <span className="text-light-blue">“website”</span> with best performance.</h2>
                        </div>
                        <div className="player-container mx-auto">
                            <Plyr source={videoSource} options={videoOptions}/>
                        </div>
                        <div className='dual-button-container'>
                            <a href='/packages' className='button button-primary'>Get your website now!</a>
                            <button className='button button-secondary'>Read More</button>
                        </div>
                    </div>
                    <div className='content-section'>
                        <div className='secondary-hero'>
                            <h1 className='text-white header-primary my-5'>
                            Whether you have a small shop or a huge agency,<br/>
                            you must have an <span className='fancy'>address</span> on the internet.
                            </h1>
                            <div className="secondary-hero-content">
                                <p className='paragraph text-white font-normal'>
                                    Imagine a street that <span className="text-pastel-purple font-bold">billions of people</span> walk through <span className="text-pastel-purple font-bold">every day.</span>
                                </p>
                                <p className='paragraph text-white font-normal'>
                                    Now think about the number of customers you're losing <span className="text-pastel-purple font-bold">every second</span> because you're not there. 
                                </p>
                                <p className='paragraph text-white font-normal'>
                                    What are you still waiting for to be there? <span className="highlight font-bold">To lose more customers,</span> or something else?
                                </p>
                            </div>
                        </div>
                        <Slider />
                        <div className='btn-p-container'>
                            <a href='/packages' className='button button-primary'>Show packages</a>
                            <p className='paragraph text-white little-text font-normal'>Each package includes logo design and one month of free maintenance!</p>
                        </div>
                    </div>
                    <ContentSection 
                        imgSource={img1}
                        imgPosition="left"
                        sectionIndex="01"
                        sectionHeader="Showcase your professionalism"
                        sectionBodyHeader="Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar risus aliquet class conubia mus hac"
                        sectionContentList= {[
                            "Efficitur curae nostra nisi tincidunt metus tempor.",
                            "Blandit metus pharetra metus feugiat vulputate dignissim.",
                            "Quis eros habitant natoque lobortis."
                        ]}
                        btnContent="See all offers"
                        btnHref="#offers"
                    />
                    <ContentSection 
                        imgSource={img2}
                        imgPosition = "right"
                        sectionIndex="02"
                        sectionHeader="Have full access on your website"
                        sectionBodyHeader="Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar risus aliquet class conubia mus hac"
                        sectionContentList= {[
                            "Efficitur curae nostra nisi tincidunt metus tempor.",
                            "Blandit metus pharetra metus feugiat vulputate dignissim.",
                            "Quis eros habitant natoque lobortis."
                        ]}
                        btnContent="See all offers"
                        btnHref="#offers"
                    />
                    <ContentSection 
                        imgSource={img3}
                        imgPosition="left"
                        sectionIndex="03"
                        sectionHeader="Get more and more customers"
                        sectionBodyHeader="Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar risus aliquet class conubia mus hac"
                        sectionContentList= {[
                            "Efficitur curae nostra nisi tincidunt metus tempor.",
                            "Blandit metus pharetra metus feugiat vulputate dignissim.",
                            "Quis eros habitant natoque lobortis."
                        ]}
                        btnContent="See all offers"
                        btnHref="#offers"
                    />
                    <ContentSection 
                        imgSource={img4}
                        imgPosition = "right"
                        sectionIndex="04"
                        sectionHeader="Take and manage orders easily"
                        sectionBodyHeader="Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar risus aliquet class conubia mus hac"
                        sectionContentList= {[
                            "Efficitur curae nostra nisi tincidunt metus tempor.",
                            "Blandit metus pharetra metus feugiat vulputate dignissim.",
                            "Quis eros habitant natoque lobortis."
                        ]}
                        btnContent="See all offers"
                        btnHref="#offers"
                    />
                    <ContentSection 
                        imgSource={img5}
                        imgPosition="left"
                        sectionIndex="05"
                        sectionHeader="See your business rising"
                        sectionBodyHeader="Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar risus aliquet class conubia mus hac"
                        sectionContentList= {[
                            "Efficitur curae nostra nisi tincidunt metus tempor.",
                            "Blandit metus pharetra metus feugiat vulputate dignissim.",
                            "Quis eros habitant natoque lobortis."
                        ]}
                        btnContent="See all offers"
                        btnHref="#offers"
                    />
                    <div className="content-section">
                        <h1 className='text-white header-primary header-big'>Make your choice.</h1>
                        <div className='box-container'>
                            <div className='box red-box mr-5'>
                                <div className='mx-auto mb-5'>
                                    <img src={img4} alt="" width={150} />
                                    <h1 className='text-pastel-purple box-img-alt'>Any Ordinary Website</h1>
                                </div>
                                <div className='box-content'>
                                    <ul className='box-ul'>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>2000-3000 Customers per day</li>
                                        <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>The most expensive one costs 1,000 USD</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>It works even while you sleep (well, sometimes it doesn’t)</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>Boring, difficult to use and understand</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>Customers leave the website as they entered it</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>The variety is limited and it is difficult to find the style you want.</li>
                                    </ul>
                                    <button className='button button-primary box-button'>I will make the wrong choice</button>
                                </div>
                            </div>
                            <div className='box red-box ml-5'>
                                <div className='mx-auto mb-5'>
                                    <img src={img4} alt="" width={150} />
                                    <h1 className='text-pastel-purple box-img-alt'>Physical Store</h1>
                                </div>
                                <div className='box-content'>
                                    <ul className='box-ul'>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>500-1000 Customers per day</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>Needs minimum 300,000 USD to invest</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>Needs your management </li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>You have to be there to shop</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>You have to be there to shop</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>You need a very good marketer to sell well</li>
                                        <li><Icon icon="faCircleXmark" type='solid' color="#ff3b3b"/>It may be difficult to find a store in the style you want and in a busy location.</li>
                                    </ul>
                                    <button className='button button-primary box-button'>I will make the wrong choice</button>
                                </div>
                            </div>
                            <div className="box gold-box mt-5 box-center">
                                <div className='box-center-left'>
                                    <div className='mx-auto mb-5'>
                                        <img src={img4} alt="" width={150} />
                                        <h1 className='text-pastel-purple box-img-alt'>Elegant Wabelz Website</h1>
                                    </div>
                                    <div className='box-content'>
                                        <ul className='box-ul'>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>10.000+ Customers per day</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>The most expensive one costs 1,500 USD</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>It works even while you sleep (never crashes like others)</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>Easy to navigate and user friendly</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>There are all kinds of websites available and they are exactly as you wish</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>Integer convallis at lectus eu imperdiet.</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>Lorem ipsum dolor sit amet</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>consectetur adipiscing elit</li>
                                            <li><Icon icon="faCircleCheck" type='solid' color="#45a834"/>Pellentesque nec nisi at metus convallis</li>
                                            <h3 className='ul-footer'>And more...</h3>
                                        </ul>
                                    </div>
                                </div>
                                <div className='box-center-right'>
                                    <div className="box-center-right-content">
                                        <h1 className='text-white header-primary text-left'>Why are we the <span className='text-yellow'>best choice</span> for your business?</h1>
                                        <div className='features-section'>
                                            <div className="feature">
                                                <h3 className='text-yellow header-secondary'>Fast and Reliable</h3>
                                                <p>Your website will load in seconds, available to customers anytime, anywhere.</p>
                                            </div>
                                            <div className="feature">
                                                <h3 className='text-yellow header-secondary'>Intuitive Design</h3>
                                                <p>A seamless, user-friendly layout that keeps visitors engaged and makes navigation effortless.</p>
                                            </div>
                                            <div className="feature">
                                                <h3 className='text-yellow header-secondary'>Inspires Purchase Intent</h3>
                                                <p>Every detail is carefully designed to make your customers feel confident and ready to buy. Our persuasive content and strategic layouts guide visitors smoothly from interest to action, maximizing sales opportunities.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-center-right-button-container">
                                        <a href="/packages"><button className='button button-yellow button-centerbox'>Transform Your Brand Today – Let’s Get Started!</button></a>
                                        <p className='paragraph text-white little-text font-normal button-bottom-text'>Each package includes logo design and one month of free maintenance. <br/> Don’t miss out on this opportunity!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-section">
                        <div className='faq'>
                            <h1 className='text-white header-primary mt-10 mb-10'>Frequently asked questions</h1>
                            <div className="accordion-container">
                                <div className='accordions'>
                                    <Accordion accordions={accordions}/>
                                </div>
                            </div> 
                        </div>
                        <button className='button button-purple mx-auto after-faq-button'>Still not sure? Take a look at our prices</button>
                    </div>
                </div>
            </Main>
        </>
      );
}