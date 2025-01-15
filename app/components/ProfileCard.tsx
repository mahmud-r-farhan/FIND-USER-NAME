'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'

export default function ProfileCard({ profile }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const IconComponent = Icons[profile.icon] || Icons.Globe

  const renderApiData = () => {
    if (!profile.apiData) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 space-y-2"
      >
        {Object.entries(profile.apiData).map(([key, value]) => (
          <p key={key} className="text-sm">
            <span className="font-semibold">{key}: </span>
            {typeof value === 'number' ? value.toLocaleString() : value.toString()}
          </p>
        ))}
      </motion.div>
    )
  }

  const renderPreview = () => {
    if (profile.apiData?.avatar) {
      return (
        <Image
          src={profile.apiData.avatar || "/placeholder.svg"}
          alt={`${profile.username}'s avatar on ${profile.platform}`}
          width={200}
          height={200}
          className="rounded-full mx-auto transition-transform duration-300 hover:scale-105"
        />
      )
    }
    return (
      <div className="bg-gradient-to-br from-indigo-400 to-purple-500 w-48 h-48 rounded-full mx-auto flex items-center justify-center transition-transform duration-300 hover:scale-105">
        <span className="text-4xl text-white font-bold">{profile.username[0].toUpperCase()}</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <IconComponent className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-indigo-800">{profile.platform}</h2>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            aria-label={isExpanded ? "Collapse profile" : "Expand profile"}
          >
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
        <p className="text-gray-600 mb-4 font-medium">{profile.username}</p>
        {renderApiData()}
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 mt-4 group"
        >
          Visit Profile
          <ExternalLink size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="border-t border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          {renderPreview()}
        </div>
      </motion.div>
    </motion.div>
  )
}

