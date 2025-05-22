import React,{useEffect} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute'
import { fetchUserProfile } from './redux/slices/UserSlice';
import { useDispatch } from 'react-redux';
import ErrorPages from './pages/Error'
import ProductPage from './pages/ProductPage';
import ProductDetails from './pages/ProductDetails'
import AdminPages from './pages/AdminPages';
import CreateProduct from './pages/CreateProduct';
import Navbar from './components/Navbar';
import Card from './pages/Card';
import Layout from './components/Layout';
import Footer from './components/Footer';
import ProtectedRoute2 from './components/ProtectedRoute2';


function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const token =localStorage.getItem('token');
    if(token){
      dispatch(fetchUserProfile())
    }
  },[dispatch])
   
 const loading = useSelector(state => state.user.loading);
const userInfo = useSelector(state => state.user.userInfo);
const isAdmin = userInfo?.data?.role === true;

console.log('userInfo:', userInfo);
console.log('userInfo?.data?.role:', userInfo?.data?.role);
console.log('isAdmin:', isAdmin);

  return (
    <>
    
    <BrowserRouter>
    <Layout>
    <Navbar/>
    <Routes>
<Route path='/' element={<Home />}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/error' element={<ErrorPages/>}/>
<Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute> }/>
<Route path='/products'element={<ProductPage/>}/>
<Route path='/product/:productId' element={<ProductDetails/>}/>
 <Route 
          path="/admin" 
          element={
            <ProtectedRoute2 isAdmin={isAdmin} loading={loading}>
              <AdminPages />
            </ProtectedRoute2>
          } 
        />
        <Route 
          path="/addproduct" 
          element={
            <ProtectedRoute2 isAdmin={isAdmin} loading={loading}>
              <CreateProduct />
            </ProtectedRoute2>
          } 
        />
<Route path='/cart' element={<Card/>}/>
</Routes>
<Footer/>
    </Layout>
    


   
    </BrowserRouter>
  </>
  )
}

export default App
