import DetailsData from "@/components/return-submit/DetailsData";

export const metadata = {
  title: "Dashboard | Project Details",
};
const ProjectDetailsPage = ({ params }) => {
  return (
    <>
      <DetailsData
        returnType={params.returnType}
        projectId={params.projectId}
      />
    </>
  );
};

export default ProjectDetailsPage;
