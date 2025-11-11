"use client";

import UserDetails from "@/components/users/UserDetails";
import { useParams } from "next/navigation";

const UserDetailsPage = () => {
  const params = useParams();
  return (
    <>
      <UserDetails params={params} />
    </>
  );
};

export default UserDetailsPage;
