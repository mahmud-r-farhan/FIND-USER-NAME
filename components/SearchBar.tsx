'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch, platforms }) {
  const [selectedPlatform, setSelectedPlatform] = useState('All')

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = e.target.elements.query.value
    onSearch(query, selectedPlatform)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-grow">
        <input
          type="text"
          name="query"
          placeholder="Search by name, username, or phone number"
          className="w-full py-4 px-6 rounded-xl border-2 border-gray-300 dark:border-gray-700 
                   bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                   transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl
                   text-lg text-gray-800 dark:text-gray-200
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
                   bg-indigo-600 dark:bg-indigo-500 text-white p-3 rounded-lg 
                   hover:bg-indigo-700 dark:hover:bg-indigo-600 
                   transition-colors duration-300 shadow-md"
        >
          <Search size={24} />
        </button>
      </div>
      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
        className="py-4 px-6 rounded-xl border-2 border-gray-300 dark:border-gray-700 
                 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md
                 text-gray-800 dark:text-gray-200
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-lg
                 min-w-[200px]"
      >
        <option value="All">All Networks</option>
        {platforms.map((platform) => (
          <option key={platform} value={platform}>
            {platform}
          </option>
        ))}
      </select>
    </form>
  )
}

