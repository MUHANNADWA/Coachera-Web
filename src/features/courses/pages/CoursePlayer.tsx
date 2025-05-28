import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { courses } from '../../../shared/data/sampleData';
import Sidebar from '../components/Sidebar';
import Breadcrumb from '../components/Breadcrumb';
import VideoPlayer from '../components/VideoPlayer';
import NotFound from '../../../shared/pages/NotFound';
import Loader from '../../../shared/components/Loader';
import { CurrentVideo } from '../types';
import { getBreadcrumbs } from '../../../utils/breadcrumbs';

export default function CoursePlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, moduleId } = useParams();

  const courseIndex = Number(courseId) - 1;
  const moduleIndex = Number(moduleId);
  const course = courses[courseIndex];
  const module = course?.modules.find(w => w.id === moduleIndex);

  const [currentVideo, setCurrentVideo] = useState<CurrentVideo | null>(null);

  // Load initial or last video depending on navigation state
  useEffect(() => {
    if (!module) return;

    const isNavigatedFromPrev = location.state?.fromNav === 'prev';
    const targetSection = isNavigatedFromPrev
      ? module.sections[module.sections.length - 1]
      : module.sections[0];

    const targetVideo = isNavigatedFromPrev
      ? targetSection?.videos[targetSection.videos.length - 1]
      : targetSection?.videos[0];

    if (targetSection && targetVideo) {
      setCurrentVideo({ sectionId: targetSection.id, videoId: targetVideo.id });
    }
  }, [module, location.state]);

  const activeSection = module?.sections.find(s => s.id === currentVideo?.sectionId);
  const video = activeSection?.videos.find(v => v.id === currentVideo?.videoId);

  const allVideos = useMemo(() => (
    module?.sections.flatMap(section =>
      section.videos.map(video => ({ ...video, sectionId: section.id }))
    ) || []
  ), [module]);

  const currentIndex = useMemo(() => (
    allVideos.findIndex(v => v.id === currentVideo?.videoId && v.sectionId === currentVideo?.sectionId)
  ), [allVideos, currentVideo]);

  const handleNavigateToModule = (newModuleIndex: number, from: 'prev' | 'next') => {
    navigate(`/learn/${courseId}/${newModuleIndex}`, { state: { fromNav: from } });
  };

  const handleNext = () => {
    if (!module || !course || currentIndex === -1) return;

    const isLastVideoInModule = currentIndex === allVideos.length - 1;
    const isLastModule = module.id === course.modules[course.modules.length - 1].id;

    if (isLastVideoInModule && !isLastModule) {
      handleNavigateToModule(moduleIndex + 1, 'next');
    } else if (currentIndex < allVideos.length - 1) {
      const nextVideo = allVideos[currentIndex + 1];
      setCurrentVideo({ sectionId: nextVideo.sectionId, videoId: nextVideo.id });
    }
  };

  const handlePrev = () => {
    if (!module || !course || currentIndex === -1) return;

    const isFirstVideoInModule = currentIndex === 0;
    const isFirstModule = module.id === course.modules[0].id;

    if (isFirstVideoInModule && !isFirstModule) {
      handleNavigateToModule(moduleIndex - 1, 'prev');
    } else if (currentIndex > 0) {
      const prevVideo = allVideos[currentIndex - 1];
      setCurrentVideo({ sectionId: prevVideo.sectionId, videoId: prevVideo.id });
    }
  };

  const nextExists = module && course && (
    (module.id !== course.modules[course.modules.length - 1].id && currentIndex === allVideos.length - 1)
    || currentIndex < allVideos.length - 1
  );

  const prevExists = module && course && (
    (module.id !== course.modules[0].id && currentIndex === 0)
    || currentIndex > 0
  );

  if (!course || !module) return <NotFound />;
  if (!video || !currentVideo) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-500">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        module={module}
        currentVideo={currentVideo}
        setCurrentVideo={setCurrentVideo}
      />

      <main className="flex-1 flex flex-col mx-8">
        <header className="flex items-center justify-between my-4">
          <button onClick={handlePrev} disabled={!prevExists} className="cursor-pointer disabled:text-gray-400 px-6 py-3 hover:text-primary">
            {'< Previous'}
          </button>

          <Breadcrumb items={getBreadcrumbs(currentVideo.videoId)} />

          <button onClick={handleNext} disabled={!nextExists} className="cursor-pointer disabled:text-gray-400 px-6 py-3 hover:text-primary">
            {'Next >'}
          </button>
        </header>

        <section className="relative w-full" style={{ paddingTop: '400px' }}>
          <VideoPlayer src={video.url} />
        </section>

        <section className="bg-white m-4">
          <h1 className="text-2xl mb-4 font-semibold">{video.title}</h1>
          <hr />
        </section>
      </main>
    </div>
  );
}
