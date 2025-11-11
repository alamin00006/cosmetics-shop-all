"use client";

import { Toaster } from "react-hot-toast";
import { useGetFrontEndUsersQuery, useGetUserQuery } from "@/redux/api/authApi";
import { useSelector } from "react-redux";
import Pagination from "../shared/Pagination";
import UserTable from "./UserTable";
import Filters from "../filters/Filters";
import ExportUserData from "./ExportUserData";
import { useSearchFilterState } from "../filters/useSearchFilterState";

const UserList = () => {
  const { page, size } = useSelector((state) => state.pagination);
  const { setSearchQuery, debouncedQuery, tags, setTags } =
    useSearchFilterState();

  // Get User Data
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Get Front end All Users Data

  const params = {
    page: page,
    pageSize: size,
    searchQuery: debouncedQuery,
  };

  const {
    data: allUsers,
    error,
    isLoading: allIsLoading,
    refetch,
  } = useGetFrontEndUsersQuery(params);

  return (
    <>
      {/* Refresh Button */}
      <div className="flex gap-4 mb-3">
        <p className="text-black font-bold">
          Total User : {allUsers?.totalCount}
        </p>
        <p className=" font-bold text-green-600">
          Total Investor : {allUsers?.totalInvestor}
        </p>
      </div>
      <div className="flex justify-end ">
        <div>
          <ExportUserData users={allUsers?.users ?? []} />
        </div>
      </div>
      <div>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Search User
          </label>

          <Filters
            setSearchQuery={setSearchQuery}
            setTags={setTags}
            tags={tags}
            searchName="Search user"
          />

          <p id="search-help" className="mt-1 text-xs text-gray-500">
            Add tags for user name, phone number, etc.
          </p>
        </div>

        <UserTable
          users={allUsers?.users}
          refetch={refetch}
          page={page}
          size={size}
          loginUser={userData}
        />
        <Pagination totalDataCount={allUsers?.totalCount || 10} />

        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default UserList;
