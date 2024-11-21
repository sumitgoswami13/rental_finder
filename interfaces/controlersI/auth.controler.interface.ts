import { Request, Response } from 'express';

export interface authControllerI {
    signin(req: Request, res: Response): Promise<void>;
    socialSignin(req: Request, res: Response): Promise<void>;
    verifyOtp(req: Request, res: Response): Promise<void>;
}
