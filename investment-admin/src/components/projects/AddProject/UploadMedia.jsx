const UploadMedia = ({
  handleRemoveDriveLink,
  handleDriveLink,
  setDriveLinks,
  driveLinks,
  setFiles,
  handleNextClick,

  handleFileChange,
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
              placeholder={`Google Doc Link `}
              value={option.googleDriveLink}
              onChange={(e) => {
                const updatedOptions = [...driveLinks];
                updatedOptions[index].googleDriveLink = e.target.value;
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
              value={option.googleDriveLinkTitle}
              onChange={(e) => {
                const updatedOptions = [...driveLinks];
                updatedOptions[index].googleDriveLinkTitle = e.target.value;
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
          // onChange={(e) => setFiles(e.target.files)}
          onChange={handleFileChange(setFiles)}
          multiple
          style={{
            borderColor: "#dddddd",
            outlineColor: "#00c196",
            outlineWidth: "2px",
          }}
        />
      </div>
    </div>
  );
};

export default UploadMedia;
