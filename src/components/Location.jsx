import React, { useEffect, useState } from 'react'

import "../css/Location.css"
import axios from 'axios'
export default function Location() {

    let [inputdata, setinputdata] = useState({})
    let inputvalue = (e) => {
        setinputdata({ ...inputdata, [e.target.name]: e.target.value })
    }

    let [location, setlocation] = useState(null)

    let getlivelocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude

                    console.log("latitude :", latitude)
                    console.log("longitude :", longitude)

                    setlocation({
                        latitude,
                        longitude
                    })
                },
                (error) => {
                    console.log(error.massage)
                    alert("please allow location permission")
                }

            )
        }
        else {
            alert("geo location is not supported by the user")
        }
    }

    useEffect(() => {
        getlivelocation()
    }, [])

    let senddata = () => {
        if (!location) {
            alert("Location is loading..")
            return
        }

        axios.post("http://localhost:8080/location", {
            ...inputdata,
            ...location
        })
            .then((res) => {
                // console.log("Response:", res.data)
                alert("Data sent successfully")
            })
            .catch((error) => {
                console.log("Error:", error)
            })
    }
    return (
        <>
            <div className='location'>
                <div className='map'>
                    {location && (
                        <iframe
                            src={`https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
                            width="550"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    )}
                </div>
                <div className='form'>
                    <input type='text' placeholder='Enter your Name' name='name' onChange={inputvalue} /> <br></br><br></br>
                    <input type='email' placeholder='Enter your Email' name='email' onChange={inputvalue} /><br></br><br></br>
                    <input type='number' placeholder='enter pincode' name='number' onChange={inputvalue} /><br></br><br></br>
                    <input type='number' placeholder='enter your contact' name='contact' onChange={inputvalue} /><br></br><br></br>
                    <textarea placeholder='Message' name='textarea' onChange={inputvalue}></textarea><br></br><br></br><br></br>

                    <button className='button' onClick={senddata}>Send message </button>
                </div>

            </div>

        </>
    )
}
