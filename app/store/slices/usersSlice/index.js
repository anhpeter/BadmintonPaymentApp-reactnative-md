import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import SliceName from "../../../constants/SliceName";

const sliceName = SliceName.user;
const itemsAdapter = createEntityAdapter({
    selectId: (item) => item.username,
});

const slice = createSlice({
    name: sliceName,
    initialState: itemsAdapter.getInitialState(),
    reducers: {
        addUser: (state, action) => {
            itemsAdapter.addOne(state, action.payload);
        },
        removeUserByUsername: (state, action) => {
            itemsAdapter.removeOne(state, action.payload);
        },
        updateCockByUsername: (state, action) => {
            const { username, cock } = action.payload;
            const existingItem = state.entities[username];
            existingItem.cock = cock;
            itemsAdapter.updateOne(state, existingItem);
        },
        updateOtherPriceByUsername: (state, action) => {
            const { username, otherPrice } = action.payload;
            const existingItem = state.entities[username];
            existingItem.otherPrice = otherPrice;
            itemsAdapter.updateOne(state, existingItem);
        },
        updatePlayingTimeByUsername: (state, action) => {
            const { username, playingTime } = action.payload;
            const existingItem = state.entities[username];
            existingItem.playingTime = playingTime;
            itemsAdapter.updateOne(state, existingItem);
        },
        increaseCock: (state, action) => {
            itemsAdapter.updateMany(
                state,
                Object.values(state.entities).map((item) => {
                    item.cock++;
                    return item;
                })
            );
        },
        decreaseCock: (state, action) => {
            itemsAdapter.updateMany(
                state,
                Object.values(state.entities).map((item) => {
                    if (item.cock > 0) item.cock--;
                    return item;
                })
            );
        },
        updatePlayingTime: (state, action) => {
            itemsAdapter.updateMany(
                state,
                Object.values(state.entities).map((item) => {
                    item.playingTime = action.payload;
                    return item;
                })
            );
        },
    },
});

const selectors = {
    getMaxPlayingTime: (state) => {
        const currentState = state[sliceName];
        let max = 0;
        Object.values(currentState.entities).forEach((item) => {
            if (item.playingTime > max) max = item.playingTime;
        });
        return max;
    },
    getMaxCock: (state) => {
        const currentState = state[sliceName];
        let maxCock = 0;
        Object.values(currentState.entities).forEach((item) => {
            if (item.cock > maxCock) maxCock = item.cock;
        });
        return maxCock;
    },
    getPlayingTimes: (state) =>
        Object.values(state[sliceName].entities).map(
            (item) => item.playingTime
        ),
};
export const { getMaxPlayingTime, getMaxCock, getPlayingTimes } = selectors;

export const {
    updateCockByUsername,
    addUser,
    decreaseCock,
    increaseCock,
    updateOtherPriceByUsername,
    updatePlayingTime,
    updatePlayingTimeByUsername,
    removeUserByUsername
} = slice.actions;
export const {
    selectAll: selectAllUser,
    selectById: selectUserByUsername,
    selectIds: selectUserUsernames,
} = itemsAdapter.getSelectors((state) => state[sliceName]);
export default slice.reducer;
