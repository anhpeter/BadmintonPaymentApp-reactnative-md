import { configureStore } from "@reduxjs/toolkit";
import SliceName from "../constants/SliceName";
import billSettingSlice from "./slices/billSlice";
import billSlice from "./slices/billSlice";
import usersSlice from "./slices/billSlice";
// ...
const store = configureStore({
    reducer: {
        //[SliceName.user]: usersSlice,
        //[SliceName.billSetting]: billSettingSlice,
        [SliceName.bill]: billSlice,
    },
});

export default store;
