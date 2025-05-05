export interface Course {
  id: number
  title: string
  description: string
  instructor: string
  price: number
  rating: number
  image: string
  duration: string
  level: string
}
export interface Video {
  id: number
  title: string
  duration: string
  url: string
}

export interface Module {
  id: number
  title: string
  videos: Video[]
}