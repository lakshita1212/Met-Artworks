//Lakshita Madhavan 3/22/25
//IT302 452
//Phase 3 Assignment
//lm66@njit.edu


import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let impressions
export default class ImpressionsDAO {
  static async injectDB(conn) {
    if(impressions) {
      return
    } try {
      impressions = await conn.db(process.env.ARTWORKS_NS).collection('impressions')
    } catch(e) {
      console.error(`unable to establish connection handle in impressionsDAO: ${e}`)
    }
  }
  static async addImpression(artworkId, user, impression, date) {
    try {
      const impressionDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        impression: impression,
        artwork_id: ObjectId.createFromHexString(artworkId)
      }
      return await impressions.insertOne(impressionDoc)
    } catch(e) {
      console.error(`unable to post impression: ${e}`)
      console.error(e)
      return { error: e }
    }
  }
  static async updateImpression(impressionId, userId, impression, date) {
    try {
      const updateResponse = await impressions.updateOne(
        { user_id: userId, _id: ObjectId.createFromHexString(impressionId) },
        { $set: {impression: impression, date: date } }
      )
      return updateResponse
    } catch(e) {
      console.error(`unable to update impression: ${e}`)
      console.error(e)
      return { error: e}
    }
  }
  static async deleteImpression(impressionId, userId) {
    try {
      const deleteResponse = await impressions.deleteOne({
        _id: ObjectId.createFromHexString(impressionId),
        user_id: userId,
      })
      return deleteResponse
    } catch(e) {
      console.error(`unable to delete impression: ${e}`)
      console.error(e)
      return { error: e.message }
    }
  }
  
  
}
