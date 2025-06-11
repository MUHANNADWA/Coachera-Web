import { Material } from "../../../shared/types/types"; // Adjust path as needed
import VideoPlayer from "../components/VideoPlayer";

interface VideoPageProps {
  material: Material;
}

export default function VideoPage({ material }: VideoPageProps) {
  return (
    <div>
      <section className="relative w-full" style={{ paddingTop: "400px" }}>
        <VideoPlayer src={material!.videoUrl!} />
      </section>
      <section className="bg-white m-4">
        <h1 className="text-2xl mb-4 font-semibold">{material.title}</h1>
        <hr />
        <p className="text-l mb-4">{material.title}</p>
      </section>
    </div>
  );
}
