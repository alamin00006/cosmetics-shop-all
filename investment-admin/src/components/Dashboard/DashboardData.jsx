"use client";
import "./DashboardData.css";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

// Dynamic imports with a loading option
const DashboardStatusCard = dynamic(() => import("./DashboardStatusCard"), {
  loading: () => <Loading />,
  ssr: false, // Render only on the client
});

const Return = dynamic(() => import("./LatestReturn"), {
  loading: () => <Loading />,
  ssr: false,
});

const WithdrawTable = dynamic(() => import("./LatestWithdraw"), {
  loading: () => <Loading />,
  ssr: false,
});

const DashboardData = () => {
  return (
    <>
      <div className="dashboard-data">
        <DashboardStatusCard />
      </div>
      <div className="dashboard-data">
        <Return />
      </div>
      <div className="dashboard-data">
        <WithdrawTable />
      </div>
    </>
  );
};

export default DashboardData;
