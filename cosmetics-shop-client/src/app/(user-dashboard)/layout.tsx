"use client";

import SideBar from "@/components/shared/DashboardSideBar";
// import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import useUserData from "@/hooks/useUserData";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // const {
  //   userData,
  //   error: userError,
  //   loading: userDataLoading,
  // } = useUserData();

  // const userLoggedIn = isLoggedIn();

  // useEffect(() => {
  //   // If not logged in or userData fails to load
  //   if (!userLoggedIn || (!userData && !userDataLoading)) {
  //     router.push("/");
  //   } else if (userData) {
  //     setIsLoading(false);
  //   }
  // }, [userLoggedIn, userData, userDataLoading, router]);

  // if (userError) {
  //   return (
  //     <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
  //       <p>Error: {userError?.message || "Failed to load user data"}</p>
  //       <button
  //         onClick={() => router.push("/")}
  //         className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
  //       >
  //         Go to Home
  //       </button>
  //     </div>
  //   );
  // }

  // if (isLoading || userDataLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="custom-container mt-[5px]">
      <div className="grid grid-cols-12">
        <aside className="col-span-3" aria-label="Dashboard Sidebar">
          <SideBar />
        </aside>
        <main
          className="md:col-span-9 sm:col-span-12"
          aria-label="Main Content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
