import axios from "axios"

/* The attached VITE URL is pulled from the .env file */
/* This format is good because it is interchangeable! */
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`
// src/services/trackService.js

/* Functions to make API pulls */

// Read - Index
/* populates the REACT website with a list of tracks */

async function index() {
    try {
        const response = await axios.get(BASE_URL)
        return response.data // Sends data back in JSON format, axios does this automatically, so .json() is not required
    } catch (error) {
        console.log(error)
    }
}

// CREATE, make a new track object!

const create = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

// UPDATE, update an existing track object
  
const update = async (formData, trackId) => {
  try {
    const response = await axios.put(`${BASE_URL}/${trackId}`, formData) 
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Can only export one thing
// Get around it by nesting them all in objects
export { index, create, update }
