import { getBaseUrl } from "@/helpers/config/envConfig";
import { useGetUserQuery } from "@/redux/api/authApi";
import { useGetCompanyBankByCompanyIdQuery } from "@/redux/api/bankApi";
import { pictureCloudKey } from "@/utils/pictureCloudKey";
import { uploadImageToImgBB } from "@/utils/uploadPhoto";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

const ProfitStatusUpdate = ({
  showStatusModal,
  setShowStatusModal,
  profitData,
  refetch,
}) => {
  const handleClose = () => setShowStatusModal(false);
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankId, setBankId] = useState("");

  const [files, setFiles] = useState("");
  // Get login user
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();

  // Get company bank accounts
  const params = {
    companyId: userData?.company?._id,
  };
  const {
    data: companyBankAccounts,
    error: bankError,
    isLoading: bankIsLoading,
  } = useGetCompanyBankByCompanyIdQuery(params);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteForProfit = e.target.noteForProfit.value;
    if (status === profitData?.status) {
      return toast.error(`Sorry Already ${profitData?.status}`);
    }

    const updatedStatus = {
      paymentStatus: status,
      noteForProfit: noteForProfit,
    };

    try {
      let proofOfPhoto;
      if (files) {
        proofOfPhoto = await uploadImageToImgBB(files[0]);
      }

      const isStatusPaidData = {
        paymentMethod: paymentMethod,
        paymentOfBankAccount: bankId ? bankId : null,
        proofOfPaidPhoto: proofOfPhoto,
        ...updatedStatus,
      };

      const { data } = await axios.patch(
        `${getBaseUrl()}/profit-count/${profitData?._id}`,
        status === "Paid" ? isStatusPaidData : updatedStatus
      );
      toast.success(data?.message);
      refetch();
      setTimeout(() => {
        handleClose();
      }, 500);
    } catch (err) {
      console.log(err);
      return toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      {showStatusModal && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h2 className="text-xl font-semibold">Profit Status Update</h2>
            <button
              className="btn btn-circle btn-sm absolute right-2 top-2"
              onClick={handleClose}
            >
              <MdClose size={15} />
            </button>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="status" className="block font-medium mb-2">
                  Select Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option>Unpaid</option>
                  <option>Processing</option>
                  <option>Paid</option>
                </select>
              </div>

              {status === "Paid" && (
                <>
                  <div>
                    <label
                      htmlFor="paymentMethod"
                      className="block font-medium mb-2"
                    >
                      Select Payment Method
                    </label>
                    <select
                      id="paymentMethod"
                      className="select select-bordered w-full"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      value={paymentMethod}
                      required
                    >
                      <option value="" disabled>
                        Select Payment Method
                      </option>
                      <option>Cash</option>
                      <option>Bank</option>
                    </select>
                  </div>
                  {/* Bank Accounts */}
                  {paymentMethod === "Bank" && (
                    <div>
                      <label className="block text-sm font-medium">
                        Which Bank Account
                      </label>
                      <div className="flex flex-col gap-2 mt-2">
                        {companyBankAccounts.map((account, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              id={account.bankName}
                              type="checkbox"
                              name="chooseBank"
                              onChange={() => setBankId(account?._id)}
                              checked={bankId === account?._id}
                              className="h-4 w-4"
                              required
                            />
                            <label
                              htmlFor={account.bankName}
                              className="text-sm"
                            >
                              {account.bankName}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="proofOfPhoto"
                      className="block font-medium mb-2"
                    >
                      Proof Photo
                    </label>
                    <input
                      type="file"
                      id="proofOfPhoto"
                      name="img"
                      onChange={(e) => setFiles(e.target.files)}
                      multiple
                      className="border w-full text-sm p-2 rounded cursor-pointer"
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="noteForProfit"
                  className="block font-medium mb-2"
                >
                  Note (Optional)
                </label>
                <input
                  type="text"
                  id="noteForProfit"
                  name="noteForProfit"
                  placeholder="note"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white btn hover:bg-green-400"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </>
  );
};

export default ProfitStatusUpdate;
