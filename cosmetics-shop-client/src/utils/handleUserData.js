import { uploadImages } from "@/helpers/utils/userDataUtils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getBaseUrl } from "@/helpers/config/envConfig";

export const handleUserData = async (
  e,
  userId,
  setIsLoadingState,
  refetch,
  router
) => {
  e.preventDefault();
  const {
    fathersName,
    mothersName,
    birthDate,
    nidOrPassportNo,
    nomineeFullName,
    nomineeRelation,
    nomineeFathersName,
    nomineeMothersName,
    nomineeBirthDate,
    nomineeNidOrPassportNo,
    addressLine1,
    addressLine2,
    city,
    state,
    zipCode,
    mobileNumber,
  } = e.target;

  // Prepare the form data
  const userData = {
    mobileNumber: mobileNumber?.value,
    personalDetails: JSON.stringify({
      fathersName: fathersName.value,
      mothersName: mothersName.value,
      birthDate: birthDate.value,
      nidOrPassportNo: nidOrPassportNo.value,
    }),
    nomineeDetails: JSON.stringify({
      nomineeFullName: nomineeFullName.value,
      nomineeRelation: nomineeRelation.value,
      nomineeFathersName: nomineeFathersName.value,
      nomineeMothersName: nomineeMothersName.value,
      nomineeBirthDate: nomineeBirthDate.value,
      nomineeNidOrPassportNo: nomineeNidOrPassportNo.value,
    }),
    address: JSON.stringify({
      addressLine1: addressLine1.value,
      addressLine2: addressLine2.value,
      city: city.value,
      state: state.value,
      zipCode: zipCode.value,
    }),
  };

  try {
    setIsLoadingState(true);

    // Upload images
    const userImages = await uploadImages([
      e.target.nidOrPassportPhoto1,
      e.target.nidOrPassportPhoto2,
      e.target.userPhoto,
    ]);
    const nomineeImages = await uploadImages([
      e.target.nomineeNidOrPassportPhoto1,
      e.target.nomineeNidOrPassportPhoto2,
      e.target.nomineePhoto,
    ]);

    // Combine data with uploaded images
    const withAttachmentUserData = {
      ...userData,
      nidOrPassportPhoto: userImages[0],
      nidOrPassportBackSidePhoto: userImages[1],
      nomineeNidOrPassportPhoto: nomineeImages[0],
      nomineeNidOrPassportBackSidePhoto: nomineeImages[1],
      userPhoto: userImages[2],
      nomineePhoto: nomineeImages[2],
    };

    // Make the API call to update the user
    const response = await axios.patch(
      `${getBaseUrl()}/users/${userId}`,
      withAttachmentUserData
    );

    if (response.status === 400) {
      toast.error(response.data.error);
    } else {
      toast.success("Updated successfully!");
      refetch();
      e.target.reset();
      router.back();
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "An error occurred!");
  } finally {
    setIsLoadingState(false);
  }
};
