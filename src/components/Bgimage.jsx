import React from "react";
import "../css/Bgimage.css";

export default function Bgimage() {
    return (
        <div className="food-bg-slider">

            <div className="food-bg-slides">

                {/* Slide 1 */}
                <div className="food-bg-slide food-bg-slide1">
                    <div className="food-bg-box food-bg-box1">
                        Healthy Recipes
                    </div>

                    <div className="food-bg-box food-bg-box2">
                        from the best chefs
                    </div>

                    <div className="food-bg-box food-bg-box3">
                        for all the foodies
                    </div>
                </div>


                {/* Slide 2 */}
                <div className="food-bg-slide food-bg-slide2">
                    <div className="food-bg-box food-bg-box1">
                        Healthy Recipes
                    </div>

                    <div className="food-bg-box food-bg-box2">
                        from the best chefs
                    </div>

                    <div className="food-bg-box food-bg-box3">
                        for all the foodies
                    </div>
                </div>

            </div>

        </div>
    );
}