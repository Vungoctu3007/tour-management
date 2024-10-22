import routes from "../config/route"
import Home from "../pages/Client/Home"
import Login from "../pages/Client/Login"
import Register from "../pages/Client/Register"
import DefaultLayout from "../layouts/DefaultLayout"
import AdminLayout from "../layouts/admin/AdminLayout"
import ProfileLayout from "../layouts/ProfileLayout"
import Tour from "../pages/Client/Tour"
import About from "../pages/Client/AboutUs"
import DashBoard from "../pages/Admin/Dashboard"
import User from "../pages/Admin/User"
import Payment from "../pages/Client/Payment"
import DetailTour from "../pages/Client/DetailTour"

import Profile from "../pages/Client/Profile"
import Score from "../pages/Client/Profile/score"
import Discount from "../pages/Client/Profile/discount"
import Book from "../pages/Client/Profile/book"
import Refund from "../pages/Client/Profile/refund"

const publicRoutes=[
    // client routes
    {path:routes.home,component:Home,layout:DefaultLayout},
    {path:routes.tour,component:Tour,layout:DefaultLayout},
    {path:routes.about_us,component:About,layout:DefaultLayout},
    {path:routes.detail_tour,component:DetailTour,layout:null},
    {path:routes.login,component:Login,layout:null},
    {path:routes.register,component:Register,layout:null},
    {path:routes.payment,component:Payment,layout:null},
    // profile
    {path:routes.profile,component:Profile,layout:ProfileLayout},
    {path:routes.discount,component:Discount,layout:ProfileLayout},
    {path:routes.score,component:Score,layout:ProfileLayout},
    {path:routes.book,component:Book,layout:ProfileLayout},
    {path:routes.refund,component:Refund,layout:ProfileLayout},

    // admin routes
    {path:routes.dashboard,component:DashBoard,layout:AdminLayout},
    {path:routes.users,component:User,layout:AdminLayout},


]
export default publicRoutes