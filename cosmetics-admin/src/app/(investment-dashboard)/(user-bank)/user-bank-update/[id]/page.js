"use client";
import UserBankUpdate from "@/components/BankInfo/UserBankUpdate";

const UserBankUpdatePage = async ({ params }) => {
  return (
    <>
      <UserBankUpdate params={params} />
    </>
  );
};

export default UserBankUpdatePage;
