'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'

const categories = {
  'Social Media': ['Facebook', 'Instagram', 'X (Twitter)', 'TikTok'],
  'Professional': ['LinkedIn', 'GitHub', 'GitLab', 'Stack Overflow'],
  'Creative': ['Behance', 'Dribbble', 'Pinterest', 'DevTo'],
  'Communication': ['Telegram', 'WhatsApp'],
  'Content': ['YouTube', 'Medium', 'Quora', 'Reddit']
}

export default function FilterBar({ platforms, onFilterChange }) {
  const [selectedPlatforms, setSelectedPlatforms] = useState(platforms)
  const [activeCategory, setActiveCategory] = useState('All')

  const handleToggle = (platform) => {
    const updatedPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform]
    
    setSelectedPlatforms(updatedPlatforms)
    onFilterChange(updatedPlatforms)
  }

  const filterByCategory = (category) => {
    setActiveCategory(category)
    const filteredPlatforms = category === 'All' 
      ? platforms 
      : categories[category] || []
    setSelectedPlatforms(filteredPlatforms)
    onFilterChange(filteredPlatforms)
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2 mb-4"
      >
        <button
          onClick={() => filterByCategory('All')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeCategory === 'All'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100'
          }`}
        >
          All
        </button>
        {Object.keys(categories).map(category => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap gap-2"
      >
        {platforms.map(platform => {
          const IconComponent = Icons[platform.icon] || Icons.Globe
          return (
            <motion.button
              key={platform.platform}
              onClick={() => handleToggle(platform.platform)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 inline-flex items-center gap-2 ${
                selectedPlatforms.includes(platform.platform)
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-100'
              }`}
            >
              <IconComponent size={16} />
              {platform.platform}
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

