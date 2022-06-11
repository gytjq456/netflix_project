import api from "../api";
import { movieActions } from "../reducers/movieReducer";

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
	return async (dispatch) => {
		try {
			const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
			const topRatedMovieApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
			const upcomingMovieApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
			const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
			let [popularMovies, topRatedMovies, upcomingMovies, genreList] = await Promise.all([
				popularMovieApi,
				topRatedMovieApi,
				upcomingMovieApi,
				genreApi,
			]);
			console.log("popularMovies", popularMovies);
			dispatch(
				movieActions.getMovie({
					popularMovies: popularMovies.data,
					topRatedMovies: topRatedMovies.data,
					upcomingMovies: upcomingMovies.data,
					genreList: genreList.data.genres,
				})
			);
		} catch (error) { }
	};
}

function getMovieDetail(id) {
	return async (dispatch) => {
		try {
			const movieDetailApi = api.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
			const movieReviewApi = api.get(
				`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
			);
			const movieRatedApi = api.get(
				`/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
			);
			const movieVideoApi = api.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
			let [movieDetail, movieReview, movieRated, movieVideo] = await Promise.all([
				movieDetailApi,
				movieReviewApi,
				movieRatedApi,
				movieVideoApi,
			]);

			dispatch(
				movieActions.getMovieDetail({
					movieDetail: movieDetail.data,
					movieReview: movieReview.data,
					movieRated: movieRated.data,
					movieVideo: movieVideo.data,
				})
			);
		} catch (error) { }
	};
}

function getMovieList(page, selectSort, maxYear, searchGenre) {
	return async (dispatch) => {

		const popularMovieApi = api.get(
			`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&year=${maxYear}${Boolean(searchGenre) ? `&with_genres=${searchGenre}` : ""}`
		);

		console.log("popularMovieApi", popularMovieApi);

		const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
		let [popularMovie, genreList] = await Promise.all([popularMovieApi, genreApi]);

		if (selectSort) {
			switch (selectSort) {
				case "Popularity(Desc)":
					// 인기도 내림차순
					popularMovie.data.results.sort((a, b) => {
						return b.popularity - a.popularity;
					});
					break;
				case "Popularity(Asc)":
					// 인기도 오름차순
					popularMovie.data.results.sort((a, b) => {
						return a.popularity - b.popularity;
					});
					break;
				case "ReleaseDay(Desc)":
					// 개봉날짜 내림차순
					popularMovie.data.results.sort((a, b) => {
						a = new Date(a.release_date);
						b = new Date(b.release_date);
						return b - a;
					});
					break;
				case "ReleaseDay(Asc)":
					// 개봉날짜 오름차순
					popularMovie.data.results.sort((a, b) => {
						a = new Date(a.release_date);
						b = new Date(b.release_date);
						return a - b;
					});
					break;
				case "Vote(Desc)":
					// 별점 오름차순
					popularMovie.data.results.sort((a, b) => {
						return a.vote_average - b.vote_average;
					});
					break;
				case "Vote(Asc)":
					// 별점 오름차순
					popularMovie.data.results.sort((a, b) => {
						return a.vote_average - b.vote_average;
					});
					break;
				default:
					break;
			}

			popularMovie.data.results = popularMovie.data.results;
		}

		dispatch(
			movieActions.getMovieList({
				movieList: popularMovie.data,
				genreList: genreList.data.genres,
			})
		);
	};
}
function getSearchList(searchQuery) {
	return async (dispatch) => {
		const searchApi = await api.get(`/search/movie?api_key=${API_KEY}&page=1&query=${searchQuery}`)
		dispatch(movieActions.getSearchList({
			searchList: searchApi.data
		}))

		// console.log("searchApi.data", searchApi.data);

	}
}


export const movieAction = {
	getMovies,
	getMovieDetail,
	getMovieList,
	getSearchList
};
