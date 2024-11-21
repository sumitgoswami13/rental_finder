import jwt from 'jsonwebtoken';
import { tokenServiceI } from "../interfaces/helpers/token.service.interface";

class tokenService implements tokenServiceI {
  private accessSecret: string;
  private refreshSecret: string;

  constructor() {
    this.accessSecret = process.env.ACCESS_TOKEN_SECRET || 'access-secret';
    this.refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret';
  }

  public generateAccessToken(payload: object): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: '1h' });
  }

  public generateRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: '7d' });
  }

  public verifyAccessToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.accessSecret);
      return typeof decoded === 'object' ? decoded : null;
    } catch (error) {
      console.error("Invalid access token:", error);
      return null;
    }
  }

  public verifyRefreshToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.refreshSecret);
      return typeof decoded === 'object' ? decoded : null;
    } catch (error) {
      console.error("Invalid refresh token:", error);
      return null;
    }
  }
}

export default tokenService;
