import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import Helper from "../../../commons/Helper";
import Price from "../../../constants/Price";
import SliceName from "../../../constants/SliceName";

const sliceName = SliceName.billSetting;
const initialState = {
    time: 3600000,
    cock: 0,
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
    },
});
const selectors = {
    getBillTime: (state) => state[sliceName].time,
    getBillCock: (state) => state[sliceName].cock,
    getBillOptionsPrice: (state) => {
        const currentState = state[sliceName];
        const yardPrice = Helper.getYardPrice(currentState.time);
        const cockPrice = currentState.cock * Price.cockPrice;
        const total = Helper.roundPrice(yardPrice + cockPrice, 3);
        return total;
    },
};

export const { getBillCock, getBillTime, getBillOptionsPrice } = selectors;

export const { setBillCock, setBillTime } = slice.actions;
export default slice.reducer;
