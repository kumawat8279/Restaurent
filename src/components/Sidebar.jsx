import React, { useState } from "react";
import "../css/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Sidebar() {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();


    // ==============================
    // LOGOUT
    // ==============================

    const logout = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Logout"
        }).then((result) => {

            if (result.isConfirmed) {

                localStorage.removeItem("user");
                localStorage.removeItem("userEmail");

                navigate("/register");
            }

        });

    };


    // ==============================
    // CLOSE SIDEBAR
    // ==============================

    const closeSidebar = () => {
        setOpen(false);
    };


    return (
        <>

            {/* SIDEBAR MENU BUTTON */}

            <button
                className="menu-btnsidebar"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>


            {/* OVERLAY */}

            <div
                className={
                    open
                        ? "overlay show"
                        : "overlay"
                }
                onClick={closeSidebar}
            ></div>


            {/* SIDEBAR */}

            <div
                className={
                    open
                        ? "sidebar open"
                        : "sidebar"
                }
            >


                {/* CLOSE BUTTON */}

                <button
                    className="close-sidebar"
                    onClick={closeSidebar}
                >
                    ✕
                </button>


                {/* LOGO */}

                <div className="sidebar-logo">

                  

                    <h2
                        onClick={() => navigate("/")}
                    >
                      🍕  FoodAdmin
                    </h2>

                </div>


                {/* MENU */}

                <div className="sidebar-menu">

                    <p className="menu-title">
                        MAIN MENU
                    </p>


                    <Link
                        to="/dashboard"
                        className="menu-item active"
                        onClick={closeSidebar}
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>


                    <Link
                        to="/products"
                        className="menu-item"
                        onClick={closeSidebar}
                    >
                        <span>🍔</span>
                        Products
                    </Link>


                    <Link
                        to="/addproducts"
                        className="menu-item"
                        onClick={closeSidebar}
                    >
                        <span>＋</span>
                        Add Product
                    </Link>


                    <Link
                        to="/myaccount"
                        className="menu-item"
                        onClick={closeSidebar}
                    >
                        <span>🛍</span>
                        Orders
                    </Link>


                    <Link
                        to="/user"
                        className="menu-item"
                        onClick={closeSidebar}
                    >
                        <span>👥</span>
                        Users
                    </Link>


                    <p className="menu-title settings-title">
                        SETTINGS
                    </p>


                    <Link
                        to="/setting"
                        className="menu-item"
                        onClick={closeSidebar}
                    >
                        <span>⚙</span>
                        Settings
                    </Link>

                </div>


                {/* BOTTOM */}

                <div className="sidebar-bottom">


                    {/* ADMIN PROFILE */}

                    <div
                        className="admin-profile"
                        onClick={() => {
                            closeSidebar();
                            navigate("/admin");
                        }}
                    >

                        <div className="admin-img">
                            A
                        </div>

                        <div>

                            <h4>
                                Admin
                            </h4>

                            <p>
                                Administrator
                            </p>

                        </div>

                    </div>


                    {/* LOGOUT */}

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        ↪ Logout
                    </button>

                </div>

            </div>

        </>
    );
}