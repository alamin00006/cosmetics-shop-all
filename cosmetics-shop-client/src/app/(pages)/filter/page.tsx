import Head from "next/head";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  new: boolean;
  rating?: number; // Optional rating
}

export default function FilterPage() {
  const products: Product[] = [
    {
      id: 1,
      name: "Dr.PAWPAW Your Gorgeous Skin Cleansing Balm",
      brand: "Dr.PAWPAW",
      price: 165,
      originalPrice: 295,
      discount: "10% Off",
      image: "https://via.placeholder.com/150?text=Dr.PAWPAW+Balm",
      new: true,
    },
    {
      id: 2,
      name: "Eveline Cosmetics+ Purifying Facial Wash Paste With Activated Carbon 150ml",
      brand: "Eveline Cosmetics",
      price: 585,
      originalPrice: 650,
      discount: "10% Off",
      image: "https://via.placeholder.com/150?text=Eveline+Wash",
      new: true,
    },
    {
      id: 3,
      name: "Eveline Cosmetics+ Micellar Face Wash Gel With Organic Rose Water 150ml",
      brand: "Eveline Cosmetics",
      price: 405,
      originalPrice: 450,
      discount: "10% Off",
      image: "https://via.placeholder.com/150?text=Eveline+Gel",
      new: true,
    },
    {
      id: 4,
      name: "Revolution Skincare Ceramides Foaming Cleanser",
      brand: "Revolution Skincare",
      price: 475,
      originalPrice: 950,
      discount: "50% Off",
      rating: 4,
      image: "https://via.placeholder.com/150?text=Revolution+Cleanser",
      new: false,
    },
  ];

  return (
    <>
      <Head>
        <title>Buy Face Cleanser Online</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
          BUY FACE CLEANSER ONLINE
        </h1>
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Filters */}
          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-2">Filter:</h2>
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product type
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>Moisturizers</option>
                  <option>Face Gel & Moisturizers (1)</option>
                  <option>Face Scrub (1)</option>
                  <option>Face Wash & Cleansers (18)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>Dr.PAWPAW</option>
                  <option>Eveline Cosmetics</option>
                  <option>Revolution Skincare</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>All</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Finish
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>All</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Makeup Product Type
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>All</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Coverage
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>All</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Formulation
                </label>
                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 text-sm">
                  <option>All</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-end mb-4">
              <select className="border-gray-300 rounded-md shadow-sm p-2 text-sm">
                <option>Sort by: Featured</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  {product.new && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      NEW IN
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 sm:h-40 object-cover mb-2"
                  />
                  <h3 className="text-sm font-medium line-clamp-1">
                    {product.brand}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {product.name}
                  </p>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-lg font-bold">
                      BDT{product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      BDT{product.originalPrice}
                    </span>
                    <span className="text-xs text-red-600">
                      {product.discount}
                    </span>
                  </div>
                  {product.rating && (
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500">
                        {Array(product.rating).fill("★").join("")}
                      </span>
                      <span className="text-gray-600 ml-1 text-xs">
                        {product.rating} ★
                      </span>
                    </div>
                  )}
                  <button className="mt-3 sm:mt-4 w-full bg-black text-white py-1.5 sm:py-2 rounded text-sm hover:bg-gray-800 transition-colors duration-200">
                    ADD TO BAG
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
