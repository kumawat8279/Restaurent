import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Route, Routes ,Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Bgimage from './components/Bgimage'
import Desert from './components/Desert'
import Recipes from './components/Recipes'
import Ratedrecipes from './components/Ratedrecipes'
import Location from './components/Location'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './components/Login'
import Addproducts from './components/Addproducts'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Shopcart from './pages/Shopcart'
import Wishlist from './pages/Wishlist'
import Orderbill from './pages/Orderbill'
import Successful from './pages/Successful'
import Myaccount from './pages/Myaccount'
import Orderdetails from './pages/Orderdetails'
import Productdetails from './pages/Productdetails'
import User from './components/User'
import Searchcontext from './components/SearchContext'
import Adminprofile from './pages/Adminprofile'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'







function App() {
  const [count, setCount] = useState(0)

   const isRegistered = localStorage.getItem("isRegistered");

  return (
    <>
      
<BrowserRouter>
  <Routes>
    <Route path='/' element={ isRegistered
      ? <Navbar />
      : <Navigate to="/Register" replace />}></Route>
    <Route path='/bgimage' element={<Bgimage/>}></Route>
    <Route path='/desert' element={<Desert/>}></Route>
    <Route path='/recipe' element={<Recipes/>}></Route>
    <Route path='/ratedrecipes' element={<Ratedrecipes/>}></Route>
    <Route path='/location' element={<Location/>}></Route>
    <Route path='/footer' element={<Footer/>}></Route>
    <Route path='/Register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/addproducts' element={<Addproducts/>}></Route>
    <Route path='/sidebar' element={<Sidebar/>}></Route>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/products' element={<Products/>}></Route>
    <Route path='/shopcart' element={<Shopcart/>}></Route>
    <Route path='/wishlist' element={<Wishlist/>}></Route>
    <Route path='/orderbill' element={<Orderbill/>}></Route>
    <Route path='/successful' element={<Successful/>}></Route>
    <Route path='/myaccount' element={<Myaccount/>}></Route>
    <Route path='/orderdetails' element={<Orderdetails/>}></Route>
    <Route path='/productdetails' element={<Productdetails/>}></Route>
    <Route path='/user' element={<User/>}></Route>
    <Route path='/Searchcontext' element={<Searchcontext/>}></Route>
    <Route path='/admin' element={<Adminprofile/>}></Route>
    <Route path='/setting' element={<Settings/>}></Route>
    <Route path='/notification' element={<Notifications/>}></Route>
  </Routes>
</BrowserRouter>
      
    </>
  )
}

export default App
