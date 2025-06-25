import { useRef } from "react";
import { FaUser, FaFileInvoice, FaFile } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { formatDate } from "@/utils/dateConvert";
import { useGetProfitsByUserIdQuery } from "@/redux/api/profitApi";
import Image from "next/image";
import InvestorProfitHistory from "./InvestorProfitHistory";
import Link from "next/link";

import { formatBDT } from "@/utils/formateBDT";
import { useRouter } from "next/navigation";
import { afterOneYear } from "@/utils/afterOneYear";
import { afterSixMonth } from "@/utils/afterSixMonth";
import UserInfo from "../users/UserInfo";
import { formatImagePath } from "@/utils/formateImagePath";
import { handleDownload } from "@/utils/handDownload";
import Attachment from "./Attachment";
// import { USER_ROLE } from "@/constants/role";

const SeeInvestDetails = ({ investment, show, setShow }) => {
  const ref = useRef(null);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/pay-proof/${investment?._id}`);
  };
  const {
    data: profits,
    error,
    isLoading,
  } = useGetProfitsByUserIdQuery(investment?._id);

  const handleClose = () => setShow(false);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading profit data.</p>;

  return (
    <div
      className={`${
        show
          ? "fixed inset-0 z-9999 flex items-center justify-center"
          : "hidden"
      }`}
    >
      {" "}
      <div
        className="fixed inset-0 backdrop-blur-[2px]"
        onClick={handleClose}
      ></div>
      <div className="modal-box max-w-7xl ">
        <div ref={ref}>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h4 className="flex items-center gap-2 text-lg font-bold text-green-600">
                <FaFileInvoice />
                Investment Info{" "}
                <span className="text-black">
                  {" "}
                  ( PR Name :{" "}
                  {investment?.project?.PRManagersDetails?.[0]?.name})
                </span>
              </h4>

              <button
                className="btn btn-circle btn-sm text-black"
                onClick={handleClose}
              >
                x
              </button>
            </div>

            {/* Personal and Nominee Details */}
            <UserInfo user={investment?.userId} nominee={investment?.nominee} />
            {/* Attachment */}

            <Attachment
              user={investment?.userId}
              nominee={investment?.nominee}
              isInvestmentView={true}
            />

            {/* Investment and Return Details */}
            <div className="mt-4 grid grid-cols-1 gap-4 border border-[#d1d5db] p-4 md:grid-cols-2">
              <div>
                <div className="flex gap-5">
                  <h4 className="flex items-center gap-2 text-lg font-bold text-green-500">
                    <MdAccountBalance />
                    Payment Information
                  </h4>
                  <button
                    className={`${
                      Array.isArray(
                        investment?.payment?.[0]?.proofOfPaymentPhoto
                      ) &&
                      investment?.payment?.[0]?.proofOfPaymentPhoto.length > 0
                        ? "bg-slate-300"
                        : "bg-primary"
                    } text-white p-1 rounded`}
                    onClick={handleNavigate}
                    disabled={
                      Array.isArray(
                        investment?.payment?.[0]?.proofOfPaymentPhoto
                      ) &&
                      investment?.payment?.[0]?.proofOfPaymentPhoto.length > 0
                    }
                  >
                    Upload or update payment proof
                  </button>
                </div>
                <div>
                  {investment?.payment?.length > 0 ? (
                    <>
                      {investment?.payment?.map((pay) => (
                        <div
                          key={pay._id}
                          className="grid grid-cols-2 gap-2 mt-2"
                        >
                          <div>
                            <label className="font-medium">Payment Date</label>
                            <p className="font-bold uppercase mt-3">
                              {formatDate(pay?.paymentDate) || "N/A"}
                            </p>
                          </div>
                          <div>
                            <label className="font-medium">
                              Proof of Investment
                            </label>

                            <div className="flex flex-wrap mt-2">
                              {pay?.proofOfPaymentPhoto?.map((photo, index) => (
                                <div
                                  key={index}
                                  className="relative w-[100px] h-[100px] m-2 group"
                                >
                                  <Image
                                    src={formatImagePath(photo)}
                                    alt={`Proof of Invest Photo`}
                                    className="w-full h-full object-contain rounded-lg border cursor-pointer transition duration-300 ease-in-out group-hover:blur-sm"
                                    width={100}
                                    height={100}
                                  />
                                  {/* Overlay with Download text */}
                                  <div
                                    onClick={() =>
                                      handleDownload(
                                        formatImagePath(photo),
                                        "payment-proof"
                                      )
                                    }
                                    className="absolute inset-0 bg-black cursor-pointer bg-opacity-10 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                  >
                                    <span className="text-white text-sm font-bold">
                                      Download
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="mt-4 text-rose-500 font-bold">
                      No payment proof has been provided for the investment.
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 border border-[#d1d5db] p-4 md:grid-cols-2">
              <div>
                <h4 className="flex items-center gap-2 text-lg font-bold text-green-500">
                  <MdAccountBalance />
                  Investment Details
                </h4>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="font-medium">Investment ID</label>
                    <p className="font-bold uppercase">
                      #{investment?.id || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Investment Date</label>
                    <p className="font-bold">
                      {formatDate(investment?.createdAt) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Project Name</label>
                    <p className="font-bold">
                      {investment?.project?.projectTitle || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Investment Amount</label>
                    <p className="font-bold">
                      Tk {formatBDT(investment?.investmentAmount) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Total Buy Shares</label>
                    <p className="font-bold">
                      {investment?.totalBuyShare || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Payment Method</label>
                    <p className="font-bold">
                      {investment?.paymentMethod || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Return Type</label>
                    <p className="font-bold">
                      {investment?.returnType || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Profit Ratio</label>
                    <p className="font-bold">
                      {`${investment?.percentOfReturn} %` || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">
                      Duration of Investment
                    </label>
                    <p className="font-bold">
                      {`${investment?.durationOfInvest} Year` || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">First Return Date</label>
                    <p className="font-bold">
                      {/* {formatDate(investment?.firstReturnDate) || "N/A"} */}
                      {investment?.returnType === "Yearly"
                        ? formatDate(afterOneYear(investment?.firstReturnDate))
                        : investment?.returnType === "Monthly"
                        ? formatDate(investment?.firstReturnDate)
                        : formatDate(
                            afterSixMonth(investment?.firstReturnDate)
                          )}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Status</label>
                    <p
                      className={`font-bold ${
                        investment?.status !== "Approved"
                          ? "text-rose-600"
                          : "text-green-600"
                      }`}
                    >
                      {investment?.status || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-lg font-bold text-green-600">
                  <GiReceiveMoney />
                  Return Details
                </h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="font-medium">Total Profit Amount</label>
                    <p className="font-bold">
                      Tk {formatBDT(investment?.totalProfitAmount) || "0"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">
                      Total Paid Profit Amount
                    </label>
                    <p className="font-bold">
                      Tk {formatBDT(investment?.totalPaidProfitAmount) || "0"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">
                      Total Due Profit Amount
                    </label>
                    <p className="font-bold">
                      Tk {formatBDT(investment?.totalDueProfitAmount) || "0"}
                    </p>
                  </div>
                  {/* <div>
                    <label className="font-medium">
                      Total Profit of Percentage
                    </label>
                    <p className="font-bold">
                      {`${investment?.totalProfitOfPercentage}%` || "N/A"}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Profit Disbursement Summary */}
          <InvestorProfitHistory profits={profits} />
        </div>

        <div className="flex justify-end gap-3 items-center mt-2">
          <Link
            href={`/statement/${investment?._id}`}
            style={{
              backgroundColor: "#399",
            }}
            className="px-3 py-3 mt-5 rounded text-white font-medium "
          >
            Statement/Invoice
          </Link>

          <button className="btn btn-outline mt-5" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeeInvestDetails;
