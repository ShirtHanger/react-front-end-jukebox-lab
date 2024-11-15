import { useState, useEffect } from 'react'


import * as trackService from './services/trackService' // The star imports EVERYTHING from the trackService file, think ahead of time

import TrackList from './components/TrackList'
import TrackDetail from './components/TrackDetail'
import TrackForm from './components/TrackForm'
import NowPlaying from './components/NowPlaying'


import './App.css'

const App = () => {

  /* Track list states */
  const [trackList, setTrackList] = useState([]) // Initially empty


  // Variable for a selected track and form
  const [selected, setSelected] = useState(null) // Initially null 
  const [playing, setPlaying] = useState(null) // Initially null 
  const [isFormOpen, setIsFormOpen] = useState(false)
  /* useState is being used as a workaround since this specific app isn't using ROUTES */


  useEffect(() => {

    // create a new async function
    async function fetchTracks() {

      try {
        // call on the index function for an API call
        const tracks = await trackService.indexTracks()
        if (tracks.error) {
          throw new Error(tracks.error)
        }

        // Set trackList state to the returned tracks data
        setTrackList(tracks)

      } catch (error) {
        // Log the error object
        console.log(error)
      }
    }
    // invoke the function
    fetchTracks()

    // add an empty dependency array to the `useEffect` hook.
  }, [])

  function updateSelectedTrack(track) {
    setSelected(track)
  }

  function updatePlayingTrack(track) {
    console.log(`Now playing: ${track.title} (${track._id})`)
    setPlaying(track)
  }

  /* If there is no track being shown in detail, assumes you want new track. Otherwise, update the shown track */

  function handleFormView(track) {
    if (!track.title) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  /* Adds new track to database. */
  async function handleAddTrack(formData) {
    try { // Summons axios function from trackService.js
      const newTrack = await trackService.createTrack(formData)
  
      if (newTrack.error) {
        throw new Error(newTrack.error)
      }

      // Updates track list to include new track
      setTrackList([newTrack, ...trackList])
      // Close form
      setIsFormOpen(false)
    } catch (error) {
      // error handling
      console.log(error)
    }
  }

  async function handleUpdateTrack(formData, trackId) {
    try {
      const updatedTrack = await trackService.updateTrack(formData, trackId)
  
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error)
      }
  
      const updatedTrackList = trackList.map((track) =>
        // If the id of the current track is not the same as the updated track's id, return the existing track. If the id's match, instead return the updated track.
        track._id !== updatedTrack._id ? track : updatedTrack
      )
      // Set trackList state to this updated array
      setTrackList(updatedTrackList)

      // If we don't set selected to the updated track object, the details page will reference outdated data until the page reloads.
      setSelected(updatedTrack)
      setIsFormOpen(false)

    } catch (error) {
      // error handling
      console.log(error)
    }
  }

  async function handleDeleteTrack(trackId) {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId)
  
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error)
      }

      /* Using filter to create new track array that EXCLUDES the track that was targetted for deletion, 
      by excluding any object with the Id of the target's ID */

      
  
      setTrackList(trackList.filter(track => 
        track._id !== deletedTrack._id
      ))

      setSelected(null)
      setIsFormOpen(false)

    } catch (error) {
      // error handling
      console.log(error)
    }
  }

  

  return (

  <>
    <h1>My favorite tracks</h1>
      <TrackList 
      trackList={trackList}
      updateSelectedTrack={updateSelectedTrack}
      handleUpdateTrack={handleUpdateTrack}
      handleDeleteTrack={handleDeleteTrack}
      handleFormView={handleFormView}
      updatePlayingTrack={updatePlayingTrack}
      isFormOpen={isFormOpen} /* Allows "Open/Close form" to conditionally render */
      />

      <NowPlaying
      playingTrack={playing}/>

      {/* IF/ELSE to determine if form view will be shown or not */}
      
      {isFormOpen ? (

          <TrackForm handleAddTrack={handleAddTrack} handleUpdateTrack={handleUpdateTrack} selectedTrack={selected}/>
        ) : (
          <TrackDetail selectedTrack={selected} handleFormView={handleFormView} handleDeleteTrack={handleDeleteTrack} />
        )}
  </>

  )
}


export default App
