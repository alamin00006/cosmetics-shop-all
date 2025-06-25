import CompanyUpdate from "@/components/CompanyBank/CompanyUpdate";
import { getBaseUrl } from "@/helpers/config/envConfig";
// import CompanyUpdate from "@/components/CompanyBank/CompanyUpdate";

export const metadata = {
  title: "Dashboard | Company-bank",
};

const CompanyBankUpdate = async ({ params }) => {
  const res = await fetch(`${getBaseUrl()}/company-bank/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  const companyBankAccount = data?.data;

  return (
    <>
      <CompanyUpdate companyBankAccount={companyBankAccount} />
    </>
  );
};

export default CompanyBankUpdate;
