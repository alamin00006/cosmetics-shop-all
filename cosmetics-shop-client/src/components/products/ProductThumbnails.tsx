import React from "react";
import Image from "next/image"; // Import Next.js Image component

interface ProductThumbnailsProps {
  thumbnails: string[];
  onThumbnailClick: (image: string) => void;
  mainImage?: string; // Optional prop to highlight the active thumbnail
}

const ProductThumbnails: React.FC<ProductThumbnailsProps> = ({
  thumbnails,
  onThumbnailClick,
  mainImage,
}) => {
  return (
    <div className=" overflow-x-auto scrollbar-hide space-y-3">
      {thumbnails.map((thumbnail, index) => (
        <Image
          key={index}
          src={thumbnail}
          alt={`Thumbnail ${index + 1}`}
          className={`w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 object-cover rounded border cursor-pointer transition-colors ${
            thumbnail === mainImage
              ? "border-indigo-500"
              : "border-gray-200 hover:border-gray-400"
          }`}
          width={80} // Maximum width for md breakpoint (20 * 4 for pixel density)
          height={80} // Maximum height for md breakpoint
          sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
          onClick={() => onThumbnailClick(thumbnail)}
        />
      ))}
    </div>
  );
};

export default ProductThumbnails;
