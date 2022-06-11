import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MovieRelated = ({ item }) => {
	return (
		<li>
			<Link to={`/movies/${item.id}`}>
				<div className="img">
					<img
						src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`}
						alt=""
					/>
				</div>
				<div className="title">
					<p>{item.title}</p>
				</div>
				<div className="sideInfo">
					<div>
						<p>
							<FontAwesomeIcon icon={faCalendarDays} />
						</p>
						<span>{item.release_date}</span>
					</div>
					<div>
						<p>
							<FontAwesomeIcon icon={faStar} />
						</p>
						<span>{item.vote_average}</span>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default MovieRelated;
