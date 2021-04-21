import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import DefaultOption from "../../../commons/DefaultOption";
import Helper from "../../../commons/Helper";
import Pricing from "../../../commons/Pricing";
import Price from "../../../constants/Price";
import SliceName from "../../../constants/SliceName";
import StorageKey from "../../../constants/StorageKey";

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
        setPriceOfYardPerHour: (state, action) => {
            state.priceOfYardPerHour = action.payload;
        },
        setPriceOfCock: (state, action) => {
            state.priceOfCock = action.payload;
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
            const exceptionFields = ["priceOfYardPerHour", "priceOfCock"];
            for (let key in initialState) {
                if (!exceptionFields.includes(key))
                    state[key] = initialState[key];
            }
        },
    },
});
// THUNKS
export function changePriceOfYardPerHour(value) {
    return async (dispatch) => {
        await AsyncStorage.setItem(StorageKey.priceOfYardPerHour, `${value}`);
        dispatch(setPriceOfYardPerHour(value));
    };
}

export function changePriceOfCock(value) {
    return async (dispatch) => {
        await AsyncStorage.setItem(StorageKey.priceOfCock, `${value}`);
        dispatch(setPriceOfCock(value));
    };
}

const getState = (state) => state[sliceName];

const selectors = {
    getPriceOfYardPerHour: (state) => getState(state).priceOfYardPerHour,
    getPriceOfCock: (state) => getState(state).priceOfCock,
    getBillTime: (state) => getState(state).time,
    getBillCock: (state) => getState(state).cock,
    getCockPrice: (state) => getState(state).cock * getState(state).priceOfCock,
    getBillOtherPrice: (state) => getState(state).otherPrice,
    getYardPrice: (state) =>
        Helper.getYardPrice(
            getState(state).time,
            getState(state).priceOfYardPerHour
        ),
    getBillTotalPrice: (state) => {
        const billOtherPrice = getState(state).otherPrice;
        const totalOtherPrice =
            Pricing.getTotalOtherPrice(selectors.getUsers(state)) +
            billOtherPrice;

        const total =
            selectors.getYardPrice(state) +
            selectors.getCockPrice(state) +
            totalOtherPrice;
        return total;
    },
    // user
    getUsers: (state) => Object.values(getState(state).users.entities),
    getMaxPlayingTime: (state) => {
        let max = 0;
        selectors.getUsers(state).forEach((item) => {
            if (item.playingTime > max) max = item.playingTime;
        });
        return max;
    },
    getMaxCock: (state) => {
        let max = 0;
        selectors.getUsers(state).forEach((item) => {
            if (item.cock > max) max = item.cock;
        });
        return max;
    },
    getPlayingTimes: (state) =>
        selectors.getUsers(state).map((item) => item.playingTime),
    getCocks: (state) => selectors.getUsers(state).map((item) => item.cock),

    getUserPlayingTimePayments: (state) =>
        Pricing.getPlayingTimePayments(
            selectors.getPlayingTimes(state),
            selectors.getPriceOfYardPerHour(state)
        ),

    getUserCockPayments: (state) =>
        Pricing.getUserCockPayments(
            selectors.getBillCock(state),
            selectors.getUsers(state),
            selectors.getPriceOfCock(state)
        ),
    getAvgBillOtherPriceForEachUser: (state) =>
        getState(state).otherPrice / selectors.getUsers(state).length,
    isCockDiff: (state) =>
        Object.keys(Helper.count(selectors.getCocks(state))).length > 1,
    isPlayingTimeDiff: (state) =>
        Object.keys(Helper.count(selectors.getPlayingTimes(state))).length > 1,
};

export const {
    isCockDiff,
    isPlayingTimeDiff,
    getAvgBillOtherPriceForEachUser,
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
    getBillTotalPrice,
    getUserCockPayments,
    getUserPlayingTimePayments,
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
    setPriceOfCock,
    setPriceOfYardPerHour,
} = slice.actions;

export default slice.reducer;
