import routes from "../config/route";
// client
import Home from "../pages/Client/Home";
import Login from "../pages/Client/Login";
import Register from "../pages/Client/Register";
import About from "../pages/Client/AboutUs";
import Payment from "../pages/Client/Payment";
import DetailTour from "../pages/Client/DetailTour"
import Tour from "../pages/Client/Tour"
// client profile
import Profile from "../pages/Client/Profile";
import Score from "../pages/Client/Profile/score";
import Discount from "../pages/Client/Profile/discount";
import Book from "../pages/Client/Profile/book";
import Refund from "../pages/Client/Profile/refund";
import BookingTour from "../pages/Client/OrderTour";
// layout
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProfileLayout from "../layouts/ProfileLayout";
// admin
import DashBoard from "../pages/Admin/Dashboard";
import Receipt from "../pages/Admin/Receipt";
// 1 user
import ListUser from "../pages/Admin/User/ListUser";
import AddUser from "../pages/Admin/User/AddUser";
// 2 tour
import ListTour from "../pages/Admin/Tour/ListTour";
import AddTour from "../pages/Admin/Tour/AddTour";

// 3 promotion
import Promotion from "../pages/Admin/Promotion";


// feedback
import ListFeedback from "../pages/Admin/Feedback";
import { patch } from "@mui/material";

import Decentralization from "../pages/Admin/Decentralization";

import VerifyEmail from "../pages/Client/Register/verifyEmail";
import GoogleCallback from "../pages/Client/Login/GoogleCallback";
import WaitingLayout from "../layouts/WatingLayout";
import LoginWithFacebook from "../pages/Client/Login/LoginWithFacebook";
import FacebookCallback from "../pages/Client/Login/FacebookCallback";


const publicRoutes = [
  // client routes
  { path: routes.home, component: Home, layout: DefaultLayout },
  { path: routes.route, component: Tour, layout: DefaultLayout },
  { path: routes.about_us, component: About, layout: DefaultLayout },
  { path: routes.detail_route, component: DetailTour, layout: DefaultLayout },
  { path: routes.login, component: Login, layout: null },
  { path: routes.register, component: Register, layout: null },
  { path: routes.payment, component: Payment, layout: null },
  { path: routes.booking_tour, component: BookingTour, layout: DefaultLayout },
  { path: routes.booking_tour, component: BookingTour, layout: DefaultLayout },
  // profile
  { path: routes.profile, component: Profile, layout: ProfileLayout },
  { path: routes.discount, component: Discount, layout: ProfileLayout },
  { path: routes.score, component: Score, layout: ProfileLayout },
  { path: routes.book, component: Book, layout: ProfileLayout },
  { path: routes.refund, component: Refund, layout: ProfileLayout },

  // admin routes
  { path: routes.dashboard, component: DashBoard, layout: AdminLayout },
  { path: routes.receipt, component: Receipt, layout: AdminLayout },
  //  1 user
  { path: routes.add_user, component: AddUser, layout: AdminLayout },
  { path: routes.list_user, component: ListUser, layout: AdminLayout },

  //  2 tour
  { path: routes.add_tour, component: AddTour, layout: AdminLayout },
  { path: routes.list_tour, component: ListTour, layout: AdminLayout },
  // 3 promotion
  { path: routes.list_promotion, component: Promotion, layout: AdminLayout },

 
  // admin feedback
  {path: routes.list_feedback, component: ListFeedback, layout: AdminLayout},

  //admiin decentralization 
  {path : routes.decentralization, component: Decentralization, layout: AdminLayout} ,//}

  // authentication user
  {path: routes.verify , component : VerifyEmail, layout : DefaultLayout},

  //google 
  {path: routes.google_callback , component: GoogleCallback, layout : null} ,
  //facebook
  {path: routes.facebook_callback , component: FacebookCallback, layout : null}
];
export default publicRoutes;