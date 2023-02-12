import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: number;
    name: string;
};

type InitialState = {
    loading: boolean;
    users: User[];
    error: string;
};

const initialState: InitialState = {
    loading: false,
    users: [],
    error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;
});

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        remove: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((user: User) => user.id !== action.payload);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.loading = false;
            state.error = "";
        });

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.users = [];
            state.loading = false;
            state.error = action.error.message || "something went wrong";
        });
    },
});

export const { remove } = userSlice.actions;
export default userSlice.reducer;
