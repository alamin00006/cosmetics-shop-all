import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import PersonalData from "./PersonalData";
import NomineeData from "./NomineeData";
import BankInformation from "./BankInformation";

import axios from "axios";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { authKey } from "@/constants/storageKey";
import { isValidPhoto } from "@/utils/isValidPhoto";
import { checkFileSize } from "@/utils/checkFileSize";
import { compressImage } from "@/utils/compressImage";
import { getFromLocalStorage } from "@/utils/local-storage";
import { useGetBankAccountByUserIdQuery } from "@/redux/api/bankApi";
import { useGetNomineeByUserIdQuery } from "@/redux/api/nomineeApi";
import { useGetFrontEndSingleUserQuery } from "@/redux/api/authApi";
import { decrypt } from "@/utils/decrypt";
import ToasterMessage from "../shared/ToasterMessage";
import LoadingState from "../LoadingState/LoadingState";

const steps = [
  { id: 1, title: "Personal Info", percent: 50 },
  { id: 2, title: "Nominee Info", percent: 75 },
  { id: 3, title: "Bank Info", percent: 100 },
];

const UpdateUser = ({ params }) => {
  // Get Front End User
  const [userData, setEncryptUserData] = useState([]);
  const userId = params?.id;

  const { data, error, isLoading } = useGetFrontEndSingleUserQuery({ userId });

  useEffect(() => {
    if (data?.content && data?.iv) {
      const decrypted = decrypt(data?.content, data?.iv);
      setEncryptUserData(decrypted);
    }
  }, [data?.content, data?.iv]);

  console.log(userData);
  // Get User Bank Account
  const bankParams = {
    userId: userId,
  };
  const {
    data: userBankAccounts,
    error: bankError,
    isLoading: bankIsLoading,
  } = useGetBankAccountByUserIdQuery(bankParams);

  const bankAccount = userBankAccounts?.[0];

  // Get User Nominee
  const nomineeParams = {
    userId: userId,
  };
  const {
    data: userNominees,
    error: nomineeError,
    isLoading: nomineeIsLoading,
    refetch,
  } = useGetNomineeByUserIdQuery(nomineeParams);

  const nominee = userNominees?.[0];

  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const birthDayRef = useRef(null);
  const nomineeBirthDayRef = useRef(null);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [nidOrPassportPhoto1, setNidOrPassportPhoto1] = useState("");
  const [nidOrPassportPhoto2, setNidOrPassportPhoto2] = useState("");
  const [nomineeNidOrPassportPhoto1, setNomineeNidOrPassportPhoto1] =
    useState("");
  const [nomineeNidOrPassportPhoto2, setNomineeNidOrPassportPhoto2] =
    useState("");

  const [userPhoto, setUserPhoto] = useState("");
  const [nomineePhoto, setNomineePhoto] = useState("");

  const [userDataState, setUserData] = useState({
    fathersName: "",
    mothersName: "",
    birthDate: "",
    nidOrPassportNo: "",
    nomineeFullName: "",
    nomineeRelation: "",
    nomineeFathersName: "",
    nomineeMothersName: "",
    nomineeBirthDate: "",
    nomineeNidOrPassportNo: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    branchName: "",
  });

  useEffect(() => {
    if (userData) {
      setUserData((prev) => ({
        ...prev,
        fathersName: userData?.personalDetails?.fathersName || "",
        mothersName: userData?.personalDetails?.mothersName || "",
        birthDate: userData?.personalDetails?.birthDate || "",
        nidOrPassportNo: userData?.personalDetails?.nidOrPassportNo || "",
        nomineeFullName: nominee?.nomineeFullName || "",
        nomineeRelation: nominee?.nomineeRelation || "",
        nomineeFathersName: nominee?.nomineeFathersName || "",
        nomineeMothersName: nominee?.nomineeMothersName || "",
        nomineeBirthDate: nominee?.nomineeBirthDate || "",
        nomineeNidOrPassportNo: nominee?.nomineeNidOrPassportNo || "",
        addressLine1: userData?.address?.addressLine1 || "",
        addressLine2: userData?.address?.addressLine2 || "",
        city: userData?.address?.city || "",
        state: userData?.address?.state || "",
        zipCode: userData?.address?.zipCode || "",
        bankName: bankAccount?.bankName || "",
        accountHolderName: bankAccount?.accountHolderName || "",
        accountNumber: bankAccount?.accountNumber || "",
        branchName: bankAccount?.branchName || "",
      }));
    }
  }, [userData, bankAccount, nominee]);

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files[0];
    // Image extension check
    if (!isValidPhoto(file)) {
      toast.error("picture is not valid");
      return null;
    }
    if (file && checkFileSize(file)) {
      setter(e.target.files);
    } else {
      e.target.value = "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextClick = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    // if (
    //   userData?.isUploadNomineeInfo === true ||
    //   userData?.isUploadBankInfo === true
    // ) {
    //   return toast.error("Sorry! You have already updated your data.");
    // }

    try {
      if (
        !userDataState.fathersName ||
        !userDataState.mothersName ||
        !userDataState.birthDate ||
        !userDataState.nidOrPassportNo ||
        !userDataState.nomineeFullName ||
        !userDataState.nomineeRelation ||
        !userDataState.nomineeFathersName ||
        !userDataState.nomineeMothersName ||
        !userDataState.nomineeBirthDate ||
        !userDataState.nomineeNidOrPassportNo ||
        !userDataState.addressLine1 ||
        !userDataState.city ||
        !userDataState.state ||
        !userDataState.zipCode ||
        !userDataState.bankName ||
        !userDataState.accountHolderName ||
        !userDataState.accountNumber ||
        !userDataState.branchName
      ) {
        return toast.error("Please fill in all required fields.");
      }

      setIsLoadingState(true);

      if (nidOrPassportPhoto1) {
        // Compress Image
        const compressedFile = await compressImage(
          nidOrPassportPhoto1[0],
          "user-nid",
          {
            maxSizeMB: 0.1,
            // maxSizeMB: 0.5,
            maxWidthOrHeight: 1280,
          }
        );

        formData.append("nidOrPassportPhoto", compressedFile);
      }
      if (nidOrPassportPhoto2) {
        // Compress Image
        const compressedFile = await compressImage(nidOrPassportPhoto2[0], {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1280,
        });

        formData.append("nidOrPassportBackSidePhoto", compressedFile);
      }
      if (userPhoto) {
        const compressedFile = await compressImage(userPhoto[0], {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1280,
        });

        formData.append("userPhoto", compressedFile);
      }

      if (nomineeNidOrPassportPhoto1) {
        const compressedFile = await compressImage(
          nomineeNidOrPassportPhoto1[0],
          {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1280,
          }
        );

        formData.append("nomineeNidOrPassportPhoto", compressedFile);
      }
      if (nomineeNidOrPassportPhoto2) {
        const compressedFile = await compressImage(
          nomineeNidOrPassportPhoto2[0],
          {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1280,
          }
        );

        formData.append("nomineeNidOrPassportBackSidePhoto", compressedFile);
      }
      if (nomineePhoto) {
        const compressedFile = await compressImage(nomineePhoto[0], {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1280,
        });

        formData.append("nomineePhoto", compressedFile);
      }
      formData.append(
        "personalDetails",
        JSON.stringify({
          fathersName: userDataState.fathersName,
          mothersName: userDataState.mothersName,
          birthDate: userDataState.birthDate,
          nidOrPassportNo: userDataState.nidOrPassportNo,
        })
      );
      formData.append(
        "nomineeDetails",
        JSON.stringify({
          nomineeFullName: userDataState.nomineeFullName,
          nomineeRelation: userDataState.nomineeRelation,
          nomineeFathersName: userDataState.nomineeFathersName,
          nomineeMothersName: userDataState.nomineeMothersName,
          nomineeBirthDate: userDataState.nomineeBirthDate,
          nomineeNidOrPassportNo: userDataState.nomineeNidOrPassportNo,
        })
      );
      formData.append(
        "address",
        JSON.stringify({
          addressLine1: userDataState.addressLine1,
          addressLine2: userDataState.addressLine2 || "",
          city: userDataState.city,
          state: userDataState.state,
          zipCode: userDataState.zipCode,
        })
      );
      formData.append(
        "bankInformation",
        JSON.stringify({
          bankName: userDataState.bankName,
          accountHolderName: userDataState.accountHolderName,
          accountNumber: userDataState.accountNumber,
          branchName: userDataState.branchName,
        })
      );
      // formData.append(
      //   "isUploadNomineeInfo",
      //   userNominees?.length > 0 ? true : false
      // );
      // formData.append(
      //   "isUploadBankInfo",
      //   userBankAccounts?.length > 0 ? true : false
      // );
      formData.append("nomineeId", nominee?._id);
      formData.append("bankId", bankAccount?._id);
      formData.append("profileComplete", 100);
      formData.append("isPreviousUser", false);

      // Get the access token
      const accessToken = getFromLocalStorage(authKey);
      // Set the headers
      const headers = {
        Authorization: `${accessToken}`,
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
      };

      // Update user data
      const response = await axios.patch(
        `${getBaseUrl()}/users/${userId}`,
        formData,
        {
          headers,
        }
      );

      if (response.status === 400) {
        toast.error(response.data.error);
      } else {
        toast.success("updated successfully!");
        refetch();
        // e.target.reset();
        router.back();
      }
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || "An error occurred!");
      setIsLoadingState(false);
    } finally {
      setIsLoadingState(false);
    }
  };

  const progressWidth = `${Math.max(
    ((currentStep - 1) / (steps.length - 1)) * 100,
    20
  )}%`;

  return (
    <div className="container mx-auto p-4">
      {/* Loading State */}
      {isLoadingState && <LoadingState isLoadingState={isLoadingState} />}
      {/* Progress Bar */}

      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center w-full">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold z-10
                ${
                  index + 1 <= currentStep
                    ? "bg-primary"
                    : "bg-slate-300 text-slate-300"
                }`}
            >
              {index + 1}
            </div>
            <span
              className={`text-sm mt-2 ${
                index + 1 === currentStep ? "text-primary font-medium" : ""
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
        <div className="absolute top-3 w-full h-1 bg-slate-300">
          <div
            className="h-1 bg-primary"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mt-6">
        {currentStep === 1 && (
          <PersonalData
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            userDataState={userDataState}
            // images={images}
            birthDayRef={birthDayRef}
            userData={userData}
            nidOrPassportPhoto1={nidOrPassportPhoto1}
            setNidOrPassportPhoto1={setNidOrPassportPhoto1}
            nidOrPassportPhoto2={nidOrPassportPhoto2}
            setNidOrPassportPhoto2={setNidOrPassportPhoto2}
            userPhoto={userPhoto}
            setUserPhoto={setUserPhoto}
          />
        )}
        {currentStep === 2 && (
          <NomineeData
            handleFileChange={handleFileChange}
            handleInputChange={handleInputChange}
            userDataState={userDataState}
            nomineeBirthDayRef={nomineeBirthDayRef}
            userData={userData}
            setNomineeNidOrPassportPhoto1={setNomineeNidOrPassportPhoto1}
            nomineeNidOrPassportPhoto1={nomineeNidOrPassportPhoto1}
            setNomineeNidOrPassportPhoto2={setNomineeNidOrPassportPhoto2}
            nomineeNidOrPassportPhoto2={nomineeNidOrPassportPhoto2}
            setNomineePhoto={setNomineePhoto}
            nomineePhoto={nomineePhoto}
          />
        )}
        {currentStep === 3 && (
          <BankInformation
            handleInputChange={handleInputChange}
            userDataState={userDataState}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handlePreviousClick}
          disabled={currentStep === 1}
          className={`px-4 py-2 bg-slate-300 text-slate-700 rounded-lg ${
            currentStep === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-400"
          }`}
        >
          Previous
        </button>
        {currentStep < steps.length ? (
          <button
            onClick={handleNextClick}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
      <ToasterMessage />
    </div>
  );
};

export default UpdateUser;
