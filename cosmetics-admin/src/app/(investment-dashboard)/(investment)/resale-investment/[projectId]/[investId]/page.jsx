import Loading from "@/app/loading";
import InvestmentSummary from "@/components/Investment-submit/InvestmentSummary";
import ResaleInvestment from "@/components/resale-investment/ResaleInvestment";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decrypt } from "@/utils/decrypt";

export const metadata = {
  title: "Sharikana | Investment",
};

const ResaleInvestmentPage = async ({ params }) => {
  const res = await fetch(`${getBaseUrl()}/project/${params.projectId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  const projectData = data?.data;
  let project;

  if (projectData?.content && projectData?.iv) {
    const decrypted = decrypt(projectData?.content, projectData?.iv);
    project = decrypted;
  } else {
    return <Loading />;
  }

  return (
    <div className=" md:ms-5 sm:ms-0 md:mx-0 sm:mx-4 md:mt-[-10px] sm:mt-[-30px] mb-10">
      <ResaleInvestment projectData={project} investId={params.investId} />
    </div>
  );
};

export default ResaleInvestmentPage;
