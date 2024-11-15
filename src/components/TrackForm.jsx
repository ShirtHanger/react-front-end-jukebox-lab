import { useState } from 'react'

const TrackForm = (props) => {

  /* The object keys MUST match the mongoose API keys in schema */

  const initialState = {
    title: '',
    album: '',
    artist: '',
    release_year: '',
    genre: '',
    cover_art_url: '',
  }

  // formData state to control the form
  // If track data has been passed as props, we set formData as that track object.
  // Otherwise, we can assume this is a new track form, and use the empty initialState object.
  const [formData, setFormData] = useState(props.selectedTrack ? props.selectedTrack : initialState)

  // handleChange function to update formData state
  async function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  async function handleSubmitForm(event) {
    event.preventDefault()
    if (props.selectedTrack) { /* If a specific track was selected, update that track with form data */
      props.handleUpdateTrack(formData, props.selectedTrack._id)
    } else { /* Otherwise, add a new track to the database */
      props.handleAddTrack(formData) 
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="title"> title </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="album"> Album </label>
        <input
          id="album"
          name="album"
          value={formData.album}
          onChange={handleChange}
        />

        <label htmlFor="artist"> Artist </label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />

        <label htmlFor="release_year"> Release Year </label>
        <input
          id="release_year"
          name="release_year"
          value={formData.release_year}
          onChange={handleChange}
        />

        <label htmlFor="genre"> Genre </label>
        <input
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />

        <label htmlFor="cover_art_url"> Covert Art </label>
        <input
          id="cover_art_url"
          name="cover_art_url"
          value={formData.cover_art_url}
          onChange={handleChange}
        />

        <button type="submit" onClick={handleSubmitForm}> {props.selectedTrack ? `Update ${props.selectedTrack.title}'s info` : 'Add New Track'} </button> {/* UI feedback */}
        {/* Lets user know, update or new track. Based on if a track is being shown in detail already */}
      </form>
    </div>
  )
}

export default TrackForm