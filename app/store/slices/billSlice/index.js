import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import DefaultOption from "../../../commons/DefaultOption";
import Helper from "../../../commons/Helper";
import Price from "../../../constants/Price";
import SliceName from "../../../constants/SliceName";

const sliceName = SliceName.bill;
const itemsAdapter = createEntityAdapter({
    selectId: (item) => item.username,
});
const initialState = {
    priceOfYardPerHour: Price.yardPricePerHour,
    priceOfCock: Price.cockPrice,
    time: DefaultOption.playingTime,
    cock: DefaultOption.cock,
    otherPrice: DefaultOption.otherPrice,
    users: itemsAdapter.getInitialState(),
};

// SLICE
const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        // bill options
        setBillTime: (state, action) => {
            state.time = action.payload;
        },
        setBillCock: (state, action) => {
            state.cock = action.payload;
        },
        setBillOtherPrice: (state, action) => {
            state.otherPrice = action.payload;
        },

        // users
        addUser: (state, action) => {
            itemsAdapter.addOne(state.users, action.payload);
        },
        removeUserByUsername: (state, action) => {
            itemsAdapter.removeOne(state.users, action.payload);
        },
        updateCockByUsername: (state, action) => {
            const { username, cock } = action.payload;
            const existingItem = state.users.entities[username];
            existingItem.cock = cock;
            itemsAdapter.updateOne(state.users, existingItem);
        },
        updateOtherPriceByUsername: (state, action) => {
            const { username, otherPrice } = action.payload;
            const existingItem = state.users.entities[username];
            existingItem.otherPrice = otherPrice;
            itemsAdapter.updateOne(state.users, existingItem);
        },
        updatePlayingTimeByUsername: (state, action) => {
            const { username, playingTime } = action.payload;
            const existingItem = state.users.entities[username];
            existingItem.playingTime = playingTime;
            itemsAdapter.updateOne(state.users, existingItem);
        },
        increaseCock: (state, action) => {
            itemsAdapter.updateMany(
                state.users,
                Object.values(state.users.entities).map((item) => {
                    item.cock++;
                    return item;
                })
            );
        },
        decreaseCock: (state, action) => {
            itemsAdapter.updateMany(
                state.users,
                Object.values(state.users.entities).map((item) => {
                    if (item.cock > 0) item.cock--;
                    return item;
                })
            );
        },
        updatePlayingTime: (state, action) => {
            itemsAdapter.updateMany(
                state.users,
                Object.values(state.users.entities).map((item) => {
                    item.playingTime = action.payload;
                    return item;
                })
            );
        },

        // reset
        resetBill: (state, action) => {
            for (let key in initialState) {
                state[key] = initialState[key];
            }
        },
    },
});
const selectors = {
    getPriceOfYardPerHour: (state) => state[sliceName].priceOfYardPerHour,
    getPriceOfCock: (state) => state[sliceName].priceOfCock,
    getBillTime: (state) => state[sliceName].time,
    getBillCock: (state) => state[sliceName].cock,
    getBillOtherPrice: (state) => state[sliceName].otherPrice,
    getYardPrice: (state) => Helper.getYardPrice(state[sliceName].time),
    getCockPrice: (state) => state[sliceName].cock * Price.cockPrice,
    getBillCock: (state) => state[sliceName].cock,
    // user
    getMaxPlayingTime: (state) => {
        const currentState = state[sliceName].users;
        let max = 0;
        Object.values(currentState.entities).forEach((item) => {
            if (item.playingTime > max) max = item.playingTime;
        });
        return max;
    },
    getMaxCock: (state) => {
        const currentState = state[sliceName].users;
        let maxCock = 0;
        Object.values(currentState.entities).forEach((item) => {
            if (item.cock > maxCock) maxCock = item.cock;
        });
        return maxCock;
    },
    getPlayingTimes: (state) =>
        Object.values(state[sliceName].users.entities).map(
            (item) => item.playingTime
        ),
};

export const {
    getBillCock,
    getBillTime,
    getCockPrice,
    getYardPrice,
    getBillOtherPrice,
    getMaxCock,
    getMaxPlayingTime,
    getPlayingTimes,
    getPriceOfCock,
    getPriceOfYardPerHour,
} = selectors;

export const {
    selectAll: selectAllUser,
    selectById: selectUserByUsername,
    selectIds: selectUserUsernames,
} = itemsAdapter.getSelectors((state) => state[sliceName].users);

export const {
    addUser,
    decreaseCock,
    increaseCock,
    removeUserByUsername,
    updateCockByUsername,
    updateOtherPriceByUsername,
    updatePlayingTime,
    updatePlayingTimeByUsername,
    setBillCock,
    setBillTime,
    resetBill,
    setBillOtherPrice,
} = slice.actions;

export default slice.reducer;
