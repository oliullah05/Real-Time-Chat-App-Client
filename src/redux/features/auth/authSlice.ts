/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"




export type TUser = {
    id: string
    role: string
} | null

type TAuthState = {
    user: null | TUser
    token: null | string
}

const initialState: TAuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setUser: (state, action)=>{
            const {user,token}= action.payload;
            state.user=user,
            state.token=token
        },
        logOut:(state)=>{
            state.token=null
            state.user=null
        }
    }
})

export const {setUser,logOut} = authSlice.actions

export default authSlice.reducer




