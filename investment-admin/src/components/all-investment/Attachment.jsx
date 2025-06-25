import { formatImagePath } from "@/utils/formateImagePath";
import { handleDownload } from "@/utils/handDownload";
import Image from "next/image";
import Link from "next/link";
import { FaFile } from "react-icons/fa";

const Attachment = ({ user, nominee, isInvestmentView }) => {
  console.log(user);
  return (
    <div className="border border-[#d1d5db] rounded-lg p-4 mt-4">
      <h4 className="flex items-center gap-2 text-lg font-bold text-green-500 mb-3">
        <FaFile />
        Attachment
      </h4>{" "}
      <div className=" grid grid-cols-1 gap-4  md:grid-cols-4 ">
        <div>
          <label className="font-medium">Investor Photo</label>
          {user?.personalDetails?.userPhoto ? (
            <div className="relative w-[100px] h-[100px] mt-2 group">
              <Image
                width={100}
                height={100}
                // src={user.personalDetails.userPhoto}
                src={
                  user?.isPreviousUser
                    ? user.personalDetails.userPhoto
                    : formatImagePath(user.personalDetails.userPhoto)
                }
                alt="User Photo"
                className="w-full h-full object-contain rounded cursor-pointer transition duration-300 ease-in-out group-hover:blur-sm"
              />
              {/* Overlay with Download text */}
              <div
                onClick={() =>
                  handleDownload(
                    user?.isPreviousUser
                      ? user.personalDetails.userPhoto
                      : formatImagePath(user.personalDetails.userPhoto),
                    "investor-photo"
                  )
                }
                className="absolute inset-0 cursor-pointer bg-black bg-opacity-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <span className="text-white text-sm font-bold">Download</span>
              </div>
            </div>
          ) : (
            <p className="font-bold">N/A</p>
          )}
        </div>
        <div>
          <label className="font-medium"> Inv. NID Front Side</label>
          {user?.personalDetails?.nidOrPassportPhoto ? (
            <div className="relative w-[100px] h-[100px] mt-2 group">
              <Image
                width={100}
                height={100}
                src={
                  user?.isPreviousUser
                    ? user.personalDetails.nidOrPassportPhoto
                    : formatImagePath(user.personalDetails.nidOrPassportPhoto)
                }
                alt="User NID Front Photo"
                className="w-full h-full object-contain rounded cursor-pointer transition duration-300 ease-in-out group-hover:blur-sm"
              />
              <div
                onClick={() =>
                  handleDownload(
                    user?.isPreviousUser
                      ? user.personalDetails.nidOrPassportPhoto
                      : formatImagePath(
                          user.personalDetails.nidOrPassportPhoto
                        ),
                    "investor-nid-front"
                  )
                }
                className="absolute inset-0  cursor-pointer bg-black bg-opacity-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <span className="text-white text-sm font-bold">Download</span>
              </div>
            </div>
          ) : (
            <p className="font-bold">N/A</p>
          )}
        </div>
        <div>
          <label className="font-medium">Inv. NID Back Side</label>
          {user?.personalDetails?.nidOrPassportBackSidePhoto ? (
            <div className="relative w-[100px] h-[100px] mt-2 group">
              <Image
                width={100}
                height={100}
                src={
                  user?.isPreviousUser
                    ? user.personalDetails.nidOrPassportBackSidePhoto
                    : formatImagePath(
                        user.personalDetails.nidOrPassportBackSidePhoto
                      )
                }
                alt="User NID Back Photo"
                className="w-full h-full object-contain rounded cursor-pointer transition duration-300 ease-in-out group-hover:blur-sm"
              />

              <div
                onClick={() =>
                  // handleDownload(
                  //   user.personalDetails
                  //     .nidOrPassportBackSidePhoto,
                  //   "investor-nid-back"
                  // )
                  handleDownload(
                    user?.isPreviousUser
                      ? user.personalDetails.nidOrPassportBackSidePhoto
                      : formatImagePath(
                          user.personalDetails.nidOrPassportBackSidePhoto
                        ),

                    "investor-nid-back"
                  )
                }
                className="absolute inset-0 bg-black bg-opacity-10 cursor-pointer flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <span className="text-white text-sm font-bold">Download</span>
              </div>
            </div>
          ) : (
            <p className="font-bold">N/A</p>
          )}
        </div>
        <div>
          <label className="font-medium">Nominee NID Front Side</label>
          {nominee?.nomineeNidOrPassportPhoto ? (
            <div className="relative w-[100px] h-[100px] mt-2 group">
              <Image
                width={100}
                height={100}
                // src={nominee.nomineeNidOrPassportPhoto}
                src={
                  user?.isPreviousUser
                    ? nominee.nomineeNidOrPassportPhoto
                    : formatImagePath(nominee.nomineeNidOrPassportPhoto)
                }
                alt="Nominee Photo"
                className="w-full h-full object-contain rounded cursor-pointer transition duration-300 ease-in-out group-hover:blur-sm"
              />

              <div
                onClick={() =>
                  handleDownload(
                    user?.isPreviousUser
                      ? nominee.nomineeNidOrPassportPhoto
                      : formatImagePath(nominee.nomineeNidOrPassportPhoto),
                    "nominee-nid-front"
                  )
                }
                className="absolute inset-0 cursor-pointer bg-black bg-opacity-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <span className="text-white text-sm font-bold">Download</span>
              </div>
            </div>
          ) : (
            <p className="font-bold">N/A</p>
          )}
        </div>
        <div>
          <label className="font-medium">Nominee NID Back Side</label>
          {nominee?.nomineeNidOrPassportBackSidePhoto ? (
            <div className="relative w-[100px] h-[100px] mt-2 group">
              <Image
                width={100}
                height={100}
                src={
                  user?.isPreviousUser
                    ? nominee.nomineeNidOrPassportBackSidePhoto
                    : formatImagePath(
                        nominee?.nomineeNidOrPassportBackSidePhoto
                      )
                }
                alt="Nominee Photo"
                className="w-full h-full object-contain rounded transition duration-300 ease-in-out group-hover:blur-sm"
              />
              <div
                onClick={() =>
                  handleDownload(
                    user?.isPreviousUser
                      ? nominee.nomineeNidOrPassportBackSidePhoto
                      : formatImagePath(
                          nominee.nomineeNidOrPassportBackSidePhoto
                        ),
                    "nominee-nid-back"
                  )
                }
                className="absolute inset-0 cursor-pointer bg-black bg-opacity-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <span className="text-white text-sm font-bold">Download</span>
              </div>
            </div>
          ) : (
            <p className="font-bold">N/A</p>
          )}
        </div>
        <div>
          <label className="font-medium">Nominee Photo</label>
          {nominee?.nomineePhoto ? (
            <div className="relative w-[100px] h-[100px] mt-2 group">
              <Image
                width={100}
                height={100}
                // src={nominee.nomineePhoto}
                src={
                  user?.isPreviousUser
                    ? nominee.nomineePhoto
                    : formatImagePath(nominee.nomineePhoto)
                }
                alt="Nominee Photo"
                className="w-full h-full object-contain rounded cursor-pointer transition duration-300 ease-in-out group-hover:blur-sm"
              />
              <div
                onClick={() =>
                  // handleDownload(
                  //   nominee.nomineePhoto,
                  //   "nominee-photo"
                  // )
                  handleDownload(
                    user?.isPreviousUser
                      ? nominee.nomineePhoto
                      : formatImagePath(nominee.nomineePhoto),
                    "nominee-photo"
                  )
                }
                className="absolute inset-0 bg-black cursor-pointer bg-opacity-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <span className="text-white text-sm font-bold">Download</span>
              </div>
            </div>
          ) : (
            <p className="font-bold">N/A</p>
          )}
        </div>
      </div>
      {isInvestmentView && (
        <div className="flex items-center gap-3">
          <p className="mb-2 text-green-600 font-black mt-2 ">
            {" "}
            {user?.isVerified ? (
              "Verified User"
            ) : (
              <span className="text-rose-500">Unverified User</span>
            )}
          </p>
          <Link
            href={`/user-details/${user?.id}`}
            target="_blank"
            className="text-sm text-blue-600 underline"
          >
            Check user others info
          </Link>
        </div>
      )}
    </div>
  );
};

export default Attachment;
