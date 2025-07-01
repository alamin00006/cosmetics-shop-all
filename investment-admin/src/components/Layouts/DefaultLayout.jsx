"use client";
import { Suspense, useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { FaArrowUp } from "react-icons/fa";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  // const userLoggedIn = isLoggedIn();

  // useEffect(() => {
  //   if (!userLoggedIn) {
  //     router.push("/login");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [userLoggedIn, router]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Suspense fallback={null}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </Suspense>
      <Suspense fallback={null}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </Suspense>
      <div
        className={`relative flex flex-1 flex-col ${
          sidebarOpen ? "lg:ml-72.5" : ""
        }`}
      >
        <main>
          <div
            className={` ${
              sidebarOpen ? "mx-auto max-w-screen-2xl" : " max-w-full mx-10"
            }  pb-10`}
          >
            {children}
            <button
              onClick={scrollToTop}
              className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-3 text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-lg" />
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
