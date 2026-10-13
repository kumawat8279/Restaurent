import React from 'react'

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiShoppingBag, FiUser } from "react-icons/fi";

import "../css/Successful.css"

export default function Successful() {


    const location = useLocation();
    const navigate = useNavigate();

    const order = location.state || {};

    const orderDate = order.orderDate
        ? new Date(order.orderDate).toLocaleDateString("en-IN")
        : new Date().toLocaleDateString("en-IN");
    return (
        <>

            <div className="success-page">

                <div className="success-card">

                    <div className="success-icon">
                        <FiCheckCircle />
                    </div>

                    <h1>Order Placed Successfully!</h1>

                    <p className="success-message">
                        Thank you for your order. Your order has been
                        placed successfully.
                    </p>


                    <div className="success-details">

                        <div className="success-detail-row">
                            <span>Order Date</span>
                            <strong>{orderDate}</strong>
                        </div>

                        <div className="success-detail-row">
                            <span>Payment Method</span>
                            <strong>
                                {order.paymentMethod === "UPI"
                                    ? "UPI Payment"
                                    : "Cash on Delivery"}
                            </strong>
                        </div>

                        <div className="success-detail-row">
                            <span>Total Amount</span>
                            <strong>
                                ₹{order.totalAmount || 0}
                            </strong>
                        </div>

                    </div>


                    <div className="success-buttons">

                        <button
                            className="view-orders-btn"
                            onClick={() => navigate("/myaccount")}
                        >
                            <FiUser />
                             My Account
                           
                        </button>


                        <button
                            className="continue-btn"
                            onClick={() => navigate("/")}
                        >
                            <FiShoppingBag />
                            Continue Shopping
                        </button>

                    </div>

                </div>

            </div>

        </>
    )
}
