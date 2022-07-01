import { Player, Youtube, DefaultUi } from "@vime/react"
import { FunctionComponent, memo } from "react"

interface VideoPlayerProps{
    videoId:string
}

export const VideoPlayer:FunctionComponent<VideoPlayerProps> = ({videoId}) =>{
    return(
      <Player className="self-center">
        <Youtube  videoId={videoId}/>
        <DefaultUi/>
      </Player>)
  }