import { useMemo } from "react";
import { Material } from "../../../shared/types/types";
import VideoPlayer from "../components/VideoPlayer";

interface VideoPageProps {
  material: Material;
}

export default function VideoPage({ material }: VideoPageProps) {
  const video = useMemo(() => {
    return <VideoPlayer src={material.videoUrl!} />;
  }, [material.videoUrl]);

  return (
    <div className="p-4">
      <section className="relative w-full pt-[400px] max-sm:pt-[200px]">
        {video}
      </section>
      <section className="bg-white m-4">
        <h1 className="text-2xl mb-4 font-semibold">{material.title}</h1>
        <hr />
        <p className="text-l mb-4">{material.title}</p>
      </section>
    </div>
  );
}
