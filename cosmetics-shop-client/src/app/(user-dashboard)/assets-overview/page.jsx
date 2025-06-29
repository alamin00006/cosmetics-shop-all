"use client";

import dynamic from "next/dynamic";
import Loading from "@/app/loading";

// Dynamic import with a loading fallback
const AssetsOverview = dynamic(
  () => import("@/components/pages/dashboard/assets-overview/AssetsOverview"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

const DashboardHome = () => {
  return (
    <div className="md:ms-5 sm:ms-0">
      <div className="md:mx-0 sm:mx-5">
        <AssetsOverview />
      </div>
    </div>
  );
};

export default DashboardHome;
