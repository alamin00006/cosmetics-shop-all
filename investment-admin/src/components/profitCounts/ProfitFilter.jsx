import { returnTypes } from "@/constants/returnType";

const ProfitFilter = ({
  projectId,
  setProjectId,
  projects,
  setProfitShareType,
  profitShareType,
  setWithdrawRQ,
  withdrawRQ,
}) => {
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {/* Project wise */}
      <div className="min-w-[200px] ">
        <label htmlFor="project" className="mb-2 block text-base font-semibold">
          Project wise
        </label>
        <select
          value={projectId}
          id="project"
          className="border-gray-300 rounded-md border px-3 py-2"
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
      <div className="min-w-[200px] ">
        <label
          htmlFor="returnType"
          className="mb-2 block text-base font-semibold"
        >
          Return type wise
        </label>
        <select
          id="returnType"
          className="border-gray-300 rounded-md border px-3 py-2"
          onChange={(e) => setProfitShareType(e.target.value)}
          value={profitShareType}
        >
          <option value="" disabled>
            Select a return type
          </option>
          {returnTypes.map((type, index) => (
            <option key={index}>{type}</option>
          ))}
        </select>
      </div>

      {/* Withdraw RQ */}
      <div className="min-w-[200px] ">
        <label
          htmlFor="withdrawRQ"
          className="mb-2 block text-base font-semibold"
        >
          Withdraw RQ type
        </label>
        <select
          id="withdrawRQ"
          className="border-gray-300 rounded-md border px-3 py-2"
          onChange={(e) => setWithdrawRQ(e.target.value)}
          value={withdrawRQ}
        >
          <option value="" disabled>
            Select a request type
          </option>
          <option value="Yes">Request</option>
          <option value="No">No Request</option>
        </select>
      </div>
    </div>
  );
};

export default ProfitFilter;
