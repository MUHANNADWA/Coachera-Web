export interface LearningPath {
  id: number
  title: string
  description: string
  instructor: string
  price: number
  rating: number
  image: string
  duration: string
  ratingCount: number
  level: string
}

export interface Course {
  id: number
  title: string
  description: string
  instructor: string
  price: number
  rating: number
  image: string
  duration: string
  ratingCount: number
  level: string
  category: string
  org: string
  weeks: Week[]
}

export interface Week {
  id: number
  title: string
  sections: Section[]
}

export interface Section {
  id: number
  title: string
  videos: Video[]
}

export interface Video {
  id: number
  title: string
  duration: string
  url: string
}
