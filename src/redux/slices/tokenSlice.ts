import { createSlice } from "@reduxjs/toolkit";
import { Token } from "../../types/tokenResponse";

const initialState: Token = {
  token: null,
  user: null,
  id: 0,
  email: "",
  firstname: "",
  lastname: "",
  username: "",
  isAdmin: false,
  avatar: "",
  bio: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(_state, action) {
      const token = action.payload;
      return token;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
