import routes from "../config/route"
import Home from "../pages/Client/Home"
import Login from "../pages/Client/Login"
import Register from "../pages/Client/Register"
import DefaultLayout from "../layouts/DefaultLayout"
import AdminLayout from "../layouts/admin/AdminLayout"
import Admin from "../pages/Admin"
import Profile from "../pages/Client/Profile"
import Tour from "../pages/Client/Tour"
import About from "../pages/Client/AboutUs"
const publicRoutes=[
    {path:routes.home,component:Home,layout:DefaultLayout},
    {path:routes.tour,component:Tour,layout:DefaultLayout},
    {path:routes.about_us,component:About,layout:DefaultLayout},

    {path:routes.login,component:Login,layout:null},
    {path:routes.profile,component:Profile,layout:null},
    {path:routes.resgister,component:Register,layout:null},
    {path:routes.admin,component:Admin,layout:AdminLayout},

]
export default publicRoutes