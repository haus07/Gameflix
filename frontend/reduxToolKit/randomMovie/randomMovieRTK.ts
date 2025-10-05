import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DataRandomMovie {
    id: number
    title: string
    poster: string
    backdrop: string
    description: string
    rating: number
    year: string
    mainSource: string
    trailerSource: string
    seriesId: number
    createdAt?: string
    updatedAt?: string
}

interface RandomMovieState {
    movie:DataRandomMovie|null
}

const initialState: RandomMovieState = {
    movie:null
}

export const ranDomMovieSlice = createSlice({
    name: 'randomMovie',
    initialState,
    reducers: {
        setRandomMovie: (state, action: PayloadAction<DataRandomMovie>) => {
            state.movie = action.payload
        }
    }
})

export const { setRandomMovie } = ranDomMovieSlice.actions

export default ranDomMovieSlice.reducer