const BankInformation = ({ userDataState, handleInputChange }) => {
  return (
    <>
      {/* Nominee Information */}
      <section className="p-2 border border-gray-300 rounded-lg custom-section">
        <div className="flex justify-between items-center mb-2 custom-section-header">
          <h2 className="md:text-xl sm:text-sm font-semibold custom-section-title text-primary">
            Bank Information
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 custom-grid">
          <div>
            <label
              htmlFor="bankName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Bank Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Bank Name"
              name="bankName"
              id="bankName"
              required
              onChange={handleInputChange}
              value={userDataState?.bankName}
            />
          </div>
          <div>
            <label
              htmlFor="nomineeRelation"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Account Holder Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              placeholder="Account Holder Name"
              name="accountHolderName"
              id="accountHolderName"
              required
              onChange={handleInputChange}
              value={userDataState?.accountHolderName}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 custom-grid">
          <div>
            <label
              htmlFor="nomineeFathersName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Account Number
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              name="accountNumber"
              placeholder="Account Number"
              required
              onChange={handleInputChange}
              value={userDataState?.accountNumber}
            />
          </div>
          <div>
            <label
              htmlFor="nomineeMothersName"
              className="block md:text-base font-medium mb-1 custom-label sm:text-xs"
            >
              Branch Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded custom-input md:text-base sm:text-sm"
              name="branchName"
              placeholder="Branch Name"
              required
              onChange={handleInputChange}
              value={userDataState?.branchName}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BankInformation;
