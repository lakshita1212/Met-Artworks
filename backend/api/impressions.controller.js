//Lakshita Madhavan 3/22/25
//IT302 452
//Phase 3 Assignment
//lm66@njit.edu


import ImpressionsDAO from '../dao/impressionsDAO.js'

export default class ImpressionsController {

  static async apiPostImpression(req,res,next) {
    try {
      const artworkId = req.body.artwork_id
      const impression = req.body.impression
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const lastModified = new Date()

      const ImpressionResponse = await ImpressionsDAO.addImpression(
        artworkId,
        userInfo,
        impression,
        lastModified
      )
    res.json(ImpressionResponse)
    } catch(e) {
    res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateImpression(req,res,next) {
    try {
      const impressionId = req.body.impression_id
      const impression = req.body.impression
      const lastModified = new Date()
      const ImpressionResponse = await ImpressionsDAO.updateImpression(
        impressionId,
        req.body.user_id,
        impression,
        lastModified
      )
  
      var { error } = ImpressionResponse
      if(error) {
        res.status.json({error})
      }
      if(ImpressionResponse.modifiedCount === 0) {
        throw new Error ("unable to update impression. User may not be original poster")
      }
      res.json(ImpressionResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
  static async apiDeleteImpression(req,res,next) {
    try {
      const impressionId = req.body.impression_id
      const userId = req.body.user_id
      const ImpressionResponse = await ImpressionsDAO.deleteImpression(
        impressionId,
        userId,
      )
      res.json(ImpressionResponse)
    } catch(e) {
      res.status(500).json({ error: e.message})
    }
  }
  
}
