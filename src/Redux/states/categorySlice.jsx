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
 
        if(!res.ok){

            alert('There were a problem with the request, please try again and wait for the results');

            const payLoadObj = {
                data: '',
                amount: 10,
                categoryId: 1,
                categoryName: ''
            }

            return payLoadObj;
        }

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
    categoryName: '',
    amount: 10,
    status: 'Loading...',
    error: ''
}

const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        goToHome: (state) => {
            state.categoryName = ''
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


export const isLoading = state => {
    return state.categoryReducer.status;
}
export const { goToHome } = categorySlice.actions

export default categorySlice.reducer;