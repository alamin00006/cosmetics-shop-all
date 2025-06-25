import React from "react";
import Container from "../Container/Container";

interface Link {
  name: string;
  href: string;
}

const quickLinks: Link[] = [
  { name: "About Us", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "Track Orders", href: "#" },
  { name: "Terms & Conditions", href: "#" },
  { name: "Return Policy", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Shipping", href: "#" },
];

const QuickLinks: React.FC = () => {
  return (
    <Container className={" "}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
      <ul className="space-y-2">
        {quickLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default QuickLinks;
