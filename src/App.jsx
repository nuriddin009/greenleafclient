import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/index.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import Users from "./pages/dashboard/users/index.jsx";
import Products from "./pages/dashboard/products/index.jsx";
import Category from "./pages/dashboard/category/index.jsx";
import Gallery from "./pages/dashboard/gallery/index.jsx";
import Video from "./pages/dashboard/video/index.jsx";
import Inbox from "./pages/dashboard/inbox/index.jsx";
import Settings from "./pages/dashboard/settings/index.jsx";
import Register from "./pages/auth/register/index.jsx";
import Login from "./pages/auth/login/index.jsx";
import HomePage from "./pages/dashboard/homePage/index.jsx";
import './App.css'
import GalleryPage from "./components/gallery/Gallery.jsx";
import Wishlist from "./pages/wishlist/index.jsx";
import Katalog from "./pages/katalog/index.jsx";
import Basket from "./pages/basket/index.jsx";
import Cabinet from "./pages/cabinet/index.jsx";
import NotFound from "./pages/NotFound/index.jsx";
import Checkout from "./pages/checkout/index.jsx";
import Videos from "./pages/videos/index.jsx";
import Categoryid from "./pages/categoryid/index.jsx";
import Productid from "./pages/productid/index.jsx";

function App() {

    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/dashboard'} element={<Dashboard/>}>
                    <Route path={'/dashboard/users'} element={<Users/>}/>
                    <Route path={'/dashboard/products'} element={<Products/>}/>
                    <Route path={'/dashboard/categories'} element={<Category/>}/>
                    <Route path={'/dashboard/gallery'} element={<Gallery/>}/>
                    <Route path={'/dashboard/videos'} element={<Video/>}/>
                    <Route path={'/dashboard/inbox'} element={<Inbox/>}/>
                    <Route path={'/dashboard/settings'} element={<Settings/>}/>
                    <Route path={'/dashboard/update'} element={<HomePage/>}/>
                    <Route path={'/dashboard/orders'} element={<NotFound/>}/>
                    <Route path={'/dashboard/transaction'} element={<NotFound/>}/>
                    <Route path={'/dashboard/inventory'} element={<NotFound/>}/>
                    <Route path={'/dashboard/payment'} element={<NotFound/>}/>
                </Route>
                <Route path={'/auth/login'} element={<Login/>}/>
                <Route path={'/auth/register'} element={<Register/>}/>
                <Route path={'/gallery'} element={<GalleryPage/>}/>
                <Route path={'/wishlist'} element={<Wishlist/>}/>
                <Route path={'/katalog'} element={<Katalog/>}/>
                <Route path={'/basket'} element={<Basket/>}/>
                <Route path={'/cabinet'} element={<Cabinet/>}/>
                <Route path={'/checkout'} element={<Checkout/>}/>
                <Route path={'/videos'} element={<Videos/>}/>
                <Route path={'*'} element={<NotFound/>}/>
                <Route path={'/category/:categoryId'} element={<Categoryid/>}/>
                <Route path={'/product/:productId'} element={<Productid/>}/>
            </Routes>
        </div>
    )
}

export default App
