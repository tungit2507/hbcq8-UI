import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import HomePage from "./pages/home/home";
import LoginForm from "./pages/author/login";
import RegistrationForm from "./pages/author/register";
import Page404 from "./pages/Page404";
import Profile from "./pages/userProfile/userProfile";

const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage/>},
            { path: "/about-us", element: <HomePage/> },
            { path: "/activity", element: <Profile/> },
            { path: "/history", element: <div><Link to={"/home"}>Lịch Sử</Link></div> },
            { path: "/contact", element: <div><Link to={"/home"}>Contact</Link></div> },
            { path: "/profile", element: <Profile/> },
           
        ]
    },
    { path: "*", element: <Page404/> },
    { path: "/login", element: <LoginForm/>},
    { path: "/register", element: <RegistrationForm/> },


])
export default routes;