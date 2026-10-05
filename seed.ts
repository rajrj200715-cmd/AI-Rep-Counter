// ============================================================
// Database Seed — Exercise catalog
// Run: npx prisma db seed
// ============================================================

import { PrismaClient } from "@prisma/client";
import { SQUAT_CONFIG, PUSHUP_CONFIG, BICEP_CURL_CONFIG, LUNGE_CONFIG, JUMPING_JACK_CONFIG, SHOULDER_PRESS_CONFIG } from "../lib/exercises/config";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const exercises = [
    {
      name: "Squats",
      slug: "squats",
      description:
        "A fundamental lower-body exercise that targets the quadriceps, hamstrings, and glutes. Stand with feet shoulder-width apart and lower your body as if sitting into a chair, keeping your chest up and knees over toes.",
      muscleGroups: ["Quadriceps", "Hamstrings", "Glutes", "Core"],
      difficulty: "BEGINNER" as const,
      defaultTargetReps: 12,
      defaultSets: 3,
      restDurationSeconds: 60,
      analysisConfig: SQUAT_CONFIG,
    },
    {
      name: "Push-ups",
      slug: "push-ups",
      description:
        "A classic upper-body exercise that works the chest, shoulders, and triceps. Start in a plank position, lower your chest to the floor, then push back up while keeping your body in a straight line.",
      muscleGroups: ["Chest", "Shoulders", "Triceps", "Core"],
      difficulty: "BEGINNER" as const,
      defaultTargetReps: 10,
      defaultSets: 3,
      restDurationSeconds: 60,
      analysisConfig: PUSHUP_CONFIG,
    },
    {
      name: "Bicep Curls",
      slug: "bicep-curls",
      description:
        "An isolation exercise that targets the biceps. Hold weights at your sides with palms facing forward, curl the weights toward your shoulders while keeping your elbows stationary, then lower slowly.",
      muscleGroups: ["Biceps", "Forearms"],
      difficulty: "BEGINNER" as const,
      defaultTargetReps: 12,
      defaultSets: 3,
      restDurationSeconds: 45,
      analysisConfig: BICEP_CURL_CONFIG,
    },
    {
      name: "Lunges",
      slug: "lunges",
      description:
        "A dynamic lower-body exercise targeting each leg individually. Step forward with one foot, lower your back knee toward the ground, then push back to standing. Alternate legs for balanced development.",
      muscleGroups: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
      difficulty: "BEGINNER" as const,
      defaultTargetReps: 10,
      defaultSets: 3,
      restDurationSeconds: 60,
      analysisConfig: LUNGE_CONFIG,
    },
    {
      name: "Jumping Jacks",
      slug: "jumping-jacks",
      description:
        "A full-body cardiovascular exercise. Start with feet together and arms at your sides, then jump while spreading your legs shoulder-width apart and raising your arms overhead, then return to the starting position.",
      muscleGroups: ["Full Body", "Cardiovascular"],
      difficulty: "BEGINNER" as const,
      defaultTargetReps: 20,
      defaultSets: 3,
      restDurationSeconds: 30,
      analysisConfig: JUMPING_JACK_CONFIG,
    },
    {
      name: "Shoulder Press",
      slug: "shoulder-press",
      description:
        "An overhead pressing exercise that primarily targets the deltoids and trapezius. Start with hands at shoulder height, press weights directly overhead until arms are fully extended, then lower back to the starting position.",
      muscleGroups: ["Shoulders", "Triceps", "Upper Back"],
      difficulty: "INTERMEDIATE" as const,
      defaultTargetReps: 10,
      defaultSets: 3,
      restDurationSeconds: 75,
      analysisConfig: SHOULDER_PRESS_CONFIG,
    },
  ];

  for (const exercise of exercises) {
    await prisma.exercise.upsert({
      where: { slug: exercise.slug },
      update: {
        name: exercise.name,
        description: exercise.description,
        muscleGroups: exercise.muscleGroups,
        difficulty: exercise.difficulty,
        defaultTargetReps: exercise.defaultTargetReps,
        defaultSets: exercise.defaultSets,
        restDurationSeconds: exercise.restDurationSeconds,
        analysisConfig: exercise.analysisConfig as any,
      },
      create: exercise as any,
    });
    console.log(`  ✓ Upserted: ${exercise.name}`);
  }

  console.log("✅ Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
