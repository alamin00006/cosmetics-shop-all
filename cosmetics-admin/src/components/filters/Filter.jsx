import ReturnTypeFilter from "./ReturnTypeFilter";

const Filter = ({
  projectId,
  setProjectId,
  projects,
  profitShareType,
  setProfitShareType,
  setProfitSubmitType,
}) => {
  return (
    <>
      {" "}
      <div>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <input
              id="Investment"
              type="radio"
              value="Investment"
              name="profitSubmit"
              className="mr-2"
              onChange={() => setProfitSubmitType("Investment")}
            />
            <label htmlFor="Investment" className="text-base">
              Investment
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="Murabaha"
              type="radio"
              value="Murabaha"
              name="profitSubmit"
              className="mr-2"
              onChange={() => setProfitSubmitType("Murabaha")}
            />
            <label htmlFor="Murabaha" className="text-base">
              Murabaha
            </label>
          </div>
        </div>
      </div>
      <div className="mb-6 flex flex-col items-center gap-4 lg:flex-row">
        <div>
          <label htmlFor="project" className="mb-2 block text-lg font-bold">
            Select a Project
          </label>
          <select
            value={projectId}
            id="project"
            className="border-gray-300 w-full rounded-md border p-2 lg:w-80"
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="" disabled>
              Select a Project
            </option>
            {projects?.map((project) => (
              <option key={project?._id} value={project?._id}>
                {project?.projectTitle}
              </option>
            ))}
          </select>
        </div>

        <ReturnTypeFilter
          profitShareType={profitShareType}
          setProfitShareType={setProfitShareType}
        />
      </div>
    </>
  );
};

export default Filter;
