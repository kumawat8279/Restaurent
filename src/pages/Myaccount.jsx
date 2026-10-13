import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    FiUser,
    FiShoppingBag,
    FiCalendar,
    FiMapPin,
    FiPhone,
    FiEye,
    FiArrowLeft
} from "react-icons/fi";

import "../css/Myaccount.css";

export default function Myaccount() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || !user.email) {
            setLoading(false);
            return;
        }

        axios.post("https://restaurentbackend.vercel.app/myorders", {
            email: user.email
        })
            .then((res) => {

                console.log("MY ORDERS RESPONSE:", res.data);

                if (res.data.status) {
                    setOrders(res.data.orders);
                }

            })
            .catch((error) => {

                console.log("Orders Error:", error);

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);


    const formatDate = (date) => {

        if (!date) {
            return "Not Available";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

    };


    return (

        <div className="account-page">

            <div className="account-container">


                {/* HEADER */}

                <div className="account-header">

                    <FiArrowLeft  onClick={()=>navigate("/dashboard")}/>
                    <div className="account-title">


                        <div className="account-icon">
                            <FiUser />
                        </div>

                        <div>
                            <h1>My Account</h1>

                            <p>
                                Manage your account and view your orders
                            </p>
                        </div>

                    </div>


                    <button
                        className="shopping-btn"
                        onClick={() => navigate("/")}
                    >
                        <FiShoppingBag />
                        Continue Shopping
                    </button>

                </div>


                {/* ORDERS */}

                <div className="orders-section">

                    <div className="orders-heading">

                        <div>

                            <h2>My Orders</h2>

                            <p>
                                Your recent orders are shown below.
                            </p>

                        </div>


                        <span className="order-count">
                            {orders.length} Orders
                        </span>

                    </div>


                    {loading ? (

                        <div className="empty-orders">
                            <h3>Loading Orders...</h3>
                        </div>

                    ) : orders.length === 0 ? (

                        <div className="empty-orders">

                            <div className="empty-icon">
                                <FiShoppingBag />
                            </div>

                            <h3>No Orders Yet</h3>

                            <p>
                                You haven't placed any orders yet.
                            </p>

                            <button
                                onClick={() => navigate("/")}
                            >
                                Start Shopping
                            </button>

                        </div>

                    ) : (

                        <div className="orders-list">

                            {orders.map((order, index) => (

                                <div
                                    className="order-item"
                                    key={order._id || index}
                                >

                                    {/* ORDER TOP */}

                                    <div className="order-top">

                                        <div className="order-info-left">

                                            <span className="order-label">
                                                Order ID
                                            </span>

                                            <strong className="order-id">
                                                #{order._id?.slice(-8).toUpperCase()}
                                            </strong>


                                            <span className="order-label order-date-label">
                                                Order Date
                                            </span>

                                            <strong className="order-date">
                                                <FiCalendar />
                                                {formatDate(order.orderDate)}
                                            </strong>

                                        </div>


                                        <div
                                            className={
                                                order.paymentStatus === "Paid"
                                                    ? "status paid"
                                                    : "status pending"
                                            }
                                        >
                                            {order.paymentStatus || "Pending"}
                                        </div>

                                    </div>


                                    {/* PRODUCTS */}

                                    <div className="account-products">

                                        {order.products?.map(
                                            (product, productIndex) => (

                                                <div
                                                    className="account-product"
                                                    key={
                                                        product._id ||
                                                        productIndex
                                                    }
                                                >

                                                    <img
                                                        src={product.image}
                                                        alt={product.productname}
                                                    />


                                                    <div className="account-product-info">

                                                        <h3>
                                                            {product.productname}
                                                        </h3>

                                                        <p>
                                                            {product.category}
                                                        </p>

                                                        <span>
                                                            ₹{product.price} ×{" "}
                                                            {product.quantity || 1}
                                                        </span>

                                                    </div>


                                                    <strong>

                                                        ₹
                                                        {Number(product.price) *
                                                            Number(
                                                                product.quantity || 1
                                                            )}

                                                    </strong>

                                                </div>

                                            )
                                        )}

                                    </div>


                                    {/* CUSTOMER */}

                                    <div className="order-customer">

                                        <div>
                                            <FiUser />

                                            <span>
                                                {order.name || "Customer"}
                                            </span>
                                        </div>


                                        <div>
                                            <FiPhone />

                                            <span>
                                                {order.contact ||
                                                    "Not Available"}
                                            </span>
                                        </div>


                                        <div>
                                            <FiMapPin />

                                            <span>
                                                {order.address ||
                                                    "Not Available"}
                                            </span>
                                        </div>

                                    </div>


                                    {/* BOTTOM */}

                                    <div className="order-bottom">

                                        <div className="payment-method">

                                            Payment:{" "}

                                            <strong>

                                                {order.paymentMethod === "UPI"
                                                    ? "UPI Payment"
                                                    : "Cash on Delivery"}

                                            </strong>

                                        </div>


                                        <div className="order-bottom-right">

                                            <div className="account-total">

                                                Total:

                                                <strong>
                                                    ₹{order.totalAmount || 0}
                                                </strong>

                                            </div>


                                            <button
                                                className="view-order-btn"
                                                onClick={() => navigate("/orderdetails", { state: order })}
                                            >
                                                <FiEye />
                                                View Order
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}