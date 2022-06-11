import React, { useEffect, useState } from "react";

import { Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import MovieList from "../component/movies/MovieList";
import { movieAction } from "../redux/action/movieAction";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import MovieFilterGenre from "../component/movies/MovieFilterGenre";
import { useSearchParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

const Movies = () => {



	let [loading, setLoading] = useState(true);


	const [page, setPage] = useState(1);
	const { movieList, genreList } = useSelector((state) => state.movie);
	// console.log("movieList", movieList);
	const dispatch = useDispatch();
	const moveToPage = (pageNum) => {
		setPage(pageNum);
	};


	// 페이징 추가
	let items = [];
	let pageLength = 5;
	let pageGroup = Math.ceil(page / pageLength);
	let lastPage = pageGroup * pageLength;
	let firstPage = lastPage - (pageLength - 1);
	for (let i = firstPage; i <= lastPage; i++) {
		items.push(
			<Pagination.Item key={i} active={i === page} onClick={() => moveToPage(i)}>
				{i}
			</Pagination.Item>
		);
	}

	let minYear = 1990;
	let maxYear = 2022;
	const [Selected, setSelected] = useState("Popularity(Desc)");
	const [rangeValue, setRangeValue] = useState(maxYear);
	const [searchGenre, setSearchGenre] = useState([]);
	const [searchQuery, setSearchQuery] = useSearchParams()
	// console.log("searchQuery.get(q)", searchQuery.get("q"));
	const isPc = useMediaQuery({
		query: "(min-width : 1200px)"
	})
	const handleSelect = (e) => {
		let val = e.target.value;
		setSelected(val);
		setPage(1);
		dispatch(movieAction.getMovieList(page, val, rangeValue, searchGenre));
	};

	const rangeComplete = (years) => {
		setPage(1);
		dispatch(movieAction.getMovieList(page, Selected, years, searchGenre));
	};

	// 페이지 클릭시
	useEffect(() => {
		setLoading(true);
		dispatch(movieAction.getMovieList(page, null, rangeValue, null, null)).then(() => setLoading(false));
	}, [page]);

	// 장르 필터
	useEffect(() => {
		if (searchGenre.length) {
			setPage(1);
			dispatch(movieAction.getMovieList(page, Selected, rangeValue, searchGenre, null));
		}
	}, [searchGenre]);

	// 검색 
	useEffect(() => {
		if (searchQuery.get("q") != null) {
			setLoading(true)
			dispatch(movieAction.getSearchList(searchQuery.get("q"))).then(() => setLoading(false));
		} else {
			setLoading(true)
			dispatch(movieAction.getMovieList(page, null, rangeValue, null, null)).then(() => setLoading(false));
		}
	}, [searchQuery])

	if (loading) {
		return (
			<div className="loadingBar">
				<ClipLoader color="red" loading={loading} size={150} />
			</div>
		);
	}

	return (
		<>
			<div className="moviesContainer inner">
				<div className="flexDiv">
					{
						!searchQuery.get("q") && ((
							<div className="schForm">
								<article>
									<div className="tit">정렬</div>
									<div className="selectBox">
										<select onChange={handleSelect} value={Selected}>
											<option value="Popularity(Desc)">Popularity(Desc)</option>
											<option value="Popularity(Asc)">Popularity(Asc)</option>
											<option value="ReleaseDay(Desc)">Release Day(Desc)</option>
											<option value="ReleaseDay(Asc)">Release Day(Asc)</option>
											<option value="Vote(Desc)">Vote(Desc)</option>
											<option value="Vote(Asc)">Vote(Asc)</option>
										</select>
									</div>
								</article>
								<article className="filter">
									<div className="tit">필터</div>
									<section>
										<div className="s_tit">연도별</div>
										<InputRange
											maxValue={maxYear}
											minValue={minYear}
											value={rangeValue}
											onChange={(value) => setRangeValue(value)}
											onChangeComplete={(value) => rangeComplete(value)}
										/>
									</section>
									{
										isPc && (
											<section>
												<div className="s_tit">장르별</div>
												<ul className="genreList">
													{genreList.map((item, index) => (
														<MovieFilterGenre
															key={index}
															item={item}
															searchGenre={searchGenre}
															setSearchGenre={setSearchGenre}
														/>
													))}
												</ul>
											</section>
										)

									}
								</article>
							</div>
						))
					}

					<div className="movieList">
						<MovieList movieList={movieList.results} />
					</div>
				</div>
				<div className="paging flexDiv">
					<Pagination>
						<Pagination.First onClick={() => moveToPage(1)} />
						<Pagination.Prev onClick={() => moveToPage(page - 1)} />
						{items}
						<Pagination.Next onClick={() => moveToPage(page + 1)} />
						<Pagination.Last onClick={() => moveToPage(500)} />
					</Pagination>
				</div>
			</div>
		</>
	);
};

export default Movies;
