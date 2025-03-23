//Lakshita Madhavan 2/22/25
//IT302 452
//Phase 2 Assignment
//lm66@njit.edu

import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import ArtworksDAO from './dao/artworksDAO.js'
import ImpressionsDAO from './dao/impressionsDAO.js'



async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.ARTWORKS_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await ArtworksDAO.injectDB(client)
    await ImpressionsDAO.injectDB(client)


    app.listen(port, () => {
        console.log('server is running on port:' + port);
        })
    
      } catch (e) {
        console.error(e);
        process.exit(1)
      }
    }
    main().catch(console.error);
    
