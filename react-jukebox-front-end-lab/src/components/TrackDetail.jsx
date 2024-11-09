// src/components/TrackDetail.jsx

const TrackDetail = (props) => {

    /* useState is being used as a workaround since this specific app isn't using ROUTES */

    if (!props.selectedTrack)
        return (
          <div>
            <h1>No track selected</h1>
          </div>
        )
  
    return (
        <div>
          <h2>{props.selectedTrack.title}</h2>
          <img src={`${props.selectedTrack.cover_art_url}`} alt={`${props.selectedTrack.title}`} />
          <h4>By {props.selectedTrack.artist}</h4>
          <p>Released in {props.selectedTrack.release_year} in the album {props.selectedTrack.album}</p>
        </div>
      );

};
  

export default TrackDetail