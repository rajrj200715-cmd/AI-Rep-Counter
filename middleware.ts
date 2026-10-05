// ============================================================
// Next.js Middleware — Route Protection
// IMPORTANT: Middleware is NOT the only auth layer.
// Every API route independently verifies authorization.
// ============================================================

export { auth as middleware } from "@/lib/auth/config";

export const config = {
  matcher: [
    /*
     * Protect these routes:
     * - /dashboard
     * - /history
     * - /profile
     * - /settings
     * - /workout/[sessionId] (not /workout itself — guests can configure)
     *
     * Exclude:
     * - /api/auth/* (Auth.js routes)
     * - /_next/* (Next.js internals)
     * - /public files
     */
    "/dashboard/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/workout/:sessionId/:path*",
  ],
};
