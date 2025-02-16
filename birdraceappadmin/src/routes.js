import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRouter";
import MainLayout from "./layout/main_layout/main_layout";

import NotFoundPage from "./pages/error/404";

import RegistrationForm from "./pages/auth/register";

import LoginForm from "./pages/auth/LoginForm";

// import DashBoard from "./pages/index/dashboard";

import RaceManagementUpdate from "./pages/race/RacemanagementUpdate";
import RaceManagementList from "./pages/race/RaceManagementList";

import UserManagementList from "./pages/user/UserManagementList";
import UserManagementUpdate from "./pages/user/UserManagementUpdate";
import UserManagementAdd from "./pages/user/UserManagementAdd";

import RaceRegistrationList from "./pages/race/RaceRegistrationList";
import RaceManagementAdd from "./pages/race/RaceManagementAdd";
import ArticleList from "./pages/article/ArticleList";
import ArticleAdd from "./pages/article/ArticleAdd";
import FacilityManagement from "./pages/facility/FacilityList";
import FacilityManagementAdmin from "./pages/facility/FacilityListAdmin";
import RaceRegistrationAddFacility from "./pages/race/RaceRegistrationAddFacility";
import TourResultSet from "./pages/race/TourResultSet";
import StartPointList from "./pages/facility/StartPointList";
import BirdManagement from "./pages/bird/BirdManagementList";
import DetailRaceForm from "./pages/race/RacemanagementDetail";
import TourAccepResult from "./pages/race/RaceAcceptResult";
import TournamentResults from "./pages/race/RaceResult";
import TournamentStageResults from "./pages/race/RaceStageResult";
import UserPhonenumberList from "./pages/info/Info";
import ArticleUpdate from "./pages/article/ArticleUpdate";
import Info from "./pages/info/Info";
import AboutUsInfoManagement from "./pages/info/AboutUsInfoManagement";

const routes = createBrowserRouter([
    {
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        children: [
            { path: "/", element: <div>Tính năng đang phát triển</div>, name: "Dashboard" },
            { path: "/management/user/list", element: <UserManagementList/>, name: "User List" },
            { path: "/management/user/update", element: <UserManagementUpdate/>, name: "Update User" },
            { path: "/management/user/add", element: <UserManagementAdd/>, name: "Update User" },
            { path: "/management/race/list", element: <RaceManagementList/>, name: "Race List" },
            { path: "/management/race/add", element: <RaceManagementAdd/>, name: "Add Race" },
            { path: "/management/race/update", element: <RaceManagementUpdate/>, name: "Update Race" },
            { path: "/management/race/detail", element: <DetailRaceForm/>, name: "Update Race" },
            { path: "/management/race/registration-list", element: <RaceRegistrationList/>, name: "RaceRegistrationList" },
            { path: "/management/race/tour-result-set", element: <TourResultSet/>, name: "RaceRegistrationList" },
            { path: "/management/race/registration-list/approve", element: <RaceRegistrationAddFacility/>, name: "RaceRegistrationList" },
            { path: "/management/article/list", element: <ArticleList/>, name: "Article List" },
            { path: "/management/article/update", element: <div>Tính năng đang phát triển</div>, name: "Add Article" },
            { path: "/management/article/add", element: <ArticleAdd/>, name: "Update Article" },
            { path: "/management/facility/list", element: <FacilityManagement/>, name: "Facility Management" },
            { path: "/management/facility/list/admin", element: <FacilityManagementAdmin/>, name: "Facility Management" },
            { path: "/management/start-point/list", element: <StartPointList/>, name: "Facility Management" },
            { path: "/management/bird/list", element: <BirdManagement/>, name: "Facility Management" },
            { path: "/management/race/tour-accept-result", element: <TourAccepResult/>, name: "Facility Management" },
            { path: "/management/race/result", element: <TournamentResults/>, name: "Facility Management" },
            { path: "/management/race/stage/result", element: <TournamentStageResults/>, name: "Facility Management" },
            { path: "/management/info/phonenumber", element: <Info/>, name: "Facility Management" },
            { path: "/management/edit-article", element: <ArticleUpdate/>, name: "Facility Management" },
            { path: "/management/info/about-us", element: <AboutUsInfoManagement/>, name: "Management Info " },
        ]
    },
    { path: "*", element: <NotFoundPage/>, name: "Not Found" },
    { path: "/login", element: <LoginForm/>, name: "Login" },
    { path: "/register", element: <RegistrationForm/>, name: "Register" },
])
export default routes;