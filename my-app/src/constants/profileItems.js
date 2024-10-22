import DiscountIcon from '@mui/icons-material/Discount';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const profile_items = [
  {
    icon: <AccountCircleIcon />, 
    title: "Hồ Sơ",
    to: "/profile",
  },
  {
    icon: <LoyaltyIcon />, 
    title: "0 Điểm",
    to: "/profile/score",
  },
  {
    icon: <DiscountIcon />, 
    title: "Khuyễn Mãi",
    to: "/profile/discount",
  },
  {
    icon: <MonetizationOnIcon />, 
    title: "Hoàn Tiền",
    to: "/profile/refund",
  },
  {
    icon: <AssignmentIcon />, 
    title: "Đặt Chỗ",
    to: "/profile/book",
  },
  {
    icon: <ExitToAppIcon />, 
    title: "Đăng Xuất",
    to: "/login",
    divider: true,
  },
];

export default profile_items;
