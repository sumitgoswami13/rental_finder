export interface tokenServiceI {
    generateAccessToken(payload: object): string; // Generate access token with user data
    generateRefreshToken(payload: object): string; // Generate refresh token with user data
    verifyAccessToken(token: string): object | null; // Verify and decode access token
    verifyRefreshToken(token: string): object | null; // Verify and decode refresh token
  }
  