import React, { useContext, useEffect, useState } from 'react'


import "../css/Recipes.css"


import image from "../images/food1.jpg"

import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from './SearchContext'

export default function Recipes() {


  let navigate = useNavigate()

  let { search, setUserproducts } = useContext(SearchContext)

  let [userproducts, setuserproducts] = useState([])

  function getproducts() {
    axios.get("https://restaurentbackend.vercel.app/getproducts").then((res) => {
      if (res.data.status) {
        setuserproducts(res.data.myallproducts)
        setUserproducts(res.data.myallproducts)
      }
      else {
        alert(" x not products")
      }
    })

  }

  useEffect(() => {
    getproducts()
  }, [])



  let addproduct = (item) => {

    axios.post("https://restaurentbackend.vercel.app/allprocart", {
      products: item
    })
      .then((res) => {

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

      })
      .catch((err) => {
        console.log(err);
      });

  }

  let addwishlist = (item) => {

    axios.post("https://restaurentbackend.vercel.app/addwishlist", { products: item }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Product added to wishlist",
          showConfirmButton: false,
          showCloseButton: true
        });
      }
    }).catch((err) => {
      console.log(err);
    });

  }




  let filteredproducts = userproducts.filter((item) => {

    return item.productname
      .toLowerCase()
      .includes(search.toLowerCase())

  })


  return (
    <>



      <div className="bg-color" id='Recipes'>
        <div className='line1'>

        </div>

        <h1 className='innerorder'>ALL RECIPES</h1>
        <div className='allboxes'>

          {/* 1 */}
          {filteredproducts.map((item) => {
            return (
              <>
                <div className="innerbox1">

                  <div className="image">
                    <img src={item.image} alt="Product" />

                    <div className="hover-icons">
                      <i
                        className="fa-solid fa-eye"
                        onClick={() => navigate("/productdetails", { state: item })}
                      ></i>
                      <i className="fa-solid fa-heart" onClick={() => addwishlist(item)}></i>
                    </div>
                  </div>

                  <div className="product-info">

                    <h3>{item.productname}</h3>

                    <div className="rating">
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <span>⭐</span>
                      <small>{item.rating}</small>
                    </div>

                    <div className="price">
                      <p>₹{item.price}</p>
                      <h5 className='cart' onClick={() => addproduct(item)}>Add to cart</h5>
                    </div>

                  </div>

                </div>

              </>
            )
          })}


        </div>


      </div>
    </>
  )
}
