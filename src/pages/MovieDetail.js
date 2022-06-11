import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieAction } from "../redux/action/movieAction";
import ClipLoader from "react-spinners/ClipLoader";
import MovieRelated from "../component/MovieRelated";
import MovieReview from "../component/MovieReview";
import { Button, Modal } from "react-bootstrap";
import YouTube, { YouTubeProps } from "react-youtube";
const MovieDetail = () => {
	let { id } = useParams();
	const dispatch = useDispatch();
	const { movieDetail, movieReview, movieRated, movieVideo } = useSelector((state) => state.movie);
	let [loading, setLoading] = useState(true);
	let [tabCont, setTabCont] = useState("review");

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const tabContent = (props) => {
		setTabCont(props);
	};

	useEffect(() => {
		setLoading(true);
		setTabCont("review");
		dispatch(movieAction.getMovieDetail(id)).then(() => setLoading(false));
	}, [id]);
	if (loading) {
		return (
			<div className="loadingBar">
				<ClipLoader color="red" loading={loading} size={150} />
			</div>
		);
	}

	console.log("movieVideo", movieVideo);

	return (
		<div className="movieDetail">
			<div className="">
				<div className="thum">
					<img
						src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieDetail.poster_path}`}
						alt=""
					/>
				</div>
				<div className="info inner1200">
					<div className="movieTitle">
						<h2>{movieDetail.title}</h2>
					</div>
					<div className="desc">{movieDetail.overview}</div>
					<div className="sideInfo">
						<div>
							<p>
								<FontAwesomeIcon icon={faCalendarDays} />
							</p>
							<span>{movieDetail.release_date}</span>
						</div>
						<div>
							<p>
								<FontAwesomeIcon icon={faStar} />
							</p>
							<span>{movieDetail.vote_average}</span>
						</div>
						<div>
							<p>
								<FontAwesomeIcon icon={faClock} />
							</p>
							<span>{movieDetail.runtime}분</span>
						</div>
					</div>
				</div>
				<div className="trailer">
					<Button variant="primary" onClick={handleShow}>
						Trailer View
					</Button>
					<Modal show={show} onHide={handleClose} className="trailer-modal">
						<Modal.Body>
							<div className="youtube">
								<YouTube videoId={movieVideo.results[0].key} />;
							</div>
						</Modal.Body>
					</Modal>
				</div>
			</div>
			<div className="tabMenu">
				<div className="inner1200">
					<div className="btns">
						<ul>
							<li className="on">
								<button onClick={() => tabContent("review")}>
									REVIEWS({movieReview.results.length})
								</button>
							</li>
							<li>
								<button onClick={() => tabContent("related")}>
									RELATED MOVIES({movieRated.results.length})
								</button>
							</li>
						</ul>
					</div>
					<div className="tabCont">
						{tabCont === "review" && (
							<section className="review">
								<article>
									{
										movieReview.results.length ? (
											movieReview.results.map((item) => (
												<MovieReview item={item} />
											))
										) : (
											"작성된 리뷰가 없습니다."
										)
									}
								</article>
							</section>
						)}
						{tabCont === "related" && (
							<section className="related">
								<ul className="list">
									{movieRated.results.map((item) => (
										<MovieRelated item={item} />
									))}
								</ul>
							</section>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
