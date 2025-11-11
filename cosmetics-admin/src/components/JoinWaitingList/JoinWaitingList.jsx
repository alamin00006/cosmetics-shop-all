"use client";
import { useGetUserQuery } from "@/redux/api/authApi";
import { useGetWaitingListByCompanyQuery } from "@/redux/api/joinWaitingListApi";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";
import SeeWaitingListDetails from "./SeeWaitingListDetails";

const JoinWaitingList = () => {
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  const params = {
    company: userData?.company?._id,
  };

  const {
    data: joinWaitingLists,
    error: joinWaitingListError,
    isLoading: joinWaitingListIsLoading,
  } = useGetWaitingListByCompanyQuery(params);

  const [showModal, setShowModal] = useState(false);
  const [selectedWaitingList, setSelectedWaitingList] = useState(null);

  const handleViewDetails = (waitingList) => {
    setSelectedWaitingList(waitingList);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWaitingList(null);
  };

  if (userIsLoading || joinWaitingListIsLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (userError || joinWaitingListError) {
    return (
      <div className="text-center mt-20 text-red-500">Error loading data</div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-start mb-6">Join Waiting List</h1>
      <div className="overflow-x-auto">
        <table className="table-bordered table w-full">
          <thead>
            <tr className="bg-gray-100 text-sm">
              <th>No</th>
              <th>Project Picture</th>
              <th>Company Name</th>
              <th>Project Title</th>
              <th>Total Project Value</th>
              <th>Per Share Value</th>
              <th>Total Share Value</th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {joinWaitingLists?.map((waitingList, index) => (
              <tr key={waitingList._id} className="hover:bg-gray-100 border-b">
                <td>{index + 1}</td>
                <td className="py-2 px-4 text-center">
                  {waitingList.project.projectPicture.length > 0 && (
                    <Image
                      src={waitingList.project.projectPicture[0]}
                      alt={`Project Picture`}
                      width={50}
                      height={50}
                      className="inline-block mx-1"
                    />
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  {waitingList.company.name}
                </td>
                <td className="py-2 px-4 text-center">
                  {waitingList.project.projectTitle}
                </td>

                <td className="py-2 px-4 text-center">
                  {`Tk ${waitingList.project.totalProjectValue?.toLocaleString()}`}
                </td>
                <td className="py-2 px-4 text-center">
                  {`Tk ${waitingList.project.perShareValue?.toLocaleString()}`}
                </td>
                <td className="py-2 px-4 text-center">
                  {`${waitingList.project.totalShareValue?.toLocaleString()}`}
                </td>
                <td className="py-2 px-4 text-center">
                  {waitingList.user.name}
                </td>
                <td className="py-2 px-4 text-center">
                  {waitingList.user.phoneNumber}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleViewDetails(waitingList)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <AiOutlineEye style={{ width: "20px", height: "20px" }} />
                  </button>

                  <button
                    onClick={() => console.log("Delete:", waitingList._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt style={{ width: "20px", height: "20px" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
            <SeeWaitingListDetails
              waitingList={selectedWaitingList}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinWaitingList;
