"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useGetProjectsByCompanyOrPRQuery } from "@/redux/api/projectsApi";
import { useGetInvestmentsQuery } from "@/redux/api/investmentApi";
import { useGetUserQuery } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";
import AllInvestmentTable from "./AllInvestmentTable";
import InvestmentOverviewCard from "./InvestmentOverview/InvestmentOverviewCard";
import InvestmentFilter from "./InvestmentFilter";
import { getBaseUrl } from "@/helpers/config/envConfig";
import axios from "axios";
import ExportInvestorData from "./ExportInvestorData";
import { useSelector } from "react-redux";
import Pagination from "../shared/Pagination";
import Loading from "@/app/loading";
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";

const MurabahaSubmit = () => {
  const [projectId, setProjectId] = useState("");
  const [profitShareType, setProfitShareType] = useState("");

  const [status, setStatus] = useState("");
  const [verifyingId, setVerifyingId] = useState(null);
  const { page, size } = useSelector((state) => state.pagination);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  // Convert searchQuery string to array for TagsInput
  const [tags, setTags] = useState(searchQuery ? searchQuery.split(",") : []);

  // Debounce search query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

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
    projectType: "Murabaha",
    returnType: profitShareType,
    status,
    page,
    pageSize: size,
    searchQuery: debouncedQuery,
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

  const handleVerifyUser = async (id, newIsVerifyValue) => {
    const updateVerify = { isVerified: newIsVerifyValue };
    setVerifyingId(id); // Track which user is being verified

    try {
      const accessToken = getFromLocalStorage(authKey);
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };
      const { data } = await axios.patch(
        `${getBaseUrl()}/users/${id}`,
        updateVerify,
        { headers }
      );

      if (data.status === 400) {
        toast.error(data.data.error);
        return;
      }

      toast.success(newIsVerifyValue ? "User verified" : "User rejected");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setVerifyingId(null); // Reset verifying state
    }
  };

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
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          tags={tags}
          setTags={setTags}
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
                  handleVerifyUser={handleVerifyUser}
                  verifyingId={verifyingId} // Pass ID instead of string
                  setVerifyingId={setVerifyingId}
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

export default MurabahaSubmit;
