const ProjectHeader = ({ id, projectData }) => {
  return (
    <>
      <div className="w-full">
        <div className="">
          <h6 className="flex gap-4 md:text-2xl sm:text-[21px] text-primary py-2">
            {projectData?.projectTitle}
            <button
              className="status-button text-xs md:text-base"
              style={{
                backgroundColor:
                  projectData.status === "On-Going" ? "#00c194" : "#f1f1f1",
                color: projectData.status === "On-Going" ? "white" : "black",
                border: "none",
                borderRadius: "5px",
                padding: "1px 5px",
                marginLeft: "8px",
                fontWeight: "500",
              }}
            >
              {projectData.status}
            </button>
          </h6>

          <div className="  flex items-center gap-2">
            <span className="md:text-lg sm:text-sm mb-0">
              {projectData?.streetAddress
                ? projectData?.streetAddress
                : "Dhanmondi, Road no:03, House no : 23"}
              , {projectData?.city}
            </span>
            |
            <span
              className="md:text-lg sm:text-sm mb-0"
              style={{ color: "#00c194" }}
            >
              For {projectData?.projectType?.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
