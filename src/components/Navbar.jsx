import React, { useContext, useEffect, useState } from "react";

import "../css/Navbar.css";

import Bgimage from "./Bgimage";
import Desert from "./Desert";
import Recipes from "./Recipes";
import Ratedrecipes from "./Ratedrecipes";
import Location from "./Location";
import Footer from "./Footer";

import { Link, useNavigate } from "react-router-dom";

import { SearchContext } from "./SearchContext";
import Register from "../pages/Register";

export default function Navbar() {

    const navigate = useNavigate();

    // =====================================
    // SEARCH CONTEXT
    // =====================================

    const {
        search,
        setSearch,
        userproducts
    } = useContext(SearchContext);


    // =====================================
    // STATES
    // =====================================

    const [notifications, setNotifications] = useState([]);

    const [notificationCount, setNotificationCount] = useState(0);

    const [showNotification, setShowNotification] = useState(false);

    const [menuopen, setmenuopen] = useState(false);


    // =====================================
    // FILTER SEARCH PRODUCTS
    // =====================================

    const filteredproducts = userproducts.filter((item) =>
        item.productname
            ?.toLowerCase()
            .includes(search.toLowerCase())
    );


    // =====================================
    // GET NOTIFICATIONS
    // =====================================

    useEffect(() => {

        const getNotifications = () => {

            const saved =
                localStorage.getItem("adminNotifications");

            if (saved) {

                try {

                    const data = JSON.parse(saved);

                    setNotifications(data);

                    const unread = data.filter(
                        (item) => item.read === false
                    ).length;

                    setNotificationCount(unread);

                } catch (error) {

                    console.log(
                        "Notification error:",
                        error
                    );

                    setNotifications([]);

                    setNotificationCount(0);
                }

            } else {

                setNotifications([]);

                setNotificationCount(0);

            }
        };


        getNotifications();


        window.addEventListener(
            "notificationUpdate",
            getNotifications
        );


        return () => {

            window.removeEventListener(
                "notificationUpdate",
                getNotifications
            );

        };

    }, []);


    // =====================================
    // MENU OPEN / CLOSE
    // =====================================

    const toggleMenu = () => {

        setmenuopen((prev) => !prev);

    };


    const closeMenu = () => {

        setmenuopen(false);

    };


    // =====================================
    // PRODUCT CLICK
    // =====================================

    const openProduct = (item) => {

        setSearch("");

        navigate("/productdetails", {
            state: item
        });

    };


    // =====================================
    // NOTIFICATION CLICK
    // =====================================

    const openNotification = (item) => {

        if (item.type === "user") {

            navigate("/user");

        }

        if (item.type === "order") {

            navigate("/myaccount");

        }

        if (item.type === "review") {

            navigate("/orderdetails");

        }

        setShowNotification(false);

    };


    return (
        <>
    

            {/* 
                TOP NAVBAR
           */}

            <div
                className="nav1"
                id="home"
            >

                {/* SOCIAL ICONS */}

                <div className="icons">

                    <i className="fa-brands fa-linkedin-in"></i>

                    <i className="fa-brands fa-instagram"></i>

                    <i className="fa-brands fa-telegram"></i>

                    <i className="fa-brands fa-facebook"></i>

                </div>


                {/* REGISTER / LOGIN */}

                <div className="login">

                    <h4
                        onClick={() =>
                            navigate("/Register")
                        }
                    >
                        Register
                    </h4>

                    <span>/</span>

                    <h4
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </h4>

                </div>

            </div>


            {/* =================================================
                MAIN NAVBAR
            ================================================= */}

            <div className="nav2">


                {/* =================================================
                    LOGO
                ================================================= */}

                <div className="first">

                    <h1>
                        Food Blog
                    </h1>

                    <p>
                        Recipes & More
                    </p>

                </div>


                {/* =================================================
                    DESKTOP / MOBILE MENU
                ================================================= */}

                <div
                    className={
                        menuopen
                            ? "second show-menu"
                            : "second"
                    }
                >

                    <ul>

                        <li
                            onClick={closeMenu}
                        >
                            <a href="#home">
                                Home
                            </a>
                        </li>


                        <li
                            onClick={closeMenu}
                        >
                            <a href="#Freatures">
                                Features
                            </a>
                        </li>


                        <li
                            onClick={closeMenu}
                        >
                            <a href="#Recipes">
                                Recipes
                            </a>
                        </li>


                        <li
                            onClick={closeMenu}
                        >
                            <a href="#contact">
                                Contact
                            </a>
                        </li>


                        <Link
                            to="/dashboard"
                            onClick={closeMenu}
                        >

                            <li>
                                Dashboard
                            </li>

                        </Link>


                        <li
                            className="myaccount"
                            onClick={() => {

                                closeMenu();

                                navigate("/myaccount");

                            }}
                        >
                            My Orders
                        </li>

                    </ul>

                </div>


                {/* =================================================
                    SEARCH BOX
                ================================================= */}

                <div className="third">

                    <input
                        type="search"
                        placeholder="Search products"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />


                    {/* SEARCH RESULTS */}

                    {search && (

                        <div className="search-results">

                            {filteredproducts.length > 0 ? (

                                filteredproducts.map((item) => (

                                    <div
                                        className="search-item"
                                        key={item._id}
                                        onClick={() =>
                                            openProduct(item)
                                        }
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.productname}
                                        />

                                        <span>
                                            {item.productname}
                                        </span>

                                    </div>

                                ))

                            ) : (

                                <p className="no-result">
                                    No product found
                                </p>

                            )}

                        </div>

                    )}

                </div>


                {/* 
                    HEART + CART
                */}

                <div className="carticon">

                    {/* WISHLIST */}

                    <i
                        className="fa-solid fa-heart"
                        onClick={() =>
                            navigate("/wishlist")
                        }
                    ></i>


                    {/* CART */}

                    <i
                        className="fa-solid fa-cart-shopping"
                        onClick={() =>
                            navigate("/shopcart")
                        }
                    ></i>

                </div>


                {/* 
                    NOTIFICATION
                 */}

                <div
                    className="notification-bell"
                    onClick={() =>
                        setShowNotification(
                            (prev) => !prev
                        )
                    }
                >

                    🔔


                    {/* NOTIFICATION COUNT */}

                    {notificationCount > 0 && (

                        <span className="notification-count">

                            {notificationCount}

                        </span>

                    )}

                </div>


                {/* 
                    MOBILE MENU BUTTON
                */}

                <div
                    className="menu-btn"
                    onClick={toggleMenu}
                >

                    <i className="fa-solid fa-bars"></i>

                </div>


                {/* 
                    NOTIFICATION DROPDOWN
                */}

                {showNotification && (

                    <div className="notification-dropdown">

                        <h4>
                            Notifications
                        </h4>


                        {notifications.length === 0 ? (

                            <p className="empty-notification">
                                No notifications
                            </p>

                        ) : (

                            notifications
                                .slice(0, 5)
                                .map((item) => (

                                    <div
                                        className="dropdown-item"
                                        key={item.id}
                                        onClick={() =>
                                            openNotification(item)
                                        }
                                    >

                                        {/* ICON */}

                                        <span>

                                            {item.type ===
                                                "order" &&
                                                "🛒"}

                                            {item.type ===
                                                "user" &&
                                                "👤"}

                                            {item.type ===
                                                "review" &&
                                                "⭐"}

                                        </span>


                                        {/* TEXT */}

                                        <div>

                                            <h5>
                                                {item.title}
                                            </h5>

                                            <p>
                                                {item.message}
                                            </p>

                                        </div>

                                    </div>

                                ))

                        )}


                        {/* VIEW ALL */}

                        <button
                            className="view-all-btn"
                            onClick={() => {

                                setShowNotification(false);

                                navigate(
                                    "/notification"
                                );

                            }}
                        >
                            View All
                        </button>

                    </div>

                )}

            </div>


            {/* 
                WEBSITE CONTENT
            */}



            <Bgimage />

            <Desert />

            <Recipes />

            <Ratedrecipes />

            <Location />

            <Footer />

        </>
    );
}