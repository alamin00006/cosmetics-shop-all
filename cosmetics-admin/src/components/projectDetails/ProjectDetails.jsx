"use client";
import "./ProjectDetails.css";
import DetailsRightSide from "./DetailsRightSide";
import ProjectDetailsData from "./ProjectDetailsData";
import ProjectGallery from "./ProjectGallery";
import ProjectHeader from "./ProjectHeader";
import ProjectMonthlyReturnChart from "./projectMonthlyReturnChart/ProjectMonthlyReturnChart";
import { useGetProfitsByProjectIdQuery } from "@/redux/api/profitApi";

const ProjectDetails = ({ projectData, params }) => {
  // Profit Params
  const profitsParams = {
    project: params?.id,
    returnType: "Monthly",
    paymentStatus: "Paid",
  };
  const {
    data: profitCounts,
    error: profitError,
    isLoading: profitIsLoading,
    refetch,
  } = useGetProfitsByProjectIdQuery({ ...profitsParams });

  return (
    <>
      <div className="md:mx-5 sm:mx-0  mt-5 ">
        <div className=" ">
          <ProjectGallery id={params.id} projectData={projectData} />
        </div>

        <div className=" mt-2">
          <ProjectHeader id={params.id} projectData={projectData} />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-8 sm:col-span-12">
            <div>
              <ProjectMonthlyReturnChart profitCounts={profitCounts} />
            </div>
            <div className="mt-3 ">
              <ProjectDetailsData projectData={projectData} />
            </div>
          </div>

          <div className=" mt-3 lg:mt-0 md:col-span-4 sm:col-span-12 ">
            <div className="mb-8">
              <DetailsRightSide projectData={projectData} />
            </div>
          </div>
        </div>

        {/*  Related Projects */}
      </div>
    </>
  );
};

export default ProjectDetails;
