export const ROUTES = {
  login: "/login",
  register: "/register",
  setupAdmin: "/setup-admin",
  student: {
    root: "/student",
    lessons: "/student/lessons",
    lessonDetail: "/student/lessons/:id",
    favorites: "/student/favorites",
    profile: "/student/profile",
  },
  admin: {
    root: "/admin",
    dashboard: "/admin",
    schools: "/admin/schools",
    schoolNew: "/admin/schools/new",
    schoolEdit: "/admin/schools/:id/edit",
    students: "/admin/students",
    studentDetail: "/admin/students/:id",
    studentNew: "/admin/students/new",
    studentEdit: "/admin/students/:id/edit",
    lessons: "/admin/lessons",
    lessonNew: "/admin/lessons/new",
    lessonEdit: "/admin/lessons/:id/edit",
  },
  forbidden: "/403",
  notFound: "/404",
} as const;

export const STORAGE_KEYS = {
  accessToken: "accessToken",
  user: "user",
} as const;
