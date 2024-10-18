import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import HomePage from "./pages/home/Home";
import LoginForm from "./pages/author/Login";
import RegistrationForm from "./pages/author/Register";
import Page404 from "./pages/Page404"
import TournamentList from "./pages/tournament/TournamentList";
import BirdList from "./pages/bird/BirdList";
import Profile from "./pages/userProfile/UserProfile";
import BlogDetail from "./pages/blog/BlogDetail";
import BlogList from "./pages/blog/BlogList";
import TournamentResults from "./pages/tournament/TournamentResult";

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
            { path: "/blog-detail", element: <BlogDetail/> },
            { path: "/blogs", element: <BlogList/> },
            { path: "/tournament-result", element: <TournamentResults/> },
        ]
    },
    { path: "*", element: <Page404/> },
])
export default routes;
