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

function App() {

    return (
        <>
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
                </Route>
                <Route path={'/auth/login'} element={<Login/>}/>
                <Route path={'/auth/register'} element={<Register/>}/>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'*'} element={<h1>Not found</h1>}/>
            </Routes>
        </>
    )
}

export default App
