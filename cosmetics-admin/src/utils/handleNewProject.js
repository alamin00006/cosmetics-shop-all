import axios from "axios";
import toast from "react-hot-toast";
import { multipleImageUpload } from "./multipleImageUpload";
import { getBaseUrl } from "@/helpers/config/envConfig";

export const handleNewProject = async (
  e,
  formData,
  aboutProject,
  exitStrategy,
  projectTypeId,
  userData,
  projectValue,
  assetValue,
  notaryFee,
  sharikanaFee,
  perShareValue,
  totalShared,
  investmentDurationValue,
  investmentDurationType,
  investmentStartDate,
  investmentEndDate,
  firstReturnDate,
  selectedTimeLines,
  selectedDriveLinks,
  files,
  setIsUploading
) => {
  e.preventDefault();

  // Utility function to check if a value is an integer
  const isInteger = (value) => {
    return Number.isInteger(Number(value));
  };

  // Check if all the required fields in formData and ProjectData are filled
  if (
    !formData.projectTitle ||
    !formData.streetAddress ||
    !formData.city ||
    !formData.zipCode ||
    !formData.youtubeVideoLink ||
    !formData.googleMapLink ||
    !formData.minimumShareValue ||
    !formData.maximumShareValue ||
    !formData.yearlyReturnValue ||
    !formData.quarterlyReturnValue ||
    !formData.monthlyReturnValue ||
    !aboutProject ||
    !exitStrategy ||
    !projectTypeId ||
    !userData?.company?._id ||
    !userData?._id ||
    !projectValue ||
    !assetValue ||
    // !notaryFee ||
    // !sharikanaFee ||
    !perShareValue ||
    !totalShared ||
    investmentDurationValue <= 0 ||
    !investmentDurationType ||
    !investmentStartDate ||
    !investmentEndDate ||
    !firstReturnDate
  ) {
    return toast.error("Please fill in all required fields.");
  }

  // Validate this fields only accept integers
  if (
    !isInteger(projectValue) ||
    !isInteger(assetValue) ||
    !isInteger(perShareValue) ||
    !isInteger(totalShared) ||
    !isInteger(formData.minimumShareValue) ||
    !isInteger(formData.maximumShareValue)
  ) {
    return toast.error(
      "Please remove decimals numbers from assets value or project value or per-share-value or total share value or minimum share value or maximum share value"
    );
  }

  // Check if the files array contains at least 5 files
  if (files.length < 5) {
    return toast.error("Please upload at least 5 images.");
  }

  try {
    setIsUploading(true);
    const imageUrls = await multipleImageUpload(files);

    // Create the project data object
    const ProjectData = {
      ...formData,
      aboutProject: aboutProject,
      exitStrategy: exitStrategy,
      projectType: projectTypeId,
      company: userData?.company?._id,
      uploadedBy: userData?._id,
      totalProjectValue: projectValue,
      projectAssetValue: assetValue,
      notaryFee,
      sharikanaFee,
      perShareValue,
      totalShareValue: totalShared,
      availableTotalShare: totalShared,
      investmentDuration: {
        durationValue: investmentDurationValue,
        durationType: investmentDurationType,
      },
      investmentStartDate,
      investmentEndDate,
      firstReturnDate,
      timelines: selectedTimeLines,
      googleDriveLinks: selectedDriveLinks,
      projectPicture: imageUrls,
    };

    // Submit the form data
    const data = await axios.post(`${getBaseUrl()}/project`, ProjectData);

    if (data.status === 400) {
      return toast.error(data.data.error);
    }

    toast.success(data.data.message);
    // e.target.reset();
    setIsUploading(false);
  } catch (error) {
    // console.log(error);
    setIsUploading(false);

    return toast.error("An error occurred while submitting the project.");
  }
};
