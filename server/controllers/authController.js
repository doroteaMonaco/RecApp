import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../models/userModel.js';
import { linkOAuthAccount, findAccountByProvider } from '../models/accountModel.js';

class AuthController {
    async register(req, res) {
        const { email, password, name } = req.body;
        
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Email, password, and name are required.' });
        }

        try {
            // Usa il tuo modello invece di Prisma diretto
            const existingUser = await findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use.' });
            }

            // Crea nuovo utente usando il tuo modello
            const newUser = await createUser({ email, password, name });
            
            // Genera token JWT
            const token = jwt.sign(
                { userId: newUser.id, email: newUser.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return res.status(201).json({ 
                message: 'User registered successfully.', 
                token,
                user: { id: newUser.id, email: newUser.email, name: newUser.name }
            });
        } catch (error) {
            console.error('Registration error:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            // Usa il tuo modello
            const user = await findUserByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid email or password.' });
            }

            // Genera token con più info
            const token = jwt.sign(
                { userId: user.id, email: user.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return res.status(200).json({ 
                message: 'Login successful.', 
                token,
                user: { id: user.id, email: user.email, name: user.name }
            });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }

    async oauthCallback(req, res) {
        try {
            console.log('OAuth callback - req.user:', req.user);
            // Passport ha già autenticato l'utente e lo ha messo in req.user
            const user = req.user;
            
            if (!user) {
                console.log('Utente non trovato in req.user');
                return res.status(401).json({ message: 'Authentication failed.' });
            }

            console.log('Generando token JWT per utente:', user.email);
            // Genera JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            // Redirect al frontend con il token
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
            console.log('Redirecting to:', `${frontendUrl}/auth/callback?token=${token}`);
            res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
            
        } catch (error) {
            console.error('OAuth callback error:', error);
            return res.status(500).json({ message: 'Authentication failed.' });
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required.' });
        }

        try {
            // Verifica il refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);
            
            // Genera nuovo access token
            const newToken = jwt.sign(
                { userId: decoded.userId, email: decoded.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return res.status(200).json({ token: newToken });
        } catch (error) {
            return res.status(401).json({ message: 'Invalid refresh token.' });
        }
    }

    async logout(req, res) {
        // Per JWT, il logout è principalmente gestito lato client
        // Ma puoi aggiungere logica per invalidare token se usi Redis
        return res.status(200).json({ message: 'Logout successful.' });
    }

    // Metodo aggiuntivo per ottenere profilo utente
    async getProfile(req, res) {
        try {
            const user = await findUserById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            return res.status(200).json({
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatar: user.avatar,
                    createdAt: user.createdAt
                }
            });
        } catch (error) {
            console.error('Get profile error:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
}

export default new AuthController();