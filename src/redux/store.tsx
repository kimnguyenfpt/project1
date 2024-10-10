// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./deviceSlice";
import servicesReducer from './serviceSilce';
import authReducer from "./authSlice";
import numberReducer from "./numberSlice";
import rolesReducer from "./rolesSlice";
import userReducer from "./userSlice";
import logReducer from "./logSlice";
export const store = configureStore({
  reducer: {
    devices: deviceReducer,
    auth: authReducer,
    services: servicesReducer,
    numbers: numberReducer,
    roles: rolesReducer,
    users: userReducer,
    logs: logReducer,
  },
});

// Định nghĩa kiểu RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
