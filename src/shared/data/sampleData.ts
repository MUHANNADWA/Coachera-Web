import { Course } from '../types/types'

export const courses: Course[] = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, state, and props.',
    instructor: 'Jane Smith',
    price: 49.99,
    rating: 4.7,
    ratingCount: 50,
    image: 'https://placehold.co/300x200?text=React',
    duration: '6 weeks',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts for large-scale applications.',
    instructor: 'John Doe',
    price: 59.99,
    rating: 4.9,
    ratingCount: 50,
    image: 'https://placehold.co/300x200?text=TypeScript',
    duration: '8 weeks',
    level: 'Advanced'
  },
  {
    id: 3,
    title: 'Data Structures and Algorithms',
    description: 'Learn essential computer science concepts for technical interviews.',
    instructor: 'Alex Johnson',
    price: 69.99,
    rating: 4.8,
    ratingCount: 50,
    image: 'https://placehold.co/300x200?text=Algorithms',
    duration: '10 weeks',
    level: 'Intermediate'
  },
  {
    id: 4,
    title: 'UX/UI Design Fundamentals',
    description: 'Design beautiful and functional user interfaces.',
    instructor: 'Sarah Williams',
    price: 54.99,
    rating: 4.6,
    ratingCount: 50,
    image: 'https://placehold.co/300x200?text=Design',
    duration: '5 weeks',
    level: 'Beginner'
  }
]