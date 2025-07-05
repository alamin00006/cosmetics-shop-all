import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileMenu: false,
  isLoadingState: false,
};
const profileMenuSlice = createSlice({
  name: "profileMenu",
  initialState,

  reducers: {
    placeProfileMenu: (state, action) => {
      state.isProfileMenu = action.payload;
    },
    placeLoadingShow: (state, action) => {
      state.isLoadingState = action.payload;
    },
  },
});

export const { placeProfileMenu, placeLoadingShow } = profileMenuSlice.actions;
export default profileMenuSlice.reducer;
