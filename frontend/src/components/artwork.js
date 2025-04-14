/*
Lakshita Madhavan
IT302 - 452 - Advanced internet applications
4/14/2025
Phase 4 Read Node.js Data
lm66@njit.edu
*/
import React, {useState, useEffect} from 'react'
import ArtworkDataService from '../services/artworksDataService'
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const Artwork = ({user}) => {

  const [artwork, setArtwork] = useState({
    id: null,
    title: "",
    department:"",
    impressions:[]
  })
 let { id } = useParams();

 const getArtwork = id => {
  ArtworkDataService.get(id)
    .then(response => {
      setArtwork(response.data)
      console.log(response.data)
    })
    .catch(e => {
      console.log(e);
    })
}
useEffect( () => {
  getArtwork(id)
    },[id])

return (
    <div>
      <Container>
      <Row>
      <Col>
      <Image src={artwork.primaryImageSmall || "https://via.placeholder.com/180x100?text=No+Image"} fluid />
      </Col>
      <Col>
      <Card>
      <Card.Header as="h5">{artwork.title}</Card.Header>
      <Card.Body>
      <Card.Text>
      {artwork.creditLine}
      </Card.Text>
      {user &&
      <Link to={"/artworks/" + id + "/impression"}>
      Add impression
      </Link>}
      </Card.Body>
      </Card>
      </Col>
      </Row>
      </Container>

    </div>
  );
}

export default Artwork;
