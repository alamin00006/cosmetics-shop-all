import { FaUser } from "react-icons/fa";

const UserInfo = ({ user }) => {
  return (
    <div className="grid grid-cols-1 gap-4 border border-[#d1d5db] rounded-lg  p-4 md:grid-cols-2">
      <div>
        <h4 className="flex items-center gap-2 text-lg font-bold text-green-600">
          <FaUser />
          Personal Details
        </h4>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <label className="font-medium">Customer Name</label>
            <p className="font-bold">{user?.name || "N/A"}</p>
          </div>

          <div>
            <label className="font-medium">Email</label>
            <p className="font-bold">{user?.email || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium">Mobile Number</label>
            <p className="font-bold">{user?.phoneNumber || "N/A"}</p>
          </div>
          <div className="col-span-2">
            <label className="font-medium"> Address</label>
            <p className="font-bold ">{user?.address?.addressLine1 || "N/A"}</p>
          </div>

          <div>
            <label className="font-medium">Zip Code</label>
            <p className="font-bold">{user?.address?.zipCode || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
