import React from "react";
import Container from "../Container/Container";

interface Category {
  name: string;
  href: string;
}

const categories: Category[] = [
  { name: "Eyes", href: "#" },
  { name: "Face", href: "#" },
  { name: "Tools & Brushes", href: "#" },
  { name: "Combos & Gift Sets", href: "#" },
  { name: "Lips", href: "#" },
  { name: "Nails", href: "#" },
];

const Categories: React.FC = () => {
  return (
    <Container className={" "}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>
            <a
              href={category.href}
              className="text-gray-600 hover:text-gray-900 text-sm sm:text-base transition-colors"
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Categories;
