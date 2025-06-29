"use client";
import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/helpers/utils/local-storage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";
import { IoManOutline, IoShareSocialOutline } from "react-icons/io5";
import {
  MdOutlineAccountCircle,
  MdOutlineDashboard,
  MdOutlinePayments,
} from "react-icons/md";
import { TbDna2 } from "react-icons/tb";

const DashboardSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const iconWidth = {
    width: "24px",
    height: "24px",
  };
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/");
    window.location.reload();
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="sticky top-20 left-0 z-0 h-[calc(100vh-200px)] transition-transform -translate-x-full sm:translate-x-0 sm:hidden md:block"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-800 py-4">
          <ul className="space-y-2 font-medium ps-10">
            <li>
              <Link
                href="/assets-overview"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white dark:hover:bg-gray-700 group ${
                  pathname === "/assets-overview"
                    ? "bg-[#00a47e] text-white"
                    : ""
                }`}
              >
                <MdOutlineDashboard
                  style={iconWidth}
                  className={` ${
                    pathname === "/assets-overview"
                      ? " text-white"
                      : "text-gray-500"
                  } `}
                />
                <span className="ms-3">Assets Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/withdraw-history"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  pathname === "/withdraw-history"
                    ? "bg-[#00a47e] text-white"
                    : ""
                }`}
              >
                <MdOutlinePayments
                  style={iconWidth}
                  className={` ${
                    pathname === "/withdraw-history"
                      ? " text-white"
                      : "text-gray-500"
                  } `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Withdraw</span>
              </Link>
            </li>

            <li>
              <Link
                href="/user-bank"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  pathname === "/user-bank" ? "bg-[#00a47e] text-white" : ""
                }`}
              >
                <HiOutlineBanknotes
                  style={iconWidth}
                  className={` ${
                    pathname === "/user-bank" ? " text-white" : "text-gray-500"
                  } `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Bank Account
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/nominee"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  pathname === "/nominee" ? "bg-[#00a47e] text-white" : ""
                }`}
              >
                <IoManOutline
                  style={iconWidth}
                  className={` ${
                    pathname === "/nominee" ? " text-white" : "text-gray-500"
                  } `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Nominee</span>
              </Link>
            </li>

            <li>
              <Link
                href="/waiting-list"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  pathname === "/waiting-list" ? "bg-[#00a47e] text-white" : ""
                }`}
              >
                <TbDna2
                  style={iconWidth}
                  className={` ${
                    pathname === "/waiting-list"
                      ? " text-white"
                      : "text-gray-500"
                  } `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Join Waiting List
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/reward"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  pathname === "/reward" ? "bg-[#00a47e] text-white" : ""
                }`}
              >
                <IoShareSocialOutline
                  style={iconWidth}
                  className={` ${
                    pathname === "/reward" ? " text-white" : "text-gray-500"
                  } `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Reward</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className={`flex items-center p-2 text-gray-900 rounded-l-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  pathname === "/profile" ? "bg-[#00a47e] text-white" : ""
                }`}
              >
                <MdOutlineAccountCircle
                  style={iconWidth}
                  className={` ${
                    pathname === "/profile" ? " text-white" : "text-gray-500"
                  } `}
                />
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li onClick={logOut}>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMdLogOut style={iconWidth} className="text-gray-500" />
                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardSideBar;
