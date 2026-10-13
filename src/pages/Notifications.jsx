import React, { useEffect, useState } from "react";
import "../css/notification.css";
import Sidebar from "../components/Sidebar";

export default function Notifications() {

    let [notifications, setNotifications] = useState([]);

    useEffect(() => {

        let saved = localStorage.getItem("adminNotifications");

        if (saved) {
            setNotifications(JSON.parse(saved));
        } else {
            let defaultNotifications = [
                {
                    id: 1,
                    type: "order",
                    title: "New Order",
                    message: "A new order has been placed.",
                    read: false
                },
                {
                    id: 2,
                    type: "user",
                    title: "New User",
                    message: "A new user has registered.",
                    read: false
                },
                {
                    id: 3,
                    type: "review",
                    title: "New Review",
                    message: "A new review has been added.",
                    read: true
                }
            ];

            setNotifications(defaultNotifications);

            localStorage.setItem(
                "adminNotifications",
                JSON.stringify(defaultNotifications)
            );
        }

    }, []);

    // Mark notification as read
    let markAsRead = (id) => {

        let updated = notifications.map((item) =>
            item.id === id
                ? { ...item, read: true }
                : item
        );

        setNotifications(updated);

        localStorage.setItem(
            "adminNotifications",
            JSON.stringify(updated)
        );


    window.dispatchEvent(new Event("notificationUpdate"));
    };

    // Delete notification
    let deleteNotification = (id) => {

        let updated = notifications.filter(
            (item) => item.id !== id
        );

        setNotifications(updated);

        localStorage.setItem(
            "adminNotifications",
            JSON.stringify(updated)
        );


    window.dispatchEvent(new Event("notificationUpdate"));
    };

    // Clear all notifications
    let clearAll = () => {

        setNotifications([]);

        localStorage.removeItem("adminNotifications");


    window.dispatchEvent(new Event("notificationUpdate"));
    };

    // Unread count
    let unreadCount = notifications.filter(
        (item) => item.read === false
    ).length;

    return (

        <div className="notifications-page">

            <Sidebar />

            <div className="notifications-content">

                <div className="notifications-header">

                    <div>
                        <h1>🔔 Notifications</h1>

                        <p>
                            You have {unreadCount} unread notification
                            {unreadCount !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <button
                        className="clear-notification-btn"
                        onClick={clearAll}
                    >
                        Clear All
                    </button>

                </div>


                <div className="notifications-container">

                    {notifications.length === 0 ? (

                        <div className="no-notification">
                            🔔
                            <h3>No Notifications</h3>
                            <p>You don't have any notifications.</p>
                        </div>

                    ) : (

                        notifications.map((item) => (

                            <div
                                className={`notification-card ${
                                    !item.read ? "unread" : ""
                                }`}
                                key={item.id}
                            >

                                <div className="notification-icon">

                                    {item.type === "myaccount" && "🛒"}
                                  

                                    {item.type === "user" && "👤"}

                                    {item.type === "productdetails" && "⭐"}

                                </div>


                                <div className="notification-info">

                                    <h3>{item.title}</h3>

                                    <p>{item.message}</p>

                                    {!item.read && (
                                        <span className="unread-text">
                                            New
                                        </span>
                                    )}

                                </div>


                                <div className="notification-actions">

                                    {!item.read && (
                                        <button
                                            onClick={() =>
                                                markAsRead(item.id)
                                            }
                                        >
                                            Mark Read
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            deleteNotification(item.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>
    );
}