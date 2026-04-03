import { ReactNode } from "react";

import { Footer } from "./Footer";
import { MobileNavbar } from "./MobileNavbar";
import { AppHeader } from "./AppHeader";
import Navbar from "../Navbar";

interface AppLayoutProps {
  children: ReactNode;
  showMobileHeader?: boolean;
  mobileTitle?: string;
}

export const AppLayout = ({
  children,
  showMobileHeader = true,
  mobileTitle,
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navbar - hidden on mobile */}
      {/* <div className="hidden md:block">
        <Navbar />
      </div> */}
      <Navbar />

      {/* Mobile Header */}
      {/* {showMobileHeader && (
        <AppHeader title={mobileTitle} />
      )} */}

      {/* Main Content */}
      <main className="pb-20 md:pb-0">{children}</main>

      {/* Desktop Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavbar />
    </div>
  );
};
