import Icon from './Icon.jsx';

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h1>Wabelz</h1>
                    <div className='socials'>
                        <a href="#"><Icon icon="faSquareInstagram" marginRight='0px' type="brand" color="#fff" size="xl" bgColor="transparent" /></a>
                        <a href="#"><Icon icon="faSquareXTwitter" marginRight='0px' type="brand" color="#fff" size="xl" bgColor="transparent" /></a>
                        <a href="#"><Icon icon="faSquareFacebook" marginRight='0px' type="brand" color="#fff" size="xl" bgColor="transparent" /></a>
                        <a href="#"><Icon icon="faLinkedin" marginRight='0px' type="brand" color="#fff" size="xl" bgColor="transparent" /></a>
                        <a href="#"><Icon icon="faSquareYoutube" marginRight='0px' type="brand" color="#fff" size="xl" bgColor="transparent" /></a>
                        
                    </div>
                    <form className="newsletter-input" action="#">
                        <p>Subscribe to newsletter:</p>
                        <input type="text" placeholder="Enter your email" />
                        <button type="button">Subscribe</button>
                    </form>
                </div>
                <div className="footer-link-group first">
                    <h1>Products</h1>
                    <ul>
                        <li><a href="#">Lorem ipsum dolor</a></li>
                        <li><a href="#">molestie diam rhoncus</a></li>
                        <li><a href="#">Proin sed lectus sed</a></li>
                        <li><a href="#">nulla imperdiet condimentum</a></li>
                        <li><a href="#">scelerisque ipsum</a></li>
                        <li><a href="#">orci vitae pulvinar euismod</a></li>
                    </ul>
                </div>
                <div className="footer-link-group">
                    <h1>Services</h1>
                    <ul>
                        <li><a href="#">Lorem ipsum dolor</a></li>
                        <li><a href="#">molestie diam rhoncus</a></li>
                        <li><a href="#">Proin sed lectus sed</a></li>
                        <li><a href="#">nulla imperdiet condimentum</a></li>
                        <li><a href="#">scelerisque ipsum</a></li>
                        <li><a href="#">orci vitae pulvinar euismod</a></li>
                    </ul>
                </div>
                <div className="footer-link-group">
                    <h1>Legal</h1>
                    <ul>
                        <li><a href="#">Lorem ipsum dolor</a></li>
                        <li><a href="#">molestie diam rhoncus</a></li>
                        <li><a href="#">Proin sed lectus sed</a></li>
                        <li><a href="#">nulla imperdiet condimentum</a></li>
                        <li><a href="#">scelerisque ipsum</a></li>
                        <li><a href="#">orci vitae pulvinar euismod</a></li>
                    </ul>
                </div>
                <div className="footer-link-group">
                    <h1>Company</h1>
                    <ul>
                        <li><a href="#">Lorem ipsum dolor</a></li>
                        <li><a href="#">molestie diam rhoncus</a></li>
                        <li><a href="#">Proin sed lectus sed</a></li>
                        <li><a href="#">nulla imperdiet condimentum</a></li>
                        <li><a href="#">scelerisque ipsum</a></li>
                        <li><a href="#">orci vitae pulvinar euismod</a></li>
                    </ul>
                </div>
            </div>
            <div className='copyright-text'>Copyright © 2020 - 2024 Wabelz®. All rights reserved.</div>
        </div>
    );
}
