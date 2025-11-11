import authApi from "@/redux/api/authApi";
import projectApi, { useGetProjectsQuery } from "@/redux/api/projectApi";
import { store } from "@/redux/store";

// Get Projects

export const getAllProjects = async (queryParams) => {
  try {
    const data = await store
      .dispatch(
        projectApi.endpoints.getProjectsByCompanyOrPR.initiate(queryParams)
      )
      .unwrap();
    return data;
  } catch (error) {
    return null;
  }
};

// export const useGetAllProjects = (queryParams) => {
//   const { data, error, isLoading } = projectApi.endpoints.getProjects.useQuery(
//     queryParams,
//     {
//       pollingInterval: 3000,
//     }
//   );

//   return { data, error, isLoading };
// };
// Get Single Project
export const getSingleProjects = async (queryParams) => {
  try {
    const data = await store
      .dispatch(projectApi.endpoints.getProjectsById.initiate(queryParams))
      .unwrap();
    return data;
  } catch (error) {
    return null;
  }
};
// CountDown
export const getCountDown = async () => {
  try {
    const data = await store
      .dispatch(projectApi.endpoints.getCounts.initiate())
      .unwrap();
    return data;
  } catch (error) {
    return null;
  }
};
// get All User
export const getAllUser = async () => {
  try {
    const data = await store
      .dispatch(authApi.endpoints.getAllUser.initiate())
      .unwrap();
    return data;
  } catch (error) {
    return null;
  }
};
// get Single User
export const getUser = async () => {
  try {
    const data = await store
      .dispatch(authApi.endpoints.getUser.initiate())
      .unwrap();
    return data;
  } catch (error) {
    return null;
  }
};
