"use client";

import { useGetProductsQuery } from "@/redux/api/product";

import SquareBanner from "../components/Banner/SquareBanner";
import BestSellerProduct from "../components/Carousel/BestSellerProduct";
import BrandOfTheWeekCarousel from "../components/Carousel/BrandOfTheWeekCarousel";
import CollectionCarousel from "../components/Carousel/CollectionCarousel";
import NewArrivalProducts from "../components/Carousel/NewArrivalProducts";
import RewardSquareBanner from "../components/Carousel/RewardSquareBanner";
import TopPickCarousel from "../components/Carousel/TopPickCarousel";
import TrendsSection from "../components/TrendsSection";
import HeroBanner from "@/components/Banner/Banner2";
import Offer from "@/components/offer/Offer";
import NewProductNews from "@/components/newProduct/NewProductNews";

export default function Home() {
  const query = {};

  const {
    data: products,
    isSuccess: projectIsSuccess,
    error: projectError,
    isLoading: projectIsLoading,
    refetch,
  } = useGetProductsQuery(query);

  console.log("Products:", products);

  return (
    <main>
      <div className="container mx-auto px-4">
        <HeroBanner />
        <CollectionCarousel />
        <Offer />
        <NewProductNews />
        <TopPickCarousel />
        <NewArrivalProducts products={products?.data ?? []} />
        <SquareBanner />
        <TrendsSection />
        <BrandOfTheWeekCarousel />
        <BestSellerProduct products={products?.data ?? []} />
        <RewardSquareBanner />
      </div>
    </main>
  );
}
