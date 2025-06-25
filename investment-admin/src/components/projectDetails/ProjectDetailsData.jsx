import { useEffect, useState } from "react";
import ProjectLocationLink from "./ProjectLocationLink";
import "./ProjectDetails.css";
import AssetValueDetails from "./AssetValueDetails";
import Tabs from "./Tabs";
import { FaLink } from "react-icons/fa";
import { convertHtml } from "@/utils/convertHtml";
const ProjectDetailsData = ({ projectData }) => {
  const [notaryFee, setNotaryFee] = useState(null);
  const [sharikanaFee, setSharikanaFee] = useState(null);
  const [activeTab, setActiveTab] = useState("Details");

  useEffect(() => {
    const assetValue = projectData?.projectAssetValue;

    if (assetValue) {
      setNotaryFee((assetValue * projectData?.notaryFee) / 100);
      setSharikanaFee((assetValue * projectData?.sharikanaFee) / 100);
    }
  }, [projectData]);

  // Function to get month from date string
  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "short" }).toUpperCase();
  };

  // Function to get day from date string
  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getDate();
  };

  return (
    <>
      <Tabs setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="projectData">
        {activeTab === "Details" && (
          <div className="pt-2 ">
            <h6 className="text-primary md:text-lg sm:text-base font-semibold mb-2">
              About the Project
            </h6>
            <span
              dangerouslySetInnerHTML={{
                __html: convertHtml(projectData?.aboutProject),
              }}
              className="md:text-[16px] sm:text-[14px] "
            ></span>

            <ProjectLocationLink projectData={projectData} />
          </div>
        )}

        {activeTab === "Financials" && (
          <AssetValueDetails
            projectData={projectData}
            sharikanaFee={sharikanaFee}
            notaryFee={notaryFee}
          />
        )}

        {activeTab === "Documents" && (
          <div className="pt-3 mb-2 text-sm lg:text-base">
            <h6 className="text-primary md:text-lg sm:text-sm font-semibold mb-2">
              Documents
            </h6>
            <div className="tab__details border rounded-lg">
              {projectData?.googleDriveLinks.map((link, index) => (
                <div
                  className="flex items-center hover:text-primary"
                  key={index}
                >
                  <div>
                    <button
                      type="button"
                      className="link-btn download-btn rounded p-4"
                    >
                      <FaLink />
                    </button>
                  </div>

                  <span className="" style={{ cursor: "pointer" }}>
                    <a
                      href={link?.googleDriveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="md:text-[16px] sm:text-xs"
                    >
                      {link?.googleDriveLinkTitle}
                    </a>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Timeline" && (
          <div className="text-black pt-3 text-sm lg:text-base ">
            <h6 className="text-teal-600 md:text-lg sm:text-sm font-semibold">
              Project Timeline
            </h6>

            <div className="border-l-2 border-teal-500 mt-4 pl-4 space-y-2 ms-10">
              {projectData?.timelines.map((item, index) => (
                <div key={index} className="relative pl-4">
                  {/* Dot */}
                  <div className="absolute -left-6 top-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-white"></div>

                  {/* Year */}
                  <p className="text-sm font-semibold text-gray-700 absolute -left-14">
                    {new Date(item.date).getFullYear()}
                  </p>

                  {/* Date and Details Row */}
                  <div className="flex items-start space-x-4 mt-1">
                    {/* Date Box */}
                    <div className="bg-[#e7fafb] rounded-md px-5 py-1 text-center border border-green-200">
                      <p className="text-xs font-semibold uppercase text-gray-600">
                        {getMonthFromDate(item.date)}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {getDayFromDate(item.date)}
                      </p>
                    </div>

                    {/* Event Info */}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-gray-600">{item.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectDetailsData;
