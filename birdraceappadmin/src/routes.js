import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/main_layout/main_layout";
import NotFoundPage from "./pages/error/404";
import RegistrationForm from "./pages/auth/register";
import LoginForm from "./pages/auth/login_form";
import DashBoard from "./pages/index/dashboard";

import RaceManagementAdd from "./pages/race/race_management_add";
import RaceManagementUpdate from "./pages/race/race_management_update";
import RaceManagementList from "./pages/race/race_management_list";
import UserManagementList from "./pages/user/user_management_list";
import UserManagementUpdate from "./pages/user/user_management_update";
import PrivateRoute from "./auth/PrivateRouter";
import RaceRegistrationList from "./pages/race/race_registration_list";
import ArticleList from "./pages/article/ArticleList";

const routes = createBrowserRouter([
    {
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        children: [
            { path: "/", element: <div>Tính năng đang phát triển</div>, name: "Dashboard" },
            { path: "/management/user/list", element: <div>Tính năng đang phát triển</div>, name: "User List" },
            { path: "/management/user/update", element: <div>Tính năng đang phát triển</div>, name: "Update User" },
            { path: "/management/race/list", element: <RaceManagementList/>, name: "Race List" },
            { path: "/management/race/add", element: <RaceManagementAdd/>, name: "Add Race" },
            { path: "/management/race/update", element: <RaceManagementUpdate/>, name: "Update Race" },
            { path: "/management/race/registration-list", element: <RaceRegistrationList/>, name: "RaceRegistrationList" },
            { path: "/management/article/list", element: <ArticleList/>, name: "Article List" },
            { path: "/management/article/add", element: <div>Tính năng đang phát triển</div>, name: "Add Article" },
            { path: "/management/article/update", element: <ArticleList/>, name: "Update Article" },
        ]
    },
    { path: "*", element: <NotFoundPage/>, name: "Not Found" },
    { path: "/login", element: <LoginForm/>, name: "Login" },
    { path: "/register", element: <RegistrationForm/>, name: "Register" },
])
export default routes;