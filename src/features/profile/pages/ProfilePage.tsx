import { useMemo } from "react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { PROFILE_IMAGE } from "../../../constants/constants";
import CourseCard from "../../courses/components/courseCard/CourseCard";
import { Button } from "../../../shared/components/form/Button";
import { Course } from "../../../shared/types/types";
import {
  AcademicCapIcon,
  BookmarkIcon,
  BookOpenIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { user, navigate, wishlistCourses, enrolledCourses } = useAppHook();

  // If your user object contains these fields (populated from EditProfile page),
  // they will render; otherwise we show friendly placeholders.
  const profile = useMemo(
    () => ({
      username: user?.username ?? "User",
      email: user?.email ?? "No email",
      firstName: (user as any)?.firstName ?? "",
      lastName: (user as any)?.lastName ?? "",
      birthDate: (user as any)?.birthDate ?? "",
      gender: (user as any)?.gender ?? "",
      education: (user as any)?.education ?? "",
      phoneNumber: (user as any)?.phoneNumber ?? "",
      address: (user as any)?.address ?? "",
      profileImage: user?.profileImage || PROFILE_IMAGE,
    }),
    [user]
  );

  const stats = [
    {
      icon: BookOpenIcon,
      label: "Enrolled",
      value: enrolledCourses?.length ?? 0,
    },
    {
      icon: BookmarkIcon,
      label: "Favorites",
      value: wishlistCourses?.length ?? 0,
    },
    {
      icon: AcademicCapIcon,
      label: "Completed",
      value: (user as any)?.completedCount ?? 0,
    },
  ];

  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value?: string;
  }) => (
    <div className="consect flex items-start gap-3 p-3">
      <div className="shrink-0 rounded-lg bg-primary/10 p-2">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-medium text-dark dark:text-gray-100">
          {value && value.trim() !== "" ? value : "—"}
        </div>
      </div>
    </div>
  );

  const StatCard = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: number | string;
  }) => (
    <div className="consect p-4 text-center">
      <div className="mx-auto mb-2 inline-flex rounded-xl bg-primary/10 p-2">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Cover + Avatar */}
      <section className="relative mb-20">
        <div className="h-36 w-full rounded-3xl bg-gradient-to-t from-primary/20 via-primary/10 to-transparent dark:from-primary/30 dark:via-primary/20" />
        <div className="consect p-6 -mt-10 mx-3 rounded-2xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="-mt-16 md:-mt-16">
              <img
                src={profile.profileImage}
                alt={
                  profile.username ? `${profile.username}'s avatar` : "Avatar"
                }
                className="w-28 h-28 rounded-2xl object-cover"
                onError={(e) => (e.currentTarget.src = PROFILE_IMAGE)}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{profile.username}</h1>
              <div className="mt-1 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <EnvelopeIcon className="w-4 h-4" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="primary"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </Button>
                <Button variant="secondary" onClick={() => navigate("/teach")}>
                  Become an Instructor
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
              {stats.map((s) => (
                <StatCard
                  key={s.label}
                  icon={s.icon}
                  label={s.label}
                  value={s.value}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">About</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <InfoRow
            icon={UserIcon}
            label="First Name"
            value={profile.firstName}
          />
          <InfoRow icon={UserIcon} label="Last Name" value={profile.lastName} />
          <InfoRow
            icon={CalendarIcon}
            label="Birth Date"
            value={profile.birthDate}
          />
          <InfoRow icon={UsersIcon} label="Gender" value={profile.gender} />
          <InfoRow
            icon={AcademicCapIcon}
            label="Education"
            value={profile.education}
          />
          <InfoRow
            icon={PhoneIcon}
            label="Phone Number"
            value={profile.phoneNumber}
          />
          <InfoRow icon={MapPinIcon} label="Address" value={profile.address} />
        </div>
      </section>

      {/* Currently Learning */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            Currently Learning
          </h2>
          {enrolledCourses?.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => navigate("/courses")}
              className="text-sm"
            >
              Browse Courses
            </Button>
          )}
        </div>

        {!enrolledCourses || enrolledCourses.length === 0 ? (
          <div className="consect p-8 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              You have not started any course yet.
            </p>
            <Button variant="primary" onClick={() => navigate("/courses")}>
              Explore Courses
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Favorites */}
      <section className="mb-16" id="wishlist">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Favorites</h2>
          {wishlistCourses?.length > 0 && (
            <Button
              variant="secondary"
              onClick={() => navigate("/search/favorites")}
              className="text-sm"
            >
              View All
            </Button>
          )}
        </div>

        {!wishlistCourses || wishlistCourses.length === 0 ? (
          <div className="consect p-8 text-center">
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              You have not added any course to favorites yet.
            </p>
            <Button variant="primary" onClick={() => navigate("/courses")}>
              Discover Courses
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
