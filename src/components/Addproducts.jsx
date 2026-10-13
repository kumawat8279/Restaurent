import React, { useState } from 'react'
import "../css/Addproducts.css"
import Sidebar from './Sidebar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export default function Addproducts() {

    let go = useNavigate()

    let [products, setproducts] = useState({})
    let inputvalue = (e) => {
        setproducts({ ...products, [e.target.name]: e.target.value })
    }

    let addproduct = (e) => {
        // console.log(products)

        axios.post("https://restaurentbackend.vercel.app/addproducts", { products }).then((res) => {
            if (res.data.status) {
                go("/products")
            }
            window.location.reload()
        })



    }


    return (
        <>
            <Sidebar />
            <div className="product-page">


                <div className="product-form">


                    <div className="form-header">


                        <div>
                            <p className="small-titlepro">PRODUCT MANAGEMENT</p>
                            <Link to='/' className='back-linkpro '> <h2 className='back-arrowproduct'><FiArrowLeft/>back</h2>
                            </Link>
                            <h1>Add New Product</h1>

                            <p className="sub-title">
                                Add your delicious product details here
                            </p>
                        </div>

                        <div className="header-icon">
                            🍕
                        </div>
                    </div>


                    <div className="form-content">

                        <div className="input-group">
                            <label>Product image</label>

                            <input
                                type="text"
                                placeholder="e.g.link" name='image' onChange={inputvalue}
                            />
                        </div>


                        <div className="input-group">
                            <label>Product Name</label>

                            <input
                                type="text"
                                placeholder="e.g. Margherita Pizza" name='productname' onChange={inputvalue}
                            />
                        </div>


                        <div className="input-group" onChange={inputvalue}>
                            <label>Category</label>

                            <select name='category'>
                                <option>Select Category</option>
                                <option>Pizza</option>
                                <option>Burger</option>
                                <option>Drink</option>
                                <option>Dessert</option>
                                <option>Pizza</option>
                                <option>Burger</option>
                                <option>Pasta</option>
                                <option>Noodles</option>
                                <option>Indian Food</option>
                                <option>Chinese Food</option>
                                <option>Fast Food</option>
                                <option>South Indian</option>
                                <option>Punjabi Food</option>
                                <option>Chicken</option>
                                <option>Salad</option>
                                <option>Soup</option>
                                <option>Rice</option>
                                <option>Sandwich</option>
                                <option>Desserts</option>
                                <option>Cake</option>
                                <option>Ice Cream</option>
                                <option>Beverages</option>
                            </select>
                        </div>


                        <div className="input-group">
                            <label>Price</label>

                            <div className="price-input">
                                <span>₹</span>

                                <input
                                    type="number"
                                    placeholder="120" name='price' onChange={inputvalue}
                                />
                            </div>
                        </div>


                        <div className="input-group">
                            <label>Rating</label>

                            <input
                                type="number"
                                placeholder="4.5" name='rating' onChange={inputvalue}
                            />
                        </div>


                        <div className="input-group full-width">
                            <label>Product Description</label>

                            <textarea
                                placeholder="Write something about your product..." name='textarea' onChange={inputvalue}
                            ></textarea>
                        </div>

                    </div>


                    <div className="form-buttons">

                        <button className="cancel-btn">
                            Cancel
                        </button>

                        <button className="add-btn" onClick={addproduct}>
                            <span>+</span> Add Product
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}
