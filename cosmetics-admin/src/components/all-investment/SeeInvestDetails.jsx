import { useRef } from "react";
import { FaUser, FaFileInvoice, FaFile } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { formatDate } from "@/utils/dateConvert";
import { useGetProfitsByUserIdQuery } from "@/redux/api/profitApi";
import InvestorProfitHistory from "./InvestorProfitHistory";
import Link from "next/link";

import { formatBDT } from "@/utils/formateBDT";
import { useRouter } from "next/navigation";
import { afterOneYear } from "@/utils/afterOneYear";
import { afterSixMonth } from "@/utils/afterSixMonth";
import UserInfo from "../users/UserInfo";

import Attachment from "./Attachment";
import Image from "next/image";
// import { USER_ROLE } from "@/constants/role";

const SeeInvestDetails = ({ order, show, setShow }) => {
  const ref = useRef(null);

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
                Order Info <span className="text-black"></span>
              </h4>

              <button
                className="btn btn-circle btn-sm text-black"
                onClick={handleClose}
              >
                x
              </button>
            </div>

            {/* Personal and Nominee Details */}
            <UserInfo user={order?.user} />
            {/* Attachment */}

            {/* Investment and Return Details */}
            <div className="mt-4  gap-4 border border-[#d1d5db] p-4">
              <div>
                <h4 className="flex items-center gap-2 text-lg font-bold text-green-500">
                  <MdAccountBalance />
                  Order Details
                </h4>

                <div className="grid grid-cols-5 gap-2 mt-2">
                  <div>
                    <label className="font-medium">Order ID</label>
                    <p className="font-bold uppercase">
                      #{order?._id?.slice(15) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Order Date</label>
                    <p className="font-bold">
                      {formatDate(order?.createdAt) || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Product Name</label>
                    <p className="font-bold">
                      {order?.orderItems?.[0]?.product?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Total Amount</label>
                    <p className="font-bold">
                      Tk{" "}
                      {formatBDT(order?.orderItems?.[0]?.singleCartTotal) ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Quantity</label>
                    <p className="font-bold">
                      {" "}
                      {order?.orderItems?.[0]?.cartQuantity || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Payment Method</label>
                    <p className="font-bold">
                      {order?.paymentMethod || "Cash"}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Product</label>
                    <p className="font-bold">
                      <Image
                        src={order?.orderItems?.[0]?.selectedShade.image}
                        width={200}
                        height={200}
                        alt=""
                      />
                    </p>
                  </div>
                  <div>
                    <label className="font-medium">Color</label>
                    <p
                      className="font-bold rounded-full"
                      style={{
                        backgroundColor:
                          order?.orderItems?.[0]?.selectedShade?.color,
                      }}
                    ></p>
                  </div>
                  <div>
                    <label className="font-medium">Status</label>
                    <p
                      className={`font-bold ${
                        order?.orderStatus !== "Approved"
                          ? "text-rose-600"
                          : "text-green-600"
                      }`}
                    >
                      {order?.orderStatus || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profit Disbursement Summary */}
          {/* <InvestorProfitHistory items={order?.orderItems} /> */}
        </div>

        {/* <div className="flex justify-end gap-3 items-center mt-2">
          <Link
            href={`/statement/${order?._id}`}
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
        </div> */}
      </div>
    </div>
  );
};

export default SeeInvestDetails;
