import { courses } from "../shared/data/sampleData"

export const getBreadcrumbs = (currentVideoId: Number) => {
  const paths = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Home', path: '/' }]

  const courseId = Number(paths[1])
  // const { data: course } = (useGetCourseDetailsQuery(Number(courseId))).data;
  const course = courses.find(c => c.id === courseId)
  const module = course?.modules.find(w => w.id === Number(paths[2]))
  const video = module?.sections.flatMap(s => s.videos).find(v => v.id === currentVideoId);;

  if (course) {
    breadcrumbs.push({
      label: course.title,
      path: `/courses/${course.id}`
    })
    if (module) {
      breadcrumbs.push({
        label: module.title,
        path: '#'
      })
      if (video) {
        breadcrumbs.push({
          label: video.title,
          path: '#'
        })
      }
    }
  }

  return breadcrumbs;
}
