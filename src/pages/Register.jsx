import React, { useState } from 'react'

import "../css/Register.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Register() {

    // let go = useNavigate()
    let [userdata, setuserdata] = useState({})

    let inputvalue = (e) => {
        setuserdata({
            ...userdata,
            [e.target.name]: e.target.value
        })
    }

    let savedata = (e) => {
        e.preventDefault();
        if (
            !userdata.firstname ||
            !userdata.email ||
            !userdata.password

        ) {
            Swal.fire({
                toast: true,
                position: "top",
                icon: "error",
                title: "please fill out all sections",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                showCloseButton: true
            });

            return;
        }

        axios.post("http://localhost:8080/register", { userdata }).then((res) => {
            if (res.data.status) {

                  let oldNotifications =
        JSON.parse(localStorage.getItem("adminNotifications")) || [];

    let newNotification = {
        id: Date.now(),
        type: "user",
        title: "New User",
        message: `${userdata.firstname} has registered.`,
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

    // Navbar notification count immediately update
    window.dispatchEvent(new Event("notificationUpdate"));



                // Name aur Email localStorage me save
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        firstname: userdata.firstname,
                        email: userdata.email
                    })
                );

                localStorage.setItem(
                    "userEmail",
                    userdata.email
                );

                Swal.fire({
                    title: "Good Job!",
                    text: "Registration Successful!",
                    icon: "success",
                }).then(() => {
                    localStorage.setItem("isRegistered", "true");
    window.location.href = "/";

                });
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.data.message || "Registration failed!",
                });
            }
        })
    }


    return (
        <>
            <div className="register">

                <h2>Create Account</h2>

                <form>

                    <input
                        type="text"
                        placeholder="Enter your Name" onChange={inputvalue} name='firstname'
                    />

                    <input
                        type="email"
                        placeholder="Enter your Email" onChange={inputvalue} name='email'
                    />

                    <input
                        type="password"
                        placeholder="Enter Password" onChange={inputvalue} name='password'
                    />



                    <button type="submit" onClick={savedata}>
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?
                    <Link to='/login'> <a> Login</a></Link>

                </p>

            </div>
        </>
    )
}
