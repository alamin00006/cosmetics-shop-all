export interface SubCategory {
  id: string;
  name: string;
  productCount: number;
}

export interface CategoryWithSubs {
  id: string;
  name: string;
  icon: string;
  productCount: number;
  image: string;
  subcategories: SubCategory[];
}

export const categoriesWithSubs: CategoryWithSubs[] = [
  {
    id: "skincare",
    name: "Skincare",
    icon: "✨",
    productCount: 32,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee0e15?w=400&auto=format&fit=crop&q=80",
    subcategories: [
      { id: "serums", name: "Serums & Essences", productCount: 12 },
      { id: "moisturizers", name: "Moisturizers", productCount: 8 },
      { id: "cleansers", name: "Cleansers", productCount: 6 },
      { id: "toners", name: "Toners", productCount: 4 },
      { id: "masks", name: "Face Masks", productCount: 5 },
      { id: "eye-care", name: "Eye Care", productCount: 3 },
    ],
  },
  {
    id: "makeup",
    name: "Makeup",
    icon: "💄",
    productCount: 45,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop&q=80",
    subcategories: [
      { id: "lips", name: "Lips", productCount: 15 },
      { id: "face", name: "Face", productCount: 12 },
      { id: "eyes", name: "Eyes", productCount: 10 },
      { id: "brows", name: "Brows", productCount: 4 },
      { id: "palettes", name: "Palettes", productCount: 6 },
    ],
  },
  {
    id: "fragrance",
    name: "Fragrance",
    icon: "🌸",
    productCount: 18,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop&q=80",
    subcategories: [
      { id: "perfume", name: "Eau de Parfum", productCount: 8 },
      { id: "toilette", name: "Eau de Toilette", productCount: 5 },
      { id: "mists", name: "Body Mists", productCount: 3 },
      { id: "sets", name: "Gift Sets", productCount: 2 },
    ],
  },
  {
    id: "haircare",
    name: "Hair Care",
    icon: "💇",
    productCount: 24,
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&auto=format&fit=crop&q=80",
    subcategories: [
      { id: "shampoo", name: "Shampoo", productCount: 6 },
      { id: "conditioner", name: "Conditioner", productCount: 5 },
      { id: "treatments", name: "Treatments & Masks", productCount: 7 },
      { id: "styling", name: "Styling", productCount: 4 },
      { id: "oils", name: "Hair Oils", productCount: 2 },
    ],
  },
  {
    id: "bodycare",
    name: "Body Care",
    icon: "🛁",
    productCount: 28,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80",
    subcategories: [
      { id: "body-lotion", name: "Body Lotions", productCount: 8 },
      { id: "body-oil", name: "Body Oils", productCount: 5 },
      { id: "body-wash", name: "Body Wash", productCount: 6 },
      { id: "hand-care", name: "Hand Care", productCount: 5 },
      { id: "scrubs", name: "Body Scrubs", productCount: 4 },
    ],
  },
  {
    id: "tools",
    name: "Beauty Tools",
    icon: "🪞",
    productCount: 15,
    image: "https://images.unsplash.com/photo-1522338242042-1d3e3a4e5b1a?w=400&auto=format&fit=crop&q=80",
    subcategories: [
      { id: "brushes", name: "Brushes", productCount: 6 },
      { id: "sponges", name: "Sponges", productCount: 3 },
      { id: "devices", name: "Beauty Devices", productCount: 4 },
      { id: "accessories", name: "Accessories", productCount: 2 },
    ],
  },
];
