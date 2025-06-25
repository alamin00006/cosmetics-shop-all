import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { months } from "@/utils/months";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { USER_ROLE } from "@/constants/role";
import { MdClose } from "react-icons/md";
import { PROJECT_TYPE } from "@/constants/projectType";
import { RETURN_TYPE_ENUM } from "@/constants/returnTypeEnum";

const ProfitSubmitModal = ({
  showReturnModal,
  setShowReturnModal,
  project,
  profitShareType,
  userData,
}) => {
  const handleCloseModal = () => setShowReturnModal(false);
  const fromDate = useRef(null);
  const toDate = useRef(null);
  const [returnType, setReturnType] = useState(profitShareType);
  const [percentageOfProfit, setPercentageOfProfit] = useState(0);
  const [totalProfitCount, setTotalProfitCount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("");

  // Project Type
  const projectType = project?.projectTypeDetails?.[0]?.name;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const noteForReturn = e.target.noteForReturn?.value;
    const fromReturnCountDate = e.target.fromReturnCountDate?.value;
    const toReturnCountDate = e.target.toReturnCountDate?.value;

    const returnsData = {
      project: project?._id,
      projectType: projectType,
      manageUserId:
        userData?.role === USER_ROLE.COMPANY ? null : userData?.PRManager?._id,
      percentageOfProfit,
      forMURABAHATotalProfit: totalProfitCount,

      returnType: profitShareType,
      returnDate: new Date(),
      returnMonths: selectedMonth,
      fromReturnCountDate: fromReturnCountDate,
      toReturnCountDate: toReturnCountDate,
      returnYear: year,
      noteForReturn,
    };

    try {
      const { data } = await axios.post(`${getBaseUrl()}/return`, returnsData);
      toast.success(data?.message);
      setTimeout(() => {
        handleCloseModal();
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showReturnModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                Income Submit -
                <span>
                  {" "}
                  ( Project Type : <b className="text-primary">{projectType}</b>
                  )
                </span>
              </h3>
              <button
                onClick={handleCloseModal}
                className="btn btn-circle btn-sm"
              >
                <MdClose size={15} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="form-control">
                <label htmlFor="returnType" className="block font-medium mb-2">
                  Return Type
                </label>
                <select
                  id="returnType"
                  value={returnType}
                  onChange={(e) => setReturnType(e.target.value)}
                  className="select select-bordered mt-1 w-full"
                  required
                >
                  <option>{profitShareType}</option>
                </select>
              </div>

              {profitShareType === RETURN_TYPE_ENUM.MONTHLY && (
                <div className="form-control">
                  <label
                    htmlFor="selectedMonth"
                    className="block font-medium mb-2"
                  >
                    Month
                  </label>
                  <select
                    id="selectedMonth"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="select select-bordered mt-1 w-full"
                    required
                  >
                    <option value="" disabled>
                      Select a month
                    </option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {profitShareType !== RETURN_TYPE_ENUM.MONTHLY && (
                <>
                  <div className="form-control">
                    <label
                      htmlFor="fromDate"
                      className="block font-medium mb-2"
                    >
                      From Date
                    </label>
                    <input
                      id="fromDate"
                      type="date"
                      ref={fromDate}
                      name="fromReturnCountDate"
                      placeholder="Profit Percentage"
                      className="input input-bordered mt-1 w-full"
                      required
                      onClick={() => fromDate.current?.showPicker()}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="toDate" className="block font-medium mb-2">
                      To Date
                    </label>
                    <input
                      id="toDate"
                      type="date"
                      ref={toDate}
                      name="toReturnCountDate"
                      className="input input-bordered mt-1 w-full"
                      required
                      onClick={() => toDate.current?.showPicker()}
                    />
                  </div>
                </>
              )}

              <div className="form-control">
                <label
                  htmlFor="selectedYear"
                  className="block font-medium mb-2"
                >
                  Year
                </label>
                <select
                  id="selectedYear"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="select select-bordered mt-1 w-full"
                  required
                >
                  <option value="" disabled>
                    Select a Year
                  </option>

                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
              </div>

              {projectType === PROJECT_TYPE.MURABAHA ? (
                <>
                  <div className="form-control">
                    <label
                      htmlFor="MURABAHAProfit"
                      className="block font-medium mb-2"
                    >
                      Profit Amount <b>(For MURABAHA)</b>
                    </label>
                    <input
                      id="MURABAHAProfit"
                      type="number"
                      onChange={(e) => setTotalProfitCount(e.target.value)}
                      placeholder="Profit Amount (For MURABAHA)"
                      className="input input-bordered mt-1 w-full"
                      onWheel={(e) => e.target.blur()}
                      required
                    />
                  </div>
                </>
              ) : (
                <div className="form-control">
                  <label
                    htmlFor="percentageOfProfit"
                    className="block font-medium mb-2"
                  >
                    Profit Ratio (Input as a percentage value)
                    {/* {project?.monthlyReturnValue}% */}
                  </label>
                  <input
                    id="percentageOfProfit"
                    type="number"
                    value={percentageOfProfit}
                    onChange={(e) => setPercentageOfProfit(e.target.value)}
                    placeholder="Profit Percentage"
                    className="input input-bordered mt-1 w-full"
                    onWheel={(e) => e.target.blur()}
                    required
                  />
                </div>
              )}

              <div className="form-control">
                <label
                  htmlFor="noteForReturn"
                  className="block font-medium mb-2"
                >
                  Note (Optional)
                </label>
                <input
                  id="noteForReturn"
                  type="text"
                  placeholder="Note"
                  className="input input-bordered mt-1 h-16 w-full"
                  name="noteForReturn"
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfitSubmitModal;
