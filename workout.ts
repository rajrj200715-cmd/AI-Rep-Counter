// ============================================================
// Domain Types: Workout & Rep Counting
// ============================================================

import type { PoseLandmark } from "./pose";

// ── Movement Phases ──────────────────────────────────────────

/** Generic movement phases shared across exercises. */
export type MovementPhase =
  | "READY"
  | "DESCENDING"
  | "BOTTOM"
  | "ASCENDING"
  | "COMPLETED"
  | "TRACKING_LOST"
  | "INVALID"
  | "PAUSED";

/** Exercise-specific extended phases (union). */
export type SquatPhase = "STANDING" | "DESCENDING" | "BOTTOM" | "ASCENDING" | "COMPLETED";
export type PushUpPhase = "TOP" | "DESCENDING" | "BOTTOM" | "ASCENDING" | "COMPLETED";
export type CurlPhase = "EXTENDED" | "CURLING" | "CONTRACTED" | "EXTENDING" | "COMPLETED";
export type LungePhase = "STANDING" | "DESCENDING" | "BOTTOM" | "ASCENDING" | "COMPLETED";
export type JumpingJackPhase = "CLOSED" | "OPENING" | "OPEN" | "CLOSING" | "COMPLETED";
export type ShoulderPressPhase = "RACKED" | "PRESSING" | "EXTENDED" | "LOWERING" | "COMPLETED";

// ── Rep State Machine ─────────────────────────────────────────

/** State machine states for repetition counting. */
export type RepMachineState =
  | "READY"
  | "MOVING_DOWN"
  | "AT_BOTTOM"
  | "MOVING_UP"
  | "COMPLETED"
  | "TRACKING_LOST"
  | "INVALID"
  | "COOLDOWN";

/** A validated rep event emitted by the state machine. */
export interface RepEvent {
  repNumber: number;
  timestamp: number;
  confidence: number;
  movementQuality: number; // 0–1
  rangeOfMotion: number;   // primary angle delta
  durationMs: number;
}

/** Rep counter configuration (per exercise). */
export interface RepCounterConfig {
  downThreshold: number;        // angle at bottom
  upThreshold: number;          // angle at top
  minimumRangeOfMotion: number; // degrees
  minimumConfidence: number;    // 0–1
  minimumRepDurationMs: number; // milliseconds
  cooldownMs: number;           // ms between reps
  smoothingFactor: number;      // EMA alpha 0–1
}

// ── Exercise Analysis ─────────────────────────────────────────

/** Result produced by an ExerciseAnalyzer. */
export interface ExerciseAnalysis {
  phase: MovementPhase;
  confidence: number;            // 0–1 landmark reliability
  primaryAngle: number;          // main angle for counting
  secondaryAngles: Record<string, number>;
  alignmentScore: number;        // 0–1 body alignment
  movementQuality: number;       // 0–1 smoothness/form
  feedback: FormFeedback | null;
  validForCounting: boolean;     // true if landmarks sufficient
}

/** A form feedback message with priority. */
export interface FormFeedback {
  message: string;
  priority: FeedbackPriority;
  type: FeedbackType;
}

export type FeedbackPriority = "TRACKING" | "SAFETY" | "MAJOR" | "ROM" | "POSITIVE";
export type FeedbackType = "error" | "warning" | "success" | "info";

/** Interface every exercise analyzer must implement. */
export interface ExerciseAnalyzer {
  readonly exerciseSlug: string;
  analyze(
    landmarks: PoseLandmark[],
    previousPhase: MovementPhase,
  ): ExerciseAnalysis;
}

// ── Workout Session ──────────────────────────────────────────

/** The high-level workout lifecycle state. */
export type WorkoutPhase =
  | "CREATED"
  | "PREPARING"
  | "READY"
  | "ACTIVE"
  | "PAUSED"
  | "SET_COMPLETE"
  | "RESTING"
  | "COMPLETED"
  | "CANCELLED"
  | "ERROR";

/** One completed/in-progress set of an exercise. */
export interface WorkoutSet {
  setNumber: number;
  targetReps: number;
  completedReps: number;
  durationMs: number;
  formScore: number;      // 0–100
  startedAt: number;      // Date.now()
  completedAt: number | null;
  reps: RepEvent[];
}

/** Full workout session state managed client-side. */
export interface WorkoutSessionState {
  sessionId: string | null;       // DB id once created
  exerciseSlug: string;
  exerciseName: string;
  phase: WorkoutPhase;
  currentSetIndex: number;
  totalSets: number;
  targetRepsPerSet: number;
  restDurationSeconds: number;
  sets: WorkoutSet[];
  startedAt: number | null;
  completedAt: number | null;
  elapsedMs: number;
  totalReps: number;
  overallFormScore: number;
}

/** Summary after workout completion. */
export interface WorkoutSummary {
  sessionId: string;
  exerciseName: string;
  totalSets: number;
  completedSets: number;
  totalReps: number;
  durationMs: number;
  formScore: number;
  bestSetReps: number;
  sets: Array<{
    setNumber: number;
    completedReps: number;
    formScore: number;
    durationMs: number;
  }>;
}
