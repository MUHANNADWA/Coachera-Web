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
import Input from "../../../shared/components/Input";

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
    <div className="flex relative overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar className="w-64 border-r p-6 bg-white">
        <div className="text-center space-y-2">
          <img
            src={user?.profileImage || PROFILE_IMAGE}
            alt="profile"
            className="h-24 w-24 justify-center mx-auto rounded-2xl"
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
      <main className="flex-1 flex flex-col py-8 ml-8 pr-8">
        <h1 className="text-2xl font-bold mb-2">Public profile</h1>
        <p className="text-sm text-gray-500 mb-8">
          Add information about yourself
        </p>

        <form className="max-w-2xl space-y-6">
          <div>
            <h2>Basics:</h2>
            <hr />
            <Input
              label="First Name"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
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
                onChange={(e) => setForm({ ...form, headline: e.target.value })}
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
