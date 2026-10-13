import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaHeart, FaShoppingCart, FaTrashAlt } from 'react-icons/fa'

import image from "../images/food1.jpg"

import "../css/Wishlist.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function Wishlist() {


    let [wishlistdata, setwishlistdata] = useState([])

    let getwishlistdata = () => {
        axios.get("http://localhost:8080/getwishlist").then((res) => {
            if (res.data.status) {
                setwishlistdata(res.data.mywishlistpro)
            }
        })
    }

    useEffect(() => {
        getwishlistdata()
    }, [])

    let deletewishlist = (item) => {
        Swal.fire({
            title: "Remove item?",
            text: "This product will be removed from wishlist",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Remove",
            cancelButtonText: "Cancel",
            width: "300px"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:8080/deletewishlist", { dltwishlist: item, }).then((res) => {
                    if (res.data.status) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Product has been deleted successfully.",
                            icon: "success"
                        }).then(() => {
                            getwishlistdata()
                        })
                    }
                })
            }

        })
    }

    let clearwishlist = () => {
        axios.post("http://localhost:8080/dltwishmany").then((res) => {
            if (res.data.status) {
                setwishlistdata([])
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    let addtocart = (item) => {
        axios.post("http://localhost:8080/allprocart", { products: item }).then((res) => {
            if (res.data.status) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: "Product added to cart",
                    showConfirmButton: false,
                    showCloseButton: true
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>

            <div className="wishlist-page">

                <div className="wishlist-container">

                    {/* HEADER */}
                    <div className="wishlist-header">

                        <div className="wishlist-heading">
                            <div className="wishlist-icon">
                                <FaHeart />
                            </div>

                            <div>
                                <p>MY FAVORITES</p>
                                <h1>My Wishlist</h1>
                                <span>Products you love and want to order later</span>
                            </div>
                        </div>

                        <Link to="/" className="back-btn">
                            <FaArrowLeft />
                            <span>Continue Shopping</span>
                        </Link>

                    </div>


                    {/* WISHLIST INFO */}
                    <div className="wishlist-info">
                        <div>
                            <span className="wishlist-count">{wishlistdata.length}</span>
                            <p>Items saved in your wishlist</p>
                        </div>

                        <button className="clear-btn" onClick={clearwishlist}>
                            <FaTrashAlt />
                            Clear Wishlist
                        </button>
                    </div>


                    {/* PRODUCTS */}
                    <div className="wishlist-grid">


                        {/* CARD 1 */}
                        {wishlistdata.map((item) => {
                            return (
                                <>
                                    <div className="wishlist-card">

                                        <div className="wishlist-img">

                                            <img src={item.image} alt="product" />

                                            <div className="heart-circle">
                                                <FaHeart />
                                            </div>

                                            <span className="discount-badge">
                                                20% OFF
                                            </span>

                                        </div>

                                        <div className="wishlist-content">

                                            <span className="category-name">
                                                {item.productname}
                                            </span>

                                            <h3>{item.category}</h3>

                                            <div className="rating">
                                                ★★★★★
                                                <span>{item.rating}</span>
                                            </div>

                                            <div className="wishlist-price">
                                                <h2>₹{item.price}</h2>

                                            </div>

                                            <div className="wishlist-actions">

                                                <button className="wishlist-cart-btn" onClick={() => addtocart(item)}>
                                                    <FaShoppingCart />
                                                    Add to Cart
                                                </button>

                                                <button className="wishlist-delete-btn" onClick={() => deletewishlist(item)}>
                                                    <FaTrashAlt />
                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                </>
                            )
                        })}





                    </div>

                </div>

            </div>
        </>
    )
}
