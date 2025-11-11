"use client";
import { getFromLocalStorage } from "@/utils/local-storage";
import InvestorTable from "./InvestorTable";

import { authKey } from "@/constants/storageKey";
import { useGetUserQuery } from "@/redux/api/authApi";
import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/productsApi";
import { useState } from "react";
import { USER_ROLE } from "@/constants/role";

import ReturnTypeFilter from "@/components/filters/ReturnTypeFilter";

const DetailsData = ({ projectId, returnType }) => {
  const [profitShareType, setProfitShareType] = useState(returnType);

  // Get User Data
  const authToken = getFromLocalStorage(authKey);
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery({ token: authToken });

  // Project Params
  const projectParams = {
    companyId: userData?.company?._id ? userData?.company?._id : "",
    id: userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
    projectId: projectId,
    returnType: profitShareType,
  };

  const {
    data: allProjects,
    error: projectGetError,
    isLoading,
  } = useGetProjectsByCompanyOrPRQuery({ ...projectParams });
  const project = allProjects?.projects?.[0];

  const projectInvestment = project?.investment?.allInvestmentData;

  return (
    <>
      <ReturnTypeFilter
        profitShareType={profitShareType}
        setProfitShareType={setProfitShareType}
      />

      <div>
        <div>
          <div className="border-b border-gray-200 flex items-center justify-between p-4 sticky top-0 bg-white z-10">
            <h3 className="text-base font-semibold">
              Project Wise Investment History{" "}
              <span className="text-green-500">({profitShareType})</span>
            </h3>
          </div>

          {/* Modal Body */}
          <div className="bg-gray-50 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <h4 className="text-sm font-medium text-black">Project Name</h4>
                <span>{project?.projectTitle}</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">Project Type</h4>
                {project?.projectTypeDetails?.map((pr) => (
                  <span key={pr._id}>{pr.name}</span>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">
                  {profitShareType} Investor
                </h4>
                <span className="font-bold">
                  {project?.investment?.totalInvestors || 0} Person
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">
                  Total Investment Amount
                </h4>
                <span className="font-bold">
                  Tk{" "}
                  {project?.investment?.totalInvestmentAmount?.toLocaleString() ||
                    0}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">
                  {profitShareType} Profit Ratio
                </h4>
                <span>
                  {profitShareType === "Monthly"
                    ? `${project?.monthlyReturnValue} %`
                    : profitShareType === "Quarterly"
                    ? `${project?.quarterlyReturnValue} %`
                    : `${project?.yearlyReturnValue} %`}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">Total Share</h4>
                <span>{project?.totalShareValue?.toLocaleString()}</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">Sold Share</h4>
                <span>
                  {project?.totalInvestmentOverviewData?.totalSlotsSold?.toLocaleString()}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-black">
                  Available Share
                </h4>
                <span>
                  {(
                    project?.totalShareValue -
                    project?.totalInvestmentOverviewData?.totalSlotsSold
                  )?.toLocaleString()}
                </span>
              </div>
            </div>

            {projectInvestment?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Investors</h3>
                <InvestorTable projectInvestment={projectInvestment} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
