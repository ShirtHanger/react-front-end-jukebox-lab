import { useState, useEffect } from 'react'


import * as trackService from './services/trackService' // The star imports EVERYTHING from the trackService file, think ahead of time

import TrackList from './components/TrackList'
import TrackDetail from './components/TrackDetail'
import TrackForm from './components/TrackForm'


import './App.css'

// src/App.jsx

const App = () => {

  /* Track list states */
  const [trackList, setTrackList] = useState([]) // Initially empty


  /* Variable for a selected track and form */
  const [selected, setSelected] = useState(null) // Initially null 
  const [isFormOpen, setIsFormOpen] = useState(false)
  /* useState is being used as a workaround since this specific app isn't using ROUTES */


  useEffect(() => {

    // create a new async function
    async function fetchTracks() {

      try {
        // call on the index function for an API call
        const tracks = await trackService.index()
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

  /* If there is no track being shown in detail, assumes you want new track. Otherwise, update the shown track */

  function handleFormView(track) {
    if (!track.name) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  async function handleAddTrack(formData) {
    try {
      const newTrack = await trackService.create(formData)
  
      if (newTrack.error) {
        throw new Error(newTrack.error)
      }
  
      setTrackList([newTrack, ...trackList])
      setIsFormOpen(false)
    } catch (error) {
      // Log the error to the console
      console.log(error)
    }
  }

  async function handleUpdateTrack(formData, trackId) {
    try {
      const updatedTrack = await trackService.update(formData, trackId)
  
      if (updatedTrack.error) {
        throw new Error(updatedTrack.error)
      }
  
      setTrackList([updatedTrack, ...trackList])
      setIsFormOpen(false)
      setSelected(updatedTrack)
    } catch (error) {
      // Log the error to the console
      console.log(error)
    }
  }

  return (

  <>
  <h1>The best tracks of all time!</h1>
  <TrackList 
  trackList={trackList}
  updateSelectedTrack={updateSelectedTrack}
  handleFormView={handleFormView}/>
  {/* IF/ELSE to determine if form view will be shown or not */}
  {isFormOpen ? (
      <TrackForm handleAddTrack={handleAddTrack} handleUpdateTrack={handleUpdateTrack} selectedTrack={selected} />
    ) : (
      <TrackDetail selectedTrack={selected} handleFormView={handleFormView} />
    )}
  </>

  )
}


export default App

