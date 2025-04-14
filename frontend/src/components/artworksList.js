/*
Lakshita Madhavan
IT302 - 452 - Advanced internet applications
4/14/2025
Phase 4 Read Node.js Data
lm66@njit.edu
*/

import React, { useState, useEffect } from 'react'
import ArtworksDataService from "../services/artworksDataService"
import { Link } from "react-router-dom"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


const ArtworksList = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [department, setDepartments] = useState(["All Departments"]);

  useEffect(() => {
    retrieveArtworks();
    retrieveDepartments();
  }, []);


  const retrieveArtworks = () => {
    ArtworksDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setArtworks(response.data.artworks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveDepartments = () => {
    ArtworksDataService.getDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(["All Departments"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value
    setSearchTitle(searchTitle);
  };

  const onChangeSearchDepartment = (e) => {
    const searchDepartment = e.target.value;
    setSearchDepartment(searchDepartment);
  };
  const find = (query, by) => {
    ArtworksDataService.find(query, by)
      .then(response => {
        console.log(response.data)
        setArtworks(response.data.artworks)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const findByTitle =
  () => {
    setSearchDepartment("")
    find(searchTitle, "title")
  }
const findByDepartment =
  () => {
    setSearchTitle("")
    if (searchDepartment === "All Departments") {
      retrieveArtworks()
    } else {
      find(searchDepartment, "department")
    }
  }



  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select" onChange={onChangeSearchDepartment} >
                  {department.map(department => {
                    return (
                      <option value={department} selected={department === searchDepartment} >{department}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByDepartment}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {artworks.map((artwork) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={artwork.primaryImageSmall || "https://via.placeholder.com/180x100?text=No+Image"} />
                  <Card.Body>
                    <Card.Title>{artwork.title}</Card.Title>
                    <Card.Text>
                      <strong>Department:</strong> {artwork.department}
                    </Card.Text>
                    <Card.Text>
                      <strong>Medium:</strong> {artwork.medium}
                    </Card.Text>
                    <Card.Text>
                      <strong>Credit Line:</strong> {artwork.creditLine || "N/A"}
                    </Card.Text>
                    <Link to={`/lm66_artworks/${artwork._id}`} >View Details</Link>
                  </Card.Body>
                </Card>
              </Col>

            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ArtworksList;
