import { baseApi } from "./baseApi";

const PROJECT_URL = "/project";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjectsByCompanyOrPR: build.query({
      query: (arg) => ({
        url: `${PROJECT_URL}/company-projects`,
        method: "GET",
        params: arg,
      }),
      providesTags: ["projects"],
    }),
    getProjectsById: build.query({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: ["projects"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProjectsByCompanyOrPRQuery, useGetProjectsByIdQuery } =
  projectApi;

export default projectApi;
