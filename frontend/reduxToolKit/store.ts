import { configureStore } from "@reduxjs/toolkit"
import randomMovieReducer from "./randomMovie/randomMovieRTK"
import { loadState,saveState } from "./localstorage"

const persistedState = loadState()
export const store = configureStore({
    reducer: {
        randomMovie:randomMovieReducer
    },
    preloadedState:persistedState
})

store.subscribe(() => {
    saveState(store.getState())
})



export type RootState = ReturnType<typeof store.getState>

export type ApiDispatch = typeof store.dispatch