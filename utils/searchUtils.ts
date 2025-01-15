const socialNetworks = [
  { 
    platform: 'Facebook',
    urlPattern: 'https://facebook.com/{username}',
    usernameRules: ['dot', 'underscore'],
    icon: 'Facebook'
  },
  { 
    platform: 'YouTube',
    urlPattern: 'https://youtube.com/@{username}',
    usernameRules: ['dot', 'underscore'],
    icon: 'Youtube'
  },
  { 
    platform: 'Instagram',
    urlPattern: 'https://instagram.com/{username}',
    usernameRules: ['dot', 'underscore'],
    icon: 'Instagram'
  },
  { 
    platform: 'TikTok',
    urlPattern: 'https://tiktok.com/@{username}',
    usernameRules: ['dot', 'underscore']
  },
  { 
    platform: 'Telegram',
    urlPattern: 'https://t.me/{username}',
    usernameRules: ['underscore']
  },
  { 
    platform: 'X (Twitter)',
    urlPattern: 'https://twitter.com/{username}',
    usernameRules: ['underscore']
  },
  { 
    platform: 'GitHub',
    urlPattern: 'https://github.com/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'Gravatar',
    urlPattern: 'https://gravatar.com/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'Pinterest',
    urlPattern: 'https://pinterest.com/{username}',
    usernameRules: ['underscore']
  },
  { 
    platform: 'LinkedIn',
    urlPattern: 'https://linkedin.com/in/{username}',
    usernameRules: ['hyphen']
  },
  { 
    platform: 'Reddit',
    urlPattern: 'https://reddit.com/user/{username}',
    usernameRules: ['underscore']
  },
  { 
    platform: 'Quora',
    urlPattern: 'https://www.quora.com/profile/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'GitLab',
    urlPattern: 'https://gitlab.com/{username}',
    usernameRules: ['hyphen', 'underscore', 'dot']
  },
  { 
    platform: 'Fiverr',
    urlPattern: 'https://www.fiverr.com/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'Upwork',
    urlPattern: 'https://www.upwork.com/freelancers/~{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'Dev.to',
    urlPattern: 'https://dev.to/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'Medium',
    urlPattern: 'https://medium.com/@{username}',
    usernameRules: ['dot', 'underscore']
  },
  { 
    platform: 'Stack Overflow',
    urlPattern: 'https://stackoverflow.com/users/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'Behance',
    urlPattern: 'https://www.behance.net/{username}',
    usernameRules: ['underscore']
  },
  { 
    platform: 'Dribbble',
    urlPattern: 'https://dribbble.com/{username}',
    usernameRules: ['hyphen', 'underscore']
  },
  { 
    platform: 'WhatsApp',
    urlPattern: 'https://wa.me/{phoneNumber}',
    usernameRules: [],
    icon: 'MessageCircle'
  }
]

function generateUsernames(input: string): string[] {
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '')
  const parts = input.toLowerCase().split(/[\s-_]+/)
  
  return Array.from(new Set([
    cleaned,
    parts.join(''),
    parts.join('-'),
    parts.join('_'),
    parts.join('.'),
  ]))
}

function isPhoneNumber(input: string): boolean {
  return /^\+?[0-9]{10,14}$/.test(input.replace(/[\s-]/g, ''))
}

export function searchProfiles(query: string) {
  if (isPhoneNumber(query)) {
    const phoneNumber = query.replace(/[\s-]/g, '')
    return socialNetworks
      .filter(network => network.platform === 'WhatsApp')
      .map(network => ({
        platform: network.platform,
        username: phoneNumber,
        url: network.urlPattern.replace('{phoneNumber}', phoneNumber),
      }))
  }

  const usernames = generateUsernames(query)
  
  return socialNetworks.flatMap(network => {
    const validUsernames = usernames.filter(username => {
      if (network.usernameRules.includes('hyphen') && username.includes('-')) return true
      if (network.usernameRules.includes('underscore') && username.includes('_')) return true
      if (network.usernameRules.includes('dot') && username.includes('.')) return true
      return !username.includes('-') && !username.includes('_') && !username.includes('.')
    })

    return validUsernames.map(username => ({
      platform: network.platform,
      username,
      url: network.urlPattern.replace('{username}', username),
    }))
  })
}

