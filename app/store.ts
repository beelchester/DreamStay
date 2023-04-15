'use client'

import {configureStore} from '@reduxjs/toolkit'
import signupModalReducer from './features/signupModalSlice'
import loginModalReducer from './features/loginModalSlice'

export const store = configureStore({
    reducer: {
        signupModal: signupModalReducer,
        loginModal : loginModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
