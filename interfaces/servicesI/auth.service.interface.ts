export interface authServiceI {
    signin(phoneNo: number, countryCode: string): Promise<void>;
    socialSignin(provider: string, token: string): Promise<void>;
    verifyOtp(phoneNo: number, otp: string): Promise<{ accessToken: string; refreshToken: string }>;
  }
  