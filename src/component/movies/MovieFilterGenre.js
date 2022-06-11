import React, { useState } from "react";

const MovieFilterGenre = ({ item, searchGenre, setSearchGenre }) => {
	const [isClass, setIsClass] = useState(false);

	const handlerEvent = (genreId) => {
		setIsClass(!isClass);
		setSearchGenre(
			isClass ? [...searchGenre.filter((id) => genreId !== id)] : [...searchGenre, genreId]
		);
	};
	return (
		<li className={isClass ? "on" : ""} onClick={() => handlerEvent(item.id)}>
			{item.name}
		</li>
	);
};

export default MovieFilterGenre;
