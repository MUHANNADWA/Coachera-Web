import { Course, Skill } from "../types/types";

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
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/SubaruOutbackOnStreetAndDirtVideo.mp4",
];

export const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to React",
    description:
      "Learn the fundamentals of React including components, state, and props.",
    instructor: "Jane Smith",
    price: 49.99,
    rating: 4.7,
    ratingCount: 50,
    image: "https://placehold.co/300x200?text=React",
    durationHours: "6 modules",
    level: "Beginner",
    org: "Acme Inc.",
    categories: ["Health"],
    modules: [
      {
        id: 1,
        title: "Module 1",
        sections: [
          {
            id: 1,
            title: "Get Started",
            materials: [
              {
                id: 1,
                title: "Welcome to the Course",
                duration: "1:55",
                type: "VIDEO",
                videoUrl: videos[0],
              },
              {
                id: 2,
                title: "Course Introduction",
                duration: "2:45",
                type: "VIDEO",
                videoUrl: videos[1],
              },
              {
                id: 3,
                title: "Course Overview",
                duration: "4:30",
                type: "VIDEO",
                videoUrl: videos[2],
              },
            ],
          },
          {
            id: 2,
            title: "Deep Dive",
            materials: [
              {
                id: 1,
                title: "Welcome to Deep Dive",
                duration: "1:55",
                type: "VIDEO",
                videoUrl: videos[3],
              },
              {
                id: 2,
                title: "Course End",
                duration: "2:45",
                type: "VIDEO",
                videoUrl: videos[4],
              },
            ],
          },
          {
            id: 3,
            title: "Get Started",
            materials: [
              {
                id: 1,
                title: "Welcome to the Course",
                duration: "1:55",
                type: "VIDEO",
                videoUrl: videos[5],
              },
              {
                id: 2,
                title: "Course Introduction",
                duration: "2:45",
                type: "VIDEO",
                videoUrl: videos[6],
              },
              {
                id: 3,
                title: "Course Overview",
                duration: "4:30",
                type: "VIDEO",
                videoUrl: "https://youtu.be/dQw4w9WgXcQ",
              },
            ],
          },
          {
            id: 4,
            title: "Deep Dive",
            materials: [
              {
                id: 1,
                title: "Welcome to Deep Dive",
                duration: "1:55",
                type: "VIDEO",
                videoUrl: videos[7],
              },
              {
                id: 2,
                title: "Course End",
                duration: "2:45",
                type: "VIDEO",
                videoUrl: videos[8],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Module 2",
        sections: [
          {
            id: 1,
            title: "Deep Dive",
            materials: [
              {
                id: 1,
                title: "Welcome to Deep Dive",
                duration: "1:55",
                type: "VIDEO",
                videoUrl: videos[9],
              },
              {
                id: 2,
                title: "Course End",
                duration: "2:45",
                type: "VIDEO",
                videoUrl: videos[1],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Mastering Data Structures and Algorithms",
    description:
      "An in-depth course covering essential data structures and algorithms using Python.",
    instructor: "Dr. Alan Turing",
    price: 59.99,
    rating: 4.9,
    ratingCount: 120,
    image: "https://placehold.co/300x200?text=DSA",
    durationHours: "8 modules",
    level: "Intermediate",
    org: "Tech University",
    categories: ["Computer Science"],
    modules: [
      {
        id: 1,
        title: "Module 1: Introduction to Data Structures",
        sections: [
          {
            id: 1,
            title: "Basics of Data Structures",
            materials: [
              {
                id: 1,
                title: "What are Data Structures?",
                duration: "10:00",
                type: "VIDEO",
                videoUrl: videos[7],
              },
              {
                id: 2,
                title: "Why Learn Data Structures?",
                duration: "8:30",
                type: "VIDEO",
                videoUrl: videos[5],
              },
            ],
          },
          {
            id: 2,
            title: "Arrays and Lists",
            materials: [
              {
                id: 3,
                title: "Understanding Arrays",
                duration: "12:45",
                type: "VIDEO",
                videoUrl: videos[1],
              },
              {
                id: 4,
                title: "Working with Lists in Python",
                duration: "15:20",
                type: "VIDEO",
                videoUrl: videos[3],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: Advanced Data Structures",
        sections: [
          {
            id: 3,
            title: "Stacks and Queues",
            materials: [
              {
                id: 5,
                title: "Implementing Stacks",
                duration: "14:00",
                type: "VIDEO",
                videoUrl: videos[4],
              },
              {
                id: 6,
                title: "Implementing Queues",
                duration: "13:30",
                type: "VIDEO",
                videoUrl: videos[0],
              },
            ],
          },
          {
            id: 4,
            title: "Trees and Graphs",
            materials: [
              {
                id: 7,
                title: "Introduction to Trees",
                duration: "16:45",
                type: "VIDEO",
                videoUrl: videos[2],
              },
              {
                id: 8,
                title: "Graph Theory Basics",
                duration: "18:20",
                type: "VIDEO",
                videoUrl: videos[6],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    description:
      "Learn essential computer science concepts for technical interviews.",
    instructor: "Alex Johnson",
    price: 69.99,
    rating: 4.8,
    ratingCount: 50,
    image: "https://placehold.co/300x200?text=Algorithms",
    durationHours: "10 modules",
    level: "Intermediate",
    org: "Tech Inc.",
    categories: ["Sport"],
    modules: [],
  },
  {
    id: 4,
    title: "UX/UI Design Fundamentals",
    description: "Design beautiful and functional user interfaces.",
    instructor: "Sarah Williams",
    price: 54.99,
    rating: 4.6,
    ratingCount: 50,
    image: "https://placehold.co/300x200?text=Design",
    durationHours: "5 modules",
    level: "Beginner",
    org: "Design Inc.",
    categories: ["Art"],
    modules: [],
  },
];

export const skills: Skill[] = [
  { id: 0, name: "React" },
  { id: 1, name: "Web" },
  { id: 2, name: "Design" },
  { id: 3, name: "Javascript" },
  { id: 6, name: "Frontend" },
  { id: 7, name: "API" },
  { id: 8, name: "Jest" },
  { id: 9, name: "Typescript" },
  { id: 4, name: "Redux" },
];
