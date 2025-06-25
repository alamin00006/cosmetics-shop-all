import { returnTypes } from "@/constants/returnType";

const ReturnFilter = ({
  projectId,
  setProjectId,
  projects,
  profitShareType,
  setProfitShareType,
}) => {
  return (
    <div className="mb-4 flex flex-col items-center gap-10 md:flex-row">
      {/* Project Selector */}
      <div className="">
        <label htmlFor="project" className="mb-2 block text-lg font-bold">
          Select a project
        </label>
        <select
          value={projectId}
          id="project"
          className="border-gray-300 w-full rounded border p-2 md:w-72"
          onChange={(e) => setProjectId(e.target.value)}
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects?.map((project) => (
            <option key={project?._id} value={project?._id}>
              {project?.projectTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Return Type */}
      <div className="">
        <label htmlFor="return-type" className="mb-2 block text-lg font-bold">
          Select return type
        </label>
        <div className="flex flex-wrap gap-4">
          {returnTypes.map((type, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                id={type}
                type="radio"
                value={type}
                name="return-type"
                className="mr-2"
                onChange={() => setProfitShareType(type)}
                checked={type === profitShareType}
              />
              <label htmlFor={type} className="text-base">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReturnFilter;
