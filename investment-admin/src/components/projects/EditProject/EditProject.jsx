"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";

import { useGetUserQuery } from "@/redux/api/authApi";
import { getBaseUrl } from "@/helpers/config/envConfig";
import EditProjectInfo from "./EditProjectInfo";
import EditFinancials from "./EditFinancials";
import EditTimeline from "./EditTimeline";
import EditUploadMedia from "./EditUploadMedia";
import { useGetProjectsByIdQuery } from "@/redux/api/productsApi";
import { multipleImageUpload } from "@/utils/multipleImageUpload";
import LoadingState from "@/components/LoadingState/LoadingState";
import { decrypt } from "@/utils/decrypt";

const EditProject = ({ params }) => {
  const tabs = [
    "1. Basic Info",
    "2. Financials",
    "3. Timeline",
    "4. Documents",
  ];
  const [project, setEncryptProject] = useState([]);

  const {
    data,
    error: projectGetError,
    isLoading,
  } = useGetProjectsByIdQuery(params.id);

  useEffect(() => {
    if (data?.content && data?.iv) {
      const decrypted = decrypt(data?.content, data?.iv);
      // setUserData(decrypted);
      setEncryptProject(decrypted);
    }
  }, [data?.content, data?.iv]);

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useGetUserQuery();
  const [projectType, setProjectType] = useState("");
  const [aboutProject, setAboutProject] = useState("");
  const [exitStrategy, setExitStrategy] = useState("");

  // Documents
  const [files, setFiles] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [timeLines, setTimelines] = useState([]);
  const [driveLinks, setDriveLinks] = useState([]);
  const [investmentStartDate, setInvestmentStartDate] = useState("");
  const [investmentEndDate, setInvestmentEndDate] = useState("");
  const [firstReturnDate, setFirstReturnDate] = useState("");

  // Financials Section

  // Asset Value
  const [assetValue, setAssetValue] = useState(0);
  const [displayAssetValue, setDisplayAssetValue] = useState("");

  const [projectValue, setProjectValue] = useState(null);
  const [notaryFee, setNotaryFee] = useState(0);
  const [displayNotaryFee, setDisplayNotaryFee] = useState("");
  const [sharikanaFee, setSharikanaFee] = useState(0);
  const [displaySharikanaFee, setDisplaySharikanaFee] = useState("");

  // Per Share Value
  const [perShareValue, setPerShareValue] = useState(0);
  // const [perShareValueDisplay, setPerShareValueDisplay] = useState("");
  const [totalSharedValueDisplay, setTotalSharedValueDisplay] = useState("");
  const [totalShared, setTotalShared] = useState(0);
  const [isUploadLoading, setIsUploading] = useState(false);
  const [investmentDurationValue, setInvestmentDurationValue] = useState(0);
  const [investmentDurationType, setInvestmentDurationType] = useState("");

  const [formData, setFormData] = useState({
    projectTitle: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    aboutProject: "",
    exitStrategy: "",
    youtubeVideoLink: "",
    googleMapLink: "",
    minimumShareValue: "",
    maximumShareValue: "",
    yearlyReturnValue: "",
    quarterlyReturnValue: "",
    monthlyReturnValue: "",
    investmentDurationYear: "",
    projectAnnualCapitalAppreciation: "",
  });

  // Set Default Values from Project
  useEffect(() => {
    if (project?.projectAssetValue) {
      setAssetValue(project?.projectAssetValue);
      setDisplayAssetValue(project?.projectAssetValue?.toLocaleString());
    }
    if (project?.notaryFee) {
      setNotaryFee(project?.notaryFee);
      setDisplaySharikanaFee(project?.notaryFee?.toLocaleString());
    }
    if (project?.sharikanaFee) {
      setSharikanaFee(project?.sharikanaFee);
      setDisplaySharikanaFee(project?.sharikanaFee?.toLocaleString());
    }
    if (project?.perShareValue) {
      setPerShareValue(project?.perShareValue);
      // setPerShareValueDisplay(project?.perShareValue?.toLocaleString());
    }
    if (project?.totalShareValue) {
      setTotalShared(project?.totalShareValue);
      setTotalSharedValueDisplay(project?.totalShareValue?.toLocaleString());
    }
    if (project?.timelines) {
      setTimelines([...project?.timelines]);
    }
    if (project?.googleDriveLinks) {
      setDriveLinks([...project?.googleDriveLinks]);
    }
    if (project?.investmentStartDate) {
      setInvestmentStartDate(new Date(project?.investmentStartDate));
    }
    if (project?.investmentEndDate) {
      setInvestmentEndDate(new Date(project?.investmentEndDate));
    }
    if (project?.firstReturnDate) {
      setFirstReturnDate(new Date(project?.firstReturnDate));
    }
    if (project?.aboutProject) {
      setAboutProject(project?.aboutProject);
    }
    if (project?.exitStrategy) {
      setExitStrategy(project?.exitStrategy);
    }
    if (project?.investmentDuration?.durationValue) {
      setInvestmentDurationValue(project?.investmentDuration?.durationValue);
    }
    if (project?.investmentDuration?.durationType) {
      setInvestmentDurationType(project?.investmentDuration?.durationType);
    }
  }, [project]);

  // Set Default Value
  useEffect(() => {
    if (project) {
      setFormData((prevData) => ({
        ...prevData,
        projectTitle: project?.projectTitle || "",

        streetAddress: project?.streetAddress || "",
        city: project?.city || "",
        zipCode: project?.zipCode || "",

        // aboutProject: project?.aboutProject || "",
        // managementInfo: project?.managementInfo || "",
        // exitStrategy: project?.exitStrategy || "",
        youtubeVideoLink: project?.youtubeVideoLink || "",
        googleMapLink: project?.googleMapLink || "",
        minimumShareValue: project?.minimumShareValue || "",
        maximumShareValue: project?.maximumShareValue || "",
        yearlyReturnValue: project?.yearlyReturnValue || "",
        quarterlyReturnValue: project?.quarterlyReturnValue || "",
        monthlyReturnValue: project?.monthlyReturnValue || "",
        // investmentDurationYear: project?.investmentDurationYear || "",
        projectAnnualCapitalAppreciation:
          project?.projectAnnualCapitalAppreciation || "",
      }));
    }
  }, [project]);

  // Handle Asset Value show Display
  const handleAssetValue = (e) => {
    let inputValue = e.target.value.replace(/,/g, "");
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setAssetValue(0);
      setDisplayAssetValue("");
    } else {
      const numericValue = Number(inputValue);
      setAssetValue(numericValue);
      setDisplayAssetValue(numericValue.toLocaleString());
    }
  };

  // Handle Notary Fee Value show Display
  const handleNotaryFeeValue = (e) => {
    let inputValue = e.target.value;

    if (inputValue === "" || isNaN(Number(inputValue))) {
      setNotaryFee("");
      setDisplayNotaryFee("");
    } else {
      let numericValue = Number(inputValue);
      setNotaryFee(numericValue);
      setDisplayNotaryFee(`${numericValue}`);
    }
  };

  // Handle Sharikana Fee Value show Display
  const handleSharikanaFee = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setSharikanaFee("");
      setDisplaySharikanaFee("");
    } else {
      let numericValue = Number(inputValue);
      setSharikanaFee(numericValue);
      setDisplaySharikanaFee(`${numericValue}`);
    }
  };

  // const handlePerSharedValue = (e) => {
  //   let inputValue = e.target.value.replace(/,/g, "");
  //   if (inputValue === "" || isNaN(Number(inputValue))) {
  //     setPerShareValue(0);
  //     setPerShareValueDisplay("");
  //   } else {
  //     const numericValue = Number(inputValue);
  //     setPerShareValue(numericValue);
  //     setPerShareValueDisplay(numericValue.toLocaleString());
  //   }
  // };
  // Handle Total Shared
  const handleTotalShared = (e) => {
    let inputValue = e.target.value.replace(/,/g, "");
    if (inputValue === "" || isNaN(Number(inputValue))) {
      setTotalShared(0);
      setTotalSharedValueDisplay("");
    } else {
      const numericValue = Number(inputValue);
      setTotalShared(numericValue);
      setTotalSharedValueDisplay(numericValue.toLocaleString());
    }
  };

  // Calculate Project Value
  useEffect(() => {
    const calculatedNotaryFee = parseFloat(assetValue * notaryFee) / 100;
    const calculatedSharikanaFee = parseFloat(assetValue * sharikanaFee) / 100;
    const newProjectValue =
      Number(assetValue) + calculatedNotaryFee + calculatedSharikanaFee;
    setProjectValue(newProjectValue);
  }, [assetValue, notaryFee, sharikanaFee]);

  // Calculate Total Shared Value
  // useEffect(() => {
  //   const totalSharedCount = projectValue / perShareValue;
  //   setTotalShared(totalSharedCount);
  // }, [perShareValue, projectValue]);

  // Collect Total Shared Value
  useEffect(() => {
    const perShareAmountCount = projectValue / totalShared;

    setPerShareValue(perShareAmountCount);
  }, [projectValue, totalShared]);

  const handleTimeLine = () => {
    setTimelines([
      ...timeLines,
      {
        date: "",
        title: "",
        details: "",
      },
    ]);
  };

  const handleDriveLink = () => {
    setDriveLinks([
      ...driveLinks,
      {
        googleDriveLink: "",
        googleDriveLinkTitle: "",
      },
    ]);
  };

  const handleRemoveTimeLine = () => {
    if (timeLines.length === 1) {
      toast.error("You must select at least one Timeline");
      return;
    }
    const updatedOptions = timeLines.slice(0, -1);
    setTimelines(updatedOptions);
  };

  const handleRemoveDriveLink = () => {
    if (driveLinks.length === 1) {
      toast.error("You must select at least one Drive Link");
      return;
    }
    const updatedOptions = driveLinks.slice(0, -1);
    setDriveLinks(updatedOptions);
  };

  // Handle Tab Content
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleNextClick = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const selectedTimeLines = timeLines?.filter(
    (option) => option.date && option.title && option.details
  );
  const selectedDriveLinks = driveLinks?.filter(
    (option) => option.googleDriveLink && option.googleDriveLinkTitle
  );

  const ProjectData = {
    ...formData,
    projectType: project?.projectType?._id,
    aboutProject: aboutProject,
    exitStrategy: exitStrategy,
    company: userData?.company?._id,
    totalProjectValue: projectValue,
    projectAssetValue: assetValue,
    notaryFee: notaryFee,
    sharikanaFee: sharikanaFee,
    perShareValue: perShareValue,
    totalShareValue: totalShared,
    availableTotalShare: totalShared,
    investmentDuration: {
      durationValue: investmentDurationValue,
      durationType: investmentDurationType,
    },
    investmentStartDate: investmentStartDate,
    investmentEndDate: investmentEndDate,
    firstReturnDate: firstReturnDate,

    timelines: selectedTimeLines,
    googleDriveLinks: selectedDriveLinks,
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      const imageUrls = await multipleImageUpload(files);

      const withPictureProjectData = {
        ...ProjectData,
        projectPicture: imageUrls,
      };

      const data = await axios.patch(
        `${getBaseUrl()}/project/${project?._id}/update-full-project`,
        withPictureProjectData
      );

      if (data.status === 200) {
        toast.success("Project updated successfully");
        setIsUploading(false);
      } else {
        toast.error("Error updating project");
      }
    } catch (error) {
      // console.error("Error updating project:", error);
      toast.error("An error occurred");
      setIsUploading(false);
    }
  };

  return (
    <>
      <LoadingState isLoadingState={isUploadLoading} />
      <div className="md:mx-5 sm:mx-0 rounded-lg bg-white p-4 shadow-lg">
        <div className="tabs tabs-lifted flex flex-wrap pt-3 font-bold">
          {tabs.map((tab, index) => (
            <a
              key={index}
              role="tab"
              className={`tab cursor-pointer px-4 py-2 text-lg ${
                activeTab === index
                  ? "tab-active text-[#00c196]"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </a>
          ))}
        </div>

        <form onSubmit={handleProjectSubmit}>
          <div className="mt-4">
            {activeTab === 0 && (
              <div className=" p-4 ">
                {/* <hr className="opacity-50" /> */}
                <EditProjectInfo
                  handleNextClick={handleNextClick}
                  // data={data}
                  project={project}
                  setProjectType={setProjectType}
                  projectType={projectType}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setAboutProject={setAboutProject}
                  aboutProject={aboutProject}
                  setExitStrategy={setExitStrategy}
                  exitStrategy={exitStrategy}
                />
              </div>
            )}

            {activeTab === 1 && (
              <div className="p-4">
                <EditFinancials
                  project={project}
                  projectValue={projectValue}
                  setAssetValue={setAssetValue}
                  setNotaryFee={setNotaryFee}
                  handleSharikanaFee={handleSharikanaFee}
                  displaySharikanaFee={displaySharikanaFee}
                  setPerShareValue={setPerShareValue}
                  perShareValue={perShareValue}
                  totalShared={totalShared}
                  handleAssetValue={handleAssetValue}
                  displayAssetValue={displayAssetValue}
                  handleNotaryFeeValue={handleNotaryFeeValue}
                  displayNotaryFee={displayNotaryFee}
                  handleTotalShared={handleTotalShared}
                  // perShareValueDisplay={perShareValueDisplay}
                  totalSharedValueDisplay={totalSharedValueDisplay}
                  handleNextClick={handleNextClick}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setInvestmentDurationType={setInvestmentDurationType}
                  investmentDurationType={investmentDurationType}
                  setInvestmentDurationValue={setInvestmentDurationValue}
                  investmentDurationValue={investmentDurationValue}
                />
              </div>
            )}

            {activeTab === 2 && (
              <div className=" p-4">
                <EditTimeline
                  project={project}
                  timeLines={timeLines}
                  setTimelines={setTimelines}
                  handleTimeLine={handleTimeLine}
                  handleRemoveTimeLine={handleRemoveTimeLine}
                  setInvestmentStartDate={setInvestmentStartDate}
                  investmentStartDate={investmentStartDate}
                  investmentEndDate={investmentEndDate}
                  setInvestmentEndDate={setInvestmentEndDate}
                  setFirstReturnDate={setFirstReturnDate}
                  firstReturnDate={firstReturnDate}
                  handleNextClick={handleNextClick}
                />
              </div>
            )}
            {activeTab === 3 && (
              <div className=" p-4">
                <EditUploadMedia
                  project={project}
                  driveLinks={driveLinks}
                  setDriveLinks={setDriveLinks}
                  handleDriveLink={handleDriveLink}
                  handleRemoveDriveLink={handleRemoveDriveLink}
                  setFiles={setFiles}
                />

                <div className="flex justify-end p-5">
                  <button
                    type="submit"
                    className="rounded"
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#00C194",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Update Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "100px" }}
        reverseOrder={false}
      />
    </>
  );
};

export default EditProject;
