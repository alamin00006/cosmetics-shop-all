import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useGetAllHeroBannersQuery } from "@/redux/api/heroBannerApi";
import { HeroBannerType } from "@/types/heroBannerType";

interface HeroBannerApiResponse {
  data: HeroBannerType[];
}

const SkeletonLoader = () => (
  <div className="w-full h-[180px] md:h-[220px] lg:h-[300px] bg-gray-300 animate-pulse"></div>
);

const HeroBanner: React.FC = () => {
  const {
    data: heroBanners,
    error: userError,
    isLoading: userIsLoading,
  } = useGetAllHeroBannersQuery() as {
    data?: HeroBannerApiResponse;
    error?: unknown;
    isLoading: boolean;
  };

  const bannerData = heroBanners?.data ?? [];

  const splideOptions = {
    type: "loop",
    perPage: 1,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    // arrows: true,
    pagination: true,
    interval: 3000,
  };

  return (
    <div className="md:mt-20 sm:mt-16">
      {bannerData?.length > 0 ? (
        <Splide options={splideOptions}>
          {bannerData?.map((banner) => (
            <SplideSlide key={banner._id}>
              <div className="relative w-full sm:h-[130px] md:h-[220px] lg:h-[300px] md:mb-5 sm:mb-0">
                <Image
                  src={banner.bannerImage}
                  alt="Banner image"
                  width={1140}
                  height={300}
                  className="md:object-cover sm:object-contain w-full h-full"
                  quality={100}
                  priority
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <SkeletonLoader />
      )}
    </div>
  );
};

export default HeroBanner;
