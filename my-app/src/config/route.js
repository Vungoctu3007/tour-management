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


  //admin feedback
  list_feedback:"/admin/feedback/list-feedback",

};
export default routes;
