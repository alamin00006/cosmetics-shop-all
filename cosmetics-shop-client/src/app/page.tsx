"use client";

import Banner from "../components/Banner/Banner";
import SquareBanner from "../components/Banner/SquareBanner";
import BestSellerCarousel from "../components/Carousel/BestSellerCarousel";
import BrandOfTheWeekCarousel from "../components/Carousel/BrandOfTheWeekCarousel";
import CollectionCarousel from "../components/Carousel/CollectionCarousel";
import NewArrivalsCarousel from "../components/Carousel/NewArrivalsCarousel";
import RewardSquareBanner from "../components/Carousel/RewardSquareBanner";
import TopPickCarousel from "../components/Carousel/TopPickCarousel";
import TrendsSection from "../components/TrendsSection";

export interface BestSellerlItem {
  label: string;
  imageUrl: string;
  imageUrl2: string;
  price: string;
  originalPrice: string;
  discount: string;
  shades: string[];
}
export default function Home() {
  const bestSellerlItemItems: BestSellerlItem[] = [
    {
      label: "Eveline Cosmetics Better Than Perfect Soft Matt Pressed Blush",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/1_38fad031-0d21-454f-baa8-7e26e8f864c1.jpg?v=1745309269",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/2_52a563b8-979c-40f7-b1b5-2bd1618223d1.jpg?v=1745309269",
      price: "৳715",
      originalPrice: "৳795",
      discount: "10% OFF",
      shades: ["#FFB6C1", "#FF6347", "#A0522D"],
    },
    {
      label: "Makeup Revolution Blush Icon Palette",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/81555229535_1.jpg?v=1745309254",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/81555229535_2.jpg?v=1745309254",
      price: "৳716",
      originalPrice: "৳795",
      discount: "10% OFF",
      shades: ["#FF9999", "#FF6666", "#FF3333"],
    },
    {
      label: "L.A. Girl On Cloud Nine Bouncy Eyeshadow",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/makeup-revolution-blush-icon-palette-491846.jpg?v=1745309300",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/makeup-revolution-blush-icon-palette-910294.webp?v=1745309300",
      price: "৳896",
      originalPrice: "৳995",
      discount: "10% OFF",
      shades: ["#D2B48C", "#A0522D", "#8B4513"],
    },
    {
      label: "L.A. Girl On Cloud Nine Bouncy Blush & Bronzer",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/81555964986_1.jpg?v=1745309263",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/81555964986_2.jpg?v=1745309263",
      price: "৳896",
      originalPrice: "৳995",
      discount: "10% OFF",
      shades: ["#FF6347", "#FF4500", "#FF4040"],
    },
    {
      label: "I Heart Revolution Tropical Trip Body Cream Trio",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/1_38fad031-0d21-454f-baa8-7e26e8f864c1.jpg?v=1745309269",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/2_52a563b8-979c-40f7-b1b5-2bd1618223d1.jpg?v=1745309269",
      price: "৳1,350",
      originalPrice: "৳1,500",
      discount: "৳10% OFF",
      shades: ["#FFB6C1", "#FF69B4", "#FF1493"],
    },
    {
      label: "Liquid Lipstick",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/1_ff857fec-df6e-4e6b-a63c-ee34e5ede6e0.jpg?v=1745309271",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/2_71ba344a-82fe-41c3-b2b1-178b119a2298.jpg?v=1745309271",
      price: "৳599",
      originalPrice: "৳699",
      discount: "14% OFF",
      shades: ["#FF4040", "#FF0000", "#DC143C"],
    },
    {
      label: "Mascara",
      imageUrl:
        "https://hokmakeup.com/cdn/shop/files/5057566846028_1.jpg?v=1745309754",
      imageUrl2:
        "https://hokmakeup.com/cdn/shop/files/5057566846028_2.jpg?v=1745309754",
      price: "৳499",
      originalPrice: "৳599",
      discount: "16% OFF",
      shades: ["#000000", "#333333", "#666666"],
    },
  ];
  return (
    <main>
      <div>
        <Banner />
        <CollectionCarousel />
        <TopPickCarousel />
        <NewArrivalsCarousel />
        <SquareBanner />
        <TrendsSection />
        <BrandOfTheWeekCarousel />
        <BestSellerCarousel bestSellerlItemItems={bestSellerlItemItems} />
        <RewardSquareBanner />
      </div>
    </main>
  );
}
