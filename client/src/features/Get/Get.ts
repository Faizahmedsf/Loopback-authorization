import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IIS, user } from "../../Interface/Interface";
import { initialState } from "../__State__/InitialState";
// defining the initial State



export const getUser = createAsyncThunk("users/getUser", async () => {
  let baseUrl = "http://localhost:3001/";
  return await axios
    .get(baseUrl + "users")
    .then((response) => response.data)
    .catch((error) => console.log(error));
});


const getSlice = createSlice({
  name: "getSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state:IIS) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<user[]>) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state:IIS, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || "SomeThing Went Wrong";
    });
  },
});

export default getSlice.reducer;
// export default.getSliceActions  getSlice.actions
