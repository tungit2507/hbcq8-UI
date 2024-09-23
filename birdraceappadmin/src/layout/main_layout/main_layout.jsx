import { Outlet } from "react-router-dom";
import Header from "../../components/common/header";
import Footer from "../../components/common/footer";

import AppSidebar from "../../components/form_components/appSideBar";

export default function MainLayout() {
    return <div>
        <AppSidebar/>
            <div className="wrapper d-flex flex-column min-vh-100">
                <Header />
                    <div className="body flex-grow-1">
                        <Outlet />
                    </div>
            </div>
        </div>
}
