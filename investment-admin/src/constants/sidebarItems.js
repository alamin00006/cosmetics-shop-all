import {
  AiOutlineDollarCircle,
  AiOutlinePlusSquare,
  AiOutlineTeam,
  AiOutlineWindows,
} from "react-icons/ai";
import { USER_ROLE } from "./role";
import {
  MdDashboard,
  MdFilterBAndW,
  MdOutlineCategory,
  MdOutlinePayments,
} from "react-icons/md";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FaPeopleGroup, FaPeopleRoof } from "react-icons/fa6";
import { GrHostMaintenance } from "react-icons/gr";
const iconStyle = { width: "24px", height: "24px" };

export const sidebarItems = (role) => {
  const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: <MdDashboard style={iconStyle} />,
          label: "Dashboard",
          route: "/dashboard",
        },
        {
          icon: <FaPeopleGroup style={iconStyle} />,
          label: "Investment",
          route: "/all-investment",
        },

        {
          icon: <AiOutlinePlusSquare style={iconStyle} />,
          label: "Projects",
          route: "#",
          children: [
            ...(role === USER_ROLE.SUPER_ADMIN
              ? []
              : [{ label: "Add New Project", route: "/project-add" }]),
            { label: "Project List", route: "/project-list" },
          ],
        },
        {
          icon: <AiOutlineDollarCircle style={iconStyle} />,
          label: "Income",
          route: "#",
          children: [
            { label: "Income submit", route: "/profit-submit" },
            { label: "Income History", route: "/return-history" },
          ],
        },
        {
          icon: <MdOutlinePayments style={iconStyle} />,
          label: "Withdraw",
          route: "/profit-counts",
        },

        ...(role === USER_ROLE.COMPANY || role === USER_ROLE.SUPER_ADMIN
          ? [
              {
                icon: <AiOutlineTeam style={iconStyle} />,
                label: "Admin Users",
                route: "/admin-users",
              },
            ]
          : []),

        ...(role === USER_ROLE.SUPER_ADMIN || role === USER_ROLE.COMPANY
          ? [
              {
                icon: <FaPeopleRoof style={iconStyle} />,
                label: "Users",
                route: "/all-users",
              },
              {
                icon: <MdOutlineCategory style={iconStyle} />,
                label: "Categories",
                route: "/categories-list",
              },
              {
                icon: <MdOutlineCategory style={iconStyle} />,
                label: "Brands",
                route: "/brands-list",
              },
            ]
          : []),
      ],
    },
    {
      name: "OTHERS",
      menuItems: [
        ...(role === USER_ROLE.SUPER_ADMIN
          ? [
              {
                icon: <AiOutlineWindows style={iconStyle} />,
                label: "Company",
                route: "#",
                children: [
                  { label: "Company List", route: "/company" },
                  // {
                  //   label: "Company Registration",
                  //   route: "/company-registration",
                  // },
                ],
              },

              {
                icon: <MdFilterBAndW style={iconStyle} />,

                label: "Market Banner",
                route: "/market-banner-list",
              },

              {
                icon: <GrHostMaintenance style={iconStyle} />,

                label: "Extra Services List",
                route: "/extra-service",
              },
            ]
          : []),

        ...(role === USER_ROLE.COMPANY
          ? [
              {
                icon: <AiOutlineTeam style={iconStyle} />,
                label: "Join Waiting",
                route: "/join-waiting",
              },
              {
                icon: <HiOutlineBanknotes style={iconStyle} />,
                label: "Bank Accounts",
                route: "/company-bank",
              },
            ]
          : []),

        {
          icon: (
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                fill=""
              />
              <path
                d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                fill=""
              />
            </svg>
          ),
          label: "Profile",
          route: "/profile",
        },
      ],
    },
  ];

  return menuGroups;
};
