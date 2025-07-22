import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { FaShoppingBag } from "react-icons/fa";
import SearchBar from "./SearchBar";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function TopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      className="bg-white shadow-sm"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <SearchBar />
        </NavbarItem>
        <NavbarItem isActive></NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex px-6 py-2 bg-gray-900 text-white rounded-full font-semibold">
          <Link href="#"> WISHLIST</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex px-6 py-2 bg-white text-gray-900 rounded-full font-semibold border border-gray-300">
          <Link href="#"> Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex px-6 py-2 bg-pink-500 text-white rounded-full font-semibold flex items-center">
          <FaShoppingBag className="w-4 h-4 mr-2" />
          BAG 0
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
//   Button,
// } from "@heroui/react";
// import SearchBar from "./SearchBar";
// import { FaShoppingBag } from "react-icons/fa";

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

// export default function TopNavbar() {
//   return (
//     <Navbar>
//       <NavbarBrand>
//         <AcmeLogo />
//         <p className="font-bold text-inherit">ACME</p>
//       </NavbarBrand>
//       <NavbarContent className="hidden sm:flex gap-4" justify="center">
//         <SearchBar />
//       </NavbarContent>
//       <NavbarContent justify="end">
//         <NavbarItem className="hidden lg:flex px-6 py-2 bg-gray-900 text-white rounded-full font-semibold">
//           <Link href="#"> WISHLIST</Link>
//         </NavbarItem>
//         <NavbarItem className="hidden lg:flex px-6 py-2 bg-white text-gray-900 rounded-full font-semibold border border-gray-300">
//           <Link href="#"> Login</Link>
//         </NavbarItem>
//         <NavbarItem className="hidden lg:flex px-6 py-2 bg-pink-500 text-white rounded-full font-semibold flex items-center">
//           <FaShoppingBag className="w-4 h-4 mr-2" />
//           BAG 0
//         </NavbarItem>
//       </NavbarContent>
//     </Navbar>
//   );
// }
