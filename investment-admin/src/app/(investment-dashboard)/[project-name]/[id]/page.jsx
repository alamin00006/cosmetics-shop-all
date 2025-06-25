import dynamic from "next/dynamic";

import Loading from "@/app/loading";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decrypt } from "@/utils/decrypt";

const ProjectDetails = dynamic(
  () => import("@/components/projectDetails/ProjectDetails"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export const metadata = {
  title: "Sharikana | Project Details",
};

const ProjectDetailsIfo = async ({ params }) => {
  const res = await fetch(`${getBaseUrl()}/project/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = await res.json();
  const projectData = data?.data;

  // const projectData = await getSingleProjects(params.id);

  let project;

  if (projectData?.content && projectData?.iv) {
    const decrypted = decrypt(projectData?.content, projectData?.iv);
    project = decrypted;
  } else {
    return <Loading />;
  }

  return (
    <section className="custom-container">
      <ProjectDetails projectData={project} params={params} />
    </section>
  );
};

export default ProjectDetailsIfo;
