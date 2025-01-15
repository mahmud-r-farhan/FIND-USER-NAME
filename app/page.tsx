'use client'

import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import SearchBar from '../components/SearchBar'
import ProfileCard from '../components/ProfileCard'
import { searchProfiles } from '../utils/searchUtils'
import { motion } from 'framer-motion'

export default function Home() {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const handleSearch = (query, platform) => {
    setIsLoading(true)
    try {
      let results = searchProfiles(query)
      if (platform !== 'All') {
        results = results.filter(profile => profile.platform === platform)
      }
      setSearchResults(results)
      toast.success(`Found ${results.length} profiles`)
    } catch (err) {
      toast.error('An error occurred while searching. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const platforms = [...new Set(searchProfiles('').map(profile => profile.platform))]

  return (
    <main className="min-h-screen bg-[url('/detective-bg-light.png')] dark:bg-[url('/detective-bg-dark.png')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-sm bg-white/70 dark:bg-black/80 p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-indigo-600 dark:bg-indigo-500 rounded-lg">
                <a href="https://gravatar.com/floawd">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                </a>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100">
                Digital<span className="text-indigo-600 dark:text-indigo-400">Detective</span>
              </h1>
            </motion.div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-gray-800 dark:bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center gap-2"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          <SearchBar onSearch={handleSearch} platforms={platforms} />
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Investigating profiles...</p>
            </motion.div>
          )}
          {!isLoading && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8 p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300">
                No profiles found in our investigation. Try different search parameters.
              </p>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {searchResults.map((profile, index) => (
              <ProfileCard key={`${profile.platform}-${profile.username}-${index}`} profile={profile} />
            ))}
          </motion.div>
        </div>
        <Toaster position="top-right" />
      </div>
    </main>
  )
}