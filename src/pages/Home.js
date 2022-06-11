import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../component/Banner";
import MovieSlide from "../component/MovieSlide";
import { movieAction } from "../redux/action/movieAction";
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
	const dispatch = useDispatch();
	const { popularMovies, topRatedMovies, upcomingMovies } = useSelector((state) => state.movie);
	let [loading, setLoading] = useState(true);
	useEffect(() => {
		dispatch(movieAction.getMovies()).then(() => setLoading(false));
	}, []);
	if (loading) {
		return (
			<div className="loadingBar">
				<ClipLoader color="red" loading={loading} size={150} />
			</div>
		);
	}

	return (
		<div>
			<Banner movie={popularMovies.results[0]} />
			<div className="mainContents inner">
				<div className="slideWrap">
					<article>
						<h1>popular movie</h1>
						<MovieSlide movies={popularMovies} />
					</article>
					<article>
						<h1>Top rated movie</h1>
						<MovieSlide movies={topRatedMovies} />
					</article>
					<article>
						<h1>upcoming movie</h1>
						<MovieSlide movies={upcomingMovies} />
					</article>
				</div>
			</div>
		</div>
	);
};

export default Home;
