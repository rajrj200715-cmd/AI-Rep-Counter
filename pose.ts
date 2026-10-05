// ============================================================
// Domain Types: Pose Estimation
// ============================================================

/** A single body landmark from MediaPipe Pose. */
export interface PoseLandmark {
  x: number;        // normalized 0–1
  y: number;        // normalized 0–1
  z: number;        // depth (relative), 0 if unavailable
  visibility: number; // 0–1 confidence that landmark is visible
}

/** A complete pose frame with all 33 MediaPipe landmarks. */
export interface PoseFrame {
  landmarks: PoseLandmark[];
  timestamp: number; // performance.now()
}

/** Aggregate confidence score for a pose frame. */
export interface PoseConfidence {
  overall: number;        // 0–1
  upperBody: number;      // 0–1
  lowerBody: number;      // 0–1
  isReliable: boolean;    // overall >= threshold
}

/** Current tracking state of the pose detector. */
export type TrackingState =
  | "IDLE"
  | "INITIALIZING"
  | "TRACKING"
  | "TRACKING_LOST"
  | "ERROR";

/** Confidence level classification. */
export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.75,
  MEDIUM: 0.60,
  LOW: 0.0,
} as const;

/**
 * MediaPipe Pose landmark indices.
 * https://developers.google.com/mediapipe/solutions/vision/pose_landmarker
 */
export const LANDMARK_INDICES = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
} as const;

export type LandmarkIndex = (typeof LANDMARK_INDICES)[keyof typeof LANDMARK_INDICES];

/** A 2D/3D point used in geometry calculations. */
export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D extends Point2D {
  z: number;
}

/** A 2D vector. */
export interface Vector2D {
  x: number;
  y: number;
}
