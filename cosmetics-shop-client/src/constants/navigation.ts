interface NavSubItem {
  title: string;
  href: string;
  subItems?: NavSubItem[] | null;
}

interface NavItem {
  title: string;
  href: string;
  dropdown?: NavSubItem[] | null;
}

export const navigation: NavItem[] = [
  {
    title: "New Arrivals",
    href: "/new-arrivals",
    dropdown: null,
  },
  {
    title: "Brands",
    href: "/brands",
    dropdown: null,
  },
  {
    title: "Makeup",
    href: "/makeup",
    dropdown: [
      { title: "Explore All", href: "/makeup/explore-all" },
      {
        title: "Face",
        href: "/makeup/face",
        subItems: [
          { title: "Foundation", href: "/makeup/face/foundation" },
          { title: "Blush", href: "/makeup/face/blush" },
          { title: "Bronzer", href: "/makeup/face/bronzer" },
          { title: "Compact", href: "/makeup/face/compact" },
          { title: "Concealer", href: "/makeup/face/concealer" },
          { title: "Contour", href: "/makeup/face/contour" },
          { title: "Highlighter", href: "/makeup/face/highlighter" },
          { title: "Loose Powder", href: "/makeup/face/loose-powder" },
          { title: "Setting Spray", href: "/makeup/face/setting-spray" },
          { title: "Primer", href: "/makeup/face/primer" },
          { title: "Makeup Combo", href: "/makeup/face/makeup-combo" },
        ],
      },
      { title: "Eyes", href: "/makeup/eyes", subItems: null },
      { title: "Lips", href: "/makeup/lips", subItems: null },
      { title: "Tools & Brushes", href: "/makeup/tools", subItems: null },
      { title: "Nails", href: "/makeup/nails", subItems: null },
      { title: "Accessories", href: "/makeup/accessories", subItems: null },
    ],
  },
  {
    title: "Skin",
    href: "/skin",
    dropdown: [
      { title: "Explore All", href: "/makeup/explore-all" },
      {
        title: "Face",
        href: "/makeup/face",
        subItems: [
          { title: "Foundation", href: "/makeup/face/foundation" },
          { title: "Blush", href: "/makeup/face/blush" },
          { title: "Bronzer", href: "/makeup/face/bronzer" },
          { title: "Compact", href: "/makeup/face/compact" },
          { title: "Concealer", href: "/makeup/face/concealer" },
          { title: "Contour", href: "/makeup/face/contour" },
          { title: "Highlighter", href: "/makeup/face/highlighter" },
          { title: "Loose Powder", href: "/makeup/face/loose-powder" },
          { title: "Setting Spray", href: "/makeup/face/setting-spray" },
          { title: "Primer", href: "/makeup/face/primer" },
          { title: "Makeup Combo", href: "/makeup/face/makeup-combo" },
        ],
      },
      { title: "Eyes", href: "/makeup/eyes", subItems: null },
      { title: "Lips", href: "/makeup/lips", subItems: null },
      { title: "Tools & Brushes", href: "/makeup/tools", subItems: null },
      { title: "Nails", href: "/makeup/nails", subItems: null },
      { title: "Accessories", href: "/makeup/accessories", subItems: null },
    ],
  },
  {
    title: "Hair",
    href: "/hair",
    dropdown: null,
  },
  {
    title: "Fragrance",
    href: "/fragrance",
    dropdown: null,
  },
];
