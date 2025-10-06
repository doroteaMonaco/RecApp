import { sign } from 'jsonwebtoken';

const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env. JWT_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
};

const generateToken = (payload) => {
    return sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

const generateRefreshToken = (payload) => {
    return sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpiresIn });
};

export default {
    jwtConfig,
    generateToken,
    generateRefreshToken
};