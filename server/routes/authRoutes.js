// authRoutes.js
import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Registrazione locale
router.post('/register', AuthController.register);

// Login locale
router.post('/login', AuthController.login);

// OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), AuthController.oauthCallback);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github'), AuthController.oauthCallback);

// Refresh token
router.post('/refresh', AuthController.refreshToken);

// Logout
router.post('/logout', authenticateToken, AuthController.logout);

// Profilo utente (protetto)
router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;