import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Login() {

    const [signindata, setsignindata] = useState({});

    const navigate = useNavigate();

    const inputvalue = (e) => {

        setsignindata({
            ...signindata,
            [e.target.name]: e.target.value
        });

    };

    const savesigndata = (e) => {

        e.preventDefault();

        axios
            .post("http://localhost:8080/login", {
                signindata
            })
            .then((res) => {

                console.log("LOGIN RESPONSE:", res.data);

                if (res.data.status) {

                    // User data save
                    localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.user)
                    );

                    // Email separately save
                    localStorage.setItem(
                        "userEmail",
                        res.data.user.email
                    );

                    console.log(
                        "USER SAVED:",
                        res.data.user
                    );

                    console.log(
                        "EMAIL SAVED:",
                        res.data.user.email
                    );

                    toast.success("Login Successfully!", {
                        position: "top-center",
                        autoClose: 1000
                    });

                    navigate("/");
                }

                else {

                    toast.error(
                        "Invalid Email or Password!",
                        {
                            position: "top-center",
                            autoClose: 1000,
                            closeButton: true,
                            hideProgressBar: false
                        }
                    );

                }

            })
            .catch((err) => {

                console.log("LOGIN ERROR:", err);

                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Please try again."
                });

            });

    };

    return (

        <div className="register">

            <h2>Login</h2>

            <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={signindata.email || ""}
                onChange={inputvalue}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={signindata.password || ""}
                onChange={inputvalue}
            />

            <button onClick={savesigndata}>
                Login
            </button>

        </div>

    );
}