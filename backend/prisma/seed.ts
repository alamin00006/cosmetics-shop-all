import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log("🌱 Seeding database...");

  // Create Categories
  const categories = [
    {
      id: "cat-smartphones",
      name: "Smartphones",
      icon: "Smartphone",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      subcategories: ["iPhone", "Samsung", "Google Pixel", "OnePlus"],
    },
    {
      id: "cat-laptops",
      name: "Laptops",
      icon: "Laptop",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
      subcategories: ["MacBook", "Windows", "Gaming", "Chromebook"],
    },
    {
      id: "cat-audio",
      name: "Audio",
      icon: "Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      subcategories: ["Headphones", "Earbuds", "Speakers", "Soundbars"],
    },
    {
      id: "cat-wearables",
      name: "Wearables",
      icon: "Watch",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      subcategories: ["Smartwatches", "Fitness Trackers", "Smart Glasses"],
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: {
        name: cat.name,
        icon: cat.icon,
        image: cat.image,
      },
      create: {
        id: cat.id,
        name: cat.name,
        icon: cat.icon,
        image: cat.image,
        subcategories: {
          create: cat.subcategories.map((name) => ({ name })),
        },
      },
    });
  }

  console.log("✅ Categories created");

  // Create Products
  const products = [
    {
      id: "prod-iphone-15-pro",
      name: "iPhone 15 Pro Max",
      description:
        "The most advanced iPhone ever with A17 Pro chip, titanium design, and 5x optical zoom.",
      price: 1199,
      originalPrice: 1299,
      image:
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      brand: "Apple",
      rating: 4.9,
      reviewCount: 2453,
      inStock: true,
      categoryId: "cat-smartphones",
      isNew: true,
      isBestseller: true,
      features: [
        "A17 Pro chip",
        "Titanium design",
        "5x optical zoom",
        "Action button",
      ],
      colors: [
        { name: "Natural Titanium", hex: "#9A8F82" },
        { name: "Blue Titanium", hex: "#3B4A5A" },
        { name: "White Titanium", hex: "#E5E3DF" },
        { name: "Black Titanium", hex: "#3C3C3C" },
      ],
    },
    // ... (rest of products remain the same)
  ];

  for (const prod of products) {
    const { colors, features, ...productData } = prod;

    await prisma.product.upsert({
      where: { id: prod.id },
      update: productData,
      create: {
        ...productData,
        images: [productData.image],
        tags: [],
        colors: {
          create: colors,
        },
      },
    });
  }

  console.log("✅ Products created");

  // Update category product counts
  for (const cat of categories) {
    const count = await prisma.product.count({
      where: { categoryId: cat.id },
    });
    await prisma.category.update({
      where: { id: cat.id },
      data: { productCount: count },
    });
  }

  console.log("✅ Category counts updated");

  // Create Demo User
  const hashedPassword = await bcrypt.hash("demo123", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      id: "user-demo",
      email: "demo@example.com",
      password: hashedPassword,
      name: "Demo User",
      phone: "+1 234 567 8900",
    },
  });

  console.log("✅ Demo user created");

  // Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      id: "user-admin",
      email: "admin@example.com",
      password: adminPassword,
      name: "Admin User",
      phone: "+1 234 567 8901",
    },
  });

  console.log("✅ Admin user created");

  // Create Cart for Demo User
  await prisma.cart.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
    },
  });

  console.log("✅ Demo user cart created");

  // Create Demo Address
  await prisma.address.upsert({
    where: { id: "addr-demo-1" },
    update: {},
    create: {
      id: "addr-demo-1",
      userId: demoUser.id,
      type: "home",
      name: "Home",
      street: "123 Demo Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
      isDefault: true,
    },
  });

  console.log("✅ Demo address created");

  console.log("🎉 Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
