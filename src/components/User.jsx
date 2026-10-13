import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../css/user.css"
import Swal from 'sweetalert2';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function User() {


    let [users, setUsers] = useState([]);

   let getusers = () => {

    let userData = localStorage.getItem("user");

    if (!userData) {
        return;
    }

    let user = JSON.parse(userData);

    axios.post("https://restaurentbackend.vercel.app/getcurrentuser", {
        email: user.email
    })
        .then((res) => {

            if (res.data.status) {
                setUsers([res.data.user]);
            }

        })
        .catch((err) => {
            console.log("USER ERROR", err);
        });
};

    useEffect(() => {
        getusers();
    }, []);


    let deleteuser = (dltuser) => {
        axios.post("https://restaurentbackend.vercel.app/deleteuser",{dltuser}).then((res) => {
            if (res.data.status) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted successfully.",
                    icon: "success"
                })
            }
            window.location.reload()
        })
    }
    return (
        <>
            <div className="users-page">

<div className="twouser">
    <h2>Users</h2>

<Link to='/dashboard' className='backlink'>
    <button className="back-btn">
        ← Back
    </button>
    </Link>
</div>
               

                <div className="user-table">

                    <table>

                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>delete user</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.map((user, index) => (

                                <tr key={user._id}>

                                    <td>{index + 1}</td>

                                    <td>{user.firstname}</td>

                                    <td>{user.email}</td>
                                    <td onClick={()=>deleteuser(user)}><FiTrash2/></td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </>
    )
}
