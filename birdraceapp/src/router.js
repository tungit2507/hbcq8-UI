import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import HomePage from "./pages/home/home";
import LoginForm from "./pages/author/login";
import RegistrationForm from "./pages/author/register";
import Page404 from "./pages/Page404";
import Profile from "./pages/userProfile/userProfile";
import TournamentList from "./pages/tournament/tournamentList";
import BirdList from "./pages/bird/BirdList";

const routes = createBrowserRouter([
    
    { path: "/login", element: <LoginForm/>},
    { path: "/register", element: <RegistrationForm/> },
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage/>},
            { path: "/about-us", element: <>Tính Năng Đang Phát Triển</> },
            { path: "/our-activity", element: <>Tính Năng Đang Phát Triển</> },
            { path: "/history", element: <TournamentList/> },
            { path: "/contact-us", element: <div>Tính Năng Đang Phát Triển</div> },
            { path: "/profile", element: <Profile/> },
            { path: "/birds", element: <BirdList/> },
           
        ]
    },
    { path: "*", element: <Page404/> },
])
export default routes;