import express from 'express'
import ArtworksController from './artworks.controller.js'

const router = express.Router()

router.route('/').get(ArtworksController.apiGetArtworks)

export default router
