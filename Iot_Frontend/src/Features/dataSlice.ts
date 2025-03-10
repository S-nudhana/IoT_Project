import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
    Building: string;
    Floor: number;
    timestamp: number;
}

const initialState: DataState = { Building: "SIT", Floor: 1, timestamp: Date.now() };

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<{ Building: string; Floor: number }>) => {
            state.Building = action.payload.Building;
            state.Floor = action.payload.Floor;
            state.timestamp = Date.now();
        },
        resetData: () => initialState,
    },
});

export const { setData, resetData } = dataSlice.actions;
export default dataSlice.reducer;