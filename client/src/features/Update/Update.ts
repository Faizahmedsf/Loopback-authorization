import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IIS } from "../../Interface/Interface";
import { initialState } from "../__State__/InitialState";



export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (data: any) => {
    let baseUrl: string = "http://localhost:8001/";
    console.log("data", data);
    return await axios.patch(baseUrl + `updateuser/${data.id}`, data);
  }
);

const updateSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state: IIS) => {
      return state;
    });

    builder.addCase(
      updateUser.fulfilled,
      (state: IIS, action: PayloadAction<any>) => {
        state.users = action.payload;
        state.error = "There has been a error";
      }
    );
    builder.addCase(updateUser.rejected, (state: IIS, action) => {
      state.users = [];
      state.error = action.error.message || "There has been a error";
    });
  },
});

export default updateSlice.reducer;
