import React from "react";
import TrustedBy from "./footer/TrustedBy";
import Guarantees from "./footer/Guarantees";
import Subscribe from "./footer/Subscribe";
import QuickLinks from "./footer/QuickLinks";
import Categories from "./footer/Categories";
import HelpDesk from "./footer/HelpDesk";
import SocialMedia from "./footer/SocialMedia";
import Container from "./Container/Container";

const Footer: React.FC = () => {
  return (
    <div>
      {/* Pre-footer sections */}
      <TrustedBy />
      <Guarantees />
      <Subscribe />

      {/* Footer */}
      <footer className="bg-gray-100 py-4">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <QuickLinks />
            <Categories />
            <HelpDesk />
            <SocialMedia />
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
