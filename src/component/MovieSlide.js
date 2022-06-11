import React, { useState } from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
const MovieSlide = ({ movies }) => {
	return (
		<>
			<div className="movieSlider">
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y]}
					spaceBetween={10}
					slidesPerView={5}
					navigation
					onSlideChange={() => console.log("slide change")}
					breakpoints={{
						0: {
							slidesPerView: 2,
						},
						640: {
							slidesPerView: 3,
						},
						1200: {
							slidesPerView: 5,
						},
					}}
				// onSwiper={(swiper) => console.log(swiper)}

				>
					{movies.results.map((item, index) => (
						<SwiperSlide key={index}>
							<Link
								to={`/movies/${item.id}`}
							>
								<MovieCard item={item} />
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</>
	);
};

export default MovieSlide;
