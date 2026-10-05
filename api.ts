// ============================================================
// Domain Types: API Contracts
// ============================================================

// ── Generic Response Shapes ──────────────────────────────────

export interface ApiSuccess<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: Record<string, string[]>;
  data?: never;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ── Exercise Types ────────────────────────────────────────────

export interface ExerciseDto {
  id: string;
  name: string;
  slug: string;
  description: string;
  muscleGroups: string[];
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  defaultTargetReps: number;
  defaultSets: number;
  restDurationSeconds: number;
  imageUrl?: string;
}

// ── Workout Types ─────────────────────────────────────────────

export interface CreateWorkoutBody {
  exerciseId: string;
  targetReps: number;
  sets: number;
  restDurationSeconds: number;
}

export interface WorkoutSessionDto {
  id: string;
  exerciseId: string;
  exerciseName: string;
  exerciseSlug: string;
  startedAt: string;
  completedAt: string | null;
  duration: number | null;
  totalReps: number;
  formScore: number | null;
  status: "CREATED" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  sets: WorkoutSetDto[];
}

export interface WorkoutSetDto {
  id: string;
  sessionId: string;
  setNumber: number;
  targetReps: number;
  completedReps: number;
  duration: number | null;
  formScore: number | null;
  startedAt: string;
  completedAt: string | null;
}

export interface CompleteWorkoutBody {
  completedAt: string;
  duration: number;
  totalReps: number;
  formScore: number;
  status: "COMPLETED" | "CANCELLED";
}

export interface CreateSetBody {
  setNumber: number;
  targetReps: number;
  startedAt: string;
}

export interface CompleteSetBody {
  completedReps: number;
  duration: number;
  formScore: number;
  completedAt: string;
  reps?: Array<{
    repNumber: number;
    timestamp: string;
    confidence: number;
    movementQuality: number;
  }>;
}

// ── Stats Types ───────────────────────────────────────────────

export interface UserStatsDto {
  totalWorkouts: number;
  totalReps: number;
  currentStreak: number;
  bestWorkout: {
    exerciseName: string;
    reps: number;
    formScore: number;
    date: string;
  } | null;
  weeklyData: WeeklyDataPoint[];
  exerciseDistribution: ExerciseDistributionItem[];
  personalRecords: PersonalRecordDto[];
}

export interface WeeklyDataPoint {
  date: string;        // ISO date "2024-08-26"
  workouts: number;
  reps: number;
  avgFormScore: number;
}

export interface ExerciseDistributionItem {
  exerciseName: string;
  count: number;
  percentage: number;
}

export interface PersonalRecordDto {
  type: "MOST_REPS_IN_SET" | "LONGEST_WORKOUT" | "BEST_FORM_SCORE" | "MOST_COMPLETED_EXERCISE";
  exerciseName: string;
  value: number;
  unit: string;
  date: string;
}

// ── Profile Types ─────────────────────────────────────────────

export interface UserProfileDto {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  fitnessGoal: string | null;
  preferredUnits: "METRIC" | "IMPERIAL";
  targetWeeklyWorkouts: number;
}

export interface UpdateProfileBody {
  name?: string;
  fitnessGoal?: string;
  preferredUnits?: "METRIC" | "IMPERIAL";
  targetWeeklyWorkouts?: number;
}

// ── History Types ─────────────────────────────────────────────

export interface WorkoutHistoryParams {
  page?: number;
  pageSize?: number;
  exerciseId?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "date" | "reps" | "formScore" | "duration";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedWorkouts {
  workouts: WorkoutSessionDto[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
