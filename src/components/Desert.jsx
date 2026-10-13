import React from 'react'
import "../css/Desert.css"

export default function Desert() {
    return (
        <>

            <div className="dessert-slider">

                <div className="dessert-slides">

                    {/* SLIDE 1 */}
                    <div className="dessert-slide">

                        <div className="dessert-image image1"></div>

                        <div className="dessert-content">

                            <h1>Amazing deserts</h1>

                            <p>✓ Easy to make</p>
                            <p>✓ Step by Step Video Tutorial</p>
                            <p>✓ Gluten Free</p>
                            <p>✓ Healty Ingredients</p>

                        </div>

                    </div>


                    {/* SLIDE 2 */}
                    <div className="dessert-slide">

                        <div className="dessert-image image2"></div>

                        <div className="dessert-content">

                            <h1>Delicious Recipes</h1>

                            <p>✓ Easy to make</p>
                            <p>✓ Step by Step Video Tutorial</p>
                            <p>✓ Fresh Ingredients</p>
                            <p>✓ Healthy & Tasty</p>

                        </div>

                    </div>


                    {/* SLIDE 3 */}
                    <div className="dessert-slide">

                        <div className="dessert-image image3"></div>

                        <div className="dessert-content">

                            <h1>Sweet Treats</h1>

                            <p>✓ Quick to prepare</p>
                            <p>✓ Simple Recipe</p>
                            <p>✓ Gluten Free</p>
                            <p>✓ Perfect for Everyone</p>

                        </div>

                    </div>


                    {/* DUPLICATE FOR SMOOTH LOOP */}
                    <div className="dessert-slide">

                        <div className="dessert-image image1"></div>

                        <div className="dessert-content">

                            <h1>Amazing deserts</h1>

                            <p>✓ Easy to make</p>
                            <p>✓ Step by Step Video Tutorial</p>
                            <p>✓ Gluten Free</p>
                            <p>✓ Healty Ingredients</p>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}