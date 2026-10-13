import React from 'react'

import img1 from "../images/food1.jpg"
import img2 from "../images/cake.jpg"
import img3 from "../images/chocolate cake.jpg"
import img4 from "../images/images food.jpg"
import img5 from "../images/layered.jpg"
import img6 from "../images/momose.jpg"
import img7 from "../images/veg.jpg"
import img8 from "../images/food3.jpg"
import img9 from "../images/food4.jpg"
import img10 from "../images/food6.jpg"
import "../css/Ratedrecipes.css"
export default function Ratedrecipes() {
    return (
        <>
            <div className='ratedrecipes' id='Freatures'>
            <div className='ratedrecipes-container'>

            


                <div className='ratedrecipes-box1'>
                    <div className='line2'>

                    </div>
                    <h2>Top Rated box</h2>
                    {/* box1 */}
                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img1} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">jan 14, 2018</span>
                            <h3>cheesy pizza</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>

                    {/* 2 */}

                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img2} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">feb 4, 2018</span>
                            <h3>Fruit cake</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>
                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img3} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">March 1, 2018</span>
                            <h3>Chocolate cake</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>
                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img4} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">april 19, 2018</span>
                            <h3>kurkure momose</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>
                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img5} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">may 16, 2018</span>
                            <h3>fruit cake</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 2 */}

                <div className='ratedrecipes-box1'>
                    <div className='line2'>

                    </div>
                    <h2>Top Rated box</h2>
                    {/* box1 */}
                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img6} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">june 3, 2018</span>
                            <h3>Momose</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>

                    {/* 2 */}

                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img7} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">july 5, 2018</span>
                            <h3>Chili patato</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>

                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img8} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">august 14, 2018</span>
                            <h3>veg cake</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>

                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img9} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">sep 1, 2018</span>
                            <h3>Biryani</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>

                    <div className="rated-item">
                        <div className="rated-image">
                            <img src={img10} alt="Italian pasta" />
                        </div>

                        <div className="rated-info">
                            <span className="rated-date">oct 14, 2018</span>
                            <h3>Chikan</h3>

                            <div className="stars">
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span>★</span>
                                <span className="empty">★</span>
                            </div>
                        </div>
                    </div>



                </div>

                {/* 3 */}

                <div className="review-card">

                    <div className="review-image">
                        <img src={img7} alt="Italian Restaurant" />

                        <div className="review-date">
                            nov 04, 2018
                        </div>
                    </div>

                    <div className="review-content">

                        <h2>Italian restaurant Review</h2>

                        <p className="author">
                            By Maria Williams
                        </p>

                        <p className="description">
                            Donec quam felis, ultricies nec, pellentesque eu,
                            pretium quis, sem. Nulla consequat massa quis enim.
                        </p>

                        <p className="comments">
                            2 Comments
                        </p>

                        <button className="review-arrow">
                            ›
                        </button>

                    </div>

                </div>
                </div>

            </div>


        </>
    )
}
