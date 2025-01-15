'use client'

import { useState } from 'react'
import { ExternalLink, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProfileCard({ profile }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-indigo-800 mb-2">{profile.platform}</h2>
        <p className="text-gray-600 mb-4">{profile.username}</p>
        <div className="flex justify-between items-center">
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 group"
          >
            Visit Profile
            <ExternalLink size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <button
            onClick={togglePreview}
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            {isPreviewVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      {isPreviewVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200"
        >
          <iframe
            src={profile.url}
            title={`${profile.platform} Preview`}
            className="w-full h-64 border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        </motion.div>
      )}
    </motion.div>
  )
}

