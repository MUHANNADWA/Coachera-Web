import { Course } from '../types/types'



const videos: string[] = [
  "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/ElephantsDreamVideo.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/GoogleIO-2014-CastingToTheFutureVideo.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/WeAreGoingOnBullrunVideo.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/VolkswagenGTIReviewVideo.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/Google_I_O_2013_KeynoteVideo.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SubaruOutbackOnStreetAndDirtVideo.mp4"
]


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
    duration: '6 modules',
    level: 'Beginner',
    org: 'Acme Inc.',
    category: 'Health',
    modules: [
      {
        id: 1,
        title: "Module 1",
        sections: [
          {
            id: 1,
            title: "Get Started",
            videos: [
              { id: 1, title: 'Welcome to the Course', duration: '1:55', url: videos[0] },
              { id: 2, title: 'Course Introduction', duration: '2:45', url: videos[1] },
              { id: 3, title: 'Course Overview', duration: '4:30', url: videos[2] }
            ]
          },
          {
            id: 2,
            title: "Deep Dive",
            videos: [
              { id: 1, title: 'Welcome to Deep Dive', duration: '1:55', url: videos[3] },
              { id: 2, title: 'Course End', duration: '2:45', url: videos[4] },
            ]
          },
          {
            id: 3,
            title: "Get Started",
            videos: [
              { id: 1, title: 'Welcome to the Course', duration: '1:55', url: videos[5] },
              { id: 2, title: 'Course Introduction', duration: '2:45', url: videos[6] },
              { id: 3, title: 'Course Overview', duration: '4:30', url: 'https://youtu.be/dQw4w9WgXcQ' }
            ]
          },
          {
            id: 4,
            title: "Deep Dive",
            videos: [
              { id: 1, title: 'Welcome to Deep Dive', duration: '1:55', url: videos[7] },
              { id: 2, title: 'Course End', duration: '2:45', url: videos[8] },
            ]
          }
        ]
      }, {
        id: 2,
        title: "Module 2",
        sections: [
          {
            id: 1,
            title: "Deep Dive",
            videos: [
              { id: 1, title: 'Welcome to Deep Dive', duration: '1:55', url: videos[9] },
              { id: 2, title: 'Course End', duration: '2:45', url: videos[1] },
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "Mastering Data Structures and Algorithms",
    "description": "An in-depth course covering essential data structures and algorithms using Python.",
    "instructor": "Dr. Alan Turing",
    "price": 59.99,
    "rating": 4.9,
    "ratingCount": 120,
    "image": "https://placehold.co/300x200?text=DSA",
    "duration": "8 modules",
    "level": "Intermediate",
    "org": "Tech University",
    "category": "Computer Science",
    "modules": [
      {
        "id": 1,
        "title": "Module 1: Introduction to Data Structures",
        "sections": [
          {
            "id": 1,
            "title": "Basics of Data Structures",
            "videos": [
              {
                "id": 1,
                "title": "What are Data Structures?",
                "duration": "10:00",
                "url": videos[7]
              },
              {
                "id": 2,
                "title": "Why Learn Data Structures?",
                "duration": "8:30",
                "url": videos[5]
              }
            ]
          },
          {
            "id": 2,
            "title": "Arrays and Lists",
            "videos": [
              {
                "id": 3,
                "title": "Understanding Arrays",
                "duration": "12:45",
                "url": videos[1]
              },
              {
                "id": 4,
                "title": "Working with Lists in Python",
                "duration": "15:20",
                "url": videos[3]
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "title": "Module 2: Advanced Data Structures",
        "sections": [
          {
            "id": 3,
            "title": "Stacks and Queues",
            "videos": [
              {
                "id": 5,
                "title": "Implementing Stacks",
                "duration": "14:00",
                "url": videos[4]
              },
              {
                "id": 6,
                "title": "Implementing Queues",
                "duration": "13:30",
                "url": videos[0]
              }
            ]
          },
          {
            "id": 4,
            "title": "Trees and Graphs",
            "videos": [
              {
                "id": 7,
                "title": "Introduction to Trees",
                "duration": "16:45",
                "url": videos[2]
              },
              {
                "id": 8,
                "title": "Graph Theory Basics",
                "duration": "18:20",
                "url": videos[6]
              }
            ]
          }
        ]
      }
    ]
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
    duration: '10 modules',
    level: 'Intermediate',
    org: 'Tech Inc.',
    category: 'Sport',
    modules: []
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
    duration: '5 modules',
    level: 'Beginner',
    org: 'Design Inc.',
    category: 'Art',
    modules: []
  }
]