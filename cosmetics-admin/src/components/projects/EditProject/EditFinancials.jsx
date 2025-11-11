import { DURATION_TYPE } from "@/constants/durationType";
import { PROJECT_TYPE } from "@/constants/projectType";

const EditFinancials = ({
  project,
  perShareValueDisplay,
  perShareValue,
  projectValue,
  totalShared,
  handleAssetValue,
  displayAssetValue,
  handleNotaryFeeValue,
  displayNotaryFee,
  handleSharikanaFee,
  displaySharikanaFee,
  // handlePerSharedValue,
  handleTotalShared,
  totalSharedValueDisplay,
  handleNextClick,
  handleInputChange,
  formData,
  setInvestmentDurationType,
  investmentDurationType,
  setInvestmentDurationValue,
  investmentDurationValue,
}) => {
  return (
    <div className="p-4 shadow-12">
      <div className="space-y-8">
        {/* Asset Value Section */}
        <div>
          <h4 className="mb-8 text-xl font-bold">
            {" "}
            {project?.projectType?.name === PROJECT_TYPE.INVESTMENT
              ? "Investment Details"
              : "Asset Value"}{" "}
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Project Asset Value */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                {project?.projectType?.name === PROJECT_TYPE.INVESTMENT
                  ? "Investment Amount"
                  : "Project Asset Value"}{" "}
                :
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder={
                  project?.projectType?.name === PROJECT_TYPE.INVESTMENT
                    ? "Investment Amount"
                    : "Project Asset Value"
                }
                name="projectAssetValue"
                value={displayAssetValue}
                onChange={handleAssetValue}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>

            {/* Notary Fee */}
            <div className="relative mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Notary fee (%) :
              </label>
              <input
                type="number"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Notary fee %"
                name="notaryFee"
                value={displayNotaryFee}
                onChange={handleNotaryFeeValue}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                onWheel={(e) => e.target.blur()}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
              {displayNotaryFee?.length > 0 && (
                <p
                  className="text-gray-500 absolute right-2 top-13 -translate-y-1/2 transform"
                  style={{
                    left: `${displayNotaryFee.length * 10 + 25}px`,
                  }}
                >
                  %
                </p>
              )}
            </div>

            {/* Sharikana Fee */}
            <div className="relative mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Sharikana fee (%) :
              </label>
              <input
                type="number"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Sharikana Fee %"
                name="sharikanaFee"
                value={displaySharikanaFee}
                onChange={handleSharikanaFee}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                onWheel={(e) => e.target.blur()}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
              {displaySharikanaFee?.length > 0 && (
                <p
                  className="text-gray-500 absolute right-2 top-13 -translate-y-1/2 transform"
                  style={{
                    left: `${displaySharikanaFee.length * 10 + 25}px`,
                  }}
                >
                  %
                </p>
              )}
            </div>

            {/* Total Project Value */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                {project?.projectType?.name === PROJECT_TYPE.INVESTMENT
                  ? "Total Investment Amount"
                  : "Total Project Value"}{" "}
                :
              </label>
              <p
                className="border-gray-300 bg-gray-100 text-gray-700 w-full rounded-md border ps-2"
                style={{
                  height: "50px",
                  lineHeight: "50px",
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
              >
                {projectValue?.toLocaleString()}
              </p>
            </div>

            {/* Per Share Value */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Total Shared Count:
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Per Share Value"
                name="perShareValue"
                value={totalSharedValueDisplay}
                onChange={handleTotalShared}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Per Share Value :
              </label>
              <p
                className="border-gray-300 bg-gray-100 text-gray-700 w-full rounded-md border ps-2"
                style={{
                  height: "50px",
                  lineHeight: "50px",
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
              >
                {Number.isFinite(perShareValue)
                  ? perShareValue?.toLocaleString()
                  : 0}
              </p>
            </div>

            {/* Minimum Share */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Minimum Share :
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Minimum Investment Share Value"
                name="minimumShareValue"
                value={formData.minimumShareValue}
                onChange={handleInputChange}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>
            {/* Maximum Share */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Maximum Slot(s) :
              </label>
              <input
                type="text"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Minimum Investment Share Value"
                name="maximumShareValue"
                value={formData.maximumShareValue}
                onChange={handleInputChange}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>

            {/* Total Shared Count */}
            {/* <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Total Shared Count:
              </label>
              <p
                className="border-gray-300 bg-gray-100 text-gray-700 w-full rounded-md border ps-2"
                style={{
                  height: "50px",
                  lineHeight: "50px",
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
              >
                {Number.isFinite(totalShared)
                  ? totalShared?.toLocaleString()
                  : 0}
              </p>
            </div> */}

            {project?.projectType?.name === PROJECT_TYPE.INVESTMENT ? (
              <>
                <div className="mb-4">
                  <label className="text-gray-700 mb-2 block font-semibold">
                    Investment Duration:
                  </label>
                  <input
                    type="number"
                    className="border-gray-300 w-full rounded-md border p-2"
                    placeholder="Investment Duration"
                    defaultValue={investmentDurationValue}
                    onChange={(e) =>
                      setInvestmentDurationValue(Number(e.target.value))
                    }
                    style={{
                      borderColor: "#dddddd",
                      outlineColor: "#00c196",
                      outlineWidth: "2px",
                    }}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                {investmentDurationValue > 0 && (
                  <div className="mb-4">
                    <label className="text-gray-700 mb-2 block font-semibold">
                      Duration Type:
                    </label>

                    <select
                      className="border-gray-300 w-full rounded-md border p-2"
                      onChange={(e) =>
                        setInvestmentDurationType(e.target.value)
                      }
                      defaultValue={investmentDurationType}
                    >
                      <option value={""} disabled>
                        Select Duration Type
                      </option>
                      <option>{DURATION_TYPE.MONTH}</option>
                      <option>{DURATION_TYPE.YEAR}</option>
                    </select>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Return Section */}
        <div>
          <h4 className="mb-8 text-xl font-bold">Return</h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Annual Return Value */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Annual Return Value:
              </label>
              <input
                type="number"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Annual return Value"
                name="yearlyReturnValue"
                value={formData.yearlyReturnValue}
                onChange={handleInputChange}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                onWheel={(e) => e.target.blur()}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>

            {/* Quarterly Return Value */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Quarterly Return Value:
              </label>
              <input
                type="number"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Quarterly Return Value"
                name="quarterlyReturnValue"
                value={formData.quarterlyReturnValue}
                onChange={handleInputChange}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                onWheel={(e) => e.target.blur()}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>

            {/* Monthly Return Value */}
            <div className="mb-4">
              <label className="text-gray-700 mb-2 block font-semibold">
                Monthly Return Value:
              </label>
              <input
                type="number"
                className="border-gray-300 w-full rounded-md border p-2"
                placeholder="Monthly Return Value"
                name="monthlyReturnValue"
                value={formData.monthlyReturnValue}
                onChange={handleInputChange}
                style={{
                  borderColor: "#dddddd",
                  outlineColor: "#00c196",
                  outlineWidth: "2px",
                }}
                onWheel={(e) => e.target.blur()}
                disabled={project?.investment?.totalSoldSlots > 0}
              />
            </div>

            {/* Project Annual Capital Appreciation */}
            {project?.projectType?.name === "Investment" ? (
              ""
            ) : (
              <div className="mb-4">
                <label className="text-gray-700 mb-2 block font-semibold">
                  Project annual capital appreciation:
                </label>
                <input
                  type="number"
                  className="border-gray-300 w-full rounded-md border p-2"
                  placeholder="Project annual capital appreciation"
                  name="projectAnnualCapitalAppreciation"
                  value={formData.projectAnnualCapitalAppreciation}
                  onChange={handleInputChange}
                  style={{
                    borderColor: "#dddddd",
                    outlineColor: "#00c196",
                    outlineWidth: "2px",
                  }}
                  onWheel={(e) => e.target.blur()}
                  disabled={project?.investment?.totalSoldSlots > 0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end" onClick={handleNextClick}>
        <p
          style={{
            backgroundColor: "#006666",
            color: "white",
            padding: "10px 20px",
            marginRight: "30px",
            borderRadius: "5px",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default EditFinancials;
