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

const routes = createBrowserRouter([
    {
        element: <PrivateRoute><MainLayout/></PrivateRoute>,
        children: [
            { path: "/", element: <DashBoard/>, name: "Dashboard" },
            { path: "/management/user/list", element: <UserManagementList/>, name: "User List" },
            { path: "/management/user/update", element: <UserManagementUpdate/>, name: "Update User" },
            { path: "/management/race/list", element: <RaceManagementList/>, name: "Race List" },
            { path: "/management/race/add", element: <RaceManagementAdd/>, name: "Add Race" },
            { path: "/management/race/update", element: <RaceManagementUpdate/>, name: "Update Race" },
            { path: "/management/race/registration-list", element: <RaceRegistrationList/>, name: "RaceRegistrationList" },
        ]
    },
    { path: "*", element: <NotFoundPage/>, name: "Not Found" },
    { path: "/login", element: <LoginForm/>, name: "Login" },
    { path: "/register", element: <RegistrationForm/>, name: "Register" },
])
export default routes;