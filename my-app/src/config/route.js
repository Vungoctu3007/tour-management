const routes = {
  // client
  home: "/",
  login: "/login",
  register: "/register",
  route: "/route",
  about_us: "/about-us",
  payment: "/payment",
  detail_route: "/route/detail/:id",
  booking_tour: "/route/booking/:id",
  // profile
  profile: "/profile",
  score: "/profile/score",
  discount: "/profile/discount",
  refund: "/profile/refund",
  book: "/profile/book",
  // admin
  users: "/admin/users",
  dashboard: "/admin/dashboard",
  receipt: "/admin/receipt",
  feedback: "/admin/feedback",
  
  // admin user
  list_user:"/admin/user/list-user",
  add_user:"/admin/user/add-user",
  
  // admin tour
  list_tour:"/admin/tour/list-tour",
  add_tour:"/admin/tour/add-tour",
  update_tour:"/admin/tour/update-tour/:detailRouteId",

  // admin promotion
  list_promotion:"/admin/promotion/list-promotion",



  //admin feedback
  list_feedback:"/admin/feedback/list-feedback",
  
  //admin decentrazation
  decentralization: "/admin/decentralization",

  //verify email
  verify: "/verify" ,
  
   // Google OAuth callback
  google_callback: "/oauth2/redirect",
  
  // facebook oauth callback
  facebook_callback: "/oauth2/callback/facebook" ,

  //customer 
  list_customer : "/admin/customer",
  //employee
  list_employee : "/admin/employee"
};
export default routes;
