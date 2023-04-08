'use client'

import {configureStore} from '@reduxjs/toolkit'
import signupModalReducer from './features/signupModalSlice'


export const store = configureStore({
    reducer: {
        signupModal: signupModalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
