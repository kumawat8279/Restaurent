import React, { useEffect, useState } from 'react'


import "../css/Dashboard.css"
import Sidebar from './Sidebar'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Dashboard() {

    const [orders, setOrders] = useState([]);
    let [totalexpense, settotalexpense] = useState(0);
    let [totalsales, settotalsales] = useState(0)

    let gettotalsalse = () => {
        axios.get("https://restaurentbackend.vercel.app/gettotalsalse").then((res) => {
            if (res.data.status) {
                settotalsales(res.data.totalsalse)
            }
        }).catch((err) => {
            console.log("TOTAL SALES ERROR", err);
        })
    }

    useEffect(() => {
        gettotalsalse()
        gettotalexpense()
        getoders()
    }, [])

    let gettotalexpense = () => {

        axios.get("https://restaurentbackend.vercel.app/gettotalexpense")
            .then((res) => {

                if (res.data.status) {
                    settotalexpense(res.data.totalexpense);
                }

            })
            .catch((err) => {
                console.log("TOTAL EXPENSE ERROR", err);
            });

    };

    let getoders = () => {
        axios.get("https://restaurentbackend.vercel.app/allorders").then((res) => {
            if (res.data.status) {
                setOrders(res.data.orders)
            }
        }).catch((err) => {
            console.log("TOTAL EXPENSE ERROR", err);
        });
    }
    return (
        <>
            <Sidebar />
            <div className="dashboard">

                <div className="dashboard-navbar">

                    <div className="dashboard-title">
                        <h2>Restaurant 😋</h2>

                    </div>
                    <Link to='/' className='back-link '> <h2 className='back-arrow'><FiArrowLeft />back</h2>
                    </Link>

                    <div className="search-box">
                        🔍
                        <input type="text" placeholder="Search" />
                    </div>

                    <div className="dashboard-icons">
                        <button>◯</button>
                        <button>♧</button>

                        <div className="profile">
                            <div className="profile-img">👨🏻</div>

                            <div>
                                <h4>Jhon Smith</h4>
                                <p>User</p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="dashboard-grid">

                    {/* LEFT SIDE */}
                    <div className="dashboard-left">

                        <div className="top-cards">

                            <div className="stat-card">
                                <h4>Activity</h4>

                                <div className="fake-line">
                                    <span></span>
                                </div>

                                <p>Total Sales</p>
                                <h2>$1200.00</h2>
                            </div>


                            <div className="stat-card">
                                <div className="card-heading">
                                    <h4>Total Sales</h4>
                                    <span>•••</span>
                                </div>

                                <h1>${totalsales}</h1>

                                <div className="card-bottom">
                                    <span>1200 item</span>
                                    <span className="red">↓ 34.7%</span>
                                </div>
                            </div>


                            <div className="stat-card">
                                <div className="card-heading">
                                    <h4>Total Expense</h4>
                                    <span>•••</span>
                                </div>

                                <h1>${totalexpense}</h1>

                                <div className="card-bottom">
                                    <span>1500 item</span>
                                    <span className="green">↑ 34.7%</span>
                                </div>
                            </div>

                        </div>


                        <div className="chart-card">
                            <div className="chart-header">
                                <h3>Order Rate</h3>

                                <select>
                                    <option>Year</option>
                                    <option>Month</option>
                                    <option>Week</option>
                                </select>
                            </div>

                            <div className="chart-placeholder">
                                <div className="line-chart">
                                    <div className="green-line"></div>
                                    <div className="orange-line"></div>
                                </div>

                                <div className="months">
                                    <span>Jun</span>
                                    <span>Jul</span>
                                    <span>Aug</span>
                                    <span>Sep</span>
                                    <span>Oct</span>
                                    <span>Nov</span>
                                    <span>Dec</span>
                                </div>
                            </div>

                        </div>


                        <div className="chart-card activity-chart">

                            <div className="chart-header">
                                <h3>Activity</h3>

                                <div className="chart-buttons">
                                    <button>Weekly</button>
                                    <button>Monthly</button>
                                    <button>Yearly</button>
                                </div>
                            </div>

                            <div className="bars">

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "40%" }}></div>
                                    <span>Apr</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "60%" }}></div>
                                    <span>May</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "85%" }}></div>
                                    <span>Jun</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "55%" }}></div>
                                    <span>Jul</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "65%" }}></div>
                                    <span>Aug</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "50%" }}></div>
                                    <span>Sep</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "75%" }}></div>
                                    <span>Oct</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "52%" }}></div>
                                    <span>Nov</span>
                                </div>

                                <div className="bar-item">
                                    <div className="bar" style={{ height: "95%" }}></div>
                                    <span>Dec</span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT SIDE */}
                    <div className="dashboard-right">

                        <div className="order-summary-card">

                            <div className="order-list">

                                <div className="order-item">
                                    <div className="order-line black"></div>

                                    <div>
                                        <h4>{orders.length}</h4>
                                        <p>Total Order</p>
                                    </div>

                                    <strong>56%</strong>
                                </div>


                                <div className="order-item">
                                    <div className="order-line red-line"></div>

                                    <div>
                                        <h4>{totalsales}</h4>
                                        <p>Total sales</p>
                                    </div>

                                    <strong className="red">50%</strong>
                                </div>


                                <div className="order-item">
                                    <div className="order-line green-line"></div>

                                    <div>
                                        <h4>300</h4>
                                        <p>Total Pending</p>
                                    </div>

                                    <strong className="green">50%</strong>
                                </div>

                            </div>



                        </div>


                        <div className="popular-food">

                            <div className="card-heading">
                                <h3>Popular Food</h3>
                                <span>•••</span>
                            </div>

                            <div className="donut">
                                <div className="donut-center">
                                    <small>Nov-Dec</small>
                                    <h3>$120K</h3>
                                    <small>87%</small>
                                </div>
                            </div>

                            <div className="food-legend">
                                <p><span className="orange-dot"></span> Asian Foods (35%)</p>
                                <p><span className="red-dot"></span> Italian Foods (40%)</p>
                                <p><span className="green-dot"></span> Western Foods (25%)</p>
                            </div>

                        </div>


                        <div className="performance-card">

                            <div className="card-heading">
                                <h3>Performance</h3>
                                <span>•••</span>
                            </div>

                            <p>Lorem ipsum dolor sit amet.</p>

                            <div className="performance-circle">
                                <span>70%</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
