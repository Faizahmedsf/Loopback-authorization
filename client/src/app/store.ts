import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
// import reduxLogger from "redux-logger";
import type { PreloadedState } from "@reduxjs/toolkit";
import getReducer from "../features/Get/Get";
import postReducer from "../features/Post/Post";
import singleUserSlice from "../features/SingleUser/SingleUser";
import UpdateUser from "../features/Update/Update";

const rootReducer = combineReducers({
  getSlice: getReducer,
  postSlice: postReducer,
  SingleUser: singleUserSlice,
  UpdateUser: UpdateUser,

});

// export const store = configureStore({
//   reducer: rootReducer,
//   preloadedState
//   // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
// });
export const makeStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// console.log("Initial State" , store.getState())

export  const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
