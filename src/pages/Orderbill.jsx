import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
    FiCheckCircle,
    FiMapPin,
    FiPhone,
    FiUser
} from "react-icons/fi";
import QRCode from "react-qr-code";

import "../css/Orderbill.css"

export default function Orderbill() {

    const location = useLocation();
    const navigate = useNavigate();

    const orderData = location.state;

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);

    // ==============================
    // GET USER SAFELY
    // ==============================
const userData = localStorage.getItem("user");

let user = null;

try {
    user = userData ? JSON.parse(userData) : null;
} catch (error) {
    console.log("User JSON Error:", error);
    user = null;
}

console.log("ORDER BILL USER:", user);

    // ==============================
    // IF NO ORDER DATA
    // ==============================

    if (!orderData) {
        return (
            <div className="order-error">

                <h2>No Order Found</h2>

                <p>
                    Please add products to cart first.
                </p>

                <button onClick={() => navigate("/")}>
                    Go Shopping
                </button>

            </div>
        );
    }

    // ==============================
    // PRODUCTS
    // ==============================

    const products = orderData.products || [];

    // ==============================
    // SUBTOTAL
    // ==============================

    const subtotal = products.reduce(
        (total, item) => {

            return (
                total +
                Number(item.price || 0) *
                Number(item.quantity || 1)
            );

        },
        0
    );

    // ==============================
    // DISCOUNT
    // ==============================

    const discount = 20;

    // ==============================
    // TOTAL
    // ==============================

    const totalAmount = Math.max(
        0,
        subtotal - discount
    );

    // ==============================
    // PLACE ORDER
    // ==============================

   const placeOrder = async () => {

    console.log("USER BEFORE ORDER:", user);

    if (!user || !user.email) {

        Swal.fire({
            icon: "warning",
            title: "Please Login",
            text: "Please login before placing an order."
        });

        navigate("/login");

        return;
    }

    if (products.length === 0) {

        Swal.fire({
            icon: "warning",
            title: "Cart is empty",
            text: "Please add some products first."
        });

        return;
    }

    setLoading(true);

    try {

        const res = await axios.post(
            "https://restaurentbackend.vercel.app/placeorder",
            {
                products: products,
                email: user.email,
                name: orderData.name,
                contact: orderData.contact,
                address: orderData.address,
                pincode: orderData.pincode,
                totalAmount: totalAmount,
                paymentMethod: paymentMethod
            }
        );

        console.log("ORDER RESPONSE:", res.data);

       if (res.data.status) {

    const savedOrder = res.data.order;

    // 🔔 Notification create
    let oldNotifications =
        JSON.parse(localStorage.getItem("adminNotifications")) || [];

    let newNotification = {
        id: Date.now(),
        type: "order",
        title: "New Order",
        message: `New order received from ${orderData.name || "Customer"}.`,
        read: false
    };

    let updatedNotifications = [
        newNotification,
        ...oldNotifications
    ];

    localStorage.setItem(
        "adminNotifications",
        JSON.stringify(updatedNotifications)
    );

    // Navbar notification ko immediately update karega
    window.dispatchEvent(new Event("notificationUpdate"));

    Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully."
    }).then(() => {

        navigate("/successful", {
            state: {
                ...orderData,
                ...savedOrder
            }
        });

    });
}

    } catch (error) {

        console.log("Place Order Error:", error);

        Swal.fire({
            icon: "error",
            title: "Order Failed",
            text: "Something went wrong."
        });

    } finally {

        setLoading(false);
    }
};

    // ==============================
    // JSX
    // ==============================

    return (

        <div className="orderbill">

            {/* ==============================
                HEADER
            ============================== */}

            <div className="orderbill-header">

                <h1>Order Summary</h1>

                <p>
                    Review your order before placing it
                </p>

            </div>


            {/* ==============================
                MAIN CONTAINER
            ============================== */}

            <div className="orderbill-container">


                {/* ==============================
                    DELIVERY INFORMATION
                ============================== */}

                <div className="order-section">

                    <h2>
                        <FiMapPin />
                        Delivery Information
                    </h2>


                    <div className="delivery-info">

                        <div className="delivery-item">

                            <FiUser />

                            <div>
                                <span>Name</span>

                                <strong>
                                    {orderData.name || "Not Available"}
                                </strong>
                            </div>

                        </div>


                        <div className="delivery-item">

                            <FiPhone />

                            <div>
                                <span>Contact</span>

                                <strong>
                                    {orderData.contact || "Not Available"}
                                </strong>
                            </div>

                        </div>


                        <div className="delivery-item">

                            <FiMapPin />

                            <div>
                                <span>Address</span>

                                <strong>
                                    {orderData.address || "Not Available"}
                                </strong>
                            </div>

                        </div>


                        <div className="delivery-item">

                            <FiMapPin />

                            <div>
                                <span>Pincode</span>

                                <strong>
                                    {orderData.pincode || "Not Available"}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ==============================
                    PRODUCTS
                ============================== */}

                <div className="order-section">

                    <h2>
                        <FiCheckCircle />
                        Your Products
                    </h2>


                    <div className="order-products">

                        {products.map((item, index) => (

                            <div
                                className="order-product"
                                key={item._id || index}
                            >

                                {/* IMAGE */}

                                <div className="product-image">

                                    <img
                                        src={item.image}
                                        alt={item.productname}
                                    />

                                </div>


                                {/* DETAILS */}

                                <div className="product-details">

                                    <h3>
                                        {item.productname}
                                    </h3>

                                    <p>
                                        Category:{" "}
                                        {item.category || "Food"}
                                    </p>

                                    <p>
                                        Quantity:{" "}
                                        {item.quantity || 1}
                                    </p>

                                </div>


                                {/* PRICE */}

                                <div className="product-price">

                                    ₹
                                    {
                                        Number(item.price || 0) *
                                        Number(item.quantity || 1)
                                    }

                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* ==============================
                    PRICE SUMMARY
                ============================== */}

                <div className="order-section">

                    <h2>
                        Price Details
                    </h2>


                    <div className="price-summary">

                        <div className="price-row">

                            <span>
                                Subtotal
                            </span>

                            <span>
                                ₹{subtotal}
                            </span>

                        </div>


                        <div className="price-row discount-row">

                            <span>
                                Discount
                            </span>

                            <span>
                                - ₹{discount}
                            </span>

                        </div>


                        <hr />


                        <div className="price-row total-row">

                            <strong>
                                Total Amount
                            </strong>

                            <strong>
                                ₹{totalAmount}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==============================
                    PAYMENT METHOD
                ============================== */}

                <div className="order-section">

                    <h2>
                        Payment Method
                    </h2>


                    <div className="payment-options">


                        {/* UPI */}

                        <label
                            className={
                                paymentMethod === "UPI"
                                    ? "payment-option active"
                                    : "payment-option"
                            }
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={
                                    paymentMethod === "UPI"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <div>

                                <strong>
                                    UPI Payment
                                </strong>

                                <p>
                                    Pay using UPI
                                </p>

                            </div>

                        </label>


                        {/* COD */}

                        <label
                            className={
                                paymentMethod === "COD"
                                    ? "payment-option active"
                                    : "payment-option"
                            }
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={
                                    paymentMethod === "COD"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <div>

                                <strong>
                                    Cash On Delivery
                                </strong>

                                <p>
                                    Pay when your order arrives
                                </p>

                            </div>

                        </label>

                    </div>


                    {/* ==============================
                        QR CODE
                    ============================== */}

                    {paymentMethod === "UPI" && (

                        <div className="qr-section">

                            <h3>
                                Scan QR Code
                            </h3>

                            <QRCode
                                value="upi://pay?pa=demo@upi&pn=FoodStore"
                                size={180}
                            />

                            <p>
                                Scan this QR code using your
                                UPI app.
                            </p>

                        </div>

                    )}

                </div>


                {/* ==============================
                    PAYMENT STATUS
                ============================== */}

                <div className="payment-status-box">

                    <span>
                        Payment Status
                    </span>

                    <strong>
                        {loading ? "Processing..." : "Paid"}
                    </strong>

                </div>


                {/* ==============================
                    PLACE ORDER BUTTON
                ============================== */}

                <button
                    className="place-order-btn"
                    onClick={placeOrder}
                    disabled={loading}
                >

                    {loading
                        ? "Placing Order..."
                        : `Place Order - ₹${totalAmount}`
                    }

                </button>


                {/* ==============================
                    BACK BUTTON
                ============================== */}

                <button
                    className="back-shopping-btn"
                    onClick={() => navigate("/shopcart")}
                >
                    Back to Cart
                </button>

            </div>

        </div>
    );
}