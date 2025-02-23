//Lakshita Madhavan 2/22/25
//IT302 452
//Phase 2 Assignment
//lm66@njit.edu

import express from 'express'
import ArtworksController from './artworks.controller.js'

const router = express.Router()

router.route('/').get(ArtworksController.apiGetArtworks)

export default router
