"use client";
import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { ENUM_PAYMETHOD } from "@/constants/paymentMethod";
import ToasterMessage from "../shared/ToasterMessage";
import { useGetSingleInvestmentByUserORInvestIdQuery } from "@/redux/api/investmentApi";
import { compressImage } from "@/utils/compressImage";
import LoadingState from "../LoadingState/LoadingState";
import { getFromLocalStorage } from "@/utils/local-storage";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { authKey } from "@/constants/storageKey";

const PaymentProof = ({ params: investmentId }) => {
  // Get User

  // get user single investment
  const params = {
    investmentId: investmentId?.investmentId ? investmentId.investmentId : "",
  };

  const {
    data: investData,
    error,
    isLoading,
  } = useGetSingleInvestmentByUserORInvestIdQuery(params);

  const [files, setFiles] = useState("");

  //   Payment Part State
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [displayPaymentAmount, setDisplayPaymentAmount] = useState("");

  const [isLoadingState, setIsLoadingState] = useState(false);
  const dateRef = useRef(null);
  const formData = new FormData();

  const handlePaymentAmount = (e) => {
    let inputValue = e.target.value.replace(/,/g, "");
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setPaymentAmount(0);
      setDisplayPaymentAmount("");
    } else {
      const numericValue = Number(inputValue);
      setPaymentAmount(numericValue);
      setDisplayPaymentAmount(numericValue.toLocaleString());
    }
  };

  const handlePaymentProof = async (e) => {
    e.preventDefault();

    // if (investData.status === "Received" || investData.status === "Canceled")
    //   return toast.error(`Sorry, Your Investment Already ${investData.status}`);

    const paymentDate = e.target.paymentDate.value;
    const bankName = e.target.bankName?.value;
    const bankAccountNumber = e.target.accountNumber?.value;
    const bankBranchName = e.target.branchName?.value;
    const bkashAccountNumber = e.target.bkashAccountNumber?.value;

    try {
      setIsLoadingState(true);
      if (files) {
        const compressedFile = await compressImage(files[0], {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1280,
        });

        formData.append("proofOfPaymentPhoto", compressedFile);
      }

      const paymentOfProofData = {
        paymentDate,
        paymentMethod,
        paymentAmount,
        ...(bankName && { bankName }),
        ...(bankAccountNumber && { bankAccountNumber }),
        ...(bankBranchName && { bankBranchName }),
        ...(bkashAccountNumber && { bkashAccountNumber }),
      };

      Object.keys(paymentOfProofData).forEach((key) => {
        formData.append(key, paymentOfProofData[key]);
      });

      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "multipart/form-data",
      };
      await axios.patch(
        `${getBaseUrl()}/investment/${investData?.id}/upload-payment-proof/${
          investData?.userId?._id
        }`,
        formData,
        {
          headers,
        }
      );
      toast.success("Thanks for uploading the proof photo");

      e.target.reset();
      setPaymentMethod("");
      setPaymentAmount(0);
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message);
      setIsLoadingState(false);
    } finally {
      setIsLoadingState(false);
    }
  };

  return (
    <>
      {/* Loading State */}
      {isLoadingState && <LoadingState isLoadingState={isLoadingState} />}

      <div className=" mx-5 mt-5 p-5 shadow-lg rounded-lg">
        {/* <h2 className="text-lg font-semibold">Payment Proof Upload</h2> */}
        {/* <div className="flex justify-center mb-5 py-3 px-2 rounded-lg font-medium">
          <div>
            <p className="text-black">
              Investment Id :{" "}
              <span className="uppercase"> #{investData?.id}</span>
            </p>
            <p className="text-black font-semibold">
              Investment Amount : BDT {formatBDT(investData?.investmentAmount)}
            </p>
          </div>
        </div> */}

        <h2 className="text-center font-bold mb-2">
          Investor Name : {investData?.userId?.name}
        </h2>
        <p className="text-center font-bold mb-5">
          Contact Number : {investData?.userId?.phoneNumber}
        </p>

        <form onSubmit={handlePaymentProof} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
            <div>
              <label className="block mb-1">Payment Date</label>
              <input
                type="date"
                ref={dateRef}
                onClick={() => dateRef.current?.showPicker()}
                className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
                required
                name="paymentDate"
              />
            </div>
            <div>
              <label className="block mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
              >
                <option disabled value={""}>
                  Select Payment Method
                </option>
                <option>Bank-Transfer</option>
                <option>Cash-deposit</option>
                <option>CRM</option>
                <option>Bkash</option>
              </select>
            </div>

            {paymentMethod === ENUM_PAYMETHOD.Bank_Transfer && (
              <>
                <div>
                  <label className="block mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    required
                    className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    required
                    className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block mb-1">Branch Name</label>
                  <input
                    type="text"
                    name="branchName"
                    placeholder="Branch Name"
                    className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block mb-1">Amount</label>
              <input
                type="text"
                className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
                placeholder="Payment Amount"
                name="paymentAmount"
                value={displayPaymentAmount}
                onChange={handlePaymentAmount}
                required
              />
            </div>
            {paymentMethod === ENUM_PAYMETHOD.Bkash && (
              <div>
                <label className="block mb-1">Bkash Number</label>
                <input
                  type="text"
                  name="bkashAccountNumber"
                  placeholder="Bkash Number"
                  className="w-full h-12 border border-gray-300 rounded-lg focus:border-lime-300 focus:outline-none px-2 transition duration-300"
                  required
                />
              </div>
            )}

            <div>
              <label className="block mb-1">Payment Proof</label>
              <input
                type="file"
                className="w-full border border-gray-300 rounded custom-input md:text-sm sm:text-xs text-xs p-2"
                onChange={(e) => setFiles(e.target.files)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-green-500  mt-2 text-white sm:text-[12px] md:text-base px-8 py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
              Submit
            </button>
          </div>
        </form>

        <ToasterMessage
          position="top-center"
          containerStyle={{ marginTop: "60px" }}
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default PaymentProof;
