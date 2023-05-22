import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IIS, user } from "../../Interface/Interface";
import { initialState } from "../__State__/InitialState";



export const addUser = createAsyncThunk("users/adduser", async (data: user) => {
  let baseUrl: string = "http://localhost:8001/";
  return await axios
    .post(baseUrl + "users", data)
    .then((response) => response.data)
    .catch((error) => console.log(error));
});

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state: IIS) => {
      return state;
    });

    builder.addCase(
      addUser.fulfilled,
      (state: IIS, action: PayloadAction<user[]>) => {
        state.users = action.payload;
        state.error = "There has been a error";
      }
    );
    builder.addCase(addUser.rejected, (state: IIS, action) => {
      state.users = [];
      state.error = action.error.message || "There has been a error";
    });
  },
});

export default postSlice.reducer;
