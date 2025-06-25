import { DURATION_TYPE } from "@/constants/durationType";
import { PROJECT_TYPE } from "@/constants/projectType";
import { convertHtml } from "@/utils/convertHtml";
import { formatBDT } from "@/utils/formateBDT";

const AssetValueDetails = ({ projectData, notaryFee, sharikanaFee }) => {
  return (
    <div
      className="tab-pane fade show active pt-3"
      id="nav-item2"
      role="tabpanel"
      aria-labelledby="nav-item2-tab"
    >
      <h6 className="mb-3 text-primary font-semibold ">
        {projectData?.projectType?.name === PROJECT_TYPE.INVESTMENT
          ? "Investment Details"
          : "Asset Value"}
      </h6>

      {/* <div className="grid grid-cols-3 sm:grid-cols-4 text-sm lg:text-base mb-2">
        <div className="col-span-2 sm:col-span-2">
          <span>Total Investment :</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="font-semibold mr-1">BDT</span>
            {formatBDT(projectData?.totalProjectValue)}
          </div>
        </div>
      </div>
      <hr className="opacity-8 my-1" /> */}
      <div className="grid grid-cols-3 sm:grid-cols-4 text-sm lg:text-base mb-2">
        <div className="col-span-2 sm:col-span-2">
          <span>
            {" "}
            {projectData?.projectType?.name === PROJECT_TYPE.INVESTMENT
              ? "Investment Amount"
              : "Asset price"}{" "}
            :
          </span>
        </div>
        <div>
          <div className="flex items-center">
            <span className="font-semibold mr-1">BDT</span>{" "}
            {formatBDT(projectData?.projectAssetValue)}
          </div>
        </div>
      </div>
      {projectData?.notaryFee > 0 ? (
        <>
          {" "}
          <hr className="opacity-8 my-1 " />
          <div className="grid grid-cols-3 sm:grid-cols-4 text-sm lg:text-base mb-2">
            <div className="col-span-2 sm:col-span-2">
              <span>Notary fee ({projectData?.notaryFee})% :</span>
            </div>
            <div>
              <div>
                <span className="font-semibold mr-1">BDT</span>
                {formatBDT(notaryFee)}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {projectData?.sharikanaFee > 0 ? (
        <>
          {" "}
          <hr className="opacity-8 my-1" />
          <div className="grid grid-cols-3 sm:grid-cols-4 text-sm lg:text-base mb-2">
            <div className="col-span-2 sm:col-span-2">
              <span>Sharikana fee ({projectData?.sharikanaFee})% :</span>
            </div>
            <div>
              <div>
                <span className="font-semibold mr-1">BDT</span>
                {formatBDT(sharikanaFee)}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <hr className="opacity-8 my-1" />
      <div className="grid grid-cols-3 sm:grid-cols-4 text-sm lg:text-base mb-2">
        <div className="col-span-2 sm:col-span-2">
          <span>Total Slots :</span>
        </div>
        <div>
          <div>
            {projectData?.totalShareValue?.toLocaleString() || "0"} {""}
            {/* <span className="font-semibold mr-1"> Slots</span> */}
          </div>
        </div>
      </div>
      <hr className="opacity-8 my-1" />
      <div className="grid grid-cols-3 sm:grid-cols-4 text-sm lg:text-base mb-2">
        <div className="col-span-2 sm:col-span-2">
          <span>Per Slot :</span>
        </div>
        <div>
          <div>
            BDT {formatBDT(projectData?.perShareValue) || "0"}
            {/* <span className="font-semibold mr-1"> Slots</span> */}
          </div>
        </div>
      </div>

      <hr className="opacity-8 my-4" />
      <h6 className="mb-3 text-primary font-semibold">Return Details</h6>

      {projectData?.yearlyReturnValue > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2 border-b py-1">
          <div className="col-span-3">
            <span>
              Annual Return :{" "}
              {projectData?.yearlyReturnValue +
                projectData?.projectAnnualCapitalAppreciation || 0}
              %
            </span>
          </div>
        </div>
      )}

      {projectData?.projectType?.name === PROJECT_TYPE.INVESTMENT &&
      projectData?.quarterlyReturnValue > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2 border-b py-1">
          <div className="col-span-3">
            <span>Quarterly Return : {projectData?.quarterlyReturnValue}%</span>
          </div>
        </div>
      ) : (
        <div>
          {projectData?.projectType?.name === PROJECT_TYPE.CO_OWNERSHIP ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2 border-b py-1">
              <div className="col-span-3">
                <span>
                  Project Annual Rental Yield : {projectData?.yearlyReturnValue}
                  %
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      {projectData?.projectType?.name === PROJECT_TYPE.INVESTMENT &&
      projectData?.monthlyReturnValue > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2 border-b py-1">
          <div className="col-span-3">
            <span>
              Monthly Return : Upto {projectData?.monthlyReturnValue}%
            </span>
          </div>
        </div>
      ) : (
        <div>
          {projectData?.projectType?.name === PROJECT_TYPE.CO_OWNERSHIP ? (
            <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2 border-b py-1">
              <div className="col-span-3">
                <span>
                  Project Annual Capital Appreciation :{" "}
                  {projectData?.projectAnnualCapitalAppreciation}%
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {projectData?.investmentDuration?.durationType ===
        DURATION_TYPE.MONTH && (
        <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2 border-b py-1">
          <div className="col-span-3">
            <span className="font-bold">
              After {projectData?.investmentDuration?.durationValue} Month Total
              Profit : Upto{" "}
              {projectData?.monthlyReturnValue *
                projectData?.investmentDuration?.durationValue}
              %
            </span>
          </div>
        </div>
      )}

      <h6 className="mb-3 text-primary font-semibold">Exit Strategy</h6>

      <div className="grid grid-cols-3 sm:grid-cols-3 text-sm lg:text-base mb-2">
        <div
          className="col-span-3 text-black projectData"
          dangerouslySetInnerHTML={{
            __html: convertHtml(projectData?.exitStrategy),
          }}
        ></div>
      </div>
    </div>
  );
};

export default AssetValueDetails;
