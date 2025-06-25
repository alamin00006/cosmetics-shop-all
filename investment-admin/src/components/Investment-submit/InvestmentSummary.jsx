"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReturnTotal from "./ReturnTotal";
import TotalInvestment from "./TotalInvestment";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { returnTypes } from "@/constants/returnType";
import { useGetNomineeByUserIdQuery } from "@/redux/api/nomineeApi";
import { DURATION_TYPE } from "@/constants/durationType";
import { PROJECT_TYPE } from "@/constants/projectType";
import { formatBDT } from "@/utils/formateBDT";
import { useGetFrontEndUsersQuery } from "@/redux/api/authApi";

const InvestmentSummary = ({ projectData }) => {
  const [returnTypeValue, setReturnTypeValue] = useState(0);
  const [buyShare, setBuyShare] = useState(projectData?.minimumShareValue);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [returnDurationValue, setReturnDurationValue] = useState(
    projectData?.investmentDurationYear
  );

  const [profitAmount, setProfitAmount] = useState(0);

  const [userDataId, setUserDataId] = useState("");

  const params = {
    // searchQuery: debouncedQuery,
  };
  const {
    data: allUsers,
    error,
    isLoading: allIsLoading,
  } = useGetFrontEndUsersQuery(params);

  // Get User Nominee
  const nomineeParams = {
    userId: userDataId,
  };
  const {
    data: userNominees,
    error: nomineeError,
    isLoading: nomineeIsLoading,
    refetch,
  } = useGetNomineeByUserIdQuery(nomineeParams);

  // If No Nominees found
  useEffect(() => {
    if (!userNominees?.length && !nomineeIsLoading && !nomineeError) {
      refetch();
    }
  }, [userNominees, userDataId, refetch, nomineeIsLoading, nomineeError]);

  useEffect(() => {
    let profitAmount = 0;
    const countInvestment = projectData?.perShareValue * buyShare;
    if (returnTypeValue === 0) {
      profitAmount = (countInvestment * projectData?.yearlyReturnValue) / 100;
    } else if (returnTypeValue === 1) {
      profitAmount =
        (countInvestment * projectData?.quarterlyReturnValue) / 100;
    } else {
      profitAmount = (countInvestment * projectData?.monthlyReturnValue) / 100;
    }
    if (projectData?.projectType?.name === "Co-ownership") {
      setProfitAmount(profitAmount);
    } else {
      setProfitAmount(profitAmount);
    }
    setInvestmentAmount(countInvestment);
  }, [
    buyShare,
    // projectData?.investmentDurationYear,
    returnTypeValue,
    projectData?.quarterlyReturnValue,
    projectData?.monthlyReturnValue,
    projectData?.perShareValue,
    projectData?.projectType?.name,
    projectData?.yearlyReturnValue,
  ]);
  const soldTotalShare = projectData?.investment?.totalSoldSlots || 0;
  // only For Under 1 Year Investment
  const totalProfit =
    ((projectData?.monthlyReturnValue *
      projectData?.investmentDuration?.durationValue) /
      100) *
    investmentAmount;

  return (
    <div className="p-2 text-sm md:text-base mt-3">
      <div className="grid grid-cols-12 gap-6">
        <div className="md:col-span-7 sm:col-span-12">
          <div>
            <h6 className="font-semibold leading-[26px] fw-bold text-[#068F66]">
              {projectData?.projectTitle}
            </h6>
            <h6 className="text-sm lg:text-md md:text-sm text-[#374151] mb-2">
              {projectData?.projectAddress}
            </h6>

            <div className="w-full h-[250px]">
              <Image
                src={projectData?.projectPicture?.[0]}
                width={380}
                height={250}
                className="h-full w-full object-cover object-center rounded-lg"
                alt="Project Picture"
              />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex md:flex-row sm:flex-col justify-between  ">
              <div>
                <span className="text-sm lg:text-base text-[#068F66] font-semibold">
                  Available{" "}
                  {(
                    projectData?.totalShareValue - soldTotalShare
                  ).toLocaleString()}{" "}
                  Slots
                </span>
                <div className="mt-2">
                  <span className="text-sm lg:text-base">
                    Minimum {projectData?.minimumShareValue} Slot /
                    {projectData?.perShareValue?.toLocaleString()} BDT
                  </span>
                </div>
                {/* <div className="mt-1">
                  <span className="text-sm lg:text-base">
                    Maximum {projectData?.maximumShareValue} Share
                  </span>
                </div> */}
              </div>
              <div className="flex gap-3 md:mt-0 sm:mt-3">
                <button
                  title={
                    buyShare === projectData?.minimumShareValue
                      ? `Minimum ${projectData?.minimumShareValue} Share`
                      : ""
                  }
                  className="rounded-md border border-teal-500 h-8 w-12 flex items-center justify-center bg-white hover:bg-[#068F66] hover:text-white cursor-pointer"
                  onClick={() => setBuyShare(buyShare - 1)}
                  disabled={buyShare === projectData?.minimumShareValue}
                >
                  <FaMinus />
                </button>
                <p className="rounded-md border font-bold border-teal-500 h-8 w-24 flex items-center justify-center text-center">
                  {buyShare?.toLocaleString()}
                </p>
                <button
                  title={
                    buyShare === projectData?.maximumShareValue
                      ? `Maximum ${projectData?.maximumShareValue} Share`
                      : ""
                  }
                  className="rounded-md border border-teal-500 h-8 w-12 flex items-center justify-center bg-white hover:bg-[#068F66] hover:text-white cursor-pointer"
                  onClick={() => setBuyShare(buyShare + 1)}
                  disabled={buyShare === projectData?.maximumShareValue}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          {projectData?.projectType?.name !== PROJECT_TYPE.CO_OWNERSHIP && (
            <div className="mt-2">
              <h6
                htmlFor="duration"
                className="md:text-lg sm:text-base text-primary"
              >
                Investment Duration:
                <span className="font-bold text-black">
                  {" "}
                  {projectData?.investmentDuration?.durationValue}{" "}
                  {projectData?.investmentDuration?.durationType}(s)
                </span>
              </h6>

              {projectData?.investmentDuration?.durationType ===
                DURATION_TYPE.YEAR && (
                <p className="text-sm text-black text-bold px-3 py-2 rounded bg-[#afebdd] opacity-80 md:mt-3 sm:mt-0">
                  You can Resale your Slots after 12 months
                </p>
              )}

              {/* <select
                id="duration"
                className="w-full h-11 rounded-md border mt-2 text-sm lg:text-base"
              >
                <option>{projectData?.investmentDurationYear}</option>
              </select> */}
            </div>
          )}

          {projectData?.investmentDuration?.durationType ===
            DURATION_TYPE.YEAR && (
            <div className="border border-[#bdbdbd] rounded-lg shadow-lg md:mt-2 sm:mt-6 p-4">
              <div className="">
                <h6
                  className="md:text-lg font-medium sm:text-base"
                  style={{ color: "#068F66" }}
                >
                  Profit Return Type
                </h6>

                <div className="flex flex-wrap gap-2 mt-2">
                  {returnTypes.map((type, index) => (
                    <div className="flex gap-2 items-center " key={index}>
                      <input
                        id={type}
                        type="checkbox"
                        value={type}
                        checked={returnTypeValue === index}
                        name="return-type"
                        onClick={() => setReturnTypeValue(index)}
                        className="mr-1 cursor-pointer"
                        // disabled
                      />

                      <label
                        htmlFor={type}
                        className="text-sm lg:text-base cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <h6
                  className="md:text-lg font-medium sm:text-base border-b border-[#bdbdbd] pb-1"
                  style={{ color: "#068F66" }}
                >
                  Profit Disburse
                </h6>
                <ReturnTotal
                  projectData={projectData}
                  returnTypeValue={returnTypeValue}
                  profitAmount={profitAmount}
                />
              </div>
            </div>
          )}
          {projectData?.investmentDuration?.durationType ===
            DURATION_TYPE.MONTH && (
            <div className="border border-[#bdbdbd] rounded-lg shadow-lg md:mt-2 sm:mt-6 p-4">
              <h6
                className="md:text-lg font-medium sm:text-base border-b pb-1"
                style={{ color: "#068F66" }}
              >
                Profit Disburse
              </h6>

              <p className=" text-black mt-2">
                Monthly: Upto {projectData?.monthlyReturnValue}% Profit
              </p>

              <p className=" text-black bg-[#afebdd] p-2 mt-2 rounded">
                {projectData?.investmentDuration?.durationValue} Months Total
                Profit : {formatBDT(totalProfit)} BDT (Upto)
              </p>

              <p className=" text-black mt-2 text-sm">
                You get it after{" "}
                {projectData?.investmentDuration?.durationValue} months:{" "}
                {investmentAmount} + {totalProfit} ={" "}
                {formatBDT(investmentAmount + totalProfit)} BDT
              </p>
            </div>
          )}
        </div>
        <div className="md:col-span-5 sm:col-span-12 pt-3">
          <TotalInvestment
            projectData={projectData}
            investmentAmount={investmentAmount}
            returnTypeValue={returnTypeValue}
            returnDurationValue={returnDurationValue}
            profitAmount={profitAmount}
            buyShare={buyShare}
            allUsers={allUsers}
            setUserDataId={setUserDataId}
            userDataId={userDataId}
            nominees={userNominees}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentSummary;
