
import React, { useEffect, useState } from 'react';
import { BiShoppingBag } from 'react-icons/bi';
import { BsArrowLeft } from 'react-icons/bs';
import {
    FiMinus,
    FiPlus,
    FiTrash2,
    FiMapPin
} from 'react-icons/fi';

import "../css/Shopcart.css"
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Shopcart() {

    const [locdata, setlocdata] = useState([]);
    const [prodata, setprodata] = useState([]);


    // GET CART PRODUCTS

    const getcartproducts = () => {

        axios
            .get("https://restaurentbackend.vercel.app/getcartpro")
            .then((res) => {

                console.log("Cart Response:", res.data);

                if (res.data.status) {

                    const data = res.data.mycartproduct.map((item) => ({
                        ...item,
                        quantity: 1
                    }));

                    setprodata(data);

                } else {

                    setprodata([]);

                }

            })
            .catch((error) => {
                console.log("Cart Error:", error);
            });
    };


    // INCREMENT

    const increment = (id) => {

        const updatedata = prodata.map((item) => {

            if (item._id === id) {

                return {
                    ...item,
                    quantity: item.quantity + 1
                };

            }

            return item;

        });

        setprodata(updatedata);
    };


    // DECREMENT

    const decrement = (id) => {

        const updatedata = prodata.map((item) => {

            if (item._id === id && item.quantity > 1) {

                return {
                    ...item,
                    quantity: item.quantity - 1
                };

            }

            return item;

        });

        setprodata(updatedata);
    };


    // GET LOCATION

    const getlocationinfo = () => {

        axios
            .get("https://restaurentbackend.vercel.app/getlocation")
            .then((res) => {

                console.log("Location Response:", res.data);

                if (res.data.status) {

                    setlocdata(res.data.locationdata);

                } else {

                    setlocdata([]);

                }

            })
            .catch((error) => {

                console.log("Location Error:", error);

            });

    };


    // =========================
    // PAGE LOAD
    // =========================

    useEffect(() => {

        getcartproducts();
        getlocationinfo();

    }, []);


    // SUBTOTAL

    const subtotal = prodata.reduce(
        (total, item) => {

            return total +
                Number(item.price) *
                Number(item.quantity);

        },
        0
    );


    // DELETE CART PRODUCT

    const deletecart = (item) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Product will be removed from cart.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        })
            .then((result) => {

                if (result.isConfirmed) {

                    axios
                        .post(
                            "https://restaurentbackend.vercel.app/deletecartpro",
                            {
                                prodeletecart: item
                            }
                        )
                        .then((res) => {

                            console.log(
                                "Delete Cart Response:",
                                res.data
                            );

                            if (res.data.status) {

                                getcartproducts();

                                Swal.fire({
                                    toast: true,
                                    position: "top-end",
                                    icon: "success",
                                    title: "Product deleted",
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                            }

                        })
                        .catch((error) => {

                            console.log(
                                "Delete Cart Error:",
                                error
                            );

                        });

                }

            });

    };


    // DELETE LOCATION

    const deletelocation = () => {

        axios
            .post("https://restaurentbackend.vercel.app/deleteloc")
            .then((res) => {

                console.log(
                    "Delete Location Response:",
                    res.data
                );

                if (res.data.status) {

                    setlocdata([]);

                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Location deleted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }

            })
            .catch((error) => {

                console.log(
                    "Delete Location Error:",
                    error
                );

            });

    };


    return (

        <div className="sc-cart-page">

            <div className="sc-cart-container">

                {/* HEADER */}

                <div className="sc-cart-top">

                    <div>

                        <h1>

                            <BiShoppingBag size={30} />

                            My Cart

                        </h1>

                        <p>
                            {prodata.length} items added to your cart
                        </p>

                    </div>


                    <Link
                        to="/"
                        className="sc-continue-shopping"
                    >

                        <BsArrowLeft size={18} />

                        Continue Shopping

                    </Link>

                </div>


                {/* CART WRAPPER */}

                <div className="sc-cart-wrapper">


                    {/* PRODUCTS */}

                    <div className="sc-cart-products">


                        <div className="sc-cart-title">

                            <span>Product</span>

                            <span>Price</span>

                            <span>Quantity</span>

                            <span>Total</span>

                        </div>


                        {prodata.length === 0 ? (

                            <div className="sc-empty-cart">

                                <BiShoppingBag size={50} />

                                <h3>Your cart is empty</h3>

                                <p>
                                    Add some products to your cart.
                                </p>

                            </div>

                        ) : (

                            prodata.map((item) => (

                                <div
                                    className="sc-cart-product"
                                    key={item._id}
                                >


                                    {/* PRODUCT */}

                                    <div className="sc-product-details">

                                        <img
                                            src={item.image}
                                            alt={item.productname}
                                        />

                                        <div>

                                            <h3>
                                                {item.productname}
                                            </h3>

                                            <p>
                                                Fresh & Organic Product
                                            </p>

                                        </div>

                                    </div>


                                    {/* PRICE */}

                                    <div className="sc-product-price">

                                        ₹{item.price}

                                    </div>


                                    {/* QUANTITY */}

                                    <div className="sc-quantity-box">

                                        <button
                                            onClick={() =>
                                                decrement(item._id)
                                            }
                                        >

                                            <FiMinus size={16} />

                                        </button>


                                        <span>
                                            {item.quantity}
                                        </span>


                                        <button
                                            onClick={() =>
                                                increment(item._id)
                                            }
                                        >

                                            <FiPlus size={16} />

                                        </button>

                                    </div>


                                    {/* TOTAL */}

                                    <div className="sc-product-total">

                                        ₹
                                        {
                                            Number(item.price) *
                                            Number(item.quantity)
                                        }

                                    </div>


                                    {/* DELETE */}

                                    <button
                                        className="sc-delete-product"
                                        onClick={() =>
                                            deletecart(item)
                                        }
                                    >

                                        <FiTrash2 size={19} />

                                    </button>


                                </div>

                            ))

                        )}

                    </div>


                    {/* ORDER SUMMARY */}

                    <div className="sc-cart-summary">

                        <h2>
                            Order Summary
                        </h2>


                        {/* DELIVERY */}

                        {locdata.length > 0 && (

                            <div className="sc-delivery-section">


                                {locdata.map((data) => (

                                    <div
                                        className="sc-delivery-card"
                                        key={data._id}
                                    >


                                        {/* HEADER */}

                                        <div className="sc-delivery-card-header">

                                            <div>

                                                <p className="sc-delivery-small-title">
                                                    DELIVERY INFORMATION
                                                </p>

                                                <h3>
                                                    Delivery Details
                                                </h3>

                                            </div>


                                            <div className="sc-delivery-header-actions">

                                                <span className="sc-delivery-icon">
                                                    📍
                                                </span>

                                            </div>

                                        </div>


                                        {/* CONTENT */}

                                        <div className="sc-delivery-content">


                                            {/* NAME */}

                                            <div className="sc-delivery-info-row">

                                                <div className="sc-info-icon">
                                                    👤
                                                </div>

                                                <div className="sc-info-text">

                                                    <span>
                                                        Customer Name
                                                    </span>

                                                    <strong>
                                                        {data.name}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* CONTACT */}

                                            <div className="sc-delivery-info-row">

                                                <div className="sc-info-icon">
                                                    📞
                                                </div>

                                                <div className="sc-info-text">

                                                    <span>
                                                        User Contact
                                                    </span>

                                                    <strong>
                                                        {data.contact}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* ADDRESS */}

                                            <div className="sc-delivery-info-row">

                                                <div className="sc-info-icon">
                                                    🏠
                                                </div>

                                                <div className="sc-info-text">

                                                    <span>
                                                        Delivery Address
                                                    </span>

                                                    <strong>
                                                        {data.address || "Current Location"}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* PINCODE */}

                                            <div className="sc-delivery-info-row">

                                                <div className="sc-info-icon">
                                                    📮
                                                </div>

                                                <div className="sc-info-text">

                                                    <span>
                                                        Pincode
                                                    </span>

                                                    <strong>
                                                        {data.number}
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* LOCATION */}

                                            <div className="sc-location-action">

                                                <div className="sc-location-text">

                                                    <div className="sc-location-icon-box">
                                                        <FiMapPin size={22} />
                                                    </div>

                                                    <div className="sc-location-content">

                                                        <span className="sc-location-title">
                                                            Current Location
                                                        </span>

                                                        <small className="sc-location-status">
                                                            Location saved successfully
                                                        </small>

                                                    </div>

                                                </div>

                                                <a
                                                    href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="sc-view-location-btn"
                                                >

                                                    <FiMapPin size={17} />

                                                    <span>
                                                        View Location
                                                    </span>

                                                </a>

                                            </div>


                                            {/* DELETE LOCATION */}

                                            <button
                                                className="sc-delete-location-btn"
                                                onClick={deletelocation}
                                                title="Delete location"
                                            >

                                                <FiTrash2 size={18} />

                                            </button>


                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}


                        {/* BILL */}

                        <div className="sc-summary-row">

                            <span>
                                Subtotal
                            </span>

                            <strong>
                                ₹{subtotal}
                            </strong>

                        </div>


                        <div className="sc-summary-row">

                            <span>
                                Delivery
                            </span>

                            <strong>
                                Free
                            </strong>

                        </div>


                        <div className="sc-summary-row sc-discount">

                            <span>
                                Discount
                            </span>

                            <strong>
                                - ₹20
                            </strong>

                        </div>


                        <div className="sc-summary-total">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{Math.max(0, subtotal - 20)}
                            </strong>

                        </div>


                        {/* CHECKOUT */}

                        <Link
                            to="/orderbill"
                            state={{
                                products: prodata,

                                name: locdata[0]?.name,

                                contact: locdata[0]?.contact,

                                address: locdata[0]?.textarea,

                                pincode: locdata[0]?.number
                            }}

                            className="sc-checkout-btn"
                        >

                            Proceed to Checkout →

                        </Link>

                        <p className="sc-secure-checkout">

                            🔒 100% Secure Checkout

                        </p>


                    </div>

                </div>

            </div>

        </div>

    );

}

