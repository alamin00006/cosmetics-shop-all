import { AppLayout } from "@/components/layout/AppLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySidebar } from "@/components/home/CategorySidebar";
import { ProductGrid } from "@/components/home/ProductGrid";
import { CategoriesSlider } from "@/components/home/CategoriesSlider";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PromoSection } from "@/components/home/PromoSection";
import { motion } from "framer-motion";
import HomePage from "./HomePage";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Index = () => {
  return (
    <AppLayout>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {/* <HeroSection />

        <CategoriesSlider />
        
        <section className="py-8 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              <div className="hidden lg:block">
                <CategorySidebar />
              </div>
              <ProductGrid />
            </div>
          </div>
        </section>

        <NewArrivals />
        
        <PromoSection /> */}
        <HomePage />
      </motion.div>
    </AppLayout>
  );
};

export default Index;
