"use client";
import { formatBDT } from "@/utils/formateBDT";
import React from "react";

const ReturnTotal = ({ projectData, returnTypeValue, profitAmount }) => {
  return (
    <div className="flex flex-col ">
      {/* Header Row */}
      <div className="flex border-b border-[#bdbdbd] mb-2 text-sm lg:text-base">
        <div className="flex-1 py-2 px-2 text-gray-700 text-sm lg:text-base">
          Return Type
        </div>
        <div className="flex-1 py-2 px-2 text-gray-700 text-sm lg:text-base">
          ROI
        </div>
        <div className="flex-1 py-2 px-2 text-gray-700 text-sm lg:text-base">
          Profit ({" "}
          {returnTypeValue === 0
            ? "Yearly"
            : returnTypeValue === 1
            ? "Quarterly"
            : "Monthly"}
          )
        </div>
      </div>

      {/* Data Row */}
      <div className="flex border-b border-[#bdbdbd] mb-2 text-sm lg:text-base">
        <div className="flex-1 py-2 px-2 text-gray-700 text-sm lg:text-base">
          <span>
            {returnTypeValue === 0
              ? "Yearly"
              : returnTypeValue === 1
              ? "Quarterly"
              : "Monthly"}
          </span>
        </div>
        <div className="flex-1 py-2 px-2 text-gray-700 text-sm lg:text-base">
          Upto{" "}
          <span>
            {returnTypeValue === 0
              ? projectData?.yearlyReturnValue
              : returnTypeValue === 1
              ? projectData?.quarterlyReturnValue
              : projectData?.monthlyReturnValue}
            %
          </span>
        </div>
        <div className="flex-1 py-2 px-2 text-gray-700 text-sm lg:text-base">
          <span>BDT {formatBDT(profitAmount)}</span>
        </div>
      </div>
    </div>
  );
};

export default ReturnTotal;
