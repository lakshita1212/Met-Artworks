//Lakshita Madhavan 2/22/25
//IT302 452
//Phase 2 Assignment
//lm66@njit.edu

import express from 'express'
import ArtworksController from './artworks.controller.js'
import ImpressionsController from './impressions.controller.js'

const router = express.Router()

router.route('/').get(ArtworksController.apiGetArtworks)
router.route("/id/:id").get(ArtworksController.apiGetArtworkById)
router.route("/impressions").get(ArtworksController.apiGetImpressions)

router
    .route("/impression")
    .post(ImpressionsController.apiPostImpression)
    .put(ImpressionsController.apiUpdateImpression)
    .delete(ImpressionsController.apiDeleteImpression)

export default router
