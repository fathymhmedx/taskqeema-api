import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

async function main() {
  console.log("🌱 Seeding database...");

  /**
   * Default credentials created by this seed:
   *
   * Admin:
   * email: admin@taskqeema.com
   * password: AdminPass@123
   * or caan be use route /api/v1/auth/setup-admin with send body { email, password, secret(from .env) } 
   *
   * Students:
   * email: student{n}@example.com
   * password: Student{n}Pass@123
   * example:
   * student1@example.com / Student1Pass@123
   */
  // ---------- Admin ----------
  const adminPassword = await bcrypt.hash("AdminPass@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@taskqeema.com" },
    update: {},
    create: {
      email: "admin@taskqeema.com",
      passwordHash: adminPassword,
      role: Role.ADMIN,
    },
  });

  // ---------- Schools ----------
  const schoolNames = [
    "Green High School",
    "Blue Academy",
    "Red College",
    "Yellow Institute",
    "Silver School",
    "Golden Academy",
    "Sunrise High",
    "Moonlight School",
    "Riverdale College",
    "Hilltop Academy",
  ];

  const schools: { id: number }[] = [];

  for (const name of schoolNames) {
    const school = await prisma.school.upsert({
      where: { name },
      update: {},
      create: {
        name,
        phone: `010${getRandomInt(10000000, 99999999)}`,
        logo: `https://placehold.co/200x200?text=${encodeURIComponent(name)}`,
      },
    });

    schools.push(school);
  }

  // ---------- Lessons ----------
  const lessonTitles = [
    "Math Basics",
    "Physics 101",
    "Chemistry Fundamentals",
    "Biology Intro",
    "English Grammar",
    "History of Egypt",
    "World Geography",
    "Computer Science Basics",
    "Art Appreciation",
    "Music Theory",
    "Economics 101",
    "Philosophy Intro",
    "Psychology Basics",
    "Sociology Intro",
    "Literature Analysis",
    "Environmental Science",
    "Health Education",
    "Physical Education",
    "Programming in JS",
    "Data Structures",
  ];

  const lessons: { id: number }[] = [];

  for (let i = 0; i < lessonTitles.length; i++) {
    const title = lessonTitles[i];

    const lesson = await prisma.lesson.upsert({
      where: { title },
      update: {},
      create: {
        title,
        description: `Learn the fundamentals of ${title}.`,
        content: `${title} detailed course content goes here. This lesson will help students understand the core concepts clearly.`,
        image: `https://placehold.co/600x400?text=${encodeURIComponent(title)}`,
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3 → 5
        sortOrder: i + 1,
      },
    });

    lessons.push(lesson);
  }

  // ---------- Students ----------
  const students: { id: number }[] = [];

  for (let i = 1; i <= 50; i++) {
    const name = `Student ${i}`;
    const email = `student${i}@example.com`;
    const grade = `${getRandomInt(9, 12)}`;
    const passwordHash = await bcrypt.hash(`Student${i}Pass@123`, 10);
    const school = schools[getRandomInt(0, schools.length - 1)];

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        passwordHash,
        role: Role.STUDENT,
        student: {
          create: {
            name,
            grade,
            schoolId: school.id,
          },
        },
      },
      include: { student: true },
    });

    if (user.student) students.push(user.student);
  }

  // ---------- Favorites ----------
  const favoritesData: { studentId: number; lessonId: number }[] = [];

  for (const student of students) {
    const favCount = getRandomInt(1, 5);
    const shuffledLessons = shuffleArray(lessons);
    const favLessons = shuffledLessons.slice(0, favCount);

    for (const lesson of favLessons) {
      favoritesData.push({
        studentId: student.id,
        lessonId: lesson.id,
      });
    }
  }

  await prisma.favorite.createMany({
    data: favoritesData,
    skipDuplicates: true,
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
