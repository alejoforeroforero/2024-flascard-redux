import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCategories = createAsyncThunk(
    'getCategories',
    async () => {
        const res = await fetch('https://opentdb.com/api_category.php');
        const data = await res.json();
        return data.trivia_categories;
    }
)

export const getFlashCards = createAsyncThunk(
    'getFlashCards',
    async (obj) => {
        const res = await fetch(`https://opentdb.com/api.php?amount=${obj.amount}&category=${obj.categoryId}`);
        const data = await res.json();

        const payLoadObj = {
            data: data.results,
            amount: obj.amount,
            categoryId: obj.categoryId,
            categoryName: obj.categoryName
        }

        return payLoadObj;
    }
)

const initialState = {
    categories: [],
    flashCards: [],
    categoryId: 1,
    categoryName:'',
    amount: 10,
    status: 'idle',
    error: ''
}

const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        getCards: (state, action) => {
            state.categoryId = action.payload.categoryId;
            state.amount = action.payload.amount;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.status = 'Loading...'
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.status = "Success";
                state.categories = action.payload;
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = "Failed!"
                state.error = action.error.message;
            })
            .addCase(getFlashCards.pending, (state, action) => {
                state.status = 'Loading...'
            })
            .addCase(getFlashCards.fulfilled, (state, action) => {
                state.status = "Success";
                state.amount = action.payload.amount;
                state.categoryId = action.payload.categoryId;
                state.categoryName = action.payload.categoryName;
                state.flashCards = action.payload.data;
            })
            .addCase(getFlashCards.rejected, (state, action) => {
                state.status = "Failed!"
                state.error = action.error.message;
            })
    }
})

export const { getCards } = categorySlice.actions

export default categorySlice.reducer;