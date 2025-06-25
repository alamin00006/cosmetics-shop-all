interface NavigationChildItem {
  title: string;
  href: string;
}

interface NavigationSubItem {
  title: string;
  href: string;
  subItems?: NavigationChildItem[];
}

interface NavigationItem {
  title: string;
  href: string;
  dropdown?: NavigationSubItem[];
}

export const navigation: NavigationItem[] = [
  {
    title: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    title: "Brands",
    href: "/brands",
    dropdown: [
      {
        title: "Brand 1",
        href: "/brand-1",
        subItems: [
          { title: "Product 1", href: "/brand-1/product-1" },
          { title: "Product 2", href: "/brand-1/product-2" },
        ],
      },
      {
        title: "Brand 2",
        href: "/brand-2",
      },
    ],
  },
  {
    title: "Makeup",
    href: "/makeup",
  },
  {
    title: "Skin",
    href: "/skin",
  },
  {
    title: "Hair",
    href: "/hair",
  },
  {
    title: "Fragrance",
    href: "/fragrance",
  },
  {
    title: "Combos & Gift Sets",
    href: "/combos-gift-sets",
  },
];
