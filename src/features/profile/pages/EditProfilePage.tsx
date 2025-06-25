import Sidebar from "../../../shared/components/Sidebar";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import { useState } from "react";
import { Button } from "../../../shared/components/Button";
import { PROFILE_IMAGE } from "../../../constants/constants";
import {
  IconBell,
  IconInfoCircle,
  IconLock,
  IconOutbound,
  IconPhoto,
  IconSettings,
  IconUserMinus,
  IconWallet,
} from "@tabler/icons-react";

export default function EditProfilePage() {
  const { user } = useAppHook();
  const [form, setForm] = useState({
    firstName: user?.username || "",
    lastName: "",
    headline: "",
    biography: "",
    language: "en",
  });

  return (
    <div className="flex h-full-s overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar className="w-64 border-r p-6 bg-white">
        <div className="text-center space-y-2">
          <img
            src={user?.profileImage || PROFILE_IMAGE}
            alt="profile"
            className="h-24 w-24 justify-center mx-auto rounded-full"
          />
          <h2 className="font-semibold text-lg">{user?.username}</h2>
        </div>

        <nav className="mt-8 space-y-2 text-sm text-gray-700 font-medium">
          {[
            {
              label: "View public profile",
              icon: IconOutbound,
              action: () => {},
            },
            { label: "Information", icon: IconInfoCircle, action: () => {} },
            { label: "Photo", icon: IconPhoto, action: () => {} },
            { label: "Account Settings", icon: IconSettings, action: () => {} },
            { label: "Payment methods", icon: IconWallet, action: () => {} },
            { label: "Privacy", icon: IconLock, action: () => {} },
            {
              label: "Notification Preferences",
              icon: IconBell,
              action: () => {},
            },
          ].map(({ label, icon: Icon, action }) => (
            <Button
              full
              key={label}
              onClick={action}
              className="group flex items-center justify-start gap-2 px-3 py-2 text-gray-900">
              <Icon className="h-4 w-4 text-gray-700 group-hover:text-gray-900" />
              {label}
            </Button>
          ))}

          <Button
            full
            key="Close account"
            onClick={() => {}}
            className="group flex items-center justify-start gap-2 px-3 py-2 text-red-600 hover:bg-red-50">
            <IconUserMinus className="h-4 w-4 text-red-400 group-hover:text-red-600" />
            Close account
          </Button>
        </nav>
      </Sidebar>

      {/* Content */}
      <main className="max-h-full-s overflow-y-auto flex-1 flex flex-col py-8 ml-8 pr-8">
        <h1 className="text-2xl font-bold mb-2">Public profile</h1>
        <p className="text-sm text-gray-500 mb-8">
          Add information about yourself
        </p>

        <form className="max-w-2xl space-y-6">
          <div>
            <label className="block font-medium text-sm mb-1">Basics:</label>
            <input
              className="w-full"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <input
              className="w-full mt-2"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            <div className="relative mt-2">
              <input
                maxLength={60}
                className="w-full "
                placeholder="Headline"
                value={form.headline}
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
              />
              <span className="absolute right-2 top-2 text-xs text-gray-400">
                {form.headline.length}/60
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Add a professional headline like, "Instructor at coachera" or
              "Architect."
            </p>
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Biography</label>
            <div className="border rounded px-3 py-2">
              <div className="mb-2 space-x-2 text-gray-600">
                <button type="button" className="font-bold">
                  B
                </button>
                <button type="button" className="italic">
                  I
                </button>
              </div>
              <textarea
                rows={4}
                className="w-full border-none outline-none"
                placeholder="Biography"
                value={form.biography}
                onChange={(e) =>
                  setForm({ ...form, biography: e.target.value })
                }
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Links and coupon codes are not permitted in this section.
            </p>
          </div>

          <div>
            <select
              className=""
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}>
              <option value="en">English (US)</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
            </select>
          </div>

          <Button type="submit" className="mt-4">
            Save Changes
          </Button>
        </form>
      </main>
    </div>
  );
}
