export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  shades?: { name: string; color: string }[];
  rating: number;
  reviews: number;
  description: string;
  ingredients?: string;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Velvet Matte Lipstick",
    brand: "Luxe Beauty",
    price: 24.99,
    originalPrice: 32.0,
    category: "Makeup",
    subcategory: "Lips",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop",
    ],
    shades: [
      { name: "Rose Petal", color: "#C4526A" },
      { name: "Nude Blush", color: "#C89B7B" },
      { name: "Berry Kiss", color: "#8B2252" },
      { name: "Coral Dream", color: "#E07C6A" },
    ],
    rating: 4.8,
    reviews: 342,
    description:
      "A luxuriously smooth matte lipstick that delivers intense color with a weightless, comfortable finish. Enriched with vitamin E and shea butter for all-day hydration.",
    ingredients:
      "Isododecane, Dimethicone, Trimethylsiloxysilicate, Nylon-611/Dimethicone Copolymer",
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: "2",
    name: "Radiance Serum Foundation",
    brand: "Glow Lab",
    price: 38.0,
    category: "Makeup",
    subcategory: "Face",
    image:
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    ],
    shades: [
      { name: "Porcelain", color: "#F5DEB3" },
      { name: "Sand", color: "#D2B48C" },
      { name: "Honey", color: "#C19A6B" },
      { name: "Caramel", color: "#8B6914" },
    ],
    rating: 4.6,
    reviews: 218,
    description:
      "A lightweight serum foundation that blurs imperfections while providing a natural, radiant glow. Buildable medium coverage that lasts up to 12 hours.",
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Hydra Glow Moisturizer",
    brand: "Pure Skin",
    price: 42.0,
    originalPrice: 56.0,
    category: "Skincare",
    subcategory: "Moisturizers",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4ee7579?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1570194065650-d99fb4ee7579?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviews: 567,
    description:
      "An intensely hydrating moisturizer packed with hyaluronic acid, ceramides, and botanical extracts. Delivers 72-hour moisture for plump, dewy skin.",
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: "4",
    name: "Rose Gold Eyeshadow Palette",
    brand: "Luxe Beauty",
    price: 45.0,
    category: "Makeup",
    subcategory: "Eyes",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 189,
    description:
      "12 stunning rose gold and warm-toned shades ranging from buttery mattes to dazzling metallics. Perfect for creating day-to-night looks.",
    isTrending: true,
    isNew: true,
  },
  {
    id: "5",
    name: "Vitamin C Brightening Serum",
    brand: "Pure Skin",
    price: 35.0,
    category: "Skincare",
    subcategory: "Serums",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviews: 423,
    description:
      "A potent 20% vitamin C serum with ferulic acid and vitamin E. Brightens, firms, and protects against environmental damage.",
    isTrending: true,
  },
  {
    id: "6",
    name: "Silk Repair Hair Mask",
    brand: "Tress Co",
    price: 28.0,
    category: "Haircare",
    subcategory: "Treatments",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&h=600&fit=crop",
    ],
    rating: 4.4,
    reviews: 156,
    description:
      "An intensive repair mask infused with silk proteins, argan oil, and keratin. Restores shine and strength to damaged, color-treated hair.",
    isBestSeller: true,
  },
  {
    id: "7",
    name: "Dewy Setting Spray",
    brand: "Glow Lab",
    price: 18.0,
    category: "Makeup",
    subcategory: "Face",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    ],
    rating: 4.3,
    reviews: 298,
    description:
      "A fine mist setting spray that locks in makeup for 16 hours while giving skin a fresh, dewy finish. Infused with rosewater and green tea.",
    isNew: true,
  },
  {
    id: "8",
    name: "Retinol Night Cream",
    brand: "Pure Skin",
    price: 52.0,
    originalPrice: 65.0,
    category: "Skincare",
    subcategory: "Treatments",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviews: 312,
    description:
      "A powerful anti-aging night cream with encapsulated retinol and peptide complex. Reduces fine lines and evens skin tone while you sleep.",
    isBestSeller: true,
  },
  {
    id: "9",
    name: "Volumizing Mascara",
    brand: "Luxe Beauty",
    price: 22.0,
    category: "Makeup",
    subcategory: "Eyes",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviews: 445,
    description:
      "An ultra-black volumizing mascara with a hourglass-shaped brush. Adds dramatic volume and length without clumping or flaking.",
    isTrending: true,
    isNew: true,
  },
  {
    id: "10",
    name: "Argan Oil Hair Serum",
    brand: "Tress Co",
    price: 32.0,
    category: "Haircare",
    subcategory: "Oils",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 203,
    description:
      "A lightweight, non-greasy hair serum with pure Moroccan argan oil. Tames frizz, adds shine, and protects against heat damage up to 450°F.",
  },
  {
    id: "11",
    name: "Blush Trio Palette",
    brand: "Glow Lab",
    price: 29.0,
    category: "Makeup",
    subcategory: "Face",
    image:
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=600&fit=crop",
    ],
    shades: [
      { name: "Peach Glow", color: "#FFDAB9" },
      { name: "Rose Flush", color: "#E8A0BF" },
      { name: "Berry Pop", color: "#C85A7C" },
    ],
    rating: 4.8,
    reviews: 167,
    description:
      "Three perfectly curated blush shades in silky, buildable formulas. A matte, satin, and shimmer finish to suit every mood and look.",
    isNew: true,
  },
  {
    id: "12",
    name: "Niacinamide Pore Serum",
    brand: "Pure Skin",
    price: 26.0,
    category: "Skincare",
    subcategory: "Serums",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=600&h=600&fit=crop",
    ],
    rating: 4.4,
    reviews: 389,
    description:
      "A 10% niacinamide serum with zinc PCA that minimizes pores, controls oil, and improves skin texture. Suitable for all skin types.",
  },
];

export const categories = [
  {
    name: "Makeup",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    count: 156,
  },
  {
    name: "Skincare",
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4ee7579?w=400&h=500&fit=crop",
    count: 98,
  },
  {
    name: "Haircare",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=500&fit=crop",
    count: 64,
  },
];

export const brands = [
  "Luxe Beauty",
  "Glow Lab",
  "Pure Skin",
  "Tress Co",
  "Fenty Beauty",
  "Charlotte Tilbury",
  "Glossier",
  "Rare Beauty",
];
