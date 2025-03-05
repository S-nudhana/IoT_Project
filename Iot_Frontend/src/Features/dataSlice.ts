import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
    Building: string;
    Floor: number;
}

const initialState: DataState = { Building: "SIT", Floor: 1 };

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<DataState>) => {
            state.Building = action.payload.Building;
            state.Floor = action.payload.Floor;
        },
    },
});

export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
