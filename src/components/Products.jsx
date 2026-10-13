import React, { useEffect, useState } from 'react'

import "../css/Products.css"
import Sidebar from './Sidebar'
import axios from 'axios'

import image from "../images/food1.jpg"
import { Link, useNavigate } from 'react-router-dom'

import Swal from 'sweetalert2'
import { FiArrowLeft } from 'react-icons/fi'

export default function Products() {

    let navigate = useNavigate()

    let [userproducts, setuserproducts] = useState([])

    function getproducts() {
        axios.get("http://localhost:8080/getproducts").then((res) => {
            if (res.data.status) {
                setuserproducts(res.data.myallproducts)
            }
            else {
                alert(" x not products")
            }
        })

    }

    useEffect(() => {
        getproducts()
    }, [])

    let deletepro = (dltproduct) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {

            if (result.isConfirmed) {


                axios.post("http://localhost:8080/deletepro", { dltproduct })
                    .then((res) => {

                        if (res.data.status) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Product has been deleted successfully.",
                                icon: "success"
                            }).then(() => {
                                getproducts();
                            });

                        }

                    });

            }

        });
    };
    return (
        <>

            <Sidebar />
            <div className="products-page">

                {/* HEADER */}
                <div className="products-header">

                    <div>
                        <p className="small-title">
                            PRODUCT MANAGEMENT
                        </p>
                         <Link to='/' className='back-linkpro '> <h2 className='back-arrowpro'><FiArrowLeft />back</h2>
                    </Link>

                        <h1>All Products</h1>

                        <p className="sub-title">
                            Manage your delicious products here
                        </p>
                    </div>

                    <button className="add-product-btn" onClick={() => navigate("/addproducts")}>
                        + Add Product
                    </button>

                </div>


                {/* TABLE */}
                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>




                        {/* PRODUCT 1 */}

                        <tbody>

                            {userproducts.map((data, index) => {
                                return (
                                    <>
                                        <tr>

                                            <td>{index + 1}</td>

                                            <td>
                                                <div className="product-image">
                                                    <img src={data.image} />
                                                </div>
                                            </td>

                                            <td>{data.productname}</td>

                                            <td>
                                                <span className="category pizza">
                                                    {data.category}
                                                </span>
                                            </td>

                                            <td>₹{data.price}</td>

                                            <td>⭐ {data.rating}</td>

                                            <td>
                                                {data.textarea}
                                            </td>

                                            <td className="actions">

                                               

                                                <button className="delete-btn" onClick={() => deletepro(data)}>
                                                    🗑️
                                                </button>

                                            </td>

                                        </tr>
                                    </>
                                )
                            })}



                        </tbody>






                    </table>

                </div>

            </div>
        </>
    )
}
