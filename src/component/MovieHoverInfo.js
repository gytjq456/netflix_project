import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const MovieHoverInfo = ({ item, showInfo, setShowInfo }) => {
	const { genreList } = useSelector((state) => state.movie);
	const [isHover, setIsHover] = useState(true);

	const test = () => {
		setIsHover(false)
		setTimeout(() => {
			setIsHover(true)
			setShowInfo(false)
		}, 500);
	}
	return (
		<>
			{
				showInfo && (
					<div className={`movieHoverInfo ${isHover ? "" : "close"}`} onMouseLeave={() => test()}>
						<div>
							<div className="thum">
								<img
									src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`}
									alt=""
								/>
							</div>
							<div className="info">
								<div className="title">{item.title}</div>
								<div className="genreList">
									{item.genre_ids.map((id, index) => (
										<span key={index}>{genreList.find((item) => item.id == id).name}</span>
									))}
								</div>
								<div className="sideInfo">
									<p>평점 : {item.vote_average}</p>
									<p className="adult">{item.adult ? "청불" : "전체관람"}</p>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</>
	);
};

export default MovieHoverInfo;
