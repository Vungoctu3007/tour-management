const routes = {
  // client
  home: "/",
  login: "/login",
  register: "/register",
  route: "/route",
  about_us: "/about-us",
  payment: "/payment",
  detail_tour: "/tour/detail/:id",
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
  // admin user
  list_user:"/admin/user/list-user",
  add_user:"/admin/user/add-user",
  
  // admin tour
  list_tour:"/admin/tour/list-tour",
  add_tour:"/admin/tour/add-tour"
};
export default routes;
