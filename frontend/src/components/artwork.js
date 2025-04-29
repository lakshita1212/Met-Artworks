/*
Lakshita Madhavan
IT302 - 452 - Advanced internet applications
4/26/2025
Phase 5 Read CUD Node.js Data
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
import Button from 'react-bootstrap/Button';


const Artwork = (props) => {

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


  const deleteImpression = (impressionId, index) => {
    ArtworkDataService.deleteImpression(impressionId, props.user.id)
      .then(response => {
        setArtwork((prevState) => {
          prevState.impressions.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
  



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
      {props.user &&
      <Link to={"/lm66_artworks/" + id + "/impression"}>
      Add impression
      </Link>}
      </Card.Body>
      </Card>
      <br></br>
<h2>Impressions</h2><br></br>
{artwork.impressions.map((impression, index) => {
return (
<Card key={index}>
<Card.Body>
<h5>{impression.name + " posted on " + new Date(Date.parse(impression.date)).toDateString()}</h5>
<p>{impression.impression}</p>
{ props.user && props.user.id === impression.user_id &&
<Row>
<Col><Link
 to={"/lm66_artworks/" + id + "/impression"}
 state={{ currentImpression:impression}}
>Edit</Link>
</Col>
<Col><Button variant="link" onClick={() => deleteImpression(impression._id, index)} >Delete</Button></Col>
</Row> }
</Card.Body>
</Card>
)
})}

      </Col>
      </Row>
      </Container>

    </div>
  );
}

export default Artwork;
