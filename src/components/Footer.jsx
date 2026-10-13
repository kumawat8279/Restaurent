import React from 'react'

import "../css/Footer.css"

export default function Footer() {
  return (
    <>
      
      <footer className="footer" id='contact'>

    <div className="footer-container">

        {/* About */}
        <div className="footer-box">
            <h2>Food Blog</h2>
            <p>
                Delicious recipes and tasty food
                made with love.
            </p>

            <div className="social-icons">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-youtube"></i>
            </div>
        </div>

        {/* Quick Links */}
        <div className="footer-box">
            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#recipes">Recipes</a>
            <a href="#contact">Contact</a>
        </div>

        {/* Contact */}
        <div className="footer-box">
            <h3>Contact Us</h3>

            <p>
                <i className="fa-solid fa-location-dot"></i>
                Jaipur, Rajasthan
            </p>

            <p>
                <i className="fa-solid fa-phone"></i>
                +91 xxxxxxxxxx
            </p>

            <p>
                <i className="fa-solid fa-envelope"></i>
                info@example.com
            </p>
        </div>

        {/* Opening Hours */}
        <div className="footer-box">
            <h3>Opening Hours</h3>

            <p>24 x  7</p>
            <span>10:00 AM - 10:00 PM</span>

            
        </div>

    </div>

    <div className="footer-bottom">
        <p>© 2026 Food Blog. All Rights Reserved.</p>
    </div>

</footer>
    </>
  )
}
