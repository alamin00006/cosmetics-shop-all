import Image from "next/image";

const EditUploadMedia = ({
  project,
  handleRemoveDriveLink,
  handleDriveLink,
  setDriveLinks,
  driveLinks,
  setFiles,
  handleNextClick,
}) => {
  return (
    <div className="p-4 shadow-12">
      <h4 className="mb-8 text-xl font-semibold">Documents</h4>

      {/* Google Drive Links */}
      {driveLinks.map((option, index) => (
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2" key={index}>
          <div>
            <label className="text-gray-700 mb-2 block font-semibold">
              Google Doc Link :
            </label>
            <input
              type="text"
              className="border-gray-300 w-full rounded-md border p-3"
              placeholder={`Google Doc`}
              defaultValue={option.googleDriveLink}
              onChange={(e) => {
                // Use map to create a new array with updated values
                const updatedOptions = driveLinks.map((link, idx) =>
                  idx === index
                    ? { ...link, googleDriveLink: e.target.value }
                    : link
                );
                setDriveLinks(updatedOptions);
              }}
              style={{
                borderColor: "#dddddd",
                outlineColor: "#00c196",
                outlineWidth: "2px",
              }}
            />
          </div>
          <div>
            <label className="text-gray-700 mb-2 block font-semibold">
              Google Doc Title :
            </label>
            <input
              type="text"
              className="border-gray-300 w-full rounded-md border p-3"
              placeholder={`Google Doc Title`}
              defaultValue={option.googleDriveLinkTitle}
              onChange={(e) => {
                // Use map to create a new array with updated values
                const updatedOptions = driveLinks.map((link, idx) =>
                  idx === index
                    ? { ...link, googleDriveLinkTitle: e.target.value }
                    : link
                );
                setDriveLinks(updatedOptions);
              }}
              style={{
                borderColor: "#dddddd",
                outlineColor: "#00c196",
                outlineWidth: "2px",
              }}
            />
          </div>
        </div>
      ))}

      <div className="mt-4 flex gap-4">
        <p
          onClick={handleDriveLink}
          className="rounded-md bg-teal-600 px-4 py-2 text-lg text-white cursor-pointer"
        >
          Add New Field
        </p>

        <p
          onClick={handleRemoveDriveLink}
          className="rounded-md bg-rose-600 px-4 py-2 text-lg text-white cursor-pointer"
        >
          Delete
        </p>
      </div>
      {/* Project Picture Upload */}
      <div className="my-4">
        <label className="text-gray-700 mb-2 block font-semibold">
          Project Picture :
        </label>
        <input
          type="file"
          className="border-gray-300 w-full rounded-md border p-3"
          name="image"
          onChange={(e) => setFiles(e.target.files)}
          multiple
          style={{
            borderColor: "#dddddd",
            outlineColor: "#00c196",
            outlineWidth: "2px",
          }}
        />
        {project?.projectPicture && (
          <div className="flex flex-wrap gap-3 mt-2">
            {project.projectPicture.map((picture, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  width={100}
                  height={100}
                  src={picture}
                  alt="Project Picture"
                  className="w-[100px] h-[100px]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUploadMedia;
