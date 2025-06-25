import React from "react";

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
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {thumbnails.map((thumbnail, index) => (
        <img
          key={index}
          src={thumbnail}
          alt={`Thumbnail ${index + 1}`}
          className={`w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 object-cover rounded border cursor-pointer transition-colors ${
            thumbnail === mainImage
              ? "border-indigo-500"
              : "border-gray-200 hover:border-gray-400"
          }`}
          onClick={() => onThumbnailClick(thumbnail)}
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/64?text=Thumbnail`;
          }}
        />
      ))}
    </div>
  );
};

export default ProductThumbnails;
