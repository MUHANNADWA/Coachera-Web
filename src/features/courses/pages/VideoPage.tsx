import { useMemo } from "react";
import { Material } from "../../../shared/types/types";
import VideoPlayer from "../components/VideoPlayer";

interface VideoPageProps {
  material: Material;
}

export default function VideoPage({ material }: VideoPageProps) {
  const videoUrl =
    material.videoUrl ??
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const video = useMemo(() => <VideoPlayer src={videoUrl} />, [videoUrl]);

  return (
    <div className="p-4">
      {/* Sticky Video Player */}
      <div className="consect sticky top-16 z-20! rounded-2xl overflow-hidden">
        {video}
      </div>

      {/* Description Section */}
      <section className="mt-6 rounded-2xl">
        <h1 className="consect p-4 text-2xl font-semibold mb-4">
          {material.title}
        </h1>
        <p className="consect p-4 text-lg text-gray-700">{material.title}</p>
      </section>
    </div>
  );
}
