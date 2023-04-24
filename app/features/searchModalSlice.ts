
import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchModalState {
    isOpen: boolean;
}

const initialState: SearchModalState = {
    isOpen: false
}


export const searchModalSlice = createSlice({
    name: 'searchModal',
    initialState,
    reducers: {
        openSearchModal: (state) => {
            state.isOpen = true;
        },
        closeSearchModal: (state) => {
            state.isOpen = false;
        }
    }
})

export const { openSearchModal, closeSearchModal } = searchModalSlice.actions;

export default searchModalSlice.reducer;

