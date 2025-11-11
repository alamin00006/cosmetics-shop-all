import Link from "next/link";

const BankInfo = ({ account, route }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-[#d1d5db] p-6">
      <div className="flex justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold text-gray-700">
          Bank Information
        </h2>
        <div className="bg-primary text-white p-2 rounded">
          <Link href={`${route}/${account?._id}`}> Update </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Bank Name</p>
          <p className="text-lg font-semibold text-gray-900">
            {account?.bankName}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Account Holder Name</p>
          <p className="text-lg font-semibold text-gray-900">
            {account?.accountHolderName}
          </p>
        </div>
        {/* <div className="flex flex-col">
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="text-lg font-semibold text-gray-900">
                  {account?.accountType}
                </p>
              </div> */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Account Number</p>
          <p className="text-lg font-semibold text-gray-900">
            {account?.accountNumber}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Branch Name</p>
          <p className="text-lg font-semibold text-gray-900">
            {account?.branchName}
          </p>
        </div>

        {account?.project?.projectTitle && (
          <div className="flex flex-col">
            <p className="text-sm text-gray-500">Assign For Project</p>
            <p className="text-lg font-semibold text-gray-900">
              {account?.project?.projectTitle || "-"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BankInfo;
