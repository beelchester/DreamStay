import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RentModalState {
    isOpen: boolean;
}

const initialState: RentModalState = {
    isOpen: false
}


export const rentModalSlice = createSlice({
    name: 'rentModal',
    initialState,
    reducers: {
        openRentModal: (state) => {
            state.isOpen = true;
        },
        closeRentModal: (state) => {
            state.isOpen = false;
        }
    }
})

export const { openRentModal, closeRentModal } = rentModalSlice.actions;

export default rentModalSlice.reducer;

