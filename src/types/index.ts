// Personal information
export interface Profile {
  name: string
  nameLines: string[]
  tagline: string
  biography: string
  profileImage: string
  resumeUrl: string
}

// Professional experience
export interface Experience {
  id: string
  organization: string
  role: string
  period: string
  description: string
  responsibilities: string[]
}

// Certifications
export interface Certification {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  credentialUrl?: string
}

// Projects

export interface Project {
  id: string
  title: string
  description: string
  contribution: string
  technologies: string[]
  images: string[]
  githubUrl?: string
  liveUrl?: string
}

// Contact information
export interface Contact {
  email: string
  phone?: string
  github?: string
  linkedin?: string
  facebook?: string
  otherLinks?: {
    label: string
    url: string
  }[]
}