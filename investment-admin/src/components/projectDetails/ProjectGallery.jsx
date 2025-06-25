import { useState, useEffect } from "react";
import Image from "next/image";
import ImageViewer from "react-simple-image-viewer";
import { MdClose } from "react-icons/md";

// Skeleton component for loading state
const Skeleton = ({ height }) => (
  <div
    className="bg-gray-300 animate-pulse rounded-md"
    style={{ height: `${height}px`, width: "100%" }}
  ></div>
);

const ProjectGallery = ({ projectData }) => {
  const [screenWidth, setScreenWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      setTimeout(() => setIsLoading(false), 1000);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (screenWidth === null) return null;

  const imageCount = projectData?.projectPicture?.length || 0;

  const getDimensions = () => {
    if (screenWidth <= 320) {
      return { main: { height: 100 }, small: { height: 70 } };
    } else if (screenWidth <= 375) {
      return { main: { height: 200 }, small: { height: 100 } };
    } else if (screenWidth <= 600) {
      return { main: { height: 200 }, small: { height: 100 } };
    }
    return { main: { height: 400 }, small: { height: 180 } };
  };

  const { main, small } = getDimensions();
  const adjustedMainHeight = small.height * 2.06;
  const fallbackImage = "/path-to-image/image.png";

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const images = projectData?.projectPicture || [fallbackImage];

  if (isLoading) {
    return (
      <div className="p-0 grid grid-cols-2 gap-2">
        <Skeleton height={adjustedMainHeight} />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton height={small.height} />
          <Skeleton height={small.height} />
          <Skeleton height={small.height} />
          <Skeleton height={small.height} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-0  grid grid-cols-2 gap-2">
      {/* Main Image */}
      <div
        className="cursor-pointer"
        style={{ height: `${adjustedMainHeight}px` }}
        onClick={() => openImageViewer(0)}
      >
        <div className="relative w-full h-full border border-gray-300 shadow-lg rounded-md">
          <Image
            src={images[0]}
            fill
            alt="Main Property Image"
            className="rounded-md object-cover"
            sizes="(max-width: 320px) 100vw, (max-width: 375px) 100vw, (max-width: 768px) 50vw, 600px"
          />
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-2 gap-2 relative">
        {Array.from({ length: 4 }, (_, index) =>
          imageCount > index + 1 ? (
            <div
              key={index}
              className="cursor-pointer"
              style={{ height: `${small.height}px` }}
              onClick={() => openImageViewer(index + 1)}
            >
              <div className="relative w-full h-full border border-gray-300 shadow-sm rounded-md">
                <Image
                  src={images[index + 1]}
                  fill
                  alt={`Small Property Image ${index + 1}`}
                  className="rounded-md object-cover"
                  sizes="(max-width: 320px) 100vw, (max-width: 375px) 100vw, (max-width: 768px) 50vw, 300px"
                />
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Image Viewer */}
      {isViewerOpen && (
        <div className="md:mx-5 sm:mx-0 ">
          <ImageViewer
            src={images}
            currentIndex={currentImageIndex}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            }}
          />
          {/* Custom Close Button */}
          <button
            className="fixed top-24 right-4 bg-white text-black p-2 rounded-full shadow-lg bg-opacity-70 hover:bg-opacity-100 "
            onClick={closeImageViewer}
            style={{ zIndex: 1001 }}
          >
            <MdClose size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
