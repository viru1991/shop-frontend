import { createSlice } from '@reduxjs/toolkit';

// const getModifiedResponse = (currentAction) => {
//     let finalState = {};
//     const { error,payload, other, token, storeKey, ...newAction } = currentAction;
//     console.log(currentAction,"NEWS")
//     finalState = {
//         [currentAction?.storeKey]: newAction
//     };
//     console.log("hrer 1",finalState)
//     return finalState;
// };

const getModifiedResponse = (currentAction) => {
    const { payload, storeKey,...rest } = currentAction;
    console.log(payload, "NEWS");
    // return {
    //   [storeKey]: payload  // ✅ store raw array, not numeric object
    // };
    return {
        [storeKey]: {
          data:payload,   // the actual data
          ...rest       // isLoggedIn, userId, whatever else
        }
  };
}

const updateIdentifiers = (state, payload) => {
    const storeKey = payload?.storeKey;
    let newData = state?.[storeKey];
    newData = { ...newData, ...payload?.uniqueScreenIdentifier };
    console.log("hrer 2")
    return {
        [storeKey]: newData
    };
};

const acgSlice = createSlice({
    name: 'acgSlice',
    initialState: {},
    reducers: {
        loadStart: (state) => {
            return { ...state, isLoading: true, err: null };
        },
        apiSuccess: (state, action) => {
            console.log(action.payload,"payl")
            return {
                ...state,
                ...getModifiedResponse(action?.payload),
                isLoading: false,
                err: null
            };
        },
        apiFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                err: action?.payload,
                response: {}
            };
        },
        reset: () => {
            return {};
        },
        resetErr: (state) => {
            return { ...state, isLoading: false, err: null };
        },
        updateScreenIdentifiers: (state, action) => {
            return {
                ...state,
                ...updateIdentifiers(state, action?.payload),
                isLoading: false,
                err: null
            };
        },
        setStoreKey: (state, action) => {
            return { ...state, [action?.payload?.storeKey]: action?.payload?.value, isLoading: false, err: null };
        },
        resetStoreKey: (state, action) => {
            return { ...state, [action?.payload?.storeKey]: null, isLoading: false, err: null };
        },
        executeACGAction: (state, action) => {}
    }
});

export const {
    loadStart,
    apiSuccess,
    apiFailed,
    reset,
    resetErr,
    setStoreKey,
    resetStoreKey,
    executeACGAction,
    updateScreenIdentifiers
} = acgSlice.actions;
export const { reducer } = acgSlice;