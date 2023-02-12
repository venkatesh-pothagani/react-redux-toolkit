import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
    id: number;
    title: string;
    description: string;
    createdAt: number;
}

export interface TodoList {
    list: Todo[];
    count: number;
}

const initialState: TodoList = {
    list: [],
    count: 0,
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Todo>) => {
            state.list.push(action.payload);
            state.count += 1;
        },

        remove: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter((todo: Todo) => todo.id !== action.payload);
            state.count -= 1;
        },
    },
});

export const { add, remove } = todoSlice.actions;

export default todoSlice.reducer;
