import React, { useEffect, useState } from "react";
import { Navbar, Button, Form, Container, Nav, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Navation = () => {
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState("");
	const navSearch = (event) => {
		event.preventDefault();
		navigate(`/movies?q=${searchValue}`);
	}
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="inner">
			<Container fluid>
				<Navbar.Brand href="/">
					<img width={100} src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="NETFLIX" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Link to="/">Home</Link>
						<Link to="/Movies">Movie</Link>
					</Nav>
					<Form className="d-flex" onSubmit={(event) => navSearch(event)}>
						<FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(event) => setSearchValue(event.target.value)} value={searchValue} />
						<Button variant="danger" type="suubmit">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navation;
