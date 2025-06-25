"use client";
import EditProject from "@/components/projects/EditProject/EditProject";
import { useParams } from "next/navigation";

const ProjectUpdatePage = () => {
  const params = useParams();

  return (
    <>
      <EditProject params={params} />
    </>
  );
};

export default ProjectUpdatePage;
