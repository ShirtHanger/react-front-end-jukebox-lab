import axios from "axios"

/* The attached VITE URL is pulled from the .env file */
/* This format is good because it is interchangeable! */
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`
// src/services/trackService.js

/* Functions to make API pulls */

// Read - Index
/* populates the REACT website with a list of tracks */

async function indexTracks() {
  try {
      const response = await axios.get(BASE_URL)
      return response.data // Sends data back in JSON format, axios does this automatically, so .json() is not required
  } catch (error) {
      console.log(error)
  }
}

// CREATE, make a new track object!

async function createTrack(formData) {
  try { /* axios.post takes the target URL and the new object as arguements */
    const response = await axios.post(BASE_URL, formData)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// UPDATE, update an existing track object
  
async function updateTrack(formData, trackId) {
  try { /* axios.put takes the target object's URL and the updated object as arguements */
    const response = await axios.put(`${BASE_URL}/${trackId}`, formData) 
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// DELETE - Deletes a track from the database!
  /* It told me 'delete' was a reserved word */

async function deleteTrack(trackId) {
  try { /* axios.delete only takes the target object's URL as an arguement */
    const response = await axios.delete(`${BASE_URL}/${trackId}`) 
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Can only export one thing
// Get around it by nesting them all in objects
export { indexTracks, createTrack, updateTrack, deleteTrack }
