'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  image: string;
  shades: string[];
}

const ProductCard = ({ id, title, price, oldPrice, image, shades }: Props) => {
  return (
    <div className="border rounded-md p-3 hover:shadow transition">
      <Link href={`/products/${id}`}>
        <Image src={image} alt={title} width={200} height={200} className="mx-auto" />
        <h4 className="mt-2 font-medium text-sm">{title}</h4>
        <div className="text-sm mt-1">
          <span className="text-red-600 font-semibold">₹{price}</span>{' '}
          <span className="line-through text-gray-500">₹{oldPrice}</span>
        </div>
        <div className="flex mt-2 space-x-1">
          {shades.map((shade, idx) => (
            <div
              key={idx}
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: shade }}
            />
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
