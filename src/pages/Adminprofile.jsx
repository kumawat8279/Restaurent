import React, { useState } from "react";
import "../css/admin.css";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Adminprofile() {

    let navigate= useNavigate()
    let saveduser = JSON.parse(localStorage.getItem("user")) || {};

    let [userdata, setuserdata] = useState({
        firstname: saveduser.firstname || "",
        email: saveduser.email || ""
    });

    let [newpassword, setnewpassword] = useState("");

    let inputvalue = (e) => {
        setuserdata({
            ...userdata,
            [e.target.name]: e.target.value
        });
    };

   let saveprofile = () => {

    axios.put("http://localhost:8080/updateuser", {
        oldemail: saveduser.email,
        firstname: userdata.firstname,
        email: userdata.email,
        password: newpassword
    })
    .then((res) => {

        if (res.data.status) {

            localStorage.setItem(
                "user",
                JSON.stringify({
                    firstname: userdata.firstname,
                    email: userdata.email
                })
            );

            alert("Profile Updated Successfully!");
        } else {
            alert(res.data.message || "Update failed");
        }

    })
    .catch((err) => {
        console.log("UPDATE ERROR", err);
    });
};

    let firstletter = userdata.firstname
        ? userdata.firstname.charAt(0).toUpperCase()
        : "A";

    return (
        <div className="admin-profile-page">
       

            <div className="admin-profile-card">
             <FiArrowLeft onClick={()=>navigate("/setting")}/>

                {/* PROFILE */}
                <div className="admin-profile-avatar">
                    {firstletter}
                </div>

                <h1>Admin Profile</h1>

                <p className="profile-subtitle">
                    Manage your account information
                </p>


                {/* NAME */}
                <div className="profile-input">
                    <label>Name</label>

                    <input
                        type="text"
                        name="firstname"
                        value={userdata.firstname}
                        onChange={inputvalue}
                    />
                </div>


                {/* EMAIL */}
                <div className="profile-input">
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={userdata.email}
                        onChange={inputvalue}
                    />
                </div>


                {/* NEW PASSWORD */}
                <div className="profile-input">
                    <label>New Password</label>

                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newpassword}
                        onChange={(e) => setnewpassword(e.target.value)}
                    />
                </div>


                {/* SAVE */}
                <button
                    className="save-profile-btn"
                    onClick={saveprofile}
                >
                    Save Changes
                </button>

            </div>

        </div>
    );
}