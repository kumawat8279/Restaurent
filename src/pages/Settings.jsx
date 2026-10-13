import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/setting.css";
import Sidebar from "../components/Sidebar";

export default function Settings() {

    let navigate = useNavigate();

    return (
        <div className="settings-page">

            <div className="settings-header">
            <Sidebar/>
                <h1>⚙️ Settings</h1>
                <p>Manage your dashboard settings</p>
            </div>


            <div className="settings-container">

                {/* Profile */}
                <div
                    className="setting-card"
                    onClick={() => navigate("/admin")}
                >
                    <div className="setting-icon">
                        👤
                    </div>

                    <div className="setting-content">
                        <h3>Profile</h3>
                        <p>Manage your name, email and profile information</p>
                    </div>

                    <span className="setting-arrow">›</span>
                </div>


                {/* Notifications */}
                <div
                    className="setting-card"
                    onClick={() => navigate("/notification")}
                >
                    <div className="setting-icon">
                        🔔
                    </div>

                    <div className="setting-content">
                        <h3>Notifications</h3>
                        <p>Manage order and website notifications</p>
                    </div>

                    <span className="setting-arrow">›</span>
                </div>


               


                {/* Security */}
                <div
                    className="setting-card"
                    onClick={() => navigate("/admin")}
                >
                    <div className="setting-icon">
                        🔒
                    </div>

                    <div className="setting-content">
                        <h3>Security</h3>
                        <p>Manage password and account security</p>
                    </div>

                    <span className="setting-arrow">›</span>
                </div>

            </div>

        </div>
    );
}