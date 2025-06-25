"use client";
import { Toaster } from "react-hot-toast";
import { useGetSingleInvestmentByUserORInvestIdQuery } from "@/redux/api/investmentApi";
import Link from "next/link";
import { formatBDT } from "@/utils/formateBDT";

const InvestmentPlace = ({ params }) => {
  // get user single investment
  const investmentParams = {
    userId: params?.userId,
  };
  const {
    data: investData,
    error,
    isLoading,
  } = useGetSingleInvestmentByUserORInvestIdQuery(investmentParams);

  return (
    <div className=" mb-10 min-h-screen flex flex-col items-center">
      <h4 className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-4 md:mb-6 mt-2">
        Your Investment Has Been Placed!
      </h4>

      <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg w-full max-w-lg">
        <h5 className="text-center text-base md:text-lg font-semibold text-green-700 mb-3 md:mb-4">
          Investment Information
        </h5>
        <hr className="border-green-500 mb-3 md:mb-4" />

        <div className="flex justify-between items-center mb-3 md:mb-4">
          <div>
            <span className="text-gray-600 text-xs md:text-sm ">
              Investment ID
            </span>
            <p className="text-gray-900 text-base md:text-base font-bold mt-2 uppercase">
              #{investData?.id}
            </p>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* Project Information */}
          <div className="bg-gray-50 p-2 md:p-3 rounded-md border">
            <div>
              <span className="text-gray-600 text-xs md:text-sm">
                Project Title
              </span>
              <h6 className="text-gray-900 text-base md:text-lg sm:text-sm font-semibold">
                {investData?.project?.projectTitle}
              </h6>
            </div>
          </div>

          {/* Investment Details */}
          {[
            {
              title: "Investment Amount",
              detail: `BDT ${formatBDT(investData?.investmentAmount)}`,
            },
            {
              title: "Total Slot (s)",
              detail: `${investData?.totalBuyShare?.toLocaleString()} Slot (s)`,
            },
            {
              title: "Investment Duration",
              detail: `${investData?.durationOfInvest}`,
            },

            {
              title: "Return Type",
              detail: investData?.returnType,
            },

            { title: "ROI", detail: `${investData?.percentOfReturn} %` },
            {
              title: "Nominee",
              detail: `${investData?.nominee?.nomineeFullName}`,
            },
            { title: "Payment Method", detail: investData?.paymentMethod },
          ].map((item, index) => (
            <div
              key={index}
              className="p-2 md:p-3 bg-white rounded-md border flex justify-between items-center"
            >
              <span className="text-gray-600 text-base md:text-sm sm:text-[12px]">
                {item.title}
              </span>
              <span className="text-gray-900 text-base md:text-lg font-medium">
                {item.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Order Instructions */}
        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-green-100 text-green-800 rounded-md text-center text-xs md:text-sm">
          All relevant transaction fees shall be carried by customers. Your
          dedicated Public Relation Assistance (PR) will contact you within 3
          working day.
        </div>
      </div>

      <div className=" mt-4 md:mt-6 bg-teal-100 p-4 md:p-6 rounded-lg shadow-md w-full max-w-lg">
        <div className="flex justify-center gap-4">
          <Link href="/all-investment">
            <button className="bg-primary mt-3 text-white sm:text-[12px] md:text-base px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
              Go to Investment Dashboard
            </button>
          </Link>
        </div>
      </div>

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "60px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default InvestmentPlace;
