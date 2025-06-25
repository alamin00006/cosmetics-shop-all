import TextEditor from "@/components/textEditor/TextEditor";
// import TextEditor2 from "@/components/textEditor/TextEditor2";

const ProjectInfo = ({
  projectCategories,
  handleProjectType,
  projectTypeId,
  handleNextClick,
  handleInputChange,
  formData,
  setAboutProject,
  aboutProject,
  setExitStrategy,
  exitStrategy,
}) => {
  return (
    <div className="p-4 shadow-12">
      <h4 className="mb-8 text-lg font-semibold">Project Description</h4>
      <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-12">
        {/* Project Title */}
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block font-semibold">
            Project Title
          </label>
          <input
            type="text"
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Project Title"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>

        {/* Project Type */}
        <div className="mb-4 ">
          <label className="text-gray-700 mb-2 block font-semibold">
            Project Type
          </label>
          <select
            className="text-gray-700 border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-200"
            value={projectTypeId}
            onChange={(e) => handleProjectType(e)}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          >
            <option value="" disabled>
              Select Project Type
            </option>
            {projectCategories?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        </div>

        {/* About Project */}
        <div className=" mb-4">
          <label className="text-gray-700 mb-2 block font-semibold">
            About Project
          </label>
          {/* <textarea
            rows={3}
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="About Project."
            name="aboutProject"
            value={formData.aboutProject}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          /> */}

          <TextEditor
            setEditorValue={setAboutProject}
            editorValue={aboutProject}
          />
          {/* <TextEditor2
            setEditorValue={setAboutProject}
            editorValue={aboutProject}
          /> */}
        </div>

        {/* Management */}
        {/* <div className=" mb-4">
          <label className="text-gray-700 mb-2 block font-semibold">
            Management
          </label>
          <textarea
            rows={3}
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Management."
            name="managementInfo"
            value={formData.managementInfo}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div> */}

        {/* Exit Strategy */}
        <div className=" mb-4">
          <label className="text-gray-700 mb-2 block font-semibold">
            Exit Strategy
          </label>
          {/* <textarea
            rows={3}
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Exit Strategy."
            name="exitStrategy"
            value={formData.exitStrategy}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          /> */}

          <TextEditor
            setEditorValue={setExitStrategy}
            editorValue={exitStrategy}
          />
        </div>

        {/* Project Address */}
        <div className=" mb-6 md:mt-6 sm:mt-0">
          <label className="text-gray-700 mb-2 block font-semibold">
            Street Address
          </label>
          <input
            type="text"
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Street Address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>
        <div className=" mb-6 md:mt-6 sm:mt-0">
          <label className="text-gray-700 mb-2 block font-semibold">City</label>
          <input
            type="text"
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>
        <div className=" mb-6">
          <label className="text-gray-700 mb-2 block font-semibold">
            Zip Code
          </label>
          <input
            type="text"
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Zip code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>
        <div className=" mb-6">
          <label className="text-gray-700 mb-2 block font-semibold">
            Project Overview Video
          </label>
          <input
            type="text"
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Project Overview Video Link"
            name="youtubeVideoLink"
            value={formData.youtubeVideoLink}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "2px",
            }}
          />
        </div>

        {/* Location (Google Map Link) */}
        <div className="col-span-2 mb-6">
          <label className="text-gray-700 mb-2 block font-semibold">
            Location (Google Map Link)
          </label>
          <input
            type="text"
            className="border-gray-300 w-full rounded-md border p-2 focus:border-none focus:outline-none focus:ring-0 focus:ring-green-500"
            placeholder="Location"
            name="googleMapLink"
            value={formData.googleMapLink}
            onChange={handleInputChange}
            style={{
              borderColor: "#dddddd",
              outlineColor: "#00c196",
              outlineWidth: "0.2px",
            }}
          />
        </div>
      </div>
      <div className="flex justify-end" onClick={handleNextClick}>
        <p
          style={{
            backgroundColor: "#006666",
            color: "white",
            padding: "10px 20px",
            marginRight: "30px",
            borderRadius: "5px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default ProjectInfo;
