import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { faStar, faClock, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
const MovieList = ({ movieList }) => {
	const { genreList } = useSelector(state => state.movie);
	const isPc = useMediaQuery({
		query: "(min-width : 1200px)"
	});
	return (
		<ul>
			{movieList.map((item, index) => (
				<li key={index}>

					<Link to={`/movies/${item.id}`}>
						{item.backdrop_path == null ? (
							<div className="bg noImage" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/img/noImage.png)" }}></div>
						) : (
							<div className="bg" style={{ backgroundImage: "url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces" + item.backdrop_path + ")" }}></div>
						)
						}

						<div className="info">
							<div className="title">{item.title}</div>
							<div className="siteInfo flexDiv">
								<div>
									<FontAwesomeIcon icon={faCalendarDays} />
									{item.release_date}
								</div>
								<div>
									<FontAwesomeIcon icon={faStar} />
									{item.vote_average}
								</div>
							</div>
							{
								isPc && (

									<div className="genre">
										<ul>
											{item.genre_ids.map((id, index) => (
												<li key={index}>
													{genreList.find((item) => item.id == id).name}
												</li>
											))}
										</ul>
									</div>
								)
							}
							<div className="desc">{item.overview}</div>
						</div>
					</Link>
				</li>
			))}
		</ul>
	)
}

export default MovieList