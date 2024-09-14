import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import HomePage from "./pages/home/home";
import LoginForm from "./pages/author/login";
import RegistrationForm from "./pages/author/register";

const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage/>},
            { path: "/about-us", element: <HomePage/> },
            { path: "/activity", element: <div>This page is user profile<Link to={"/home"}>back to home page</Link></div> },
            { path: "/history", element: <div><Link to={"/home"}>Home</Link></div> },
            { path: "/contact", element: <div><Link to={"/home"}>Home</Link></div> },
           
        ]
    },
    { path: "*", element: <div>Fot Found</div> },
    { path: "/login", element: <LoginForm/>},
    { path: "/register", element: <RegistrationForm/> },

])
export default routes;