"use client";

// import { FaUsers } from "react-icons/fa6";
// import { FaPersonRunning } from "react-icons/fa6";
// import { MdUpcoming } from "react-icons/md";
// import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { useGetProjectsByCompanyOrPRQuery } from "../../redux/api/productsApi";
import { useGetUserQuery } from "../../redux/api/authApi";
import { USER_ROLE } from "../../constants/role";

const DashboardStatusCard = () => {
  // Get User Data
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  const params = {
    companyId:
      userData?.role === USER_ROLE.COMPANY ? userData?.company?._id : "",
    id: userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
  };

  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsByCompanyOrPRQuery({ ...params });

  return (
    <div className="flex flex-wrap justify-between gap-4">
      <div className="flex w-full flex-col items-center justify-between rounded-lg border bg-[#4285f4] p-4 text-white md:w-[23%]">
        <div className=" text-4xl text-white">{/* <FaUsers /> */}</div>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold">Sold Project</h4>
          <h5 className="mt-2 text-xl font-bold">
            {projects?.totalCounts?.soldOutCount}
          </h5>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between rounded-lg border bg-[#4285f4] p-4 text-white md:w-[23%]">
        <div className="text-4xl text-white">{/* <FaPersonRunning /> */}</div>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold">On-Going Project</h4>
          <h5 className="mt-2 text-xl font-bold">
            {" "}
            {projects?.totalCounts?.onGoingCount}
          </h5>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between rounded-lg border bg-[#8e44ad] p-4 text-white md:w-[23%]">
        <div className="text-4xl text-white">{/* <MdUpcoming /> */}</div>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold">Upcoming Project</h4>
          <h5 className="mt-2 text-xl font-bold">
            {" "}
            {projects?.totalCounts?.upComingCount}
          </h5>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-between rounded-lg border bg-[#f98a79] p-4 text-white md:w-[23%]">
        <div className="text-4xl text-white">
          {/* <TbRosetteDiscountCheckFilled /> */}
        </div>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-semibold">Total Project</h4>
          <h5 className="mt-2 text-xl font-bold">
            {" "}
            {projects?.totalCounts?.totalProject}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatusCard;
