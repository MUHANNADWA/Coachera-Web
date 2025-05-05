import {
  Squares2X2Icon,
  BookOpenIcon,
  UserGroupIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'
import SearchBar from './SearchBar'

interface SidebarProps {
  collapsed: boolean
  toggleCollapse: () => void
}

export default function Sidebar({ collapsed, toggleCollapse }: SidebarProps) {
  const menuItems = [
    { icon: VideoCameraIcon, label: 'learn', href: '/learn/1' },
    { icon: Squares2X2Icon, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpenIcon, label: 'Courses', href: '/courses' },
    { icon: UserGroupIcon, label: 'Students', href: '/students' },
    { icon: UserCircleIcon, label: 'User Profile', href: '/profile' },
  ]

  return (
    <div className={`h-full bg-white shadow-md fixed top-0 left-0 transition-all duration-300 z-10 ${collapsed ? 'w-16' : 'w-64'
      }`}>
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed &&
          <h1 className="text-xl font-bold text-blue-950">Coachera</h1>
        }
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700"
        >
          {collapsed ? (
            <div className="flex justify-between">
              <ChevronRightIcon className="h-5 w-5" />
            </div>) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="p-2">
        <ul className="space-y-1">
          {!collapsed && <SearchBar />}
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className={`flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors ${collapsed ? 'justify-center' : ''
                  }`}
              >
                <item.icon className={`h-6 w-6 text-gray-600 ${collapsed ? '' : 'mr-3'}`} />
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}