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
    },
});

const selectors = {
    getMaxCock: (state) => {
        const currentState = state[sliceName];
        let maxCock = 0;
        Object.values(currentState.entities).forEach((item) => {
            if (item.cock > maxCock) maxCock = item.cock;
        });
        return maxCock;
    },
};
export const { getMaxCock } = selectors;

export const {
    updateCockByUsername,
    addUser,
    decreaseCock,
    increaseCock,
    updateOtherPriceByUsername,
} = slice.actions;
export const {
    selectAll: selectAllUser,
    selectById: selectUserByUsername,
    selectIds: selectUserUsernames,
} = itemsAdapter.getSelectors((state) => state[sliceName]);
export default slice.reducer;
