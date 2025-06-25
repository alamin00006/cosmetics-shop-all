"use client";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";

import { useGetAllMarketBannersQuery } from "@/redux/api/marketBannerApi";
import Image from "next/image";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { FaTrash } from "react-icons/fa";

const MarketBannerList = () => {
  const {
    data,
    error: bannerGetError,
    isLoading,
    refetch,
  } = useGetAllMarketBannersQuery();

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const handleDeleteBanner = async (id) => {
    if (data?.length === 1) {
      toast.error("Please keep at least one image.");
    }
    try {
      await axios.delete(`${getBaseUrl()}/market-banner/${id}`);

      toast.success("Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred!");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-end">
        <Link href="/market-banner">
          <button className="rounded-md bg-teal-500 px-4 py-2 text-white shadow-md hover:bg-teal-600 transition duration-300">
            Add New Banner
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className="bg-gray-100">
            <tr className="text-gray-700 text-left text-sm">
              <th>No</th>
              <th>Banner Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="divide-gray-200 divide-y">
            {data?.map((banner, index) => (
              <tr key={banner._id} className="">
                <td className=" px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 h-[80px]">
                  <Image
                    src={banner?.bannerImage}
                    alt={`Banner`}
                    width={150}
                    height={50}
                    className="rounded h-full object-contain"
                  />
                </td>
                <td
                  className="flex justify-center h-[80px]"
                  onClick={() => handleDeleteBanner(banner?._id)}
                >
                  <div>
                    <FaTrash className="w-5 h-5 mt-5 hover:text-rose-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default MarketBannerList;
