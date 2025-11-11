"use client";

import UpdateUser from "@/components/updateUserInfo/UpdateUser";
import { useParams } from "next/navigation";

const UserUpdatePage = () => {
  const params = useParams();
  return (
    <div>
      <UpdateUser params={params} />{" "}
    </div>
  );
};

export default UserUpdatePage;
