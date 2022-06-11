import logo from "./logo.svg";
// import './App.css';
import "./Reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import "./Media.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Navation from "./component/Navation";
import Footer from "./component/Footer";

function App() {
	return (
		<div id="wrap">
			<header>
				<Navation />
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movies/:id" element={<MovieDetail />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
