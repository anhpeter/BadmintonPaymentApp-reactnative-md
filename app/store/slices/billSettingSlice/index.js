import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import DefaultOption from "../../../commons/DefaultOption";
import Helper from "../../../commons/Helper";
import Price from "../../../constants/Price";
import SliceName from "../../../constants/SliceName";

const sliceName = SliceName.billSetting;
const initialState = {
    time: DefaultOption.playingTime,
    cock: DefaultOption.cock,
};

const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setBillTime: (state, action) => {
            state.time = action.payload;
        },
        setBillCock: (state, action) => {
            state.cock = action.payload;
        },
        resetBillSettingSlice: (state, action) => {
            for (let key in initialState) {
                state[key] = initialState[key];
            }
        },
    },
});
const selectors = {
    getBillTime: (state) => state[sliceName].time,
    getBillCock: (state) => state[sliceName].cock,
    getYardPrice: (state) => Helper.getYardPrice(state[sliceName].time),
    getCockPrice: (state) => state[sliceName].cock * Price.cockPrice,
    getBillCock: (state) => state[sliceName].cock,
};

export const {
    getBillCock,
    getBillTime,
    getCockPrice,
    getYardPrice,
} = selectors;

export const {
    setBillCock,
    setBillTime,
    resetBillSettingSlice,
} = slice.actions;
export default slice.reducer;
