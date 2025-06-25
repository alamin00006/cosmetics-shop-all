const ProjectAddress = ({ projectData }) => {
  return (
    <>
      <h6 className="flex">
        <span className="text-primary md:text-lg sm:text-base font-semibold">
          Address :
        </span>
      </h6>
      <span className="text-sm lg:text-base mt-2">
        {projectData?.streetAddress}, {projectData?.city}
      </span>
    </>
  );
};

export default ProjectAddress;
