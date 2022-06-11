import { createSlice } from "@reduxjs/toolkit";

let initialState = {
	popularMovies: {},
	topRatedMovies: {},
	upcomingMovies: {},
	movieDetail: {},
	movieReview: {},
	movieRated: {},
	genreList: {},
	movieVideo: {},
	movieList: {},
};

const movieSlide = createSlice({
	name: "movie",
	initialState,
	reducers: {
		reset: () => initialState,
		getMovie(state, action) {
			state.popularMovies = action.payload.popularMovies;
			state.topRatedMovies = action.payload.topRatedMovies;
			state.upcomingMovies = action.payload.upcomingMovies;
			state.genreList = action.payload.genreList;
		},

		getMovieDetail(state, action) {
			state.movieDetail = action.payload.movieDetail;
			state.movieReview = action.payload.movieReview;
			state.movieRated = action.payload.movieRated;
			state.movieVideo = action.payload.movieVideo;
		},
		getReview(state, action) {
			state.movieReview = action.payload.movieReview;
		},
		getMovieList(state, action) {
			state.movieList = action.payload.movieList;
			state.genreList = action.payload.genreList;
		},
		getSearchList(state, action) {
			state.movieList = action.payload.searchList;
		},

	},
});

export const movieActions = movieSlide.actions;
export default movieSlide.reducer;
