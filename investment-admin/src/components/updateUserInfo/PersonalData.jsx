import Image from "next/image";

const PersonalData = ({
  handleFileChange,
  userDataState,
  handleInputChange,
  userData,
  birthDayRef,
  setUserPhoto,
  userPhoto,
  setNidOrPassportPhoto1,
  nidOrPassportPhoto1,
  setNidOrPassportPhoto2,
  nidOrPassportPhoto2,
}) => {
  return (
    <div>
      <section className="p-2 border border-gray-300 rounded-lg custom-section mb-2">
        <div className="flex justify-between items-center mb-2 custom-section-header">
          <h2 className="md:text-xl sm:text-sm font-semibold custom-section-title text-primary">
            Account Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-grid">
          <div>
            <label
              htmlFor="email"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 bg-stone-200 rounded custom-input md:text-base sm:text-sm "
              placeholder="Email"
              name="email"
              defaultValue={userData?.email}
              id="email"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Mobile Number
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 bg-stone-200 rounded custom-input md:text-base sm:text-sm "
              placeholder="Mobile Number"
              id="mobile"
              name="mobileNumber"
              defaultValue={userData?.phoneNumber}
              disabled
            />
          </div>
        </div>
      </section>
      <section className="p-2 border border-gray-300 rounded-lg custom-section mb-2">
        <div className="flex justify-between items-center mb-2 custom-section-header">
          <h2 className="md:text-xl sm:text-sm font-semibold custom-section-title text-primary">
            Address Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-grid">
          <div>
            <label
              htmlFor="addressLine1"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Address Line 1
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm "
              placeholder="Address Line 1"
              name="addressLine1"
              id="addressLine1"
              onChange={handleInputChange}
              value={userDataState.addressLine1}
            />
          </div>

          <div>
            <label
              htmlFor="addressLine2"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Address Line 2
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300  rounded custom-input md:text-base sm:text-sm "
              placeholder="Address Line 2"
              id="addressLine2"
              name="addressLine2"
              onChange={handleInputChange}
              value={userDataState.addressLine2}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              City
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300  rounded custom-input md:text-base sm:text-sm "
              placeholder="City"
              id="city"
              name="city"
              onChange={handleInputChange}
              value={userDataState.city}
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              State
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm "
              placeholder="State"
              id="state"
              name="state"
              onChange={handleInputChange}
              value={userDataState.state}
            />
          </div>
          <div>
            <label
              htmlFor="zipCode"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Zip Code
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm "
              placeholder="Zip Code"
              id="zipCode"
              name="zipCode"
              onChange={handleInputChange}
              value={userDataState.zipCode}
            />
          </div>
        </div>
      </section>

      {/* Personal Information */}
      <section className="p-2 border border-gray-300 rounded-lg custom-section">
        <div className="flex justify-between items-center mb-2 custom-section-header">
          <h2 className="md:text-xl sm:text-sm font-semibold custom-section-title text-primary">
            Personal Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-grid">
          <div>
            <label
              htmlFor="fullName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 border bg-stone-200 border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Full Name"
              defaultValue={userData?.name}
              id="full-name"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="userId"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              User ID
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 bg-stone-200 rounded custom-input md:text-base sm:text-sm"
              placeholder="User ID"
              defaultValue={userData?.id}
              id="userId"
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 custom-grid">
          <div>
            <label
              htmlFor="fatherName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              {` Father's`} Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Father's Name"
              name="fathersName"
              id="fatherName"
              required
              onChange={handleInputChange}
              value={userDataState.fathersName}
            />
          </div>
          <div>
            <label
              htmlFor="motherName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              {`Mother's`} Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Mother's Name"
              name="mothersName"
              id="motherName"
              required
              onChange={handleInputChange}
              value={userDataState.mothersName}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 custom-grid">
          <div>
            <label
              htmlFor="birthDate"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Birth Date
            </label>
            <input
              type="date"
              ref={birthDayRef}
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              name="birthDate"
              id="birthDate"
              // defaultValue={
              //   userData?.personalDetails?.birthDate
              //     ? new Date(userData.personalDetails.birthDate)
              //         .toISOString()
              //         .slice(0, 10)
              //     : ""
              // }
              onChange={handleInputChange}
              value={userDataState.birthDate}
              onClick={() => birthDayRef.current?.showPicker()}
            />
          </div>
          <div>
            <label
              htmlFor="nidOrPassportNo"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              NID or Passport No
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="NID or Passport No"
              name="nidOrPassportNo"
              id="nidOrPassportNo"
              required
              onChange={handleInputChange}
              value={userDataState.nidOrPassportNo}
            />
          </div>
        </div>
        <div className="mt-4 custom-section-content">
          <h5 className="text-lg font-semibold custom-content-title">
            NID or Passport{" "}
            <span className="text-[#717171] md:text-sm sm:text-[12px]">
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
                onChange={handleFileChange(setNidOrPassportPhoto1)}
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs"
              />
              {nidOrPassportPhoto1 && (
                <div className="relative mt-2 w-32 h-32 rounded-md overflow-hidden shadow-md">
                  <Image
                    src={URL.createObjectURL(nidOrPassportPhoto1[0])}
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
                onChange={handleFileChange(setNidOrPassportPhoto2)}
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs"
              />
              {nidOrPassportPhoto2 && (
                <div className="relative mt-2 w-32 h-32 rounded-md overflow-hidden shadow-md">
                  <Image
                    src={URL.createObjectURL(nidOrPassportPhoto2[0])}
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
                Upload Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange(setUserPhoto)}
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs"
              />
              {userPhoto && (
                <div className="relative mt-2 w-32 h-32 rounded-full overflow-hidden shadow-md">
                  <Image
                    src={URL.createObjectURL(userPhoto[0])}
                    alt="Profile"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PersonalData;
