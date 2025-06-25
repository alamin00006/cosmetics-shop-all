// Icons
import { FaPhone, FaWhatsapp, FaUser } from "react-icons/fa";

import Link from "next/link";
const PRManagerDetails = ({ PRManager }) => {
  return (
    <>
      {PRManager?.map((manager) => (
        <div
          key={manager?.id}
          className="bg-white shadow-lg rounded-lg p-2 pt-3"
        >
          {/* Financial metrics */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <FaUser className="w-[16px] h-[16px]" />
              <span className="text-xs md:text-base sm:text-[14px] font-medium">
                Name :
              </span>
              <span className="text-xs md:text-base sm:text-[14px] font-medium text-[#0597ff]">
                {manager?.name}
              </span>
            </div>
            <div className="flex items-center  gap-2">
              <FaPhone className="w-[16px] h-[16px]" />
              <span className="text-xs md:text-base sm:text-[14px] font-medium">
                Call :
              </span>
              <span className="text-xs md:text-base sm:text-[14px] font-medium text-[#0597ff]">
                {manager?.phoneNumber}
              </span>
            </div>
            <div className="flex items-center  gap-2">
              {/* <FaWhatsapp className="w-[20px] h-[20px] text-[#0ec043]" />
          <span className="text-xs md:text-base sm:text-[14px] font-medium">
            WhatsApp :
          </span>
          <span className="text-xs md:text-base sm:text-[14px] font-medium text-[#0597ff]">
            {manager.id?.phoneNumber}
          </span> */}

              <Link
                href={`https://api.whatsapp.com/send?phone=88${manager?.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="relative flex items-center justify-center bg-[#0ec043] px-3 py-1 text-white text-sm rounded-md shadow-lg hover:bg-[#0da33a] focus:ring-4 focus:outline-none focus:ring-green-300 animate-pulse">
                  <FaWhatsapp className="w-6 h-6" />
                  <span className="ml-2 font-bold">WhatsApp Now</span>

                  {/* Animated pulse effect */}
                  <span className="absolute flex h-3 w-3 top-0 right-0">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </button>
              </Link>
            </div>
          </div>
          {manager.additionalName && manager.additionalPhoneNumber && (
            <div className="space-y-2 mb-4">
              <hr />
              <div className="flex items-center gap-2">
                <FaUser className="w-[16px] h-[16px]" />
                <span className="text-xs md:text-base sm:text-[14px] font-medium">
                  Name :
                </span>
                <span className="text-xs md:text-base sm:text-[14px] font-medium text-[#0597ff]">
                  {manager?.additionalName}
                </span>
              </div>
              <div className="flex items-center  gap-2">
                <FaPhone className="w-[16px] h-[16px]" />
                <span className="text-xs md:text-base sm:text-[14px] font-medium">
                  Call :
                </span>
                <span className="text-xs md:text-base sm:text-[14px] font-medium text-[#0597ff]">
                  {manager?.additionalPhoneNumber}
                </span>
              </div>
              <div className="flex items-center  gap-2">
                {/* <FaWhatsapp className="w-[20px] h-[20px] text-[#0ec043]" />
          <span className="text-xs md:text-base sm:text-[14px] font-medium">
            WhatsApp :
          </span>
          <span className="text-xs md:text-base sm:text-[14px] font-medium text-[#0597ff]">
            {manager.id?.phoneNumber}
          </span> */}

                <Link
                  href={`https://api.whatsapp.com/send?phone=88${manager?.additionalPhoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="relative flex items-center justify-center bg-[#0ec043] px-3 py-1 text-white text-sm rounded-md shadow-lg hover:bg-[#0da33a] focus:ring-4 focus:outline-none focus:ring-green-300 animate-pulse">
                    <FaWhatsapp className="w-6 h-6" />
                    <span className="ml-2 font-bold">WhatsApp Now</span>

                    {/* Animated pulse effect */}
                    <span className="absolute flex h-3 w-3 top-0 right-0">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PRManagerDetails;
