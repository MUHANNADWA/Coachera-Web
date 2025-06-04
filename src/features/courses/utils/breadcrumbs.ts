import { Course } from "../../../shared/types/types"

export const getBreadcrumbs = (course:Course,currentMaterialId: Number) => {
  const paths = location.pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Home', path: '/' }]
  const module = course?.modules.find(w => w.id === Number(paths[2]))
  const material = module?.sections.flatMap(s => s.materials).find(v => v.id === currentMaterialId);;

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
      if (material) {
        breadcrumbs.push({
          label: material.title,
          path: '#'
        })
      }
    }
  }

  return breadcrumbs;
}
