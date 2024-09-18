import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/main_layout/main_layout";
import NotFoundPage from "./pages/404";
import RegistrationForm from "./pages/register";
import LoginForm from "./pages/login_form";
import DashBoard from "./pages/dashboard";
import BirdManagementList from "./pages/bird/bird_management_list";
import BirdManagementAdd from "./pages/bird/bird_management_add";
import BirdManagementUpdate from "./pages/bird/bird_management_update";
import RaceManagementAdd from "./pages/race/race_management_add";
import RaceManagementUpdate from "./pages/race/race_management_update";
import RaceManagementList from "./pages/race/race_management_list";
import UserManagementList from "./pages/user/user_management_list";
import UserManagementAdd from "./pages/user/user_management_add";
import UserManagementUpdate from "./pages/user/user_management_update 2";

const routes = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            // home page
            { path: "/", element: <DashBoard/>},
            // user management
            { path: "/management/user/list", element: <UserManagementList/>},
            { path: "/management/user/add", element: <UserManagementAdd/> },
            { path: "/management/user/update", element: <UserManagementUpdate/> },
            // bird management
            // { path: "/management/bird/list", element: <BirdManagementList/>},
            // { path: "/management/bird/add", element: <BirdManagementAdd/> },
            // { path: "/management/bird/update", element: <BirdManagementUpdate/> },
            // race management
            { path: "/management/race/list", element: <RaceManagementList/>},
            { path: "/management/race/add", element: <RaceManagementAdd/> },
            { path: "/management/race/update", element: <RaceManagementUpdate/> },
        ]
    },
    // anything page is incorectly here
    { path: "*", element: <NotFoundPage/> },
    // login page
    { path: "/login", element: <LoginForm/>},
    // register page
    { path: "/register", element: <RegistrationForm/> },
])
export default routes;