import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { isLoggedIn } from "@/services/auth.service";
import { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import useUserData from "@/hooks/useUserData";
import { authKey } from "@/constants/storageKey";
import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Tooltip as ReactTooltip } from "react-tooltip";
import PRManagerDetails from "./PRManagerDetails";
import ProjectVideos from "./ProjectVideos";
import { DURATION_TYPE } from "@/constants/durationType";
import { getFromLocalStorage } from "@/utils/local-storage";
import { PROJECT_TYPE } from "@/constants/projectType";

const DetailsRightSide = ({ projectData }) => {
  const router = useRouter();
  const [isUser, setIsUser] = useState(false);

  // get user data
  const { userData, error: userError, loading: isLoadingUser } = useUserData();

  // Checking user Login
  const userLoggedIn = isLoggedIn();
  useEffect(() => {
    if (userLoggedIn) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userLoggedIn]);

  const handleUserValidation = () => {
    if (!isUser) {
      return router.push("/login");
    } else {
      router.push(`/investment/${projectData?._id}`);
    }
  };

  const soldTotalShare = projectData?.investment?.totalSoldSlots || 0;

  return (
    <>
      <div className="bg-gray-100 rounded-t-lg p-2 sticky top-0 mt-0">
        <div className="flex justify-between items-center">
          <span className="font-bold text-green-500">
            {soldTotalShare} Slot (s) Sold
          </span>
          <span className="text-green-500">
            {projectData?.totalShareValue?.toLocaleString()}/
            {projectData?.totalShareValue - soldTotalShare} Slot (s) left
          </span>
        </div>
        <div className="slider item-range mb-[-10px]">
          <Slider
            className="m-0"
            min={0}
            max={projectData?.totalShareValue}
            value={soldTotalShare}
          />
        </div>
      </div>
      {/* Financial */}
      <div className="bg-white shadow-lg rounded-lg p-2 pt-3">
        {projectData?.investmentDuration?.durationType ===
        DURATION_TYPE.MONTH ? (
          ""
        ) : (
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-xs md:text-base sm:text-[14px] font-medium">
                ROI (Annual){" "}
                <IoMdInformationCircleOutline
                  data-tooltip-id="ROI"
                  className="inline ms-1 focus:outline-none cursor-pointer"
                />
              </span>
              <span className="text-sm md:text-base sm:text-[14px] font-semibold text-green-600">
                {projectData?.yearlyReturnValue}%
              </span>

              <ReactTooltip
                id="ROI"
                content={`Return of investment`}
                placement="top"
                className="text-white"
                style={{
                  backgroundColor: "#6B7280",
                }}
              />
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-xs md:text-base sm:text-[14px] font-medium">
                ECA (Annual){" "}
                <IoMdInformationCircleOutline
                  data-tooltip-id="ECA"
                  className="inline focus:outline-none cursor-pointer"
                />
              </span>
              {projectData?.projectType?.name === PROJECT_TYPE.INVESTMENT ? (
                <span className="text-sm font-semibold text-green-600 mr-2">
                  N/A
                </span>
              ) : (
                <span className="text-sm md:text-base sm:text-[14px] font-semibold text-green-600">
                  {projectData?.projectAnnualCapitalAppreciation}%
                </span>
              )}

              <ReactTooltip
                id="ECA"
                content={`Expected Capital Appreciation`}
                placement="top"
                className="text-white"
                style={{
                  backgroundColor: "#6B7280",
                }}
              />
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="text-xs md:text-base sm:text-[14px] font-medium">
                IRR (Annual){" "}
                <IoMdInformationCircleOutline
                  data-tooltip-id="IRR"
                  className="inline ms-1  focus:outline-none cursor-pointer"
                />
              </span>
              <span className="text-sm md:text-base sm:text-[14px] font-semibold text-green-600">
                {projectData?.yearlyReturnValue +
                  projectData?.projectAnnualCapitalAppreciation}
                %
              </span>
              <ReactTooltip
                id="IRR"
                content={`Internal Rate of Return`}
                placement="top"
                className="text-white"
                style={{
                  backgroundColor: "#6B7280",
                }}
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <button
            className={`w-full text-white text-sm md:text-base px-4 py-2 bg-primary rounded-lg  hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              soldTotalShare === projectData?.availableTotalShare
                ? "opacity-50 cursor-not-allowed"
                : " cursor-pointer "
            }`}
            onClick={handleUserValidation}
            disabled={soldTotalShare === projectData?.availableTotalShare}
          >
            Invest Now
          </button>
        </div>
      </div>

      <div className="bg-gray-200 rounded-t-lg p-4 sticky top-0 mt-5">
        <div className="flex items-center">
          <span className="font-bold text-green-500">For Any Inquiry</span>
        </div>
      </div>
      {projectData?.PRManagers && (
        <div>
          <PRManagerDetails PRManager={projectData?.PRManagers} />
        </div>
      )}

      {projectData?.youtubeVideoLink && (
        <>
          <div className="bg-gray-200 rounded-t-lg p-4 sticky top-0 mt-8">
            <div className="flex  items-center">
              <span className="font-bold text-black">Project Overview</span>
            </div>
          </div>

          <ProjectVideos projectData={projectData} />
        </>
      )}

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </>
  );
};

export default DetailsRightSide;
