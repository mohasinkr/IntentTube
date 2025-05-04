import { Router } from 'express';
import { AuthenticationController } from './authentication.controller';

const router = Router();

router.get('/google', AuthenticationController.googleSignIn);
router.get('/google/callback', AuthenticationController.googleCallback);
router.post('/refresh', AuthenticationController.refreshToken);
router.post('/logout', AuthenticationController.logout);

export default router; 