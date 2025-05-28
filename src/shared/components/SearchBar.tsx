import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="relative w-4/12 max-w-md">
      <form action={`/search/${query}`} method="get">
      <input
        type="text"
        placeholder="Search for courses..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      </form>
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
    </div>
  )
}