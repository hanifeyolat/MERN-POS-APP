import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

import HomePage from "./pages/HomePage";
import BillPage from "./pages/BillPage";
import CustomerPage from "./pages/CustomerPage";
import StatisticPage from "./pages/StatisticPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

import Header from "./components/Header";
import BillAddress from "./components/bills/BillAddress";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";


function App() {

  const dispatch = useDispatch()
  const [user, setUser] = useState(null);
  const ReduxUser = useSelector((state => state.user.currentUser))
  const userLogin = useSelector((state => state.user.userLogin))
  const userRefreshToken = useSelector((state => state.user.refreshToken))
  
  return (
    <>
    <ToastContainer/>
    <div className="App !overflow-x-hidden">
        <BrowserRouter>
        {userLogin && <Header/>}
            <div className={userLogin ? "px-10 py-4 mt-[10vh] w-full h-[90vh]" : "w-full h-full" }>
                <Routes>
                    <Route exact path="/" element={userLogin ? 	<Navigate to="/home" /> : <Navigate to="/login" />}/>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/cart" element={<CartPage />}/>
                    <Route path="/bills" element={<BillPage />}/>
                    <Route path="/bill-address" element={<BillAddress />}/>
                    <Route path="/customer" element={<CustomerPage />}/>
                    <Route path="/statistic" element={<StatisticPage />}/>
                    <Route path="/products" element={<ProductsPage />}/>
            
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>
                    <Route path="/change-password" element={<ChangePassword/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </div>
</>
  );
}

export default App;
