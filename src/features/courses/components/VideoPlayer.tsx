import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface VideoPlayerProps {
  src: string;
  size?: number;
}

export default function VideoPlayer({ src, size }: VideoPlayerProps) {
  return (
    <div className="w-full md:h-[300px] aspect-video">
      <Plyr
        source={{
          type: "video",
          sources: [
            src.includes("youtu.be")
              ? {
                  src: src,
                  provider: "youtube",
                }
              : {
                  src: src,
                  type: "video/mp4",
                  size: size,
                },
          ],
        }}
        options={{
          autoplay: true,
          controls: [
            "play-large",
            "rewind",
            "play",
            "fast-forward",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            "captions",
            "settings",
            "pip",
            "airplay",
            "download",
            "fullscreen",
          ],
        }}
      />
    </div>
  );
}
