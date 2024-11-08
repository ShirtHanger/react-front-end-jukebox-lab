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
          <h2>Name: {props.selectedTrack.name}</h2>
          <h4>Age: {props.selectedTrack.age}</h4>
          <h4>Breed: {props.selectedTrack.breed}</h4>
          <p>{props.selectedTrack.name} is a {props.selectedTrack.age} year old {props.selectedTrack.breed}!</p>
        </div>
      );

};
  

export default TrackDetail