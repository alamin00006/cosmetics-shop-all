"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
// import SeeProjectListDetails from "./SeeProjectListDetails";
import UpdateProjectStatus from "./UpdateProjectStatus";
import { formatDate } from "@/utils/dateConvert";

import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/projectsApi";
import { useGetAllUsersQuery, useGetUserQuery } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";
import Link from "next/link";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import HandlePRManager from "./HandlePRManager";
import SeeProjectListDetails from "./SeeProjectListDetails";

const ProjectLists = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectProjectForStatus, setSelectProjectForStatus] = useState(null);
  const [showPRModal, setShowPRModal] = useState(false);
  const [selectProjectForPR, setSelectProjectForPR] = useState(null);

  // Get login user
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Get All PR Manager
  const userParams = {
    role: USER_ROLE.PR_MANAGER,
    company: userData?.company?._id,
  };

  const {
    data: allPrManager,
    error: userGetError,
    isLoading: usersIsLoading,
  } = useGetAllUsersQuery(userParams);

  // Get Projects
  const params = {
    companyId:
      userData?.role === USER_ROLE.COMPANY ? userData?.company?._id : "",
    id: userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
  };

  const {
    data: projects,
    error,
    isLoading,
    refetch,
  } = useGetProjectsByCompanyOrPRQuery({ ...params });

  // Handle Status Modal
  const handleShowStatusModal = (project) => {
    setSelectProjectForStatus(project);
    setShowStatusModal(true);
  };
  // Handle PR Modal
  const handleShowPRModal = (project) => {
    setSelectProjectForPR(project);
    setShowPRModal(true);
  };

  const filteredProjects = projects?.projects?.filter((project) =>
    project.projectTitle
      ?.toLowerCase()
      .startsWith(searchQuery.trim().toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects?.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  const handleFeatured = async (id, newIsFeatured) => {
    const updateFeatured = {
      isFeatured: newIsFeatured,
    };

    try {
      // Submit the form data
      const { data } = await axios.patch(
        `${getBaseUrl()}/project/${id}`,
        updateFeatured
      );

      if (data.status === 400) {
        return toast.error(data.data.error);
      }
      if (newIsFeatured === "Yes") {
        toast.success("Added in featured");
      } else {
        toast.success("Removed from featured");
      }

      refetch();
    } catch (error) {
      return toast.error("Some error occurred");
    }
  };

  // Handle Publish Project
  const handlePublish = async (id, newStatus) => {
    const updatePublishStatus = {
      isPublished: newStatus,
    };

    try {
      // Submit the form data
      const { data } = await axios.patch(
        `${getBaseUrl()}/project/${id}`,
        updatePublishStatus
      );

      if (data.status === 400) {
        return toast.error(data.data.error);
      }
      if (newStatus === "Yes") {
        toast.success("Published");
      } else {
        toast.success("Unpublished");
      }

      refetch();
    } catch (error) {
      return toast.error("Some error occurred");
    }
  };

  return (
    <div className="md:mx-5 sm:mx-0">
      <h3 className="my-5  font-bold">Project List</h3>
      <div className="mb-4 flex items-center justify-end">
        <Link href="/project-add">
          <button className="rounded-md bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
            Add New Project
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead>
            <tr className="text-sm">
              <th>No</th>
              <th>Project</th>
              <th>Project Title</th>
              <th>Investment Value</th>
              <th>Per Share Value</th>
              <th>Total Share</th>
              <th>Inv.start Date</th>
              <th>Inv.end Date</th>
              <th>First Return Date</th>
              <th className="text-green-600">Featured</th>
              <th className="text-green-600">Publish Status</th>
              <th>Status</th>
              <th>PR Manager</th>
              <th>Details</th>
              {userData?.role !== USER_ROLE.SUPER_ADMIN && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {currentProjects?.map((project, index) => (
              <tr key={project._id} className="hover:bg-gray-100 border-b">
                <td>{indexOfFirstProject + index + 1}</td>
                <td>
                  <div className="list-thumb">
                    <Image
                      width={80}
                      height={60}
                      src={project?.projectPicture?.[0]}
                      className="cover"
                      style={{ backgroundPosition: "no-repeat" }}
                      alt="Project Picture"
                    />
                  </div>
                </td>
                <td>{project?.projectTitle}</td>
                <td>Tk {project?.totalProjectValue?.toLocaleString()}</td>
                <td>Tk {project?.perShareValue?.toLocaleString()}</td>
                <td>{project?.totalShareValue?.toLocaleString()} Share</td>
                <td>{formatDate(project?.investmentStartDate)}</td>
                <td>{formatDate(project?.investmentEndDate)}</td>
                <td>{formatDate(project?.firstReturnDate)}</td>
                <td>
                  <p className="mb-2 text-center"> {project?.isFeatured}</p>

                  <div>
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      checked={project?.isFeatured === "Yes"}
                      onChange={async (e) => {
                        const newValue = e.target.checked ? "Yes" : "No";
                        await handleFeatured(project?._id, newValue);
                      }}
                      disabled={userData?.role !== USER_ROLE.SUPER_ADMIN}
                    />
                  </div>
                </td>
                <td>
                  <p className="mb-2 text-center"> {project?.isPublished}</p>

                  {userData?.role === USER_ROLE.COMPANY && (
                    <div className="text-center">
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={project?.isPublished === "Yes"}
                        onChange={async (e) => {
                          const newValue = e.target.checked ? "Yes" : "No";
                          await handlePublish(project?._id, newValue);
                        }}
                      />
                    </div>
                  )}
                </td>
                <td>
                  <span
                    style={{
                      color: project.status !== "On-Going" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {project.status}
                  </span>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => handleShowStatusModal(project)}
                    disabled={userData?.role === USER_ROLE.PR_MANAGER}
                  >
                    {userData?.role !== USER_ROLE.PR_MANAGER && (
                      <FaRegEdit
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    )}
                  </button>
                </td>
                <td>
                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {project.PRManagerDetails?.[0]?.name}
                  </span>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => handleShowPRModal(project)}
                    disabled={userData?.role === USER_ROLE.PR_MANAGER}
                  >
                    {userData?.role !== USER_ROLE.PR_MANAGER && (
                      <FaRegEdit
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    )}
                  </button>
                </td>
                <td>
                  {/* <button
                    type="button"
                    className="bg-light bg-gradient border-0"
                    onClick={() => handleDetailsClick(project)}
                  >
                    <AiOutlineEye style={{ width: "24px", height: "24px" }} />
                  </button> */}
                  <Link
                    href={`/${project?.projectTitle}/${project?._id}`}
                    className="bg-light bg-gradient border-0"
                    // onClick={() => handleDetailsClick(project)}
                  >
                    <AiOutlineEye style={{ width: "24px", height: "24px" }} />
                  </Link>
                </td>
                {userData?.role !== USER_ROLE.SUPER_ADMIN && (
                  <td>
                    <Link
                      href={`project-update/${project?._id}`}
                      type="button"
                      className="bg-light bg-gradient border-0"
                    >
                      <FaRegEdit style={{ width: "24px", height: "24px" }} />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <SeeProjectListDetails
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        project={selectedProject}
      />

      <UpdateProjectStatus
        showStatusModal={showStatusModal}
        setShowStatusModal={setShowStatusModal}
        projectData={selectProjectForStatus}
        allUser={allPrManager}
        refetch={refetch}
      />
      <HandlePRManager
        showPRModal={showPRModal}
        setShowPRModal={setShowPRModal}
        projectData={selectProjectForPR}
        allUser={allPrManager}
        refetch={refetch}
      />

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav aria-label="Page navigation">
          <ul className="flex list-none space-x-2">
            <li>
              <button
                className={`rounded border px-4 py-2 ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
            </li>
            <li>
              <button
                className={`rounded border px-4 py-2 ${
                  currentPage === 1
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1}>
                <button
                  className={`rounded border px-4 py-2 ${
                    index + 1 === currentPage
                      ? "bg-[#00c194] text-white"
                      : "bg-gray-100"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`rounded border px-4 py-2 ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
            <li>
              <button
                className={`rounded border px-4 py-2 ${
                  currentPage === totalPages
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </div>
  );
};

export default ProjectLists;
