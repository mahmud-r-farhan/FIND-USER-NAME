import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Find User Name | Find Social Profiles',
  description: 'Track down social media profiles across multiple platforms. Your digital investigation tool for finding users across the social web.',
  keywords: 'social media search, user finder, digital detective, profile search, username lookup, username search, social media profiles, social media search engine, username search engine, find social profiles, find users, find social media profiles, find social media users, username search tool, social media search tool, social media username search, social media username lookup, social media username search tool, social media username lookup tool, social media username search engine, social media username lookup engine, social media username search tool, social media username lookup tool, social media username search engine, social media username lookup engine, username availability checker, social media username availability checker, social media username availability tool, social media username availability engine, social media username availability search, social media username availability lookup, social media username availability search tool, social media username availability lookup tool, social media username availability search engine, social media username availability lookup engine',
  openGraph: {
    title: 'Digital Detective | Find Social Profiles | Username Lookup',
    description: 'Track down social media profiles across multiple platforms',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'https://res.cloudinary.com/dqovjmmlx/image/upload/v1736967397/DALL_E_2025-01-16_00.56.08_-_A_sleek_and_modern_digital-themed_banner_for_a_website_titled_Digital_Detective___Find_Social_Profiles._The_design_should_feature_icons_of_major_soc_qxdevo.webp',
    title: 'Find Users | Find Social Profiles',
    description: 'Track down social media profiles across multiple platforms',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
