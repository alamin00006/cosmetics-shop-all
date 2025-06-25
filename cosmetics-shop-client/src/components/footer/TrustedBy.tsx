import React from "react";
import Container from "../Container/Container";

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "2012", label: "Founded" },
  { value: "2k+", label: "Products" },
  { value: "25+", label: "Brands" },
  { value: "10M+", label: "Orders delivered" },
];

const TrustedBy: React.FC = () => {
  return (
    <div className="bg-gray-100 py-6">
      <Container className={" "}>
        <h2 className="text-center md:text-xl sm:text-base font-small text-black uppercase mb-6">
          Trusted by Our Fam!
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                {stat.value}
              </p>
              <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TrustedBy;
