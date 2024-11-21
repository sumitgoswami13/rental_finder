import { sqsServiceI } from "../interfaces/helpers/sqs.interface";
import { tokenServiceI } from "../interfaces/helpers/token.service.interface";
import { userRepositoryI } from "../interfaces/repositories/user.repository.interface";
import { authServiceI } from "../interfaces/servicesI/auth.service.interface";

class AuthService implements authServiceI {
  private userRepository: userRepositoryI;
  private sqs: sqsServiceI;
  private tokenService: tokenServiceI;

  constructor(userRepository: userRepositoryI, sqs: sqsServiceI, tokenService: tokenServiceI) {
    this.userRepository = userRepository;
    this.sqs = sqs;
    this.tokenService = tokenService;
  }

  public async signin(phoneNo: number, countryCode: string): Promise<void> {
    try {
      const user:any = await this.userRepository.finduserByPhone(phoneNo);

      if (!user) {
        await this.userRepository.create({ phoneNo, countryCode });
        await this.sqs.add({ message: "SendPhoneOtp", phoneNo });
      } else {
        await this.sqs.add({ message: "SendPhoneOtp", phoneNo });
      }
    } catch (error) {
      console.error("Error in signin:", error);
      throw error;
    }
  }

  public async socialSignin(provider: string, token: string): Promise<void> {
    try {
      const userDetails = await this.userRepository.findOrCreateSocialUser({ provider, token });
      console.log("Social sign-in successful for user:", userDetails.id);
    } catch (error) {
      console.error("Error in socialSignin:", error);
      throw error;
    }
  }

  public async verifyOtp(phoneNo: number, otp: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const isOtpValid = await this.verifyOtpFromDb(phoneNo, otp);

      if (!isOtpValid) {
        throw new Error("Invalid or expired OTP");
      }

      const user:any = await this.userRepository.finduserByPhone(phoneNo);

      if (!user) {
        throw new Error("User not found");
      }

      const accessToken = this.tokenService.generateAccessToken({ userId: user.id });
      const refreshToken = this.tokenService.generateRefreshToken({ userId: user.id });

      return { accessToken, refreshToken };
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      throw error;
    }
  }

  private async verifyOtpFromDb(phoneNo: number, otp: string): Promise<boolean> {
    return otp === "123456";
  }
}

export default AuthService;
