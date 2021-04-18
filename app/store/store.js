import { configureStore } from "@reduxjs/toolkit";
import SliceName from "../constants/SliceName";
import billSettingSlice from "./slices/billSettingSlice";
import usersSlice from "./slices/usersSlice";
// ...
const store = configureStore({
    reducer: {
        [SliceName.user]: usersSlice,
        [SliceName.billSetting]: billSettingSlice,
    },
});

export default store;