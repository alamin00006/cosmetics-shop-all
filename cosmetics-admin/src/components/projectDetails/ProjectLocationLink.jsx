import ProjectAddress from "./ProjectAddress";
const ProjectLocationLink = ({ projectData }) => {
  return (
    <div>
      <div className="md:mb-0 sm:mb-3 mt-3">
        <ProjectAddress projectData={projectData} />
      </div>
      <br />
      <h6 className="mb-2  text-primary md:text-lg sm:text-base font-semibold">
        Location:
      </h6>
      <iframe
        className="position-relative w-full sm:h-5/6 md:h-96"
        loading="lazy"
        src={projectData?.googleMapLink ? projectData?.googleMapLink : ""}
        // title={addresses[0].address}
        // aria-label={addresses[0].address}
      />
    </div>
  );
};

export default ProjectLocationLink;
