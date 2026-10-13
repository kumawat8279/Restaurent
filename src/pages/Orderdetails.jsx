import React from 'react'


import { useLocation, useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiCalendar,
    FiMapPin,
    FiPhone,
    FiUser,
    FiCheckCircle
} from "react-icons/fi";

import "../css/orderdetails.css"

import html2pdf from "html2pdf.js";

export default function Orderdetails() {


    const location = useLocation();
    const navigate = useNavigate();

    const order = location.state;

    // Agar order data nahi mila
    if (!order) {
        return (
            <div className="order-details-error">

                <h2>Order Not Found</h2>

                <p>
                    This order could not be found.
                </p>

                <button onClick={() => navigate("/myaccount")}>
                    <FiArrowLeft />
                    Back to My Account
                </button>

            </div>
        );
    }

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


    const downloadPDF = () => {

        const element = document.getElementById("order-details-pdf");

        const options = {
            margin: 10,
            filename: `Order-${order._id?.slice(-8).toUpperCase()}.pdf`,
            image: {
                type: "jpeg",
                quality: 0.98
            },
            html2canvas: {
                scale: 2,
                useCORS: true
            },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        html2pdf()
            .set(options)
            .from(element)
            .save();
    };
    return (

        <div className="order-details-page">

            <div className="order-details-container" id="order-details-pdf">

                {/* HEADER */}

                <div className="order-details-header">

                    <button
                        className="back-account-btn"
                        onClick={() => navigate("/myaccount")}
                    >
                        <FiArrowLeft />
                        Back to My Account
                    </button>

                    <div className="success-icon">
                        <FiCheckCircle />
                    </div>

                    <h1>Order Details</h1>

                    <p>
                        Here are the details of your order.
                    </p>

                </div>


                {/* ORDER INFO */}

                <div className="order-info-card">

                    <div className="info-box">

                        <span>Order ID</span>

                        <strong>
                            #{order._id?.slice(-8).toUpperCase()}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Order Date</span>

                        <strong>
                            <FiCalendar />
                            {formatDate(order.orderDate)}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Payment</span>

                        <strong>
                            {order.paymentMethod === "UPI"
                                ? "UPI Payment"
                                : "Cash on Delivery"}
                        </strong>

                    </div>


                    <div className="info-box">

                        <span>Status</span>

                        <strong
                            className={
                                order.paymentStatus === "Paid"
                                    ? "details-paid"
                                    : "details-pending"
                            }
                        >
                            {order.paymentStatus || "Pending"}
                        </strong>

                    </div>

                </div>


                {/* CUSTOMER INFORMATION */}

                <div className="details-card">

                    <h2>Delivery Information</h2>

                    <div className="customer-details">

                        <div>

                            <FiUser />

                            <section>
                                <span>Name</span>
                                <strong>
                                    {order.name || "Not Available"}
                                </strong>
                            </section>

                        </div>


                        <div>

                            <FiPhone />

                            <section>
                                <span>Contact</span>
                                <strong>
                                    {order.contact || "Not Available"}
                                </strong>
                            </section>

                        </div>


                        <div>

                            <FiMapPin />

                            <section>
                                <span>Address</span>
                                <strong>
                                    {order.address || "Not Available"}
                                </strong>
                            </section>

                        </div>


                        <div>

                            <span className="pin-icon">
                                📮
                            </span>

                            <section>
                                <span>Pincode</span>
                                <strong>
                                    {order.pincode || "Not Available"}
                                </strong>
                            </section>

                        </div>

                    </div>

                </div>


                {/* PRODUCTS */}

                <div className="details-card">

                    <h2>Ordered Products</h2>

                    <div className="details-products">

                        {order.products?.map((product, index) => (

                            <div
                                className="details-product"
                                key={product._id || index}
                            >

                                <img
                                    src={product.image}
                                    alt={product.productname}
                                />

                                <div className="details-product-info">

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
                                        Number(product.quantity || 1)}
                                </strong>

                            </div>

                        ))}

                    </div>

                </div>


                {/* TOTAL */}

                <div className="details-total-card">

                    <div>

                        <span>Payment Method</span>

                        <strong>
                            {order.paymentMethod === "UPI"
                                ? "UPI Payment"
                                : "Cash on Delivery"}
                        </strong>

                    </div>


                    <div>

                        <span>Total Amount</span>

                        <strong className="total-price">
                            ₹{order.totalAmount || 0}
                        </strong>

                    </div>

                </div>


                {/* BUTTON */}

                <div className="details-bottom">

                    <button
                        onClick={() => navigate("/myaccount")}
                    >
                        <FiArrowLeft />
                        Back to Orders
                    </button>

                    <button
                        className="download-bill-btn"
                        onClick={downloadPDF}
                    >
                        📄 Download Bill
                    </button>

                </div>
            </div>

        </div>
        // </>
    )
}
