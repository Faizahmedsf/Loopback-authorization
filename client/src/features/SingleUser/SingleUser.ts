import { createSlice , createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IIS , user} from "../../Interface/Interface";
import { initialState } from "../__State__/InitialState";

export const getsingleUser = createAsyncThunk("users/getsingleUser", async (id: string | undefined) => {
    let baseUrl = "http://localhost:8001/";
    return await axios
      .get( baseUrl + `getsingleuser/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  });

const singleUser = createSlice({
    name: "SingleUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getsingleUser.pending, (state: IIS) => {
          state.loading = true;
        });
        builder.addCase(getsingleUser.fulfilled, (state: IIS, action: PayloadAction<user[]>) => {
          state.loading = false;
          state.users = action.payload;
          state.error = "";
        });
        builder.addCase(getsingleUser.rejected, (state: IIS, action) => {
          state.loading = false;
          state.users = [];
          state.error = action.error.message || "SomeThing Went Wrong";
        });
      },
})

export default singleUser.reducer


