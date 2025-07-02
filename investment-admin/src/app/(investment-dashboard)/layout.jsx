"use client";
// import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

const DashboardLayout = ({ children }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  if (!isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      <DefaultLayout>{children} </DefaultLayout>
    </>
  );
};

export default DashboardLayout;
