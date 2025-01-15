'use client'

import { useState } from 'react'
import { Search, Clock } from 'lucide-react'

export default function SearchBar({ onSearch, recentSearches, platforms }) {
  const [query, setQuery] = useState('')
  const [showRecentSearches, setShowRecentSearches] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('All')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query, selectedPlatform)
    setShowRecentSearches(false)
  }

  const handleRecentSearchClick = (recentQuery) => {
    setQuery(recentQuery)
    onSearch(recentQuery, selectedPlatform)
    setShowRecentSearches(false)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowRecentSearches(true)}
            onBlur={() => setTimeout(() => setShowRecentSearches(false), 200)}
            placeholder="Search by name, username, or phone number"
            className="w-full py-3 px-4 pr-12 rounded-l-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-lg dark:bg-gray-800 dark:text-gray-200"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300"
          >
            <Search size={24} />
          </button>
        </div>
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="py-3 px-4 rounded-r-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-lg dark:bg-gray-800 dark:text-gray-200"
        >
          <option value="All">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </form>
      {showRecentSearches && recentSearches.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg">
          <ul className="py-2">
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => handleRecentSearchClick(search.query)}
              >
                <Clock size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                <span>{search.query}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

