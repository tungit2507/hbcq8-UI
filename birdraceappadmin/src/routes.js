import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./auth/PrivateRouter";
import MainLayout from "./layout/main_layout/main_layout";

import NotFoundPage from "./pages/error/404";

import RegistrationForm from "./pages/auth/Register";

import LoginForm from "./pages/auth/LoginForm";

import DashBoard from "./pages/index/Dashboard";

import RaceManagementAdd from "./pages/race/RaceManagementAdd";
import RaceManagementUpdate from "./pages/race/RacemanagementUpdate";
import RaceManagementList from "./pages/race/RaceManagementList";

import UserManagementList from "./pages/user/UserManagementList";
import UserManagementUpdate from "./pages/user/UserManagementUpdate";
import UserManagementAdd from "./pages/user/UserManagementAdd";

import RaceRegistrationList from "./pages/race/RaceRegistrationList";
import ArticleList from "./pages/article/ArticleList";
import ArticleAdd from "./pages/article/ArticleAdd";


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
            { path: "/management/race/registration-list", element: <RaceRegistrationList/>, name: "RaceRegistrationList" },
            { path: "/management/article/list", element: <ArticleList/>, name: "Article List" },
            { path: "/management/article/update", element: <div>Tính năng đang phát triển</div>, name: "Add Article" },
            { path: "/management/article/add", element: <ArticleAdd/>, name: "Update Article" },
        ]
    },
    { path: "*", element: <NotFoundPage/>, name: "Not Found" },
    { path: "/login", element: <LoginForm/>, name: "Login" },
    { path: "/register", element: <RegistrationForm/>, name: "Register" },
])
export default routes;