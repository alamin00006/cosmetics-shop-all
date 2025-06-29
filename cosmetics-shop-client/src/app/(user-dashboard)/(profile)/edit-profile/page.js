import ProfileUpdate from "@/components/pages/dashboard/profile-Edit/ProfileUpdate";

export const metadata = {
  title: "Dashboard Home || Sharikana ",
};

const EditProfile = async () => {
  return (
    <div>
      <div className="md:ms-5 sm:ms-0  md:mx-0 sm:mx-5">
        <ProfileUpdate />
      </div>
    </div>
  );
};

export default EditProfile;
