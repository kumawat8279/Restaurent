import React, { useEffect, useState } from "react";

import "../css/productdetails.css";

import axios from "axios";

import { Link, useLocation } from "react-router-dom";

import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";

export default function Productdetails() {


    let [allreviews, setallreviews] = useState([])

    let [reviewdata, setreviewdata] = useState({})
    let inputvaluereview = (e) => {
        setreviewdata({ ...reviewdata, [e.target.name]: e.target.value })
    }

    let addreview = (e) => {

        e.preventDefault();

        let finalreviewdata = {
            ...reviewdata,
            productname: item.productname,

        };

        console.log("FINAL REVIEW:", finalreviewdata);

        axios.post("http://localhost:8080/addreview", {
            reviewdata: finalreviewdata
        })
            .then((res) => {

                console.log("ADD REVIEW RESPONSE:", res.data);

                if (res.data.status) {

                    Swal.fire({
                        icon: "success",
                        title: "Review Added",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    getreview();

                }

            })
            .catch((err) => {
                console.log("ADD REVIEW ERROR:", err);
            });

    };


    // getreview

    function getreview() {
        axios.get("http://localhost:8080/getreview")
            .then((res) => {

                console.log("GET REVIEW RESPONSE:", res.data);

                if (res.data.status) {
                    setallreviews(res.data.allreview);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getreview()
    }, []);


    const location = useLocation();

    const item = location.state;

    const [quantity, setQuantity] = useState(1);


    // ADD PRODUCT TO CART

    let addproduct = (item) => {

        axios.get("http://localhost:8080/allprocart", {
            products: item
        })
            .then((res) => {

                if (res.data.status) {

                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Product added to cart",
                        showConfirmButton: false,
                        showCloseButton: true
                    });

                }

            })
            .catch((err) => {

                console.log(err);

            });

    };


    // PRODUCT NOT FOUND

    if (!item) {

        return (

            <div className="product-not-found">

                <h2>Product Not Found</h2>

                <Link to="/">
                    <button>
                        Back to Shopping
                    </button>
                </Link>

            </div>

        );

    }

   let deletereview = (id) => {
    
    //    console.log("DELETE ID =", id);

    axios.post("http://localhost:8080/dltmyreview", {
        dltreview: id
    })
    .then((res) => {

        if (res.data.status) {

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Review deleted successfully",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

            getreview();
        }

    })
    .catch((err) => {
        console.log("err", err);
    });
};



    return (

        <div className="product-details-page">


            <div className="product-details-container">


                {/* BACK BUTTON */}

                <Link to="/">

                    <button className="back-btn">
                        ← Back
                    </button>

                </Link>


                {/* PRODUCT DETAILS */}

                <div className="product-details-card">


                    {/* IMAGE */}

                    <div className="product-image-section">

                        <div className="product-image">

                            <img
                                src={item.image}
                                alt={item.productname}
                            />

                        </div>

                    </div>


                    {/* PRODUCT INFORMATION */}

                    <div className="product-info-section">


                        <span className="category">
                            {item.category}
                        </span>


                        <h1>
                            {item.productname}
                        </h1>


                        {/* RATING */}

                        <div className="rating">

                            {item.rating}

                        </div>


                        {/* PRICE */}

                        <h2 className="price">

                            ₹{item.price}

                        </h2>


                        {/* DESCRIPTION */}

                        <div className="description">

                            <h3>
                                Description
                            </h3>

                            <p>
                                {item.textarea}
                            </p>

                        </div>


                        {/* QUANTITY */}

                        <div className="quantity-section">

                            <h3>
                                Quantity
                            </h3>


                            <div className="quantity-box">


                                {/* MINUS */}

                                <button
                                    onClick={() => {

                                        if (quantity > 1) {

                                            setQuantity(quantity - 1);

                                        }

                                    }}
                                >
                                    −
                                </button>


                                {/* QUANTITY */}

                                <span>
                                    {quantity}
                                </span>


                                {/* PLUS */}

                                <button
                                    onClick={() => {

                                        setQuantity(quantity + 1);

                                    }}
                                >
                                    +
                                </button>


                            </div>

                        </div>


                        {/* TOTAL PRICE */}

                        <div className="total-section">

                            <span>
                                Total Price
                            </span>

                            <strong>

                                ₹{Number(item.price) * quantity}

                            </strong>

                        </div>


                        {/* BUTTONS */}

                        <div className="product-buttons">


                            {/* ADD TO CART */}

                            <button
                                className="add-cart-btn"
                                onClick={() =>
                                    addproduct({
                                        ...item,
                                        quantity: quantity
                                    })
                                }
                            >
                                Add to Cart
                            </button>


                            {/* WISHLIST */}

                            <button className="wishlist-btn">
                                ♡
                            </button>


                        </div>


                    </div>


                </div>


            </div>


            {/* CUSTOMER REVIEWS */}

            {/* CUSTOMER REVIEWS */}

            <div className="reviews-section">

                <h2>Customer Reviews</h2>

                <div className="review-summary">

                    <div className="review-rating">

                        <strong>4.5</strong>

                        <span>⭐⭐⭐⭐⭐</span>

                        <p>Based on 25 reviews</p>

                    </div>

                </div>


                {/* REVIEWS LIST */}

                <div className="reviews-list">

                    {allreviews.length > 0 ? (

                        allreviews
                            .filter((userdata) =>
                                userdata.productname === item.productname
                            )
                            .map((userdata) => (

                                <div
                                    className="review-item"
                                    key={userdata._id}
                                >

                                    {/* NAME + RATING + DELETE */}
                                    <div
                                        className="review-user"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start"
                                        }}
                                    >

                                        {/* NAME */}
                                        <strong>

                                            <p style={{
                                                color: "red",
                                                fontSize: "20px",
                                                fontWeight: "bold",
                                                margin: "0 0 8px"
                                            }}>
                                                Name
                                            </p>

                                            {userdata.name}

                                        </strong>


                                        {/* RATING + DELETE */}
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "20px"
                                            }}
                                        >

                                            {/* RATING */}
                                            <span>

                                                <p style={{
                                                    color: "red",
                                                    fontSize: "20px",
                                                    fontWeight: "bold",
                                                    margin: "0 0 8px"
                                                }}>
                                                    Rating
                                                </p>

                                                ⭐ {userdata.rating}

                                            </span>


                                            {/* DELETE BUTTON */}
                                            <button
                                                style={{
                                                    marginTop: "22px",
                                                    width: "45px",
                                                    height: "45px",
                                                    border: "none",
                                                    background: "#ffe5e5",
                                                    color: "red",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    fontSize: "20px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }} onClick={(() => deletereview(userdata))}
                                            >
                                                <FiTrash2 />
                                            </button>

                                        </div>

                                    </div>


                                    {/* REVIEW */}
                                    <div style={{ marginTop: "20px" }}>

                                        <p style={{
                                            color: "red",
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            margin: "0 0 8px"
                                        }}>
                                            Review
                                        </p>

                                        <p style={{
                                            margin: 0,
                                            color: "#555"
                                        }}>
                                            {userdata.review}
                                        </p>

                                    </div>


                                    {/* DATE */}
                                    <div style={{ marginTop: "20px" }}>

                                        <p style={{
                                            color: "red",
                                            fontSize: "20px",
                                            fontWeight: "bold",
                                            margin: "0 0 8px"
                                        }}>
                                            Date
                                        </p>

                                        <small style={{ color: "#888" }}>
                                            📅 {userdata.date}
                                        </small>

                                    </div>

                                </div>

                            ))

                    ) : (

                        <p>No reviews yet.</p>

                    )}

                </div>

            </div>


            {/* ADD REVIEW */}

            <div className="add-review">


                <h2>
                    Add Your Review
                </h2>


                <form>


                    <div className="form-group">

                        <label>
                            Name
                        </label>


                        <input
                            type="text"
                            placeholder="Enter your name" onChange={inputvaluereview} name="name"
                        />


                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter product Name"
                            value={item.productname}
                            onChange={inputvaluereview} name="productname"
                        />


                        <label>
                            Date
                        </label>

                        <input
                            type="date" onChange={inputvaluereview} name="date"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Rating
                        </label>

                        <select
                            name="rating"
                            onChange={inputvaluereview}
                            defaultValue=""

                            style={{
                                width: "100%",
                                height: "56px",
                                padding: "0 18px",
                                fontSize: "16px",
                                border: "1px solid #ddd",
                                borderRadius: "12px",
                                backgroundColor: "#fff",
                                cursor: "pointer",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        >
                            <option value="" disabled>
                                Select Rating
                            </option>

                            <option value="1">⭐ 1</option>
                            <option value="2">⭐ 2</option>
                            <option value="3">⭐ 3</option>
                            <option value="4">⭐ 4</option>
                            <option value="5">⭐ 5</option>

                        </select>

                    </div>

                    <div className="Review">

                        <label>
                            Review
                        </label>

                        <textarea
                            placeholder="Write your review..." onChange={inputvaluereview} name="review"
                        ></textarea>

                    </div>


                    <button onClick={addreview}>
                        Submit Review
                    </button>


                </form>


            </div>


        </div>

    );

}