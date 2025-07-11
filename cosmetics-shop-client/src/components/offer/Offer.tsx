import Image from "next/image";

const Offer = () => {
  return (
    <div>
      <Image
        src="https://hokmakeup.com/cdn/shop/files/1920x160.jpg?v=1748947569&width=1920"
        alt="Offer Banner"
        width={1140}
        height={300}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Offer;
