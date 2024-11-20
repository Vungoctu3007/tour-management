import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DiscountIcon from '@mui/icons-material/Discount';
const sidebar_items = [
  
    {
      icon: <DashboardCustomizeIcon />,
      title: "Tổng Quan",
      to: "/admin/dashboard",
    },
    {
      icon: <AccountCircleIcon />,
      title: "Tài Khoản",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        { 
          title: "Người Dùng",
          to: "/admin/user/list-user",
        },
        {
          title: "Phân Quyền",
          to: "/admin/tour/role",
        },
      ],
    },
    {
      icon: <ReceiptIcon />,
      title: "Đơn Hàng",
      to: "/admin/receipt",
    },
    {
      icon: <DashboardCustomizeIcon />,
      title: "Phản Hồi",
      to: "/admin/feedback/list-feedback",
    },
  
   
    {
      icon: <SupervisedUserCircleIcon />,
      title: "Người Dùng",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title: "Danh Sách Người Dùng",
          to: "/admin/user/list-user",
        },
        {
          title: "Thêm Người Dùng",
          to: "/admin/user/add-user",
        },
      ],
    },
    {
      icon: <TravelExploreIcon />,
      title: "Tour",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title: "Thêm Tour",
          to: "/admin/tour/add-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Cập nhật tour",
          to: "/admin/tour/update-tour",
        },
      ],
    },
    {
      icon: <DiscountIcon />,
      title: "Khuyễn Mãi",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title: "Danh Sách Khuyễn Mãi",
          to: "/admin/promotion/list-promotion",
        },
        {
          title: "Thêm Khuyễn Mãi",
          to: "/admin/tour/list-tour",
        },
      ],
    },
    {
      icon: <TravelExploreIcon />,
      title: "Tour",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title: "Thêm Tour",
          to: "/admin/tour/add-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
      ],
    },
    {
      icon: <TravelExploreIcon />,
      title: "Tour",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title: "Thêm Tour",
          to: "/admin/tour/add-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
      ],
    },
    {
      icon: <TravelExploreIcon />,
      title: "Tour",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title: "Thêm Tour",
          to: "/admin/tour/add-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
        {
          title: "Danh Sách Tour",
          to: "/admin/tour/list-tour",
        },
      ],
    },
  ];
  export default sidebar_items