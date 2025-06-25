"use client";
import { useState } from "react";
import { paymentMethods } from "./payementType";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoadingState from "@/components/LoadingState/LoadingState";
import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { authKey } from "@/constants/storageKey";
import { DURATION_TYPE } from "@/constants/durationType";
import { formatBDT } from "@/utils/formateBDT";
import { getFromLocalStorage } from "@/utils/local-storage";

const TotalInvestment = ({
  projectData,
  investmentAmount,
  returnTypeValue,
  profitAmount,
  buyShare,
  allUsers,
  setUserDataId,
  userDataId,
  nominees,
  isForResale = false,
  resaleInvestorUserId = null,
}) => {
  const [nominee, setNominee] = useState("");

  const router = useRouter();
  const [paymentType, setPaymentType] = useState("Bank-Transfer");
  const [paymentFee, setPaymentFee] = useState(0);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const investData = {
    userId: userDataId,
    project: projectData?._id,
    investmentAmount: investmentAmount,
    totalBuyShare: buyShare,
    minimumShare: projectData?.minimumSharedValue,
    returnType:
      projectData?.investmentDuration.durationType === DURATION_TYPE.MONTH
        ? "Half-Yearly"
        : returnTypeValue === 0
        ? "Yearly"
        : returnTypeValue === 1
        ? "Quarterly"
        : "Monthly",
    durationOfInvest:
      projectData?.investmentDuration.durationValue +
      " " +
      projectData?.investmentDuration.durationType,
    paymentMethod: "Bank Transfer",
    // paymentFee: paymentFee,
    notaryFee: "",
    sharikanaFee: "",
    profitAmount: profitAmount,
    percentOfReturn:
      projectData?.investmentDuration?.durationType === DURATION_TYPE.YEAR
        ? returnTypeValue === 0
          ? projectData?.yearlyReturnValue
          : returnTypeValue === 1
          ? projectData?.quarterlyReturnValue
          : projectData?.monthlyReturnValue
        : projectData?.monthlyReturnValue,
    firstReturnDate: projectData?.firstReturnDate,
    nominee: nominee,
    resaleInvestor: isForResale ? resaleInvestorUserId : "",
    investmentType: "Resale",
  };

  const handleSubmitInvest = async (e) => {
    e.preventDefault();

    try {
      setIsLoadingState(true);
      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      };

      // await placeInvestment(investData);
      await axios.post(`${getBaseUrl()}/investment`, investData, {
        headers,
      });
      toast.success("Thanks For Your Investment");
      router.push(`/investment-place/${userDataId}`);
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
      <form
        onSubmit={handleSubmitInvest}
        className="p-5 mb-2 bg-white shadow-md rounded-lg border border-[#bdbdbd]"
      >
        <h6 className="text-base lg:text-xl mb-2" style={{ color: "#068F66" }}>
          Investment Summary
        </h6>
        <hr className="border-teal-100 mb-1" />
        <div className="space-y-1">
          <div className="flex justify-between text-sm lg:text-base">
            <span>Project Type</span>
            <span>{projectData?.projectType?.name}</span>
          </div>

          <hr className="border-[#bdbdbd] mb-1" />

          <div className="flex justify-between text-sm lg:text-base">
            <span>Slot </span>
            <span>{buyShare?.toLocaleString()} Slot (s)</span>
          </div>

          {projectData?.projectType?.name !== "Co-ownership" && (
            <div className="flex justify-between text-sm lg:text-base">
              <span>Duration</span>
              {projectData?.investmentDuration?.durationValue}{" "}
              {projectData?.investmentDuration?.durationType}(s)
            </div>
          )}
          {projectData?.investmentDuration?.durationType ===
            DURATION_TYPE.YEAR && (
            <>
              {" "}
              <hr className="border-[#bdbdbd] mb-1" />
              <div className="flex justify-between text-sm lg:text-base">
                <span>Return Type</span>
                <span>
                  {returnTypeValue === 0
                    ? "Yearly"
                    : returnTypeValue === 1
                    ? "Quarterly"
                    : "Monthly"}
                </span>
              </div>
            </>
          )}

          <hr className="border-[#bdbdbd] mb-1" />
          <div className="flex justify-between text-sm lg:text-base">
            <span>Investment Amount</span>
            <span>BDT {formatBDT(investmentAmount)}</span>
          </div>
        </div>
        <hr className="border-[#bdbdbd] my-2" />
        <span className="mb-3 text-sm lg:text-base ">Payment Method</span>
        <div className="space-y-2 mb-4">
          {paymentMethods.map((method, index) => (
            <div className="flex items-center text-sm lg:text-base" key={index}>
              {/* <input
                id={method.paymentType}
                type="radio"
                defaultChecked={index === 0}
                name="paymentType"
                onClick={() => {
                  setPaymentType(method.paymentType);
                  setPaymentFee(method.fee);
                }}
                className="mr-2"
              /> */}
              <input
                type="checkbox"
                id={method.paymentType}
                defaultChecked={index === 0}
                name="paymentType"
                onClick={() => {
                  setPaymentType(method.paymentType);
                  setPaymentFee(method.fee);
                }}
                required
                className="mr-2"
              />

              <label htmlFor={method.paymentType}>{method.paymentType}</label>
            </div>
          ))}
        </div>

        {/* Select Investor */}
        <span className="mb-3 text-sm lg:text-base ">Select Investor</span>
        <div className="space-y-2 mb-4 mt-2">
          <div className="flex items-center text-sm ">
            <select
              className=" w-full rounded-md p-2 border border-[#bdbdbd]"
              value={userDataId}
              onChange={(e) => setUserDataId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Investor
              </option>
              {allUsers?.users?.map((user) => (
                <option key={user?._id} value={user?._id} className="font-bold">
                  {user?.name}-({user?.phoneNumber})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Select Nominee */}
        {nominees?.length > 0 ? (
          <>
            <span className="mb-3 text-sm lg:text-base ">
              Select your nominee
            </span>
            <div className="space-y-2 mb-4 mt-2">
              <div className="flex items-center text-sm ">
                <select
                  className=" w-full rounded-md p-2 border border-[#bdbdbd]"
                  value={nominee}
                  onChange={(e) => setNominee(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your nominee
                  </option>
                  {nominees?.map((nominee) => (
                    <option key={nominee?._id} value={nominee?._id}>
                      {nominee?.nomineeFullName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        ) : !userDataId ? (
          ""
        ) : (
          <p className="text-rose-500 font-bold text-sm mb-2">
            No Nominee Found{" "}
            <Link
              href={`/user-update/${userDataId}`}
              className="text-xs text-blue-600"
            >
              (Please complete investor profile)
            </Link>
          </p>
        )}

        <div className="flex items-center mb-2">
          <input type="checkbox" required className="mr-2" />

          <span>
            I Agree{" "}
            <Link href="/term-condition" className="hover:underline">
              Terms And Condition
            </Link>{" "}
          </span>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-[#00c194d3] transition text-sm lg:text-base"
          disabled={
            projectData?.investment?.totalSoldSlots ===
              projectData?.availableTotalShare || !nominees?.length
          }
        >
          Process to Payment
        </button>
      </form>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </>
  );
};

export default TotalInvestment;
