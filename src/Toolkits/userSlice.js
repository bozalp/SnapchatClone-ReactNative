import { createSlice } from '@reduxjs/toolkit'
import { Alert } from 'react-native';

const initialState = {
    user: {
        email: null,
        password: null,
        username: null
    }
}

export const userSlice = createSlice(
    {
        name: 'User',
        initialState, //ya da initialState:initialState
        reducers: {
            setUser: (state, action) => {
                state.user = [
                    state.user.email = action.email,
                    state.user.password = action.password,
                    state.user.username = action.username
                ]
            },
        }
    }
);

export const { setUser } = userSlice.actions;

export default userSlice.reducer;