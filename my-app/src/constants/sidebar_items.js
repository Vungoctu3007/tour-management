import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ReceiptIcon from "@mui/icons-material/Receipt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BadgeIcon from '@mui/icons-material/Badge';
const sidebar_items = [
  
    {
      id: 1,
      icon: <DashboardCustomizeIcon />,
      title: "DashBoard Management",
      to: "/admin/dashboard",
    },
    {
      id: 2,
      icon: <AccountCircleIcon />,
      title: "Account Management",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        { 
          title: "Account",
          to: "/admin/user/list-user",
        },
        {
          title: "Decentrizilation",
          to: "/admin/decentralization",
        },
      ],
    },
    {
      id: 3,
      icon: <ReceiptIcon />,
      title: "Receipt Management",
      to: "/admin/receipt",
    },
    {
      icon: <DashboardCustomizeIcon />,
      title: "Feedback Management",
      to: "/admin/feedback/list-feedback",
    },
  
    {
      id: 4,
      icon: <TravelExploreIcon />,
      title: "Tour Management",
      iconUp: <KeyboardArrowDownIcon />,
      item: [
        {
          title:"Add Tour",
          to: "/admin/tour/add-tour",
        },
        {
          title: "List Tour",
          to: "/admin/tour/list-tour",  
        },
        {
          title: "Update Tour",
          to: "/admin/tour/update-tour",
        },
      ],
    },

    
    {
      id :5,
      icon: <SupportAgentIcon />,
      title: "Customer Management",
      to: "/admin/customer",
    },
    {
      id:6,
      icon: <BadgeIcon />,
      title: "Employee Management",
      to: "/admin/employee",
    },
    
  ];
  export default sidebar_items