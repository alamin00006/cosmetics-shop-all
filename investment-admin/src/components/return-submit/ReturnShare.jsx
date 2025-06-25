"use client";
import { Suspense, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";

import { Toaster } from "react-hot-toast";
import Filter from "../filters/Filter";

import ProfitSubmitModal from "./ReturnSubmitModal";

import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/projectsApi";

import { authKey } from "@/constants/storageKey";
import { useGetUserQuery } from "@/redux/api/authApi";
import { getFromLocalStorage } from "@/utils/local-storage";
import { USER_ROLE } from "@/constants/role";
import { FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

const ProfitShare = () => {
  const [projectId, setProjectId] = useState("");
  const [selectedProject, setSelectedProject] = useState({});
  const [profitShareType, setProfitShareType] = useState("Monthly");
  const [profitSubmitType, setProfitSubmitType] = useState("Investment");
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
    returnType: profitShareType, //only for investment find
  };

  const {
    data: allProjects,
    error: projectGetError,
    isLoading,
  } = useGetProjectsByCompanyOrPRQuery({ ...projectParams });
  const projects = allProjects?.projects;

  // Return Submit Modal
  const [showReturnModal, setShowReturnModal] = useState(false);

  const handleReturnShowModal = (project) => {
    setSelectedProject(project);
    setShowReturnModal(true);
  };
  // Handle Refresh
  const handleRefresh = () => {
    setProjectId("");
    setProfitShareType("Monthly");
  };

  return (
    <div className="mx-4">
      <Suspense fallback={null}>
        <Filter
          setProfitShareType={setProfitShareType}
          projectId={projectId}
          setProjectId={setProjectId}
          projects={projects}
          profitShareType={profitShareType}
          setProfitSubmitType={setProfitSubmitType}
        />
      </Suspense>
      {/* Refresh Button */}
      <div className="flex justify-end mb-5 ">
        <button
          className="flex items-center text-base flex-end gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleRefresh}
        >
          <FiRefreshCw className="text-base" />
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead className=" text-sm">
            <tr>
              <th>Project Name</th>
              <th>Project Type</th>
              <th>PR Manager</th>
              <th>{profitShareType} Investor</th>
              <th>Investment Amount</th>
              <th>{profitShareType} Profit Ratio</th>
              {userData?.role !== USER_ROLE.SUPER_ADMIN && (
                <th>Income Submit</th>
              )}

              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {projects?.map((project) => (
              <tr key={project?._id}>
                <td>{project?.projectTitle}</td>
                <td>{project?.projectTypeDetails?.[0]?.name}</td>
                <td>{project?.PRManagerDetails?.[0]?.name}</td>
                <td>{project?.investment?.totalInvestors || 0} Person</td>
                <td>
                  Tk{" "}
                  {project?.investment?.totalInvestmentAmount?.toLocaleString() ||
                    0}{" "}
                  <br />
                </td>
                <td>
                  {profitShareType === "Monthly"
                    ? `${project?.monthlyReturnValue} %`
                    : profitShareType === "Quarterly"
                    ? `${project?.quarterlyReturnValue} %`
                    : `${project?.yearlyReturnValue} %`}
                </td>

                {userData?.role !== USER_ROLE.SUPER_ADMIN && (
                  <td>
                    <button
                      disabled={
                        project?.investment?.totalInvestors > 0 ? false : true
                      }
                      onClick={() => handleReturnShowModal(project)}
                      className={`rounded-lg px-3 py-1 font-semibold text-white ${
                        project?.investment?.totalInvestors > 0
                          ? "bg-teal-500"
                          : "bg-neutral-400	"
                      }`}
                    >
                      Income Submit
                    </button>
                  </td>
                )}

                <td>
                  <Link
                    href={`project-wise-data/${profitShareType}/${project?._id}`}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                  >
                    <AiOutlineEye className="text-gray-600 h-6 w-6" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Return Submit Modal */}
      {showReturnModal && (
        <ProfitSubmitModal
          profitShareType={profitShareType}
          showReturnModal={showReturnModal}
          setShowReturnModal={setShowReturnModal}
          project={selectedProject}
          userData={userData}
        />
      )}

      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default ProfitShare;
