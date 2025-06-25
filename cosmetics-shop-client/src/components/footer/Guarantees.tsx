import React from "react";
import Container from "../Container/Container";
import { FaCheckCircle, FaTruck, FaLock } from "react-icons/fa";

interface Guarantee {
  title: string;
  description: string;
  icon: "authentic" | "shipping" | "payment";
}

const guarantees: Guarantee[] = [
  {
    title: "100% Authentic",
    description: "Our Guarantee",
    icon: "authentic",
  },
  {
    title: "Free Shipping",
    description: "Free Shipping above Rs.699",
    icon: "shipping",
  },
  {
    title: "Secured Payment",
    description: "100% Payment guarantee",
    icon: "payment",
  },
];

const Guarantees: React.FC = () => {
  const iconComponents = {
    authentic: (
      <FaCheckCircle className="w-8 sm:w-12 h-8 sm:h-12 text-gray-300 mb-3 sm:mb-4" />
    ),
    shipping: (
      <FaTruck className="w-8 sm:w-12 h-8 sm:h-12 text-gray-300 mb-3 sm:mb-4" />
    ),
    payment: (
      <FaLock className="w-8 sm:w-12 h-8 sm:h-12 text-gray-300 mb-3 sm:mb-4" />
    ),
  };

  return (
    <div className="bg-gray-900 py-4 text-white">
      <Container className={" "}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="flex flex-col items-center">
              {iconComponents[guarantee.icon]}
              <h3 className="text-base sm:text-xl font-semibold">
                {guarantee.title}
              </h3>
              <p className="text-xs sm:text-base text-gray-300">
                {guarantee.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Guarantees;
