import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/main_layout";
import HomePage from "./pages/home/home";
import LoginForm from "./pages/author/login";
import RegistrationForm from "./pages/author/register";
import Page404 from "./pages/Page404"
import TournamentList from "./pages/tournament/tournamentList";
import BirdList from "./pages/bird/BirdList";
import Profile from "./pages/userProfile/userProfile";
import BlogDetail from "./pages/blog/BlogDetail";
import BlogList from "./pages/blog/BlogList";
import TournamentResults from "./pages/tournament/TournamentResult";
import FacibilityManagement from "./pages/facility/FacilityManagement";
import Mytournament from "./pages/tournament/MyTournament";
import ReachDestination from "./pages/tournament/ReachDestination";
import AboutUs from "./pages/about/AboutUs";

const routes = createBrowserRouter([
    
    { path: "/login", element: <LoginForm/>},
    { path: "/register", element: <RegistrationForm/> },
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage/>},
            { path: "/about-us", element: <AboutUs/> },
            { path: "/our-activity", element: <>Tính Năng Đang Phát Triển</> },
            { path: "/history", element: <TournamentList/> },
            { path: "/contact-us", element: <div>Tính Năng Đang Phát Triển</div> },
            { path: "/profile", element: <Profile/> },
            { path: "/birds", element: <BirdList/> },
            { path: "/blog-detail/:slug", element: <BlogDetail/> },
            { path: "/blogs", element: <BlogList/> },
            { path: "/tournament-result", element: <TournamentResults/> },
            { path: "/facibilitys", element: <FacibilityManagement/> },
            { path: "/my-tour", element: <Mytournament/> },
            { path: "/tour-detail", element: <ReachDestination/> },
        ]
    },
    { path: "*", element: <Page404/> },
])
export default routes;
