//Lakshita Madhavan 2/22/25
//IT302 452
//Phase 2 Assignment
//lm66@njit.edu
let artworks
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

export default class ArtworksDAO {
  static async injectDB(conn) {
    if(artworks){ 
      return
    } try {
      artworks = await conn.db(process.env.ARTWORKS_NS).collection('art_lm66')
    } catch(e) {
      console.error(`unable to connect in artworksDAO: ${e}`)
    }
  }
  static async getArtworks({
    filters = null,
    page = 0,
    artworksPerPage = 20,
  } = {}) {
    let query
    if(filters) {
      if("title" in filters) {
        query = { $text: { $search: filters['title']}}
      }if("department" in filters) {
        query = { "department": { $eq: filters['department']}}
    }
 }
 let cursor
 try {
   cursor = await artworks
     .find(query)
     .limit(artworksPerPage)
     .skip(artworksPerPage * page)
   const artworksList = await cursor.toArray()
   const totalNumArtworks = await artworks.countDocuments(query)
   return {artworksList, totalNumArtworks}
 } catch(e) {
   console.error(`Unable to issue find command, ${e}`)
   console.error(e)
   return { artworksList: [], totalNumArtworks: 0 }
 }
}

static async getArtworkById(id) {
  try {
    return await artworks.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        }
      },
      { $lookup:
        {
          from: 'impressions',
          localField: '_id',
          foreignField: 'artwork_id',
          as: 'impressions'
        }
      }
    ]).next()
  }
  catch(e) {
    console.error(`something went wrong in getArtworkById: ${e}`)
    throw e
  }
}
static async getDepartments() { 
  let departments = []
  try {
    departments = await artworks.distinct("department")
    return departments
  } catch(e) {
    console.error(`unable to get departments, ${e}`)
    return departments
  }
}

}
