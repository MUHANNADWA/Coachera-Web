import Plyr from 'plyr-react';
import 'plyr-react/plyr.css'; // Default styles

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps){
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <Plyr
        source={{
          type: 'video',
          sources: [
            {
              src: src,
              type: 'video/mp4',
            },
          ],
        }}
        options={{
          autoplay: true,
          controls: [
            'play-large',
            'rewind',
            'play',
            'fast-forward',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'download',
            'fullscreen'
          ],
        }}
      />
    </div>
  );
}
