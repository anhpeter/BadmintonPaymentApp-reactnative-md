import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import DefaultOption from "../../../commons/DefaultOption";
import Helper from "../../../commons/Helper";
import Price from "../../../constants/Price";
import SliceName from "../../../constants/SliceName";

const sliceName = SliceName.billSetting;
const initialState = {
    time: DefaultOption.playingTime,
    cock: DefaultOption.cock,
    otherPrice: DefaultOption.otherPrice,
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
        setBillOtherPrice: (state, action) => {
            state.otherPrice = action.payload;
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
    getBillOtherPrice: (state) => state[sliceName].otherPrice,
    getYardPrice: (state) => Helper.getYardPrice(state[sliceName].time),
    getCockPrice: (state) => state[sliceName].cock * Price.cockPrice,
    getBillCock: (state) => state[sliceName].cock,
};

export const {
    getBillCock,
    getBillTime,
    getCockPrice,
    getYardPrice,
    getBillOtherPrice
} = selectors;

export const {
    setBillCock,
    setBillTime,
    resetBillSettingSlice,
    setBillOtherPrice
} = slice.actions;
export default slice.reducer;
