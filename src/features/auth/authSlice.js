import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "./authAPI";

// dispatch automatique:
    // login.pending
    // login.fulfilled
    // login.rejected
export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const response = await loginUser(userData);
    return response.data;
  }
);

export const getMe = createAsyncThunk(
  "auth/me", 
  async () => {
    const res = await getMeAPI();
    return res.data;
});

const token = localStorage.getItem("token");
const user  = token ? JSON.parse(localStorage.getItem("user")) : null

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user,
    token: token,
    status: null,
    error: null,
  },
  // mamafa user (logout) (action simple)
  reducers: {
    logout: (state) => {
      state.user  = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  // miova state arakaraka ny API status (async actions)
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status  = "success";
        state.user    = action.payload.user;
        state.token   = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;