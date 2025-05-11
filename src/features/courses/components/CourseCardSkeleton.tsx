import Skeleton from "react-loading-skeleton";

export default function CourseCardSkeleton() {
  return (
    <div  className="flex flex-col gap-2">
      <Skeleton height={160} className="rounded-t-lg" />
      <div className="p-4">
        <Skeleton width={200} height={24} />
        <Skeleton width={150} height={20} className="mt-2" />
        <Skeleton count={2} height={16} className="mt-2" />
        <Skeleton width={100} height={20} className="mt-4" />
      </div>
    </div>
  )
}
