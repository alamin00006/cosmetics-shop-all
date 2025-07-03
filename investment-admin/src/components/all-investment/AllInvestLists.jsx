"use client";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/productsApi";
import { useGetInvestmentsQuery } from "@/redux/api/investmentApi";
import { useGetUserQuery } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";
import AllInvestmentTable from "./AllInvestmentTable";
import InvestmentOverviewCard from "./InvestmentOverviewCard";
import InvestmentFilter from "./InvestmentFilter";

import ExportInvestorData from "./ExportInvestorData";
import { useSelector } from "react-redux";
import Pagination from "../shared/Pagination";
import Loading from "@/app/loading";
import { useSearchFilterState } from "../filters/searchFilterState";

// import { Button } from "primereact/button";
const AllInvestLists = () => {
  const [projectId, setProjectId] = useState("");
  const [profitShareType, setProfitShareType] = useState("");

  const [status, setStatus] = useState("");
  const { page, size } = useSelector((state) => state.pagination);
  const { setSearchQuery, debouncedQuery, tags, setTags } =
    useSearchFilterState();

  // Get User Data
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Project Params
  const projectParams = {
    companyId: userData?.company?._id || "",
    id: userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
  };

  const {
    data: projects,
    error: projectGetError,
    isLoading: projectsLoading,
  } = useGetProjectsByCompanyOrPRQuery(projectParams, {
    skip: !userData, // Skip until userData is available
  });

  // Investment Params
  const params = {
    prManagerId:
      userData?.role === USER_ROLE.PR_MANAGER ? userData?.PRManager?._id : "",
    companyId: userData?.company?._id || "",
    project: projectId,
    returnType: profitShareType,
    status,
    searchQuery: debouncedQuery,
    page,
    pageSize: size,
  };

  const {
    data: allInvestment,
    error: investmentError,
    isLoading: investmentIsLoading,
    refetch,
  } = useGetInvestmentsQuery(params, { skip: !userData });

  const totalCounts = allInvestment?.totalCount ?? 0;
  const totalInvestmentAmount = allInvestment?.totalInvestmentAmount ?? 0;
  const totalInvestor = allInvestment?.totalInvestor ?? 0;
  const monthlyInvestors = allInvestment?.monthlyInvestor ?? 0;
  const quarterlyInvestors = allInvestment?.quarterlyInvestor ?? 0;
  const yearlyInvestors = allInvestment?.yearlyInvestor ?? 0;

  const scrollTable = (direction) => {
    const tableContainer = document.getElementById("table-container");
    const scrollAmount = 100;
    if (tableContainer) {
      tableContainer.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle loading and error states
  if (userIsLoading || projectsLoading) {
    return <Loading />;
  }

  if (userError || projectGetError || investmentError) {
    return (
      <p className="text-center text-red-500 py-4" role="alert">
        Error:{" "}
        {userError?.data?.message ||
          projectGetError?.data?.message ||
          investmentError?.data?.message ||
          "Failed to load data"}
      </p>
    );
  }

  return (
    <>
      {/* <Button label="Check" icon="pi pi-check" /> */}

      <div className="pb-10">
        <InvestmentOverviewCard
          totalInvestors={totalInvestor}
          totalInvestmentAmount={totalInvestmentAmount}
          monthlyInvestors={monthlyInvestors}
          quarterlyInvestors={quarterlyInvestors}
          yearlyInvestors={yearlyInvestors}
        />
      </div>

      <div className="mx-4">
        <InvestmentFilter
          setProfitShareType={setProfitShareType}
          profitShareType={profitShareType}
          setStatus={setStatus}
          status={status}
          projectId={projectId}
          setProjectId={setProjectId}
          projects={projects?.projects ?? []}
          setSearchQuery={setSearchQuery}
          tags={tags}
          setTags={setTags} // Pass setTags to InvestmentFilter
        />

        <div className="flex justify-end mb-5">
          <div>
            <ExportInvestorData investors={allInvestment?.investments ?? []} />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => scrollTable("left")}
                className="bg-primary px-3 text-white rounded mr-1 hover:bg-green-400"
                aria-label="Scroll table left"
              >
                ←
              </button>
              <button
                onClick={() => scrollTable("right")}
                className="bg-primary px-3 text-white rounded hover:bg-green-400"
                aria-label="Scroll table right"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {investmentIsLoading && (
          <p className="text-center py-2" role="status" aria-live="polite">
            Loading investments...
          </p>
        )}

        {!investmentIsLoading && (
          <>
            {allInvestment?.investments?.length === 0 ? (
              <p className="text-center py-4" role="alert">
                {debouncedQuery
                  ? "No results found"
                  : "No investments available"}
              </p>
            ) : (
              <>
                <AllInvestmentTable
                  investments={allInvestment?.investments ?? []}
                  refetch={refetch}
                  userData={userData}
                />
                {allInvestment?.investments?.length > 0 && (
                  <Pagination totalDataCount={totalCounts} />
                )}
              </>
            )}
          </>
        )}

        <Toaster
          position="top-center"
          containerStyle={{ marginTop: "100px" }}
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default AllInvestLists;
