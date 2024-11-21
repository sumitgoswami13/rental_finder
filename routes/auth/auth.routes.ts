import { Router } from 'express';
import { authControllerI } from '../../interfaces/controlersI/auth.controler.interface';

const router = Router();

const authRoutes = (authController: authControllerI) => {
  router.post('/signin', (req, res) => authController.signin(req,res));
  router.post('/social-signin', (req, res) => authController.socialSignin(req, res));
  router.post('/verify-otp', (req, res) => authController.verifyOtp(req, res));

  return router;
};

export default authRoutes;
