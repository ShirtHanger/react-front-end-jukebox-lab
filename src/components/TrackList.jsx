const TrackList = (props) => {

    /* Creates a list of track elements for the web page. Each individual track will look like this */

    const tracks = props.trackList.map((track) => (
        // Using setState variable/function from app.jsx to
        <a key={track._id} onClick={() => props.updateSelectedTrack(track)}>
            
            <li className="card">
            <div className="crud-buttons">
                <button onClick={() => props.handleFormView(track)}>Edit info on {track.title}</button>
                <button onClick={() => props.handleDeleteTrack(track._id)}>Purchase {track.title}</button>
            </div>
                <img src={`${track.cover_art_url}`} alt={`${track.title}`} />
                <h5>{track.title}</h5>
                <h6>{track.release_year}</h6>

                <button onClick={() => props.updatePlayingTrack(track)}>Play {track.title}</button>
            </li>
        </a>
    ))
  
    return (
        <div>
          {/* Renders track list, but if there are no tracks, shows message indicating such */}

          {!props.trackList.length ? 
          <h3>No Tracks Yet!</h3> 
          : 
          <ul className="grid">{tracks}</ul>}
          
          <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Track'}
            </button>
        </div>
      )

}
  

export default TrackList