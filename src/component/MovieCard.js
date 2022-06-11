import React, { useState } from 'react'
import MovieHoverInfo from './MovieHoverInfo'
import { CSSTransition } from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
const MovieCard = ({ item }) => {
	const [showInfo, setShowInfo] = useState(false);
	const isPc = useMediaQuery({
		query: "(min-width : 1200px)"
	});

	return (
		<div
			onMouseEnter={() => setShowInfo(true)}
		// onMouseLeave={() => setShowInfo(false)}
		>
			<div className="img">
				<img
					src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.poster_path}`}
					alt=""
				/>
			</div>
			{
				isPc && (
					<CSSTransition in={showInfo} timeout={5000} classNames="my-node" >
						<MovieHoverInfo item={item} showInfo={showInfo} setShowInfo={setShowInfo} />
					</CSSTransition>
				)
			}
		</div >
	)
}

export default MovieCard