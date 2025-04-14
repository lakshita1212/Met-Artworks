/*
Lakshita Madhavan
IT302 - 452 - Advanced internet applications
4/14/2025
Phase 4 Read Node.js Data
lm66@njit.edu
*/
import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddImpression from "./components/addImpression";
import ArtworksList from "./components/artworksList";
import Artwork from "./components/artwork";
import Login from "./components/login";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
   <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Artwork Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/lm66_artworks"}>
              Artworks
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
      <Routes>
    <Route path="/" element={<ArtworksList />}></Route>
    <Route path="/lm66_artworks" element={<ArtworksList />}></Route>

    <Route path="/lm66_artworks/:id/" element={<Artwork user={user} />}></Route>

    <Route
    path="/lm66_artworks/:id/impression"
    element={<AddImpression user={user} />}
        ></Route>

  <Route path="/login" element={<Login login={login} />}></Route>
      </Routes>


    </div>
  );
}

export default App;
