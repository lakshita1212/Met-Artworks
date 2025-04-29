/*
Lakshita Madhavan
IT302 - 452 - Advanced internet applications
4/26/2025
Phase 5 Read CUD Node.js Data
lm66@njit.edu
*/

import React, { useState } from 'react'
import ArtworkDataService from "../services/artworksDataService"
import { Link, useParams ,useLocation} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddImpression = (props) => {
  let editing = false
  let initialImpressionState = ""

  const location = useLocation();
  if (location.state && location.state.currentImpression) {
    editing = true
    initialImpressionState = location.state.currentImpression.impression
  }


  const [impression, setImpression] = useState(initialImpressionState)

  const [submitted, setSubmitted] = useState(false)
  let { id } = useParams();

  const onChangeImpression= e => {
    const impression = e.target.value
    setImpression(impression);
  }

  const saveImpression = () => {
    var data = {
      impression: impression,
      name: props.user.name,
      user_id: props.user.id,
      artwork_id: id
    }
    if (editing) {
      data.impression_id = location.state.currentImpression._id
      ArtworkDataService.updateImpression(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
    ArtworkDataService.createImpression(data)
      .then(response => {
        setSubmitted(true)
      }).catch(e => { })}
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h5>Impression posted successfully</h5>
          <Link to={"/lm66_artworks/" + id}>
            Back to Artwork
          </Link>
        </div>
              ) : (
                <Form>
                  <Form.Group>
                    <Form.Label>{editing ? "Edit" : "Create"} Impression</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={impression}
                      onChange={onChangeImpression}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={saveImpression}>
            Post
          </Button>
        </Form>
      )}
    </div>
  )
}


export default AddImpression;
