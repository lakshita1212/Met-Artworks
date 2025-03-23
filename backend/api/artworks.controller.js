//Lakshita Madhavan 2/22/25
//IT302 452
//Phase 2 Assignment
//lm66@njit.edu

import ArtworksDAO from '../dao/artworksDAO.js'
import ImpressionsDAO from '../dao/impressionsDAO.js';

export default class ArtworksController {
  static async apiGetArtworks(req,res,next) {
    const artworksPerPage = req.query.artworksPerPage ? parseInt(req.query.artworksPerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0;
    let filters = {}
    if(req.query.department){
      filters.department = req.query.department
    } if(req.query.title){
      filters.title = req.query.title
    }
    const { artworksList, totalNumArtworks } = await ArtworksDAO.getArtworks({
        filters, page, artworksPerPage})
    
        let response = {
          artworks: artworksList,
          page: page,
          filters: filters,
          entries_per_page: artworksPerPage,
          total_results: totalNumArtworks,
        }
        res.json(response)
       }



       static async apiGetArtworkById(req, res, next) {
        try {
          let id = req.params.id || {}
          let artwork = await ArtworksDAO.getArtworkById(id)
          if(!artwork) {
            res.status(404).json({ error: "not found"})
            return
          }
          res.json(artwork)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
          }
        }


        static async apiGetImpressions(req, res, next) {
          try {
            let propertyTypes = await ImpressionsDAO.getImpressions()
            res.json(propertyTypes)
          } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
          }
        }      
    }
    