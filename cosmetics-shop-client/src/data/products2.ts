import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  { id: "skincare", name: "Skincare", icon: "✨", productCount: 32 },
  { id: "makeup", name: "Makeup", icon: "💄", productCount: 45 },
  { id: "fragrance", name: "Fragrance", icon: "🌸", productCount: 18 },
  { id: "haircare", name: "Hair Care", icon: "💇", productCount: 24 },
  { id: "bodycare", name: "Body Care", icon: "🛁", productCount: 28 },
  { id: "tools", name: "Beauty Tools", icon: "🪞", productCount: 15 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Radiance Renewal Serum",
    description: "A luxurious vitamin C serum that brightens and evens skin tone while providing powerful antioxidant protection. Formulated with 15% L-Ascorbic Acid and hyaluronic acid for a dewy, youthful glow.",
    price: 89,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80"
    ],
    category: "skincare",
    brand: "Lumière",
    rating: 4.9,
    reviewCount: 2847,
    inStock: true,
    isNew: true,
    isBestseller: true,
    colors: [
      { name: "Original Formula", hex: "#F5E6D3" },
      { name: "Rose Infusion", hex: "#E8B4B8" },
      { name: "Pearl Glow", hex: "#FAF0E6" }
    ],
    specifications: {
      "Size": "30ml / 1 fl oz",
      "Skin Type": "All skin types",
      "Key Ingredients": "Vitamin C, Hyaluronic Acid, Vitamin E",
      "Texture": "Lightweight serum",
      "Scent": "Citrus fresh",
    },
    features: [
      "Brightens dark spots",
      "Boosts collagen production",
      "Antioxidant protection",
      "Cruelty-free & vegan",
    ],
    tags: ["Bestseller", "Vegan", "Cruelty-Free"]
  },
  {
    id: "2",
    name: "Velvet Matte Lipstick",
    description: "A creamy, long-wearing matte lipstick that glides on smoothly and stays put for up to 12 hours. Enriched with vitamin E for comfortable, hydrating wear.",
    price: 38,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1631214524115-ccc88e173099?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=800&auto=format&fit=crop&q=80"
    ],
    category: "makeup",
    brand: "Rose Atelier",
    rating: 4.8,
    reviewCount: 1523,
    inStock: true,
    isBestseller: true,
    colors: [
      { name: "Rouge Passion", hex: "#8B0000" },
      { name: "Nude Rose", hex: "#D4A5A5" },
      { name: "Berry Kiss", hex: "#722F37" },
      { name: "Coral Dream", hex: "#FF7F50" },
      { name: "Mauve Silk", hex: "#915F6D" },
      { name: "Crimson Red", hex: "#DC143C" },
      { name: "Dusty Pink", hex: "#D5A6BD" },
      { name: "Wine Night", hex: "#59343B" }
    ],
    specifications: {
      "Size": "3.5g",
      "Finish": "Velvet Matte",
      "Coverage": "Full",
      "Wear Time": "12 hours",
    },
    features: [
      "Transfer-proof formula",
      "Hydrating with Vitamin E",
      "Buildable coverage",
      "No feathering",
    ],
    tags: ["Trending", "Vegan"]
  },
  {
    id: "3",
    name: "Midnight Rose Eau de Parfum",
    description: "An enchanting fragrance that opens with sparkling bergamot and pink pepper, blooming into a heart of Bulgarian rose and peony, resting on a base of musk and sandalwood.",
    price: 145,
    originalPrice: 175,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&auto=format&fit=crop&q=80"
    ],
    category: "fragrance",
    brand: "Maison Belle",
    rating: 4.9,
    reviewCount: 892,
    inStock: true,
    isNew: true,
    colors: [
      { name: "50ml", hex: "#2C1810" },
      { name: "100ml", hex: "#1A0F0A" }
    ],
    specifications: {
      "Size": "100ml / 3.4 fl oz",
      "Concentration": "Eau de Parfum",
      "Top Notes": "Bergamot, Pink Pepper",
      "Heart Notes": "Bulgarian Rose, Peony",
      "Base Notes": "Musk, Sandalwood",
    },
    features: [
      "Long-lasting 8+ hours",
      "Elegant glass bottle",
      "Perfect for evening wear",
      "Gift-ready packaging",
    ],
    tags: ["Luxury", "New Arrival"]
  },
  {
    id: "4",
    name: "Silk Repair Hair Mask",
    description: "An intensive repair treatment that transforms dry, damaged hair into silky, lustrous locks. Infused with argan oil and keratin for deep nourishment.",
    price: 42,
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80"
    ],
    category: "haircare",
    brand: "Tress Luxe",
    rating: 4.7,
    reviewCount: 1241,
    inStock: true,
    colors: [
      { name: "Regular Strength", hex: "#FFF8DC" },
      { name: "Deep Repair", hex: "#DEB887" },
      { name: "Color Protect", hex: "#FFB6C1" }
    ],
    specifications: {
      "Size": "200ml / 6.8 fl oz",
      "Hair Type": "Dry & Damaged",
      "Key Ingredients": "Argan Oil, Keratin, Silk Proteins",
      "Use": "Weekly treatment",
    },
    features: [
      "Repairs split ends",
      "Adds brilliant shine",
      "Reduces frizz",
      "Color-safe formula",
    ],
    tags: ["Salon Quality"]
  },
  {
    id: "5",
    name: "Hydra Glow Moisturizer",
    description: "A lightweight yet deeply hydrating cream that plumps and illuminates skin. Features a blend of squalane, ceramides, and niacinamide for 72-hour moisture.",
    price: 68,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80"
    ],
    category: "skincare",
    brand: "Lumière",
    rating: 4.8,
    reviewCount: 1876,
    inStock: true,
    isBestseller: true,
    colors: [
      { name: "Day Cream", hex: "#FFF0F5" },
      { name: "Night Repair", hex: "#E6E6FA" },
      { name: "Sensitive Skin", hex: "#F0FFF0" }
    ],
    specifications: {
      "Size": "50ml / 1.7 fl oz",
      "Skin Type": "Normal to Dry",
      "Key Ingredients": "Squalane, Ceramides, Niacinamide",
      "Texture": "Gel-cream",
    },
    features: [
      "72-hour hydration",
      "Strengthens skin barrier",
      "Non-comedogenic",
      "Fragrance-free",
    ],
    tags: ["Bestseller", "Dermatologist Tested"]
  },
  {
    id: "6",
    name: "Pro Makeup Brush Set",
    description: "A complete collection of 12 professional-grade brushes with ultra-soft synthetic bristles. Includes a chic travel case for on-the-go touch-ups.",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
    ],
    category: "tools",
    brand: "Artistry Pro",
    rating: 4.6,
    reviewCount: 654,
    inStock: true,
    colors: [
      { name: "Rose Gold", hex: "#B76E79" },
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Matte Black", hex: "#1C1C1C" },
      { name: "Pearl White", hex: "#F5F5F5" }
    ],
    specifications: {
      "Pieces": "12 brushes + case",
      "Bristles": "Ultra-soft synthetic",
      "Handle": "Rose gold aluminum",
      "Case": "Vegan leather",
    },
    features: [
      "Cruelty-free bristles",
      "Ergonomic handles",
      "Easy to clean",
      "Travel-friendly",
    ],
    tags: ["Professional", "Cruelty-Free"]
  },
  {
    id: "7",
    name: "Botanical Body Oil",
    description: "A fast-absorbing dry oil that nourishes and leaves skin with a subtle golden shimmer. Infused with rosehip, jojoba, and sweet almond oils.",
    price: 52,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80"
    ],
    category: "bodycare",
    brand: "Botanica",
    rating: 4.7,
    reviewCount: 934,
    inStock: true,
    colors: [
      { name: "Golden Shimmer", hex: "#FFD700" },
      { name: "Rose Glow", hex: "#FFB6C1" },
      { name: "Bronze Goddess", hex: "#CD7F32" },
      { name: "Natural Nude", hex: "#F5DEB3" }
    ],
    features: [
      "Fast-absorbing formula",
      "Subtle golden shimmer",
      "Nourishing botanicals",
      "Non-greasy finish"
    ],
    tags: ["Organic", "Vegan"]
  },
  {
    id: "8",
    name: "Luminous Setting Powder",
    description: "An ultra-fine setting powder that blurs imperfections and sets makeup with a soft-focus, luminous finish. Perfect for all skin tones.",
    price: 45,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=800&auto=format&fit=crop&q=80"
    ],
    category: "makeup",
    brand: "Rose Atelier",
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    colors: [
      { name: "Translucent", hex: "#FFFAF0" },
      { name: "Light", hex: "#FFE4C4" },
      { name: "Medium", hex: "#DEB887" },
      { name: "Tan", hex: "#D2B48C" },
      { name: "Deep", hex: "#8B7355" }
    ],
    specifications: {
      "Size": "10g",
      "Finish": "Luminous Matte",
      "Coverage": "Sheer to Medium"
    },
    features: [
      "Blurs imperfections",
      "Sets makeup for hours",
      "Soft-focus finish",
      "Oil-control"
    ],
    tags: ["Award Winner"]
  },
  {
    id: "9",
    name: "Rose Water Toner",
    description: "A refreshing alcohol-free toner infused with pure rose water and witch hazel. Balances pH, minimizes pores, and prepares skin for serums.",
    price: 32,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
    ],
    category: "skincare",
    brand: "Botanica",
    rating: 4.6,
    reviewCount: 1123,
    inStock: true,
    colors: [
      { name: "Classic Rose", hex: "#FFB6C1" },
      { name: "Lavender Calm", hex: "#E6E6FA" }
    ],
    features: [
      "Alcohol-free formula",
      "Balances skin pH",
      "Minimizes pores",
      "Calms irritation"
    ],
    tags: ["Natural", "Gentle"]
  },
  {
    id: "10",
    name: "Volume Boost Mascara",
    description: "A volumizing mascara with a hourglass-shaped brush that lifts and separates lashes for dramatic, clump-free volume. Smudge-proof and long-wearing.",
    price: 28,
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80"
    ],
    category: "makeup",
    brand: "Rose Atelier",
    rating: 4.4,
    reviewCount: 2156,
    inStock: true,
    colors: [
      { name: "Blackest Black", hex: "#000000" },
      { name: "Brown Black", hex: "#3D2B1F" },
      { name: "Navy Blue", hex: "#1B3A57" }
    ],
    specifications: {
      "Size": "8ml",
      "Formula": "Volumizing",
      "Finish": "Dramatic"
    },
    features: [
      "Clump-free formula",
      "Hourglass brush",
      "Smudge-proof",
      "Easy to remove"
    ],
    tags: ["Popular"]
  },
];

export const brands = ["Lumière", "Rose Atelier", "Maison Belle", "Tress Luxe", "Botanica", "Artistry Pro"];
