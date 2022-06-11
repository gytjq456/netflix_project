import movieReducer from "./reducers/movieReducer";
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		movie: movieReducer
	}
})


export default store