import Loading from "@/app/loading";
import InvestmentSummary from "@/components/Investment-submit/InvestmentSummary";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decrypt } from "@/utils/decrypt";

export const metadata = {
  title: "Sharikana | Investment",
};

const InvestmentSubmitPage = async ({ params }) => {
  const res = await fetch(`${getBaseUrl()}/project/${params.id}`, {
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
      <InvestmentSummary projectData={project} />
    </div>
  );
};

export default InvestmentSubmitPage;
