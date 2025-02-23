//Lakshita Madhavan 2/22/25
//IT302 452
//Phase 2 Assignment
//lm66@njit.edu

import ArtworksDAO from '../dao/artworksDAO.js'

export default class ArtworksController {
  static async apiGetArtworks(req,res,next) {
    const artworksPerPage = req.query.artworksPerPage ? parseInt(req.query.artworksPerPage) : 20
    const page = req.query.page ?   parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.department){
      filters.department = req.query.department
    } else if(req.query.title){
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
    }
    