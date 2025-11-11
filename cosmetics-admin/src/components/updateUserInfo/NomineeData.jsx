import Image from "next/image";

const NomineeData = ({
  handleFileChange,
  userDataState,
  handleInputChange,
  userData,
  nomineeBirthDayRef,
  setNomineeNidOrPassportPhoto1,
  nomineeNidOrPassportPhoto1,
  setNomineeNidOrPassportPhoto2,
  nomineeNidOrPassportPhoto2,
  setNomineePhoto,
  nomineePhoto,
}) => {
  return (
    <>
      {/* Nominee Information */}
      <section className="p-2 border border-gray-300 rounded-lg custom-section">
        <div className="flex justify-between items-center mb-2 custom-section-header">
          <h2 className="md:text-xl sm:text-sm font-semibold custom-section-title text-primary">
            Nominee Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-grid">
          <div>
            <label
              htmlFor="nomineeFullName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Nominee Full Name"
              name="nomineeFullName"
              id="nomineeFullName"
              required
              onChange={handleInputChange}
              value={userDataState?.nomineeFullName}
            />
          </div>
          <div>
            <label
              htmlFor="nomineeRelation"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Nominee Relation
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Nominee Relation"
              name="nomineeRelation"
              id="nomineeRelation"
              required
              onChange={handleInputChange}
              value={userDataState?.nomineeRelation}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 custom-grid">
          <div>
            <label
              htmlFor="nomineeFathersName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Nominee Father’s Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Nominee Father’s Name"
              name="nomineeFathersName"
              id="nomineeFathersName"
              required
              onChange={handleInputChange}
              value={userDataState?.nomineeFathersName}
            />
          </div>
          <div>
            <label
              htmlFor="nomineeMothersName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Nominee Mother’s Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Nominee Mother’s Name"
              name="nomineeMothersName"
              id="nomineeMothersName"
              required
              onChange={handleInputChange}
              value={userDataState?.nomineeMothersName}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 custom-grid">
          <div>
            <label
              htmlFor="nomineeBirthDate"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Nominee Birth Date
            </label>
            <input
              type="date"
              ref={nomineeBirthDayRef}
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              name="nomineeBirthDate"
              id="nomineeBirthDate"
              // defaultValue={
              //   userData?.nomineeDetails?.nomineeBirthDate
              //     ? new Date(userData.nomineeDetails.nomineeBirthDate)
              //         .toISOString()
              //         .slice(0, 10)
              //     : ""
              // }
              onChange={handleInputChange}
              value={userDataState?.nomineeBirthDate}
              onClick={() => nomineeBirthDayRef.current?.showPicker()}
            />
          </div>
          <div>
            <label
              htmlFor="nomineeNidOrPassportNo"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Nominee NID or Passport No
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Nominee NID or Passport No"
              name="nomineeNidOrPassportNo"
              id="nomineeNidOrPassportNo"
              required
              onChange={handleInputChange}
              value={userDataState?.nomineeNidOrPassportNo}
            />
          </div>
        </div>
        <div className="mt-4 custom-section-content">
          <h5 className="text-lg font-semibold custom-content-title">
            Nominee NID or Passport{" "}
            <span className="text-[#717171] md:text-sm sm:text-[11px]">
              (JPG, JPEG or PNG)
            </span>
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-grid">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload NID/Passport Photo (Front)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(setNomineeNidOrPassportPhoto1)}
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs"
              />
              {nomineeNidOrPassportPhoto1 && (
                <div className="relative mt-2 w-32 h-32 rounded-md overflow-hidden shadow-md">
                  <Image
                    src={URL.createObjectURL(nomineeNidOrPassportPhoto1[0])}
                    alt="NID/Passport Front"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>

            {/* Upload NID/Passport Photo (Back) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload NID/Passport Photo (Back)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(setNomineeNidOrPassportPhoto2)}
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs"
              />
              {nomineeNidOrPassportPhoto2 && (
                <div className="relative mt-2 w-32 h-32 rounded-md overflow-hidden shadow-md">
                  <Image
                    src={URL.createObjectURL(nomineeNidOrPassportPhoto2[0])}
                    alt="NID/Passport Back"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>

            {/* Upload Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Nominee Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(setNomineePhoto)}
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs"
              />

              {nomineePhoto && (
                <div className="relative mt-2 w-32 h-32 rounded-md overflow-hidden shadow-md">
                  <Image
                    src={URL.createObjectURL(nomineePhoto[0])}
                    alt="NID/Passport Back"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NomineeData;
