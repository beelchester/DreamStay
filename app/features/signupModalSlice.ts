import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SignupModalState {
    isOpen: boolean;
}

const initialState: SignupModalState = {
    isOpen: false
}


export const signupModalSlice = createSlice({
    name: 'signupModalSlice',
    initialState,
    reducers: {
        openSignupModal: (state) => {
            state.isOpen = true;
        },
        closeSignupModal: (state) => {
            state.isOpen = false;
        }
    }
})

export const { openSignupModal, closeSignupModal } = signupModalSlice.actions;

export default signupModalSlice.reducer;
