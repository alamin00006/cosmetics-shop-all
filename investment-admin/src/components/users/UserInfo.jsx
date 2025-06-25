import { formatDate } from "@/utils/dateConvert";
import { FaUser } from "react-icons/fa";

const UserInfo = ({ user, nominee }) => {
  return (
    <div className="grid grid-cols-1 gap-4 border border-[#d1d5db] rounded-lg  p-4 md:grid-cols-2">
      <div>
        <h4 className="flex items-center gap-2 text-lg font-bold text-green-600">
          <FaUser />
          Personal Details
        </h4>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <label className="font-medium">Investor Name</label>
            <p className="font-bold">{user?.name || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium">NID or Passport Number</label>
            <p className="font-bold">
              {user?.personalDetails?.nidOrPassportNo || "N/A"}
            </p>
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
            <label className="font-medium">Present Address</label>
            <p className="font-bold ">{user?.address?.addressLine1 || "N/A"}</p>
          </div>
          <div className="col-span-2">
            <label className="font-medium">Permanent Address</label>
            <p className="font-bold">{user?.address?.addressLine1 || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium">Zip Code</label>
            <p className="font-bold">{user?.address?.zipCode || "N/A"}</p>
          </div>
        </div>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-lg font-bold text-green-600">
          <FaUser />
          Nominee Details
        </h4>

        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="font-medium">Nominee Name</label>
            <p className="font-bold">{nominee?.nomineeFullName || "N/A"}</p>
          </div>

          <div>
            <label className="font-medium">Nominee Relation</label>
            <p className="font-bold">{nominee?.nomineeRelation || "N/A"}</p>
          </div>

          <div>
            <label className="font-medium">
              Nominee NID or Passport Number
            </label>
            <p className="font-bold">
              {nominee?.nomineeNidOrPassportNo || "N/A"}
            </p>
          </div>
          <div>
            <label className="font-medium">Nominee Mobile Number</label>
            <p className="font-bold">{nominee?.nomineePhone || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium">Nominee Relation</label>
            <p className="font-bold">{nominee?.nomineeRelation || "N/A"}</p>
          </div>
          <div>
            <label className="font-medium">Nominee Birthday</label>
            <p className="font-bold">
              {formatDate(nominee?.nomineeBirthDate) || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
