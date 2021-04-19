import React from "react"
import "./style.less"

export const H265Test: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (videoRef.current) {
      const playable = videoRef.current.canPlayType('video/mp4; codecs="hevc"')
      console.log("playable: ", playable)
    }
  }, [])

  return (
    <div>
      <video className="h265video" controls autoPlay ref={videoRef}>
        <source
          src="http://wxrg0135:6767/mnt/WXRG0135/wujie/video-h265.mkv"
          type="video/mp4"
        />
        <source
          src="https://media.w3.org/2010/05/sintel/trailer.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  )
}
