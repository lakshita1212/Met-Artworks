/*
Lakshita Madhavan
IT302 - 452 - Advanced internet applications
4/14/2025
Phase 4 Read Node.js Data
lm66@njit.edu
*/
import axios from "axios";

class ArtworkDataService {


  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks?page=${page}`
    );
  }
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks/id/${id}`
    );
  }
  find(query, by = "title", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks?${by}=${query}&page=${page}`
    )
  }

  createImpression(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks/impression`, data)
  }

  updateImpression(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks/impression`, data)
  }
  deleteImpression(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks/impression`,
      { data: { impression_id: id, user_id: userId } }
    )
  }

  getDepartments() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/lm66/artworks/departments`)

  }
}
export default new ArtworkDataService();
