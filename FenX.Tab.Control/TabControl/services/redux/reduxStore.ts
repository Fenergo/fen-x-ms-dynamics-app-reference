import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { reducer as oidcReducer } from "redux-oidc";

const loggerMiddleware = () => (next: any) => (action: any) => {
  next(action);
};
const store = configureStore({
  reducer: {
    oidc: oidcReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["redux-oidc/USER_FOUND", "notification/addError"],
        ignoredPaths: ["oidc.user"],
      },
    }),
    loggerMiddleware,
  ],
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
