import Sidebar from "../../../shared/components/Sidebar";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useCallback, useState } from "react";
import { Button } from "../../../shared/components/form/Button";
import { PROFILE_IMAGE } from "../../../constants/constants";
import { UserMinusIcon } from "@heroicons/react/24/outline";
import Input from "../../../shared/components/form/Input";
import SidebarHeader from "../../courses/components/SidebarHeader";
import { profileSidebar } from "../../courses/utils/Utils";

export default function EditProfilePage() {
  const { user } = useAppHook();
  const [form, setForm] = useState({
    firstName: user?.username || "",
    lastName: "",
    headline: "",
    biography: "",
    language: "en",
  });

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="page flex">
      {/* Sidebar */}
      <Sidebar
        className={
          collapsed
            ? "max-sm:h-15! max-sm:bg-transparent w-14"
            : "w-70 max-sm:w-full"
        }>
        <SidebarHeader
          label="Filters"
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
        />
        {!collapsed && (
          <div>
            <div className="text-center space-y-2 mb-8">
              <img
                src={user?.profileImage || PROFILE_IMAGE}
                alt="profile"
                className="h-24 w-24 justify-center mx-auto rounded-2xl"
              />
              <h2 className="font-semibold text-lg">{user?.username}</h2>
            </div>

            {/* Navigation buttons */}
            <nav className="space-y-2 text-sm text-gray-700 font-medium">
              {profileSidebar.map(({ label, icon: Icon, action }) => (
                <Button
                  full
                  key={label}
                  onClick={() => {
                    action();
                    window.innerWidth <= 768 && toggleCollapse();
                  }}
                  className="group flex items-center justify-start gap-2 px-3 py-2">
                  <Icon className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
                  {label}
                </Button>
              ))}

              <Button
                full
                key="Close account"
                onClick={() => {}}
                className="group flex items-center justify-start gap-2 px-3 py-2 text-danger hover:bg-red-50">
                <UserMinusIcon className="h-4 w-4 text-red-400 group-hover:text-danger" />
                Close account
              </Button>
            </nav>
          </div>
        )}
      </Sidebar>

      {/* Content */}
      <main className="flex-1 flex flex-col py-8 ml-8 pr-8">
        <article className="consect p-4 mb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">Public profile</h1>
          <p className="text-sm text-gray-500">
            Add information about yourself
          </p>
        </article>
        <section className="flex max-lg:flex-col gap-8">
          <form className="consect p-4 w-full space-y-6 mx-auto">
            <div>
              <h1 className="text-xl font-semibold">Basics:</h1>
              <hr />
              <Input
                label="First Name"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <div className="relative mt-2">
                <Input
                  label="Headline"
                  maxLength={60}
                  placeholder="Headline"
                  value={form.headline}
                  onChange={(e) =>
                    setForm({ ...form, headline: e.target.value })
                  }
                  helperText={`Add a professional headline like, "Instructor at coachera" or "Architect."`}
                />
                <span className="absolute right-2 top-2 text-xs text-gray-400">
                  {form.headline.length}/60
                </span>
              </div>
            </div>

            <Input
              label="Biography"
              className="w-full"
              placeholder="Biography"
              value={form.biography}
              onChange={(e) => setForm({ ...form, biography: e.target.value })}
              helperText="Links and coupon codes are not permitted in this section."
            />

            <div>
              <select
                className=""
                value={form.language}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value })
                }>
                <option value="en">English (US)</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
              </select>
            </div>

            <Button type="submit" className="mt-4">
              Save Changes
            </Button>
          </form>
          <form className="consect p-4 w-full space-y-6 mx-auto">
            <div>
              <h1 className="text-xl font-semibold">Basics:</h1>
              <hr />
              <Input
                label="First Name"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
              <div className="relative mt-2">
                <Input
                  label="Headline"
                  maxLength={60}
                  placeholder="Headline"
                  value={form.headline}
                  onChange={(e) =>
                    setForm({ ...form, headline: e.target.value })
                  }
                  helperText={`Add a professional headline like, "Instructor at coachera" or "Architect."`}
                />
                <span className="absolute right-2 top-2 text-xs text-gray-400">
                  {form.headline.length}/60
                </span>
              </div>
            </div>

            <Input
              label="Biography"
              className="w-full"
              placeholder="Biography"
              value={form.biography}
              onChange={(e) => setForm({ ...form, biography: e.target.value })}
              helperText="Links and coupon codes are not permitted in this section."
            />

            <div>
              <select
                className=""
                value={form.language}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value })
                }>
                <option value="en">English (US)</option>
                <option value="ar">Arabic</option>
                <option value="fr">French</option>
              </select>
            </div>

            <Button type="submit" className="mt-4">
              Save Changes
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}
