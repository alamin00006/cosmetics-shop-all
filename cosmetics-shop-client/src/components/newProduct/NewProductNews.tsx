import Image from "next/image";
import image1 from "@/assets/productNews/image1.webp";
import image2 from "@/assets/productNews/image2.webp";
import image3 from "@/assets/productNews/image3.webp";
import image4 from "@/assets/productNews/image4.webp";

const NewProductNews = () => {
  const products = [
    {
      id: 1,
      image: image1,
      title: "Makeup Revolution",
      description:
        "Blush Burst is here to steal your heart (and cheeks)! A radiant flush with a second-skin feel — no filters needed.",
    },
    {
      id: 2,
      image: image2,
      title: "Makeup Revolution",
      description:
        "Glitter lashes? Yes, please! Silicone brush that’s party-ready, bold, and beyond basic.",
    },
    {
      id: 3,
      image: image3,
      title: "Makeup Revolution",
      description:
        "The future of lip liner is here. Peel-off tech meets pigment-rich stain for hours of impact.",
    },
    {
      id: 4,
      image: image4,
      title: "Eveline Skin",
      description:
        "Clean, calm vibes, and deep hydration in one step. Face washes are a game-changer for all skin types.",
    },
  ];

  return (
    <div className="py-10 ">
      <h2 className="text-4xl font-bold text-black mb-6">
        What’s new at Nigar?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={256} // Adjust width as needed
              height={256} // Adjust height as needed
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex-grow">
              <p className="text-lg font-bold text-gray-800">JUST LAUNCHED</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {product.title}
              </h3>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
            <div className="p-4 border-t">
              <button className="w-full px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProductNews;
