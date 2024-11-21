import { Request, Response } from 'express';
import { authControllerI } from "../interfaces/controlersI/auth.controler.interface";
import { authServiceI } from "../interfaces/servicesI/auth.service.interface";

class authController implements authControllerI {
    private authService: authServiceI;

    constructor(authService: authServiceI) {
        this.authService = authService;
    }

    public async signin(req: Request, res: Response): Promise<void> {
        try {
            const { phoneNo, countryCode } = req.body;
            await this.authService.signin(phoneNo, countryCode);
            res.status(200).send("OTP Sent");
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Error in signing in", error: error.message });
            } else {
                res.status(500).json({ message: "Unknown error in signing in" });
            }
        }
    }

    public async socialSignin(req: Request, res: Response): Promise<void> {
        try {
            const { provider, token } = req.body;
            await this.authService.socialSignin(provider, token);
            res.status(200).send("Social sign-in successful");
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Error in social sign-in", error: error.message });
            } else {
                res.status(500).json({ message: "Unknown error in social sign-in" });
            }
        }
    }

    public async verifyOtp(req: Request, res: Response): Promise<void> {
        try {
            const { phoneNo, otp } = req.body;
            const { accessToken, refreshToken } = await this.authService.verifyOtp(phoneNo, otp);
            res.status(200).json({ accessToken, refreshToken });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: "Error in OTP verification", error: error.message });
            } else {
                res.status(500).json({ message: "Unknown error in OTP verification" });
            }
        }
    }
}

export default authController;
