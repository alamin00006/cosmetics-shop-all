import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Not Found || Sharikana - Data not found",
};

const NotFound = () => {
  return (
    <>
      {/* Error/404 Section Area */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="container mx-auto text-center p-5">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="md:w-1/2" data-aos="fade-left">
              <div className="animate_content">
                <div className="animate_thumb mb-5">
                  <Image
                    width={591}
                    height={452}
                    className="w-full h-auto"
                    src="/images/icon/error-page-img.png"
                    alt="error-page-img"
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 md:pl-10" data-aos="fade-right">
              <div className="error_page_content">
                <div className="erro_code text-6xl font-bold text-red-600">
                  <span className="text-thm">40</span>4
                </div>
                <h2 className="error_title text-2xl font-semibold text-gray-800 mt-4">
                  Oops! It looks like you are lost.
                </h2>
                <p className="text-gray-600 text-lg mb-4 mt-2">
                  The page you are looking for is not available. Try to search
                  again <br className="hidden md:block" /> or use the button
                  below to return home.
                </p>
                <Link
                  href="/dashboard"
                  className="bg-green-500 text-white py-2 px-4 rounded shadow-lg transition duration-300 hover:bg-green-600"
                >
                  Go Back To Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
