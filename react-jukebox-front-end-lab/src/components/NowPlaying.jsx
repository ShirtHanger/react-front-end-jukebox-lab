const NowPlaying = (props) => {

    /* useState is being used as a workaround since this specific app isn't using ROUTES */

    if (props.playingTrack)
        return (
            <div>
              <h2>🎵Now Playing: {props.playingTrack.title}🎵</h2>
            </div>
          )

}
  

export default NowPlaying